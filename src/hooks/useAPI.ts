"use client";
import { useState, useEffect, useCallback, RefObject } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { useShared } from "@/context/SharedContext";

import { toast } from "sonner";
// optional reference to a toast ID
const useAPI = (toastIdRef: RefObject<string | number> | undefined = undefined) => {
  const [url, setUrl] = useState<string | null>(null);
  const [options, setOptions] = useState<RequestInit | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any>();
  const [trigger, setTrigger] = useState(false);
  const { setIsLoggedIn } = useShared();
  const router = useRouter();

  const callAPI = useCallback((url: string, options: RequestInit = {}) => {
    setUrl(url);
    setOptions(options);
    setTrigger(true);
  }, []);

  useEffect(() => {
    if (!trigger || !url || !options) return;

    const fetchData = async () => {
      const response = await fetch(url, {
        ...options,
        credentials: "same-origin",
      });

      let responseData;
      try {
        responseData = await response.json();
      } catch (error) {
        responseData = { error: "Failed to parse response" };
      }
      if (response.ok) {
        setData(responseData);
      } else {
        console.log(responseData)
        const result = responseData
        if (result.error === "Session expired" && !url.includes("/auth")) {
          toast.error("Session expired. Please log in again.", toastIdRef && {
            id: toastIdRef.current,
          });
          Cookies.remove("s4el");
          setIsLoggedIn(false);
          router.push("/auth");
        } else {
          toast.error(result.error || "An error occurred", toastIdRef && {
            id: toastIdRef.current,
          });
          setError(result.error || "Unknown error");
        }
      }
    };

    fetchData();
  }, [url, options, router, setIsLoggedIn, trigger, toastIdRef]);

  return { data, error, callAPI };
};

export default useAPI;
