"use client"

import { useSession } from "next-auth/react";

export const getTokenFromSession = () => {

  const { data : session} = useSession()
  let token  = ""
  if(session && session.user ) {
    token = (session.user as { token?: string }).token || "";
  }
  return token
}