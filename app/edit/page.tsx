import Editor from "@/components/editor";

export default function Page() {
  return (
    <div className="h-screen">
      <Editor initialTitle="Untitled" initialContent="" noteId={null} />
    </div>
  )
}
