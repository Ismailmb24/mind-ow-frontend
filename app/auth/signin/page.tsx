import Image from "next/image"
import SigninForm from "@/components/SigninForm"
import { auth } from "@/lib/auth/config"

export default async function SignInPage() {
  const session = await auth();
  console.log(session);
  
  return (
    <div className="flex min-h-screen w-full">
      {/* Left Column - Branding */}
      <div className="hidden w-1/2 flex-col justify-between bg-[#1e3a8a] p-12 text-white lg:flex">
        {/* Logo */}
        <div className="flex items-center gap-2 font-semibold">
          <Image src="/logo-dark.png" alt="Logo" width={170} height={170} />
        </div>

        {/* Hero Text */}
        <div className="max-w-3xl space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
            Master your day,
            <br />
            <span className="text-blue-200/90">achieve your goals.</span>
          </h1>
          <p className="text-lg text-blue-200/90">
            The minimal task manager designed for focus. Organize projects, track progress, and collaborate without the clutter.
          </p>

          {/* Testimonial Card */}
            <div className="mt-12 rounded-2xl bg-white/10 p-6 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-blue-200">
                        <img
                        src="https://api.dicebear.com/9.x/avataaars/svg?seed=Elena"
                        alt="Avatar"
                        className="h-full w-full object-cover"  
                        />
                    </div>
               
                    <div>
                        <p className="text-lg italic text-white/90">
                            "Finally, a tool that actually helps me focus instead of distracting me."
                        </p>
                        <div className="mt-4 flex items-center gap-2">
                            <p className="text-sm font-semibold">Elena R</p>
                            <span className="text-blue-200">&middot;</span>
                            <p className="text-xs text-blue-200">Creative Lead</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="text-sm text-blue-200/60">© 2024 MindOw Inc.</div>
      </div>

      {/* Right Column - Form */}
      <SigninForm />
    </div>
  )
}
import { cookies } from "next/headers";