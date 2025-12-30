"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1 className="yext-3xl">
        Hi there
      </h1>
      <Button onClick={() => {signOut()}} className="text-red-500">singOut</Button>
    </div>
  );
}
