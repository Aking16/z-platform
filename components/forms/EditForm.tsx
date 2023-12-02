"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import toast from 'react-hot-toast';
import { Loader2 } from "lucide-react"
import axios from "axios"
import ImageUpload from "../ImageUpload"

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
    }),
    profileImage: z.any()
})

export function EditForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File>()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(values: z.infer<typeof FormSchema>) {
        const data = new FormData()
        if (file) {
            data.append('name', values.name)
            data.append('username', values.username)
            data.append('bio', values.bio)
            data.append('file', file)
            console.log(file)
        }

        setLoading(true);

        axios.patch('/api/edit', data, { headers: { "Content-Type": "multipart/form-data" } }).then(() => {
            toast.success("Account Edited!", { style: { color: "#fff", background: "#000" } });
        }).catch(() => {
            toast.error("We couldn't edit your account!", { style: { color: "#fff", background: "#000" } });
        }).finally(() => setLoading(false));


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
                        Edit your profile!
                    </h2>

                    <FormField
                        control={form.control}
                        name="name"
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
                        render={({ field }) => (
                            <FormItem className="mt-5">
                                <FormLabel className="text-slate-400">Bio</FormLabel>
                                <FormControl>
                                    <Input placeholder="Bio" {...field} className="bg-primary border rounded-sm py-7 focus:border-secondary focus-visible:ring-0" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="profileImage"
                        render={({ field }) => (
                            <FormItem className="mt-5">
                                <FormLabel className="text-slate-400">Profile Image</FormLabel>
                                <FormControl>
                                    <Input type="file" {...field} className="bg-primary border rounded-sm focus:border-secondary focus-visible:ring-0" onChange={(e) => setFile(e.target.files?.[0])} />
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
