import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"

const Header = () => {
  return (
    <div className="fixed top-0 w-full">
        <nav className="flex items-center justify-between mx-auto container px-4 py-5 bg-blue-200">
            <Link href="/">
             <Image
             src={"/nflogo.png"}
             alt = "temp logo"
             height = {30}
             width = {80}
             className = "h-7 w-auto object-contain"
             />
            </Link>
        
        <SignedOut>
          <SignInButton>
            <Button variant="outline">Login</Button>
            </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton 
              appearance= {{
                elements: {
                  avatarBox:"h-10 w-10",
                },
              }}
              />
            </SignedIn>
            </nav>
    </div>
  )
}

export default Header