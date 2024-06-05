'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AvatarName({ localName, displayName, namespace }) {
    const router = useRouter()
    return (
        <>
            <div className="sm:ml-3 ml-4">

                <Link href={`/${localName}`} className="hover:underline hover:caret-primary hover:text-info">
                    <b >{displayName}</b>
                </Link>

                <Link href={`/${localName}`} >
                    <p className=" text-[#878787] " >{localName}.{namespace}</p>
                </Link>


            </div>

        </>
    )
}