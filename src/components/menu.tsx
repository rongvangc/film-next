"use client";

import { auth } from "@/config";
import { fallbackDisplayname } from "@/lib/utils";
import useAppStore from "@/stores/app";
import useUserStore, { UserType } from "@/stores/user";
import { onAuthStateChanged } from "firebase/auth";
import { Columns, LogOut, Popcorn } from "lucide-react";
import Link from "next/link";
import { useEffect, useLayoutEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { checkPublicPath } from "@/lib/common";

export function Menu() {
  const { setShowMobileDraw } = useAppStore();
  const { user, setUser, handleSignOut } = useUserStore();
  const { push } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user as UserType);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  useLayoutEffect(() => {
    if (user && checkPublicPath(pathname)) {
      push("/");
    }
  }, [pathname, push, user]);

  return (
    <div className="rounded-none flex justify-between border-b border-none px-2 lg:px-4 relative">
      <div className="flex items-center gap-2 cursor-pointer md:justify-start justify-center">
        <i
          className="md:hidden absolute left-4"
          onClick={() => setShowMobileDraw(true)}
        >
          <Columns />
        </i>
        <Link href="/discover/movie">
          <div className="hidden md:flex items-center gap-2 cursor-pointer">
            <Popcorn className="text" />
            <p className="font-medium">Moviee</p>
          </div>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-sm font-bold">{user?.displayName}</p>
        <Avatar>
          <AvatarImage src={user?.photoURL ?? ""} alt="Image" />
          <AvatarFallback>
            {fallbackDisplayname(user?.displayName ?? "")}
          </AvatarFallback>
        </Avatar>

        <Button variant="ghost" size="icon" onClick={handleSignOut}>
          <LogOut size={16} />
        </Button>
      </div>
    </div>
  );
}
