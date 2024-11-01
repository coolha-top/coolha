'use client'

import { useRouter } from "next/navigation"
import { RiArrowLeftLine } from "react-icons/ri"


export default function layout({ children }) {
    const router = useRouter()
    return (
        <>
            <div className="navbar py-0 bg-base-100 border-b md:hidden">
                <div className=" navbar-start">
                    <button className="btn btn-square btn-ghost" onClick={() => router.back()}>
                        <RiArrowLeftLine size={24} />
                    </button>
                </div>
                <div className=" navbar-center">搜索</div>
                <div className=" navbar-end"></div>
            </div>
            
            {children}
        </>
    )
}