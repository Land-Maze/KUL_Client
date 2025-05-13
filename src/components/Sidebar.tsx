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
              <SidebarGroupLabel>Navigatonal Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem
                    onClick={() => {
                      push("/schedule");
                    }}
                  >
                    <SidebarMenuButton className="cursor-pointer">Schedule</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem
                    onClick={() => {
                      push("/grades");
                    }}
                  >
                    <SidebarMenuButton className="cursor-pointer">Grades</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem
                    onClick={() => {
                      push("/courses");
                    }}
                  >
                    <SidebarMenuButton className="cursor-pointer">Cources</SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      )}
    </>
  );
}
