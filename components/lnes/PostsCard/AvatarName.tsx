'use client'

import { timeAgo } from "@/utils/formatDate"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { RiCheckboxCircleFill, RiVerifiedBadgeFill } from "react-icons/ri"

export default function AvatarName({ localName, displayName, namespace, id, createdAt }) {
    const router = useRouter()
    return (
        <>
            <div className="ml-3 ">

                <Link href={`/u/${localName ? localName : id.by.id}`} className="flex flex-row  items-center ">
                    <b className=" flex items-center overflow-hidden text-ellipsis whitespace-nowrap hover:underline hover:caret-primary hover:text-info ">{displayName ? displayName : ''}</b>
                    <span className=" ml-1 text-[#878787] hover:underline">@{localName ? localName : id.by.id}</span>
                    <RiVerifiedBadgeFill className=" size-4 ml-1 text-primary rounded-full" />
                </Link>

                <span className=' text-base-content/50  text-sm'>{timeAgo(createdAt)}</span>
                {id?.metadata?.appId ? <span className=' text-base-content/50  text-sm'>在{id?.metadata?.appId}发布</span> : ''}

                {/*                 <Link href={`/${localName}`} >
                    <p className=" text-[#878787] hover:underline" >{localName}.{namespace}</p>
                </Link> */}


            </div>

        </>
    )
}