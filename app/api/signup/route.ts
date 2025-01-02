import { NextRequest, NextResponse } from "next/server";

import { encryptPassword } from "@/lib/crypt";
import prisma from "@/lib/prisma";

interface Payload {
  username: string
  email: string
  password: string
}

export async function POST(request: NextRequest) {
  const { username, email, password }: Payload = await request.json()

  const userExists = await prisma.user.findFirst({
    where: {
      OR: [{ username }, { email }]
    }
  })

  if (userExists) {
    return NextResponse.json({ error: 'Username or email already exists' }, { status: 400 })
  }

  const { hash, salt } = await encryptPassword(password)
  const user = await prisma.user.create({
    data: {
      username,
      email,
      salt,
      password: hash,
    }
  })

  return NextResponse.json(user, { status: 200 })
  // await signIn('credentials', {
  //   redirectTo: '/',
  //   login: payload.username,
  //   password: payload.password
  // })
}
