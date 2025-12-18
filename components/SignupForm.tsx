"use client"
import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Lock, Mail, CheckCircle2 } from "lucide-react"

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Button } from "@/components/ui/button"
import { UserCreateInput, userCreateSchema } from "@/lib/validation/user"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

export default function SignupForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    //signup fundtion
    function onSubmit(data: UserCreateInput) {
        console.log(data)
    }

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<UserCreateInput>({
        resolver: zodResolver(userCreateSchema)
    })
    
    return (
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

              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700" htmlFor="email">
                    Email
                  </label>
                  <InputGroup className="py-5">
                    <InputGroupAddon>
                      <Mail className="h-5 w-5" />
                    </InputGroupAddon>
                    <InputGroupInput 
                    id="email" 
                    {...register("email")}
                    placeholder="name@company.com" />
                  </InputGroup>
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700" htmlFor="password">
                    Password
                  </label>
                  <InputGroup className="py-5">
                    <InputGroupAddon>
                      <Lock className="h-5 w-5" />
                    </InputGroupAddon>
                    <InputGroupInput 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    {...register("password")}
                    placeholder="Create a password" />
                    <InputGroupAddon align="inline-end">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </InputGroupAddon>
                  </InputGroup>
                  {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700" htmlFor="confirm-password">
                    Confirm Password
                  </label>
                  <InputGroup className="py-5">
                    <InputGroupAddon>
                      <CheckCircle2 className="h-5 w-5" />
                    </InputGroupAddon>
                    <InputGroupInput 
                    id="confirm-password" 
                    type={showConfirmPassword ? "text" : "password"} 
                    {...register("confirmPassword")}
                    placeholder="Confirm your password" />
                    <InputGroupAddon align="inline-end">
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </InputGroupAddon>
                  </InputGroup>
                  {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                </div>

                {/* Sign Up Button */}
                <Button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-lg bg-[#2d4a9e] px-4 py-5 text-sm font-semibold text-white transition-all hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2"
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
                </Button> 
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
    )
}