"use client"

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { ArrowUpRightIcon, Check, Mail, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast, Toaster } from "sonner";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { useForm } from "react-hook-form";
import { UserInput, userSchema } from "@/lib/validation/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { resendEmailAction, verifyEmailAction } from "@/lib/actions/emailVerification";

type VerificationStatus = "idle" | "verifying" | "success" | "error" | "expired" | "pending";

export default function Page() {
    const searchParams = useSearchParams();
    const router = useRouter();
    
    const [status, setStatus] = useState<VerificationStatus>("idle");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isResending, setIsResending] = useState(false);
    const [resendEmail_input, setResendEmailInput] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<UserInput>({
        resolver: zodResolver(userSchema)
    })

    useEffect(() => {
        const token = searchParams.get("token");
        const urlStatus = searchParams.get("status");

        // Handle URL status parameters
        if (urlStatus === "success") {
            setStatus("success");
            return;
        }
        if (urlStatus === "pending") {
            setStatus("pending");
            return;
        }
        if (urlStatus === "expired") {
            setStatus("expired");
            return;
        }

        // Automatically verify if token is present
        if (token) {
            handleVerification(token);
        }
    }, [searchParams]);

    const handleVerification = async (token: string) => {
        setStatus("verifying");
        
        const result = await verifyEmailAction(token);
        
        if (result.success) {
            setStatus("success");
            toast.success("Email verified successfully!");
            setTimeout(() => {
                router.push("/auth/signin");
            }, 3000);
        } else {
            setStatus("error");
            setErrorMessage(result.message || "Failed to verify email");
            toast.error(result.message || "Failed to verify email");
        }
    };

    const handleResendEmail = async () => {
        if (!resendEmail_input) {
            toast.error("Please enter your email address");
            return;
        }

        setIsResending(true);
        
        const result = await resendEmailAction(resendEmail_input);
        
        setIsResending(false);
        
        if (result.success) {
            toast.success("Verification email sent! Please check your inbox.");
            setResendEmailInput("");
            setStatus("pending");
        } else {
            toast.error(result.message || "Failed to resend verification email");
        }
    };

    // Verifying state
    if (status === "verifying") {
        return (
            <div className="flex h-screen items-center justify-center">
                <Toaster position="top-center" richColors />
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant="icon" className="h-40 w-40 bg-blue-200 text-blue-500">
                            <Loader2 className="size-20 animate-spin" />
                        </EmptyMedia>
                        <EmptyTitle className="text-2xl">
                            Verifying your email
                        </EmptyTitle>
                        <EmptyDescription>
                            Please wait while we verify your email address...
                        </EmptyDescription>
                    </EmptyHeader>
                </Empty>
            </div>
        );
    }

    // Success state
    if (status === "success") {
        return (
            <div className="flex h-screen items-center justify-center">
                <Toaster position="top-center" richColors />
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant="icon" className="h-40 w-40 bg-green-200 text-green-500">
                            <Check className="size-20" />
                        </EmptyMedia>
                        <EmptyTitle className="text-2xl">
                            Verification successful
                        </EmptyTitle>
                        <EmptyDescription>
                            Your email has been verified successfully. You can now sign in to your account.
                        </EmptyDescription>
                        <EmptyContent>
                            <Button variant="default" className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/80 text-white">
                                <Link href="/auth/signin">Sign In</Link>
                                <ArrowUpRightIcon className="ml-2 h-4 w-4" />
                            </Button>
                        </EmptyContent>
                    </EmptyHeader>
                </Empty>
            </div>
        );
    }

    // Pending state
    if (status === "pending") {
        return (
            <div className="flex h-screen items-center justify-center">
                <Toaster position="top-center" richColors />
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant="icon" className="h-40 w-40 bg-yellow-200 text-yellow-500">
                            <Mail className="size-20" />
                        </EmptyMedia>
                        <EmptyTitle className="text-2xl">
                            Check your email
                        </EmptyTitle>
                        <EmptyDescription>
                            We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
                        </EmptyDescription>
                        <EmptyContent>
                            <Button variant="link" className="text-slate-500">
                                <Link href="/auth/signin">Back to Sign In</Link>
                                <ArrowUpRightIcon className="ml-2 h-4 w-4" />
                            </Button>
                        </EmptyContent>
                    </EmptyHeader>
                </Empty>
            </div>
        );
    }

    // Expired state
    if (status === "expired") {
        return (
            <div className="flex h-screen items-center justify-center">
                <Toaster position="top-center" richColors />
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant="icon" className="h-40 w-40 bg-orange-200 text-orange-500">
                            <AlertCircle className="size-20" />
                        </EmptyMedia>
                        <EmptyTitle className="text-2xl">
                            Token expired
                        </EmptyTitle>
                        <EmptyDescription>
                            The verification link has expired. Please enter your email below to receive a new verification link.
                        </EmptyDescription>
                        <EmptyContent className="w-full max-w-md space-y-4">
                            <InputGroup className="py-3">
                                <InputGroupAddon>
                                    <Mail className="h-5 w-5" />
                                </InputGroupAddon>
                                <InputGroupInput
                                    type="email"
                                    {...register("email")}
                                    placeholder="name@company.com"
                                    value={resendEmail_input}
                                    onChange={(e) => setResendEmailInput(e.target.value)}
                                    disabled={isResending}
                                />
                            </InputGroup>
                            {errors.email && <p className="text-sm bg-red-500">{errors.email.message}</p>}
                            <Button 
                                variant="default" 
                                className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/80 text-white"
                                onClick={handleSubmit(handleResendEmail)}
                                disabled={isResending}
                            >
                                {isResending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Resend verification email
                                        <ArrowUpRightIcon className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </EmptyContent>
                    </EmptyHeader>
                </Empty>
            </div>
        );
    }

    // Error state
    if (status === "error") {
        return (
            <div className="flex h-screen items-center justify-center">
                <Toaster position="top-center" richColors />
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant="icon" className="h-40 w-40 bg-red-200 text-red-500">
                            <AlertCircle className="size-20" />
                        </EmptyMedia>
                        <EmptyTitle className="text-2xl">
                            Verification failed
                        </EmptyTitle>
                        <EmptyDescription>
                            {errorMessage || "The verification link is invalid or has expired. Please enter your email to receive a new verification link."}
                        </EmptyDescription>
                        <EmptyContent className="w-full max-w-md space-y-4">
                            <InputGroup className="py-3">
                                <InputGroupAddon>
                                    <Mail className="h-5 w-5" />
                                </InputGroupAddon>
                                <InputGroupInput
                                    type="email"
                                    {...register("email")}
                                    placeholder="name@company.com"
                                    value={resendEmail_input}
                                    onChange={(e) => setResendEmailInput(e.target.value)}
                                    disabled={isResending}
                                />
                            </InputGroup>
                            {errors.email && <p className="text-sm bg-red-500">{errors.email.message}</p>}
                            <Button 
                                variant="default" 
                                className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/80 text-white"
                                onClick={handleSubmit(handleResendEmail)}
                                disabled={isResending}
                            >
                                {isResending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Resend verification email
                                        <ArrowUpRightIcon className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </EmptyContent>
                    </EmptyHeader>
                </Empty>
            </div>
        );
    }

    // Default/Idle state (just registered)
    return (
        <div className="flex h-screen items-center justify-center">
            <Toaster position="top-center" richColors />
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon" className="h-40 w-40 bg-blue-200 text-blue-500">
                        <Mail className="size-20" />
                    </EmptyMedia>
                    <EmptyTitle className="text-2xl">
                        Check your email
                    </EmptyTitle>
                    <EmptyDescription>
                        We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
                    </EmptyDescription>
                    <EmptyContent>
                        <Button variant="link" className="text-slate-500">
                            <Link href="/auth/signin">Back to Sign In</Link>
                            <ArrowUpRightIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </EmptyContent>
                </EmptyHeader>
            </Empty>
        </div>
    );
}