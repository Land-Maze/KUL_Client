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

export default function SideMenubar() {
  const { isLoggedIn } = useShared();
  const { push } = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      push("/auth");
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      push("/auth");
    }
  }, [isLoggedIn]);

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
