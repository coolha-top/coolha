'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AvatarName({ dataname }) {
    const router = useRouter()
    return (
        <>
            <div className="sm:ml-3 ml-4">

                <Link href={`/${dataname.by.handle.localName}.lens`} className="hover:underline hover:caret-primary hover:text-[#ea7411]">
                    <b >{dataname.by.metadata?.displayName}</b>
                </Link>

                <Link href={`/${dataname.by.handle.localName}.lens`} >
                    <p className=" text-[#878787] " >{dataname.by.handle.localName}.{dataname.by.handle.namespace}</p>
                </Link>


            </div>

        </>
    )
}