"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
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
import Hero from "../Hero"

const FormSchema = z.object({
    coverImage: z.any()
})

export function CoverImageForm({ userId }: { userId: string }) {
    const { mutate: mutateUser } = useUser(userId);
    const [loading, setLoading] = useState(false);
    const [coverImage, setCoverImage] = useState<File>()
    const [preview, setPreview] = useState<string>()

    useEffect(() => {
        if (!coverImage) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(coverImage)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [coverImage])

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(values: z.infer<typeof FormSchema>) {
        const data = new FormData()
        if (coverImage) {
            data.set('coverImage', coverImage)
        }

        setLoading(true);

        axios.patch('/api/edit/coverImage', data, { headers: { "Content-Type": "multipart/form-data" } }).then(() => {
            toast.success("Account Edited!", { style: { color: "#fff", background: "#000" } });
            mutateUser();
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
                <form onSubmit={form.handleSubmit(onSubmit)} className="md:px-[5rem]">
                    <h2 className="text-3xl font-bold mt-2">
                        Edit your profile!
                    </h2>

                    <FormField
                        control={form.control}
                        name="coverImage"
                        render={({ field }) => (
                            <FormItem className="mt-5">
                                <FormLabel className="text-slate-400">Cover Image</FormLabel>
                                <FormControl>
                                    <Input type="file" {...field} className="bg-primary border rounded-sm focus:border-secondary focus-visible:ring-0" onChange={(e) => setCoverImage(e.target.files?.[0])} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="w-full h-[10rem] flex justify-center items-center mt-5">
                        {coverImage ?
                            <Hero userId={userId} src={preview!} />
                            :
                            <Hero userId={userId} />
                        }
                    </div>

                    <Button type="submit" className="mt-10 w-full" disabled={loading}>Next</Button>
                </form>
            }
        </Form>
    )
}
