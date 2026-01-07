"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { ArrowUpRightIcon, Check, Loader2, Lock } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ResetPasswordInput, resetPasswordSchema } from "@/lib/validation/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPassword } from "@/lib/services/resetPassword";
import { useSearchParams } from "next/navigation";
import { toast, Toaster } from "sonner";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import Link from "next/link";
import { resetPasswordAction } from "@/lib/actions/reset-password";

export default function Page() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [isSending, setIsSending] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm<ResetPasswordInput>({
        resolver: zodResolver(resetPasswordSchema),
    })

    const onSubmit = async (data: ResetPasswordInput) => {
        if (!token) {
            console.error("Token is missing");
            return;
        }
        setIsSending(true);
        try {
            const res = await resetPasswordAction(data.password, token);
            if (!res?.success) {
                setIsSending(false);
                toast.error(res?.message);
                return;
            }
            setIsSending(false);
            setIsSuccess(true);
        } catch (error) {
            console.error(error);
            setIsSending(false);
        }
    }

    if (isSuccess) {
        return(
            <div className="flex h-screen items-center justify-center">
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant="icon" className="w-40 h-40 bg-blue-300 p-5 rounded-xl">
                            <Check className="size-16" />
                        </EmptyMedia>
                        <EmptyTitle>
                           Reset Password
                        </EmptyTitle>
                        <EmptyDescription>
                            Your password has been reset successfully
                        </EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                        <Button
                            variant="default"
                            className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/80 text-white"
                            asChild
                        >
                            <Link href="/auth/signin">
                            Sign In
                            <ArrowUpRightIcon className="ml-2 size-4" />
                            </Link>
                        </Button>
                    </EmptyContent>
                </Empty>
            </div>
        )
    }
        return (
            <div className="flex h-screen items-center justify-center">
                <Toaster position="top-center" richColors />
                <Card className="w-full max-w-md">
                <CardHeader>
                    <div className="flex flex-col gap-2 items-center">
                        <div className="bg-blue-300 text-blue-500 p-5 rounded-xl">
                            <Lock className="size-16 " />
                        </div>
                        <CardTitle className="text-2xl font-medium">
                            Reset Password
                        </CardTitle>
                    </div>
                    <CardDescription className="text-center">
                        Enter your new password
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700" htmlFor="password">
                                Password
                            </label>
                            <InputGroup>
                                <InputGroupAddon>
                                    <Lock />
                                </InputGroupAddon>
                                <InputGroupInput
                                id="password"
                                type="password"
                                {...register("password")}
                                placeholder="******" />
                            </InputGroup>
                            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700" htmlFor="confirmPassword">
                                Confirm Password 
                            </label>
                            <InputGroup>
                                <InputGroupAddon>
                                    <Lock />
                                </InputGroupAddon>
                                <InputGroupInput
                                id="confirmPassword"
                                type="password"
                                {...register("confirmPassword")}
                                placeholder="******" />
                            </InputGroup>
                            {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
                        </div>

                        <Button
                            type="submit"
                            variant="default" 
                            className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/80 text-white"
                            disabled={isSending}
                        >
                            {isSending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    Reset Password
                                    <ArrowUpRightIcon className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}