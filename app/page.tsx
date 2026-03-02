"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions/signout";

export default function Home() {
  return (
    <div>
      <h1 className="yext-3xl">
        Hi there
      </h1>
      <Button onClick={async () => {
        await logout();
        console.log("User signed out")
      }} className="text-red-500">singOut</Button>
    </div>
  );
}
