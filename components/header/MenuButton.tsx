'use client'
import { SessionType, useSession, useProfile, useLogout, useBookmarks, } from "@lens-protocol/react-web";
import { useAccount, useDisconnect } from "wagmi";
import { config } from "@/config/Wagmi";
import { useRouter } from "next/navigation";
import { RiSettingsLine, RiTranslate, RiInformation2Line, RiServiceLine, RiQuestionLine, RiSunLine, RiMoonClearLine, RiGiftLine, RiAccountCircleFill, RiMenuFill, RiFileTextLine, RiShieldUserLine } from "react-icons/ri";
import Link from "next/link";
import { useTheme } from "next-themes";
import Cover04Text from '@/public/lens/Cover04-Text.png'
import Image from "next/image";
import { WelcomeToLens } from "../lnes/Login/WelcomeToLens";
import { PiDotsNine, PiDotsNineBold } from "react-icons/pi";
import { CgMenuGridO, CgMenuGridR } from "react-icons/cg";
import { useState } from "react";
export function MenuButton() {
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const { data: session, loading } = useSession();
    // 添加一个状态来控制模态框的显示和隐藏
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };
    return (
        <>
            <dialog className="modal">
                <div className="modal-box p-0 border">

                    <form method="dialog">
                        <button className="btn btn-circle btn-sm btn-primary absolute right-2 top-2 text-lg" onClick={toggleModal}>✕</button>
                    </form>

                    <figure>
                        <Image
                            src={Cover04Text}
                            alt="Cover04-Text.png"
                            sizes="100%"
                            style={{
                                width: '100%',
                                height: 'auto',
                            }} />
                    </figure>
                    <div className="card-body border-opacity-50">
                        <WelcomeToLens />
                        <div className="divider">没有Lens账户?</div>
                        <Link href={'/signup'} className="btn btn-primary">前往注册</Link>
                    </div>

                </div>

                <form method="dialog" className="modal-backdrop">
                    <button onClick={toggleModal}>close</button>
                </form>
            </dialog>
            {/* 未登入显示 */}
            {!session || session.type !== SessionType.WithProfile && <>
                <button
                    className="btn btn-primary text-black  text-lg  md:text-xl mx-1"
                    onClick={toggleModal}>
                    登录
                </button>


            </>}



            {/* 登入成功显示 */}
            {session && session.type === SessionType.WithProfile && session.profile?.metadata?.picture &&
                <>
                    <button
                        className="avatar online"
                        onClick={toggleModal}>
                        {session.profile?.metadata?.picture ? (
                            <div className="w-12 rounded-full">
                                {session.profile.metadata.picture.__typename === 'ImageSet' && (
                                    <img
                                        src={session.profile.metadata.picture.optimized?.uri}
                                        alt="picture Set"
                                    />
                                )}
                                {session.profile.metadata.picture.__typename === 'NftImage' && (
                                    <img
                                        src={session.profile.metadata.picture.image.optimized?.uri}
                                        alt="picture NFT"
                                    />
                                )}

                            </div>
                        ) : (
                            <><RiAccountCircleFill className=" size-12 rounded-full border border-base-content" /></>
                        )}
                    </button>


                </>
            }

            {showModal &&
                <div className=" w-full h-full fixed inset-0 flex justify-center items-center  z-auto   transition-opacity duration-300 ease-in-out  ">
                    <div className=" w-96 rounded-2xl max-w-md  scale-95  transition-transform duration-300 ease-in-out transform   bg-black     z-auto border ">
                        <button className="btn btn-circle btn-sm btn-primary text-lg  ml-96" onClick={toggleModal}>✕</button>
                        <figure>
                            <Image
                                src={Cover04Text}
                                alt="Cover04-Text.png"
                                sizes="100%"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                }} />
                        </figure>
                        <div className="card-body border-opacity-50">
                            <WelcomeToLens />
                            <div className="divider">没有Lens账户?</div>
                            <Link href={'/signup'} className="btn btn-primary">前往注册</Link>
                        </div>
                    </div>
                    <form  onClick={toggleModal}>
                        <button>close</button>
                    </form>
                </div>
            }


            {/* 菜单按钮 */}
            <div className="dropdown dropdown-bottom dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-circle btn-outline mx-1 "><CgMenuGridO className="size-8" /></div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 border text-lg">
                    <li><Link href={`/settings`}><RiSettingsLine size={24} />应用设置</Link></li>
                    <li><a onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                        {theme === 'dark' ?
                            (<RiSunLine size={24} />)
                            : (<RiMoonClearLine size={24} />)}
                        <span>切换主题</span></a>
                    </li>
                    <li><Link href={`/settings/locales`}><RiTranslate size={24} />界面语言</Link></li>
                    <li className="my-1"></li>
                    <li><Link href={`/mintNFT`}> <RiGiftLine size={24} />测试奖励</Link></li>
                    <li><Link href={`/sponsor`}> <RiServiceLine size={24} />赞助合作</Link></li>
                    <li className="my-1"></li>
                    <li><Link href={`/fqa`}> <RiQuestionLine size={24} />常见问题</Link></li>
                    <li><Link href={`/privacy`}> <RiShieldUserLine size={24} />隐私政策</Link></li>
                    <li><Link href={`/terms`}> <RiFileTextLine size={24} />条款规则</Link></li>
                    <li><Link href={`/about`}> <RiInformation2Line size={24} />关于应用</Link></li>
                </ul>
            </div>
        </>
    );
}
