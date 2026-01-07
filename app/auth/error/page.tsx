import { ArrowUpRightIcon, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import Link from "next/link";


const errorMap: Record<string, string> = {
  CredentialsSignin: "Invalid email or password.",
  OAuthSignin: "Could not sign in with the provider.",
  OAuthCallback: "Authentication callback failed.",
  AccessDenied: "You do not have permission to sign in.",
  Verification: "Email verification failed or expired.",
  Configuration: "Server configuration error.",
};


export default async function ErrorPage({ searchParams }: { searchParams: Promise<{ error: string }> }) {
  const error = (await searchParams).error;
  const message = errorMap[error] || "Something went wrong.";
  return (
    <div className="flex min-h-screen w-full">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon" className="h-20 w-20 bg-red-200">
            <Lock className="size-12 text-red-500"/>
          </EmptyMedia>
          <EmptyTitle>Invalid credentials</EmptyTitle>
          <EmptyDescription>
            {message}
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <Button>
              <Link href={"/signin"}>Sign In</Link>
            </Button>
            <Button variant="outline">
              <Link href={"/signup"}>Sign Up</Link>
            </Button>
          </div>
        </EmptyContent>
        <Button
          variant="link"
          asChild
          className="text-muted-foreground"
          size="sm"
        >
          <Link href={"/about"}>
            Go to Home <ArrowUpRightIcon />
          </Link>
        </Button>
      </Empty>
    </div>
  )
}
