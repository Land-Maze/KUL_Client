"use client";

// ----- MISC -----
import * as React from "react";
import { useRouter } from "next/navigation";

// ----- CONTEXT -----
import { useShared } from "@/context/SharedContext";

// ----- UI -----
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// ----- FORM IMPORTS -----

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { formSchema } from "@/schemas/login.schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";

export default function AuthPage() {
  const { push } = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useShared();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: "",
      password: "",
      expiringTillDay: true,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.promise(
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          login: values.login,
          password: values.password,
        }),
      }),
      {
        loading: "Logging in...",
        success: async (data) => {
          if (data.ok) {
            localStorage.setItem("session", (await data.json()).session);
            setIsLoggedIn(true);
            return "Logged in successfully";
          } else {
            throw new Error("Invalid credentials");
          }
        },
        error: (err) => {
          if (err instanceof Error) {
            return err.message;
          } else {
            return "An error occurred";
          }
        },
      }
    );
  }

  React.useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => {
        push("/schedule");
      }, 1000);
    }
  }, [isLoggedIn, push]);

  return (
    <main className="flex flex-col items-center justify-center p-24 h-full">
      <Card className="w-[400px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Enter your credentials to access your e.kul.pl account
                <br />
                <span className="text-sm text-red-900">
                  CREDENTIALS WILL NOT BE STORED. THEY WILL BE SENT THROUGH OUR
                  RELAY TO THE https://e.kul.pl !!!
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="login"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Login</FormLabel>
                        <FormControl>
                          <Input placeholder="landmaze" {...field} />
                        </FormControl>
                        <FormDescription>Enter your login</FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="********"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Enter your password</FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <FormField
                    control={form.control}
                    name="expiringTillDay"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Switch
                          className="cursor-pointer"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Session lasts day</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button className="cursor-pointer">Log In</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </main>
  );
}
