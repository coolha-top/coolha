'use client'

import { RiArrowLeftLine, RiMore2Fill } from "react-icons/ri";
import { WelcomeToLens } from "@/components/lnes/Login/WelcomeToLens";
import Cover04Text from '@/public/lens/Cover04-Text.png'
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
export default function page() {
    const router = useRouter();

    return (
        <div className="flex justify-center items-center mx-auto max-w-4xl ">

            <div className="card card-compact bg-base-100 shadow-xl sm:max-w-2xl my-4 h-dvh w-dvw ">

                <div className="navbar py-0 ">
                    <div className=" navbar-start">
                        <button className="btn btn-square btn-ghost" onClick={() => { router.back() }}/* onClick={() => router.back()} */>
                            <RiArrowLeftLine size={24} />
                        </button>
                    </div>
                    <div className=" navbar-center">登入界面</div>
                    <div className=" navbar-end">
                        <button className="btn btn-square btn-ghost">
                            <RiMore2Fill size={24} />
                        </button>
                    </div>
                </div>

                <figure>
                    <Image
                        src={Cover04Text}
                        alt="Cover04-Text.png"
                        sizes="100vw"
                        style={{
                            width: '100%',
                            height: 'auto',
                        }} />
                </figure>
                <div className="p-4">
                    {/*                     <h2 className="card-title">连接 Lens 登入界面</h2>
                    <p>Lens Protocol</p> */}
                </div>
                <div className="card-body border-opacity-50">
                    <WelcomeToLens />
                    <div className="divider">没有Lens账户</div>
                    <Link href={'/signup'} className="btn btn-primary">前往注册</Link>
                </div>

            </div>


        </div>
    )
}
