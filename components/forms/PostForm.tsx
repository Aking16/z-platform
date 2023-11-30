"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form"
import useCurrentUser from "@/hooks/useCurrentUser"
import axios from "axios"
import { Loader2, Smile } from "lucide-react"
import toast from 'react-hot-toast'
import Avatar from "../avatar"
import { Textarea } from "../ui/textarea"
import usePosts from "@/hooks/usePosts"

const FormSchema = z.object({
    post: z.string({
        required_error: "Please write your post!"
    })
})

export function PostForm() {
    const { data: currentUser } = useCurrentUser();
    const [loading, setLoading] = useState(false);
    const { mutate: mutatePosts } = usePosts();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(values: z.infer<typeof FormSchema>) {
        setLoading(true);

        axios.post('/api/posts', values).then(() => {
            toast.success("Post Created!", { style: { color: "#fff", background: "#000" } });
            mutatePosts();
        }).catch(() => {
            toast.error("We couldn't create your post!", { style: { color: "#fff", background: "#000" } });
        }).finally(() => setLoading(false));


    }
    return (
        <Form {...form}>
            {loading ?
                <div className="flex justify-center items-center h-[9.5rem]">
                    <Loader2 className="animate-spin me-2 text-secondary" />
                    loading
                </div>
                :
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="post"
                        render={({ field }) => (
                            <FormItem className="px-4 mt-5">
                                <FormControl>
                                    <div className="flex gap-x-2">
                                        <div>
                                            <Avatar userId={currentUser?.id} />
                                        </div>
                                        <Textarea
                                            placeholder="What's happening?!"
                                            className="resize-none text-lg"
                                            {...field}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage className="ms-16" />
                            </FormItem>
                        )}
                    />
                    <hr className="ms-20 me-5 mb-4" />
                    <div className="flex justify-between items-center ms-20 me-6">
                        <Smile className="text-secondary" />
                        <Button type="submit" size="sm" className="px-4" disabled={loading}>Post</Button>
                    </div>
                </form>
            }
        </Form>
    )
}
