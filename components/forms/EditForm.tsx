"use client"

import { zodResolver } from "@hookform/resolvers/zod"
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
import useUser from "@/hooks/useUser"
import axios from "axios"
import { Loader2 } from "lucide-react"
import toast from 'react-hot-toast'
import { Textarea } from "@/components/ui/textarea"

const FormSchema = z.object({
    name: z.string({
        required_error: "Please enter your name!"
    }).min(2, {
        message: "name must be at least 2 characters."
    }),
    username: z.string({
        required_error: "Please enter your username!"
    }).min(6, {
        message: "Username must be at least 6 characters.",
    }),
    bio: z.string({
        required_error: "Please enter your bio!"
    })
})

export function EditForm({ userId }: { userId: string }) {
    const { data: fetchedUser, mutate: mutateUser } = useUser(userId);
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(values: z.infer<typeof FormSchema>) {
        setLoading(true);

        axios.patch('/api/edit', values).then(() => {
            toast.success("Account Edited!", { style: { color: "#fff", background: "#000" } });
            mutateUser();
        }).catch(() => {
            toast.error("We couldn't edit your account!", { style: { color: "#fff", background: "#000" } });
        }).finally(() => setLoading(false));


    }
    return (
        <Form {...form}>
            {loading ?
                <div className="flex justify-center items-center h-[24rem]">
                    <Loader2 className="animate-spin me-2 text-secondary" />
                    loading
                </div>
                :
                <form onSubmit={form.handleSubmit(onSubmit)} className="md:px-[5rem]">
                    <h2 className="text-3xl font-bold mt-2">
                        Edit your profile!
                    </h2>

                    <FormField
                        control={form.control}
                        name="name"
                        defaultValue={fetchedUser.name}
                        render={({ field }) => (
                            <FormItem className="mt-5">
                                <FormLabel className="text-slate-400">Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Name" {...field} className="bg-primary border rounded-sm py-7 focus:border-secondary focus-visible:ring-0" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        defaultValue={fetchedUser.username}
                        render={({ field }) => (
                            <FormItem className="mt-5">
                                <FormLabel className="text-slate-400">Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Username" {...field} className="bg-primary border rounded-sm py-7 focus:border-secondary focus-visible:ring-0" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="bio"
                        defaultValue={fetchedUser.bio}
                        render={({ field }) => (
                            <FormItem className="mt-5">
                                <FormLabel className="text-slate-400">Bio</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Bio" {...field} className="bg-primary border rounded-sm focus:border-secondary focus-visible:ring-0" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="mt-10 w-full" disabled={loading}>Next</Button>
                </form>
            }
        </Form>
    )
}
