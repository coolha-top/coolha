'use client'

import { timeAgo } from "@/utils/formatDate"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { RiCheckboxCircleFill, RiVerifiedBadgeFill } from "react-icons/ri"

export default function AvatarName({ localName, displayName, namespace, createdAt }) {
    const router = useRouter()
    return (
        <>
            <div className="ml-3">

                <Link href={`/${localName}`} className="hover:underline hover:caret-primary hover:text-info flex flex-row items-center">
                    <b className=" flex items-center overflow-hidden text-ellipsis whitespace-nowrap">{displayName ? displayName : ''}</b>
                    <RiVerifiedBadgeFill  className=" size-4 ml-1 text-primary bg-secondary rounded-full" />
                </Link>

                <span className='text-base-content/50 hover:underline text-sm'>{timeAgo(createdAt)}</span>

{/*                 <Link href={`/${localName}`} >
                    <p className=" text-[#878787] hover:underline" >{localName}.{namespace}</p>
                </Link> */}


            </div>

            
        </>
    )
}