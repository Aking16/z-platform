"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import toast from 'react-hot-toast'

const FormSchema = z.object({
    email: z.string({
        required_error: "Please enter your email!"
    }).email(),
    password: z.string({
        required_error: "Please enter your password!"
    }).min(6, {
        message: "Password must be at least 6 characters.",
    }),
})

export function LoginForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(values: z.infer<typeof FormSchema>) {
        setLoading(true);

        signIn('credentials', { ...values, redirect: false }).then((res) => {
            if (res?.error) {
                toast.error("We couldn't log you in!", { style: { color: "#fff", background: "#000" } });
                setLoading(false);
            }

            if (res?.ok && !res?.error) {
                toast.success("Logged In!", { style: { color: "#fff", background: "#000" } });
                router.push("/home");
                setLoading(false);
            }
        })
    }
    return (
        <Form {...form}>
            {loading ?
                <div className="flex justify-center items-center h-[24.5rem]">
                    <Loader2 className="animate-spin me-2 text-secondary" />
                    loading
                </div>
                :
                <form onSubmit={form.handleSubmit(onSubmit)} className="px-[5rem]">
                    <h2 className="text-3xl font-bold mt-2">
                        Sign in to X
                    </h2>

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="mt-5">
                                <FormLabel className="text-slate-400">Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" {...field} className="bg-primary border rounded-sm py-7 focus:border-secondary focus-visible:ring-0" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="mt-5">
                                <FormLabel className="text-slate-400">Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Password" type="password" {...field} className="bg-primary border rounded-sm py-7 focus:border-secondary focus-visible:ring-0" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="mt-20 w-full" disabled={loading}>Next</Button>
                </form>
            }
        </Form>
    )
}
