import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
  await checkUser();

  return (
    <header className="w-full px-6 py-4 bg-gradient-to-r from-[#0a1d3b] via-[#0e3377] to-[#0a1d3b] text-white shadow-xl">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-extrabold tracking-wide hover:text-cyan-400 transition-all duration-300"
        >
          FinTrack<span className="text-cyan-400">.</span>
        </Link>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton>
              <button className="relative flex items-center gap-3 px-8 py-3 text-lg font-semibold text-white uppercase transition-transform transform rounded-xl group hover:scale-105 active:scale-95 backdrop-blur-md bg-white/10 border border-cyan-400 shadow-[0_0_20px_#22d3ee66] hover:shadow-[0_0_30px_#22d3ee]">

                {/* Neon glow pulse layer */}
                <span className="absolute inset-0 animate-pulse bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></span>

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
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
