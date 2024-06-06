'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { RiCheckboxCircleFill } from "react-icons/ri"

export default function AvatarName({ localName, displayName, namespace }) {
    const router = useRouter()
    return (
        <>
            <div className="sm:ml-3 ml-4">

                <Link href={`/${localName}`} className="hover:underline hover:caret-primary hover:text-info">
                    <b className="flex flex-row items-center">{displayName}<RiCheckboxCircleFill className=" size-4 ml-1 text-primary bg-black rounded-full"/></b>
                </Link>

                <Link href={`/${localName}`} >
                    <p className=" text-[#878787] " >{localName}.{namespace}</p>
                </Link>


            </div>

        </>
    )
}