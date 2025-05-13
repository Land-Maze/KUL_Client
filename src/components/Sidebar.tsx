"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useShared } from "@/context/SharedContext";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import useInitialAuthCheck from "@/hooks/useInitialAuthCheck";

export default function SideMenubar() {
  const { isLoggedIn, authLoaded } = useShared();
  const { push } = useRouter();
  useInitialAuthCheck();

  useEffect(() => {
    if (!authLoaded) return;
    
    if (!isLoggedIn) {
      push("/auth");
    }
  }, [isLoggedIn, push]);

  return (
    <>
      {isLoggedIn && (
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Application</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu></SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      )}
    </>
  );
}
