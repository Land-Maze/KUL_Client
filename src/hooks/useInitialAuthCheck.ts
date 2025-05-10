"use client";
import { useEffect } from "react";
import { useShared } from "@/context/SharedContext";
import useAPI from "@/hooks/useAPI";

import { useRouter } from "next/navigation";

const useInitialAuthCheck = () => {
  const { setIsLoggedIn } = useShared();
  const { data, error, callAPI } = useAPI();
  const router = useRouter();

  useEffect(() => {
    console.log("Checking authentication...");
    const checkAuth = async () => {
      try {
        console.log("Checking authentication...");
        await callAPI("/api/check-token", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    checkAuth();
  }, [callAPI, setIsLoggedIn]);

  useEffect(() => {
    if (data) {
      if (error) {
        setIsLoggedIn(false);
        if (error.error === "Session expired") {
          router.push("/auth");
        }
      } else if (data.status === "ok") {
        setIsLoggedIn(true);
      }
    }
  }, [data, error, setIsLoggedIn]);
};

export default useInitialAuthCheck;
