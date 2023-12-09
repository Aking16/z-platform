"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import Avatar from "@/components/Avatar"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

import useCurrentUser from "@/hooks/useCurrentUser"
import usePost from "@/hooks/usePost"
import usePosts from "@/hooks/usePosts"

import { Loader2, Smile } from "lucide-react"
import toast from 'react-hot-toast'
import { useTheme } from "next-themes"

const FormSchema = z.object({
    post: z.string({
        required_error: "Please write your post!"
    })
})

interface PostFormProps {
    placeHolder: string;
    isComment?: boolean;
    postId?: string;
}

export function PostForm({ placeHolder, isComment, postId }: PostFormProps) {
    const [loading, setLoading] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

    const { theme } = useTheme();
    const { data: currentUser } = useCurrentUser();
    const { mutate: mutatePosts } = usePosts();
    const { mutate: mutatePost } = usePost(postId as string);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(values: z.infer<typeof FormSchema>) {
        setLoading(true);

        const url = isComment ? `/api/comments?postId=${postId}` : '/api/posts'

        axios.post(url, values).then(() => {
            toast.success("Post Created!", { style: { color: "#fff", background: "#000" } });
            mutatePosts();
            mutatePost();
        }).catch(() => {
            toast.error("We couldn't create your post!", { style: { color: "#fff", background: "#000" } });
        }).finally(() => setLoading(false));
    }

    const handleEmojiSelect = (emoji: any, text: string) => {
        const emojiNative = emoji.native;
        const newSelectedEmoji = (selectedEmoji || '') + emojiNative;

        setSelectedEmoji(newSelectedEmoji);
        form.setValue('post', newSelectedEmoji);
    };

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
                                            {...field}
                                            placeholder={placeHolder}
                                            onChange={(e) => {
                                                field.onChange(e.target.value);
                                                setSelectedEmoji(e.target.value);
                                            }}
                                            value={selectedEmoji || ''}
                                            className="resize-none text-lg"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage className="ms-16" />
                            </FormItem>
                        )}
                    />
                    <hr className="ms-20 me-5 mb-4" />
                    <div className="flex justify-between items-center ms-20 me-6 ">
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Smile className="text-secondary" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <Picker data={data} onEmojiSelect={handleEmojiSelect} theme={theme}/>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button type="submit" size="sm" className="px-4" disabled={loading}>Post</Button>
                    </div>
                </form>
            }
        </Form>
    )
}
