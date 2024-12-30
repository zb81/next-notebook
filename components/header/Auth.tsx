import { auth, signIn, signOut } from "@/auth"

function SignIn() {
  return (
    <form action={async () => {
      'use server'
      await signIn()
    }}>
      <button>Sign In</button>
    </form>
  )
}

function SignOut() {
  return (
    <form action={async () => {
      'use server'
      await signOut()
    }}>
      <button>Sign Out</button>
    </form>
  )
}

export default async function Auth() {
  const session = await auth()
  return (
    <div className="ml-2">
      {
        session?.user
          ? <span style={{ display: "flex", "alignItems": "center" }}>{session?.user.name}<SignOut /></span>
          : <SignIn />
      }
    </div>
  )
}
