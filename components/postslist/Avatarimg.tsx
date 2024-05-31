'use client'
import { useRouter } from "next/navigation";
import Motion from '@/gui/Motion'
import Link from "next/link";
import Avatar from "@/gui/flowbite/Avatar";

export default function Avatarimg({ dataname }) {
    const router = useRouter()
    return (
        <Motion>
            <Link href={`/${dataname.by.handle.localName}.lens`}>
                <Avatar src={dataname.by?.metadata?.picture?.optimized?.uri} alt={dataname.by.handle.localName} /* onClick={() => router.push(`/${dataname.by.handle.localName}.lens`)}  */ />
            </Link>
        </Motion>
    )
}