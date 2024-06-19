'use client'
import { useRouter } from "next/navigation";
import Motion from '@/gui/framer/Motion'
import Link from "next/link";

export default function Avatarimg({ href,src,alt }) {
    const router = useRouter()
    return (
        <Motion>
            <Link href={href}>
            <div className="py-[4px] ">
            <img className="w-10 h-10 rounded-full border border-base-content" src={src} alt={alt}/>
        </div>
            </Link>
        </Motion>
    )
}

