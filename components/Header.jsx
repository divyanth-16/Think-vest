import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "./ui/button"
import { checkUser } from "@/lib/checkUser"

const Header = async () => {
  
await checkUser()

  return (
    <div>
        <nav>
            <Link href="/">
             <p>
              Logo.
             </p>
            </Link>
        
        <SignedOut>
          <SignInButton forceRedirectUrl="/dashboard" >
            <button className="bg-amber-300">Login</button>
            </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton 
              />
            </SignedIn>
            </nav>
    </div>
  )
}

export default Header