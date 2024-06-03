'use client'
import { useRouter } from "next/navigation";
import Motion from '@/gui/framer/Motion'
import Link from "next/link";
import Avatar from "@/gui/flowbite/Avatar";

export default function Avatarimg({ href,src,alt }) {
    const router = useRouter()
    return (
        <Motion>
            <Link href={href}>
                <Avatar src={src} alt={alt}  />
            </Link>
        </Motion>
    )
}