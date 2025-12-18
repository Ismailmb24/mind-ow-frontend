import Image from "next/image"
import SignupForm from "@/components/SignupForm"

export default function SignUpPage() {

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Column - Branding */}
      <div className="hidden w-1/2 flex-col justify-between bg-[#1e3a8a] p-12 text-white lg:flex">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center rounded-lg bg-white/20">
            <Image src="/logo-dark.png" alt="Logo" width={170} height={170} />
          </div>
        </div>

        {/* Hero Text */}
        <div className="max-w-3xl space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
            Start your journey,
            <br />
            <span className="text-blue-200/90">achieve more today.</span>
          </h1>
          <p className="text-lg text-blue-200/90">
            Create your account to access powerful project management tools, collaborate with your team, and stay organized from day one.
          </p>

          {/* Testimonial Card */}
          <div className="mt-12 rounded-2xl bg-white/10 p-6 backdrop-blur-md">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 overflow-hidden rounded-full bg-blue-200 shrink-0">
                <img
                  src="https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah"
                  alt="Sarah Chen"
                  className="h-full w-full object-cover"  
                />
              </div>
              <div className="flex-1">
                <p className="text-base italic text-white/95 mb-3">
                  "It changed how our team ships product."
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">Sarah Chen</p>
                  <span className="text-blue-200">·</span>
                  <p className="text-xs text-blue-200">Product Director</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-sm text-blue-200/60">© 2023 TaskApp Inc. All rights reserved.</div>
      </div>

      {/* Right Column - Form */}
      <SignupForm />
    </div>
  )
}
