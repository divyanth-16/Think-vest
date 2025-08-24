import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { checkUser } from "../lib/checkUser";

const Header = async () => {
  await checkUser();

  return (
    <header className="w-full px-6 py-4 bg-gradient-to-r from-[#434343] via-[#222222] to-[#434343] text-white shadow-xl">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-extrabold tracking-wide hover:text-gray-400 transition-all duration-300"
        >
          FinTrack<span className="text-gray-400">.</span>
        </Link>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <button className="relative flex items-center gap-3 px-8 py-3 text-lg font-semibold text-white uppercase transition-transform transform rounded-xl group hover:scale-105 active:scale-95 backdrop-blur-md bg-white/10 border border-gray-400 shadow-[0_0_20px_#9ca3af66] hover:shadow-[0_0_30px_#9ca3af]">
                {/* Neon glow pulse layer */}
                <span className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-400/20 to-gray-600/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></span>

                {/* Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 relative z-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12H3m0 0l4-4m-4 4l4 4m8-8h4a2 2 0 012 2v6a2 2 0 01-2 2h-4"
                  />
                </svg>

                {/* Text */}
                <span className="relative z-10 text-white tracking-wide">
                  Login
                </span>
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
        <div className="flex gap-4 mt-6">
  {/* Dashboard Button */}
  <Link
    href="/dashboard"
    className="px-6 py-2 rounded-xl font-semibold text-white 
               bg-gradient-to-r from-[#3a3a3a] to-[#1a1a1a] 
               shadow-md ring-1 ring-white/10
               transition-all duration-300 ease-in-out
               hover:scale-105 hover:bg-gradient-to-r hover:from-[#4b4b4b] hover:to-[#2a2a2a] 
               hover:shadow-[0_0_18px_#ffffff40]"
  >
    Dashboard
  </Link>

  {/* Add Transaction Button */}
  <Link
    href="/transaction/create"
    className="px-6 py-2 rounded-xl font-semibold text-white 
               bg-gradient-to-r from-[#22c55e] to-[#15803d] 
               shadow-md ring-1 ring-white/10
               transition-all duration-300 ease-in-out
               hover:scale-105 hover:from-[#34d399] hover:to-[#166534] 
               hover:shadow-[0_0_25px_#22c55e80]"
  >
    + Add Transaction
  </Link>
</div>


            <UserButton
              appearance={{
                elements: {
                  avatarBox: {
                    width: "2.5rem",
                    height: "2.5rem",
                  },
                  avatarImage: {
                    width: "2.5rem",
                    height: "2.5rem",
                  },
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
