import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";
import { writeFile, stat, mkdir } from "fs/promises";
import { join } from "path";
import mime from "mime";

import { getSessionUserId } from "@/lib/session";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const userId = await getSessionUserId()

  const formData = await request.formData()
  const file = formData.get('file') as File

  // 空值判断
  if (!file) {
    return NextResponse.json(
      { error: "File is required." },
      { status: 400 }
    );
  }

  // 写入文件
  const buffer = Buffer.from(await file.arrayBuffer());
  const relativeUploadDir = `/uploads/${dayjs().format("YY-MM-DD")}`;
  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(e)
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }
  }

  try {
    // 写入文件
    const uniqueSuffix = `${Math.random().toString(36).slice(-6)}`;
    const filename = file.name.replace(/\.[^/.]+$/, "")
    const uniqueFilename = `${filename}-${uniqueSuffix}.${mime.getExtension(file.type)}`;
    await writeFile(`${uploadDir}/${uniqueFilename}`, buffer);

    // 调用接口，写入数据库
    const res = await prisma.note.create({
      data: {
        title: filename,
        content: buffer.toString('utf-8'),
        authorId: userId!,
      },
      include: {
        author: true
      }
    })
    return NextResponse.json({ fileUrl: `${relativeUploadDir}/${uniqueFilename}`, id: res.id });
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
