'use client'
import { SessionType, useSession } from "@lens-protocol/react-web";
import { useRouter } from "next/navigation";
import { RiSettingsLine, RiInformation2Line, RiServiceLine, RiQuestionLine, RiSunLine, RiMoonClearLine, RiGiftLine, RiAccountCircleFill, RiFileTextLine, RiShieldUserLine } from "react-icons/ri";
import Link from "next/link";
import { useTheme } from "next-themes";
import Cover04Text from '@/public/lens/Cover04-Text.png'
import Image from "next/image";
import { WelcomeToLens } from "../lnes/Auth/WelcomeToLens";
import { CgMenuGridO } from "react-icons/cg";
import { useEffect, useState } from "react";
import { truncateEthAddress } from "@/utils/truncateEthAddress";
import { useAccount, useEnsName } from "wagmi";
import { config } from "@/config/Wagmi";
import { Avatar } from "connectkit";
export function MenuButton() {
    const { theme, setTheme } = useTheme();

    const { } = useEnsName()
    const { address } = useAccount({ config });
    const { data: session, loading } = useSession();



    // 添加一个状态来控制模态框的显示和隐藏
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };
    const handleOutsideClick = (event) => {
        if (event.target.classList.contains("bg-black") || event.target.classList.contains("bg-opacity-50")) {
            setShowModal(false);
        }
    };



    return (
        <>
            {/* 菜单按钮 */}
            <div className="dropdown dropdown-bottom dropdown-end mx-1">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle   "><CgMenuGridO className="size-8" /></div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 border text-lg">
                    <li><Link href={`/settings`}><RiSettingsLine size={24} />应用设置</Link></li>
                    <li><a onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                        {theme === 'dark' ?
                            (<RiSunLine size={24} />)
                            : (<RiMoonClearLine size={24} />)}
                        <span>切换主题</span></a>
                    </li>
                    {/*  <li><Link href={`/settings`}><RiTranslate size={24} />界面语言</Link></li> */}
                    <li className="my-1"></li>
                    <li><Link href={`cs@coolha.top`}> <RiServiceLine size={24} />赞助合作</Link></li>
                    <li className="my-1"></li>
                    <div className="">
                        <Link href={`/fqa`} className=" text-sm hover:link hover:link-primary"> 常见问题</Link>
                        <Link href={`/privacy`} className=" text-sm hover:link hover:link-primary"> 隐私政策</Link>
                        <Link href={`/terms`} className=" text-sm hover:link hover:link-primary"> 条款规则</Link>
                        <Link href={`/about`} className=" text-sm hover:link hover:link-primary"> 关于应用</Link>
                        <Link href={`https://github.com/coolha-top/coolha`} className=" text-sm hover:link hover:link-primary" target='_blank'> v0.1.1</Link>

                    </div>
                    {/*                     <li><Link href={`/fqa`}> <RiQuestionLine size={24} />常见问题</Link></li>
                    <li><Link href={`/privacy`}> <RiShieldUserLine size={24} />隐私政策</Link></li>
                    <li><Link href={`/terms`}> <RiFileTextLine size={24} />条款规则</Link></li>
                    <li><Link href={`/about`}> <RiInformation2Line size={24} />关于应用</Link></li>
                    <li><Link href={`https://github.com/callha/coolha`} target='_blank'>v0.1.1</Link></li> */}
                </ul>
            </div>

            {loading && <>
                <button
                    className="btn btn-primary text-black  text-xl mx-1"
                    onClick={toggleModal}>
                    <span className="loading loading-spinner"></span>
                </button>
            </>}

            {/* 未登入显示 */}
            {!session || session.type !== SessionType.WithProfile && <>
                {address ?
                    <button
                        className="btn btn-primary text-black text-xs md:text-base  mx-1"
                        onClick={toggleModal}>
                        {truncateEthAddress(address)}
                    </button>
                    :
                    <button onClick={toggleModal} type="button" className="bg-primary rounded-full py-1.5 px-3 text-black  text-xl  mx-1">
                        登录
                    </button>
                }
            </>}



            {/* 登入成功显示 */}
            {
                session && session.type === SessionType.WithProfile && session.profile?.metadata?.picture &&
                <>
                    <button
                        className="avatar "
                        onClick={toggleModal}>
                        {session.profile?.metadata?.picture ? (
                            <div className="w-12 rounded-full ">
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
                <div className=" w-full h-full fixed inset-0 flex justify-center items-center  z-50   transition-opacity duration-300 ease-in-out   bg-black bg-opacity-90" onClick={handleOutsideClick}>
                    <div className=" w-11/12 md:w-[450px] rounded-2xl max-w-md  scale-95  transition-transform duration-300 ease-in-out transform bg-base-100     z-auto border ">
                        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                            <button className="btn btn-circle btn-sm btn-primary text-lg" onClick={() => setShowModal(false)}>✕</button>
                        </div>
                        <figure>
                            <Image
                                src={Cover04Text}
                                alt="Cover04-Text.png"
                                sizes="100%"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                }}
                                className=" rounded-t-2xl"
                            />

                        </figure>
                        <div className="card-body border-opacity-50">
                            <WelcomeToLens />
                        </div>
                    </div>
                    {/*                     <form onClick={toggleModal}>
                        <button>close</button>
                    </form> */}
                </div>
            }



        </>
    );
}
