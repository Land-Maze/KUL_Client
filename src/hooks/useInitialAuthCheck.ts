"use client";
import { useEffect } from "react";
import { useShared } from "@/context/SharedContext";
import useAPI from "@/hooks/useAPI";

import { useRouter } from "next/navigation";

const useInitialAuthCheck = () => {
  const { setIsLoggedIn, setAuthLoaded } = useShared();
  const { data, error, callAPI } = useAPI();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
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
        setAuthLoaded(true);
        setIsLoggedIn(false);
        if (error.error === "Session expired") {
          router.push("/auth");
        }
      } else if (data.status === "ok") {
        setAuthLoaded(true);
        setIsLoggedIn(true);
      }
    }
  }, [data, error, setIsLoggedIn]);
};

export default useInitialAuthCheck;
