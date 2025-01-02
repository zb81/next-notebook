import Editor from "@/components/editor";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Basic')

  return {
    title: `${t('newNote')}`,
  }
}

export default function Page() {
  return <Editor initialTitle="Untitled" initialContent="" noteId={null} />
}
