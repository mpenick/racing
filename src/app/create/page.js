'use client'

import {FilesInput} from "@/components/FilesInput";
import {useForm} from "react-hook-form";

export default function Page() {
    const methods = useForm()
    const onSubmit = data => console.log(data)
    return (
        <main>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <FilesInput
                    {...methods}
                    accept={{'image/*': ['.jpg', '.png']}}
                    name="files" multiple/>
                <input type="submit"/>
            </form>
        </main>
    )
}
