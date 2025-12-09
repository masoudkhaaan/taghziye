import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { DefaultUser } from "next-auth";

// -------------- next-auth --------------
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role: string;
  }
}

// -------------- next-auth/jwt --------------
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string | number;
    role: string;
  }
}
