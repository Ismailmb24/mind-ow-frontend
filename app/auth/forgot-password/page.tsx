"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { forgotPasswordAction } from "@/lib/actions/reset-password";
import { EmailInput, emailSchema } from "@/lib/validation/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRightIcon, Loader2, LockIcon, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";

export default function Page() {
    const [isResending, setIsResending] = useState(false);
    const [email_input, setEmailInput] = useState("");

    async function onSubmit(data: EmailInput) {
        console.log("Email: ", data.email);
        setIsResending(true);
        const res = await forgotPasswordAction(data.email);
        console.log("Res: ", res);
        if (!res?.success) {
            setIsResending(false);
            toast.error(res?.message);
            return;
        }
        setIsResending(false);
        setEmailInput("");
        toast.success("Check your email for reset password link");
    }
    
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<EmailInput>({
        resolver: zodResolver(emailSchema)
    })
    
    return (
        <div className="flex h-screen items-center justify-center">
            <Toaster position="top-center" richColors />
            <Card className="w-full max-w-md">
                <CardHeader>
                    <div className="flex flex-col gap-2 items-center">
                        <div className="bg-blue-300 text-blue-500 p-5 rounded-xl">
                            <LockIcon className="size-16 " />
                        </div>
                        <CardTitle className="text-2xl font-medium">
                            Forgot Password
                        </CardTitle>
                    </div>
                    <CardDescription className="text-center">
                        No worries! Enter your email address below and we will send you a link to your reset password
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-4 w-full">
                            <InputGroup className="py-3">
                                <InputGroupAddon>
                                    <Mail className="h-5 w-5" />
                                </InputGroupAddon>
                                <InputGroupInput
                                    type="email"
                                    {...register("email")}
                                    placeholder="name@company.com"
                                    disabled={isResending}
                                    value={email_input}
                                    onChange={(e) => setEmailInput(e.target.value)}
                                />
                            </InputGroup>
                            {errors.email && <p className="text-sm bg-red-500">{errors.email.message}</p>}
                            <Button
                                type="submit"
                                variant="default" 
                                className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/80 text-white"
                            >
                                {isResending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Reset Link
                                        <ArrowUpRightIcon className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </form>
                </CardContent>
            </Card>
        </div>
    );
}