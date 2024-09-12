'use client'
import { SessionType, useSession, useProfile, useLogout, useBookmarks, } from "@lens-protocol/react-web";
import { useAccount, useDisconnect } from "wagmi";
import { config } from "@/config/Wagmi";
import { useRouter } from "next/navigation";
import ThemeSwap from "./ThemeSwap";
import { RiMenu3Fill, RiSettingsLine, RiWallet2Line, RiNewsLine, RiTranslate, RiInformation2Line, RiLogoutBoxRLine, RiThumbUpLine, RiBardFill, RiServiceLine, RiQuestionLine, RiSunLine, RiMoonClearLine, RiGiftLine, RiAccountCircleFill, RiGridFill, RiMenuFill, RiFileTextLine, RiShieldUserLine } from "react-icons/ri";
import Link from "next/link";
import { useTheme } from "next-themes";
import { truncateEthAddress } from "@/utils/truncateEthAddress";
type ProfileSession = {
    address: string;  // Assuming EvmAddress is a string type alias
    authenticated: true;
    profile: {
        id: string;
        handle: string;
        metadata: {
            picture?: {
                optimized?: {
                    uri: string;
                };
                uri: string;
                __typename: string;
            };
        };
    };
    type: 'WithProfile';
};
export function MenuButton() {
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const { data } = useSession();
    const { address } = useAccount({ config });
    const { data: bookmarks, loading, error } = useBookmarks();
    return (
        <>
            {/*             {data && data.type === SessionType.JustWallet && <>
                <button className='btn btn-outline'>{truncateEthAddress(address)}</button>
            </>} */}

            {!data || data.type !== SessionType.WithProfile && <>


                <button className="btn btn-primary text-black btn-sm md:btn-md text-lg  md:text-xl mx-1" onClick={() => router.push(`/login`)} >登录</button>
            </>}


            {/*            {!data?.authenticated && isDisconnected && address && <>
                <button className="btn btn-outline btn-sm md:btn-md text-lg text-base-content md:text-xl mx-1" onClick={() => router.push(`/login`)} >未签名</button></>} */}


            {/*                     {data && data.type === SessionType.WithProfile ? (
                        <img
                            src={data.profile?.metadata?.coverPicture?.raw?.uri}
                            alt=""
                        />
                    ) : (
                        < img
                            src="/rlogo.png" // 使用默认的占位符图片
                            alt="optimized on"
                        />
                    )} */}

            {data && data.type === SessionType.WithProfile && data.profile?.metadata?.picture &&
                <>
                    <Link className="avatar online" replace href={`/login`}>
                        {data.profile?.metadata?.picture ? (
                            <div className="w-12 rounded-full">
                                {data.profile.metadata.picture.__typename === 'ImageSet' && (
                                    <img
                                        src={data.profile.metadata.picture.optimized?.uri}
                                        alt="picture Set"
                                    />
                                )}
                                {data.profile.metadata.picture.__typename === 'NftImage' && (
                                    <img
                                        src={data.profile.metadata.picture.image.optimized?.uri}
                                        alt="picture NFT"
                                    />
                                )}

                            </div>
                        ) : (
                            <><RiAccountCircleFill
                                className=" size-12 rounded-full border border-base-content"
                            /></>
                        )}
                    </Link>
                </>
            }


            <div className="dropdown dropdown-bottom dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-circle  mx-1 border"><RiMenuFill className="size-8" /></div>


                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 border text-lg">
                    {/*                     {data && data.type === SessionType.WithProfile &&
                        <>
                            <li><Link href={`/wallet`}><RiWallet2Line size={24} />钱包</Link></li>
                            <li className="my-1"></li>
                        </>
                    } */}
                    <li><Link href={`/settings`}><RiSettingsLine size={24} />应用设置</Link></li>
                    <li><a onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                        {theme === 'dark' ?
                            (<RiSunLine size={24} />)
                            : (<RiMoonClearLine size={24} />)}
                        <span>切换主题</span></a>
                    </li>
                    <li><Link href={`/locales`}><RiTranslate size={24} />界面语言</Link></li>
                    <li className="my-1"></li>
                    <li><Link href={`/mintNFT`}> <RiGiftLine size={24} />测试奖励</Link></li>
                    <li><Link href={`/sponsor`}> <RiServiceLine size={24} />赞助合作</Link></li>
                    <li className="my-1"></li>
                    <li><Link href={`/fqa`}> <RiQuestionLine size={24} />常见问题</Link></li>
                    <li><Link href={`/privacy`}> <RiShieldUserLine  size={24} />隐私政策</Link></li>
                    <li><Link href={`/terms`}> <RiFileTextLine size={24} />条款规则</Link></li>
                    <li><Link href={`/about_app`}> <RiInformation2Line size={24} />关于应用</Link></li>


                </ul>
            </div>
        </>
    );
}
