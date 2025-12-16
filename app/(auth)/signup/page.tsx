"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Lock, Mail, CheckCircle2 } from "lucide-react"
import Image from "next/image"

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)


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
          <p className="text-lg text-blue-200/90 max-w-md">
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
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-24">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Create an Account</h2>
            <p className="mt-2 text-sm text-gray-500">Join us to start organizing your tasks efficiently.</p>
          </div>


            <div className="space-y-6">
              {/* Social Login Buttons */}
              <button className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2">
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign up with Google
              </button>

              <div className="relative flex items-center py-2">
                <div className="grow border-t border-gray-200"></div>
                <span className="mx-4 shrink-0 text-xs font-semibold uppercase text-gray-400">
                  Or with email
                </span>
                <div className="grow border-t border-gray-200"></div>
              </div>

              <form className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700" htmlFor="email">
                    Email
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      placeholder="name@company.com"
                      className="block w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-3 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2d4a9e] focus:ring-offset-0"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700" htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="block w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-10 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2d4a9e] focus:ring-offset-0"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700" htmlFor="confirm-password">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <CheckCircle2 className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="block w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-10 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2d4a9e] focus:ring-offset-0"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Sign Up Button */}
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-xl bg-[#2d4a9e] px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2"
                >
                  Sign Up
                  <svg
                    className="ml-2 -mr-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>

              {/* Already have account */}
              <div className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link href="/signin" className="font-semibold text-[#2d4a9e] hover:underline">
                  Sign In
                </Link>
              </div>

              {/* Email Verification Notice */}
              <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">
                <div className="flex gap-3">
                  <Mail className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-blue-900 mb-1">Email Verification:</p>
                    <p className="text-xs text-blue-700 leading-relaxed">
                      To ensure the security of your account, we will send a verification link to your email address immediately after registration.
                    </p>
                  </div>
                </div>
              </div>
            </div>

        </div>
      </div>
    </div>
  )
}
