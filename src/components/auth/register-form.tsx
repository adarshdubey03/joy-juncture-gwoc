"use client";
import * as z from "zod";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { CardWrapper } from "@/components/auth/card-wrapper"
import { RegisterSchema } from "@/schemas"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormField, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { register } from "@/actions/register";
import { useState, useTransition } from "react";
export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      phoneNumber: "",
      password: "",
      name: ""
    }
  });



  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        if (data?.error) setError(data.error);
        if (data?.success) {
          setSuccess(data.success);
          if (data.redirect) {
            window.location.href = "/verify";
          }
        }
      });
    });
  }
  return (
    <CardWrapper headerLabel="Create an account"
      backButtonLabel="Already have an account ?"
      backButtonHref="/login"
      showSocial  >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4" >


            <FormField control={form.control} name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="name" type="Name" disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>

              )

              } />

            <FormField control={form.control} name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="email" type="email" disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>

              )

              } />

            <FormField control={form.control} name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    {/* 
                        We use a wrapper to style the phone input to match our theme if needed. 
                        For now, usage of the library component directly.
                        We need to handle the onChange explicitly because the library passes the value directly, not an event.
                     */}
                    <div className="flex">
                      <PhoneInput
                        defaultCountry="IN"
                        placeholder="Enter phone number"
                        value={field.value}
                        onChange={field.onChange}
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
              } />



            <FormField control={form.control} name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="password" type="password" disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>

              )

              } />



          </div>

          <FormError message={error}></FormError>
          <FormSuccess message={success} />

          <Button type="submit" className="w-full" disabled={isPending}>Register </Button>
        </form>

      </Form>
    </CardWrapper>
  );
};

