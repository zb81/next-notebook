import Editor from "@/components/editor";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Basic')

  return {
    title: `${t('newNote')} - Next Notebook`,
  }
}

export default function Page() {
  return (
    <div className="h-screen">
      <Editor initialTitle="Untitled" initialContent="" noteId={null} />
    </div>
  )
}
