"use client";
import { signOut } from "next-auth/react";

export default function LoginBtn() {
  return (
    <button
      onClick={() => {
        signOut();
      }}
    >
      logout
    </button>
  );
}
