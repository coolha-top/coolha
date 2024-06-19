'use client'

import { timeAgo } from "@/utils/formatDate"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { RiCheckboxCircleFill } from "react-icons/ri"

export default function AvatarName({ localName, displayName, namespace, createdAt }) {
    const router = useRouter()
    return (
        <>
            <div className="sm:ml-3 ml-4">

                <Link href={`/${localName}`} className="hover:underline hover:caret-primary hover:text-info">
                    <b className="flex flex-row items-center">{displayName ? displayName : ''}<RiCheckboxCircleFill className=" size-4 ml-1 text-primary bg-black rounded-full" /></b>

                </Link>

                <Link href={`/${localName}`} >
                    <p className=" text-[#878787] hover:underline" >{localName}.{namespace}</p>
                </Link>


            </div>

            <span className='text-base-content/50 mx-1 hover:underline text-sm'>{timeAgo(createdAt)}</span>
        </>
    )
}