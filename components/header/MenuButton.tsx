'use client'
import { SessionType, useSession, useProfile, useLogout, } from "@lens-protocol/react-web";
import { useAccount, useDisconnect } from "wagmi";
import { config } from "@/config/Wagmi";
import { useRouter } from "next/navigation";
import ThemeSwap from "../ThemeSwap";
import { RiMenu3Fill, RiSettingsLine, RiWallet2Line, RiNewsLine, RiTranslate, RiInformation2Line, RiLogoutBoxRLine, RiThumbUpLine, RiBardFill, RiServiceLine, RiQuestionLine, RiSunLine, RiMoonClearLine, RiGiftLine } from "react-icons/ri";
import Link from "next/link";
import { useTheme } from "next-themes";
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
    const { isConnected, isDisconnected, address } = useAccount({ config });

    const { disconnect } = useDisconnect({ config });
    const { execute } = useLogout();

    const logout = () => {
        void execute();
        disconnect();
    };

    const { data } = useSession();




    return (
        <>
            {!data || data.type !== SessionType.WithProfile && <>
                <button className="btn btn-outline btn-sm md:btn-md text-lg text-base-content md:text-xl mx-1" onClick={() => router.push(`/signup`)}>注册</button>
                <button className="btn btn-outline btn-sm md:btn-md text-lg text-base-content md:text-xl mx-1" onClick={() => router.push(`/login`)} >登入</button></>}

            {/*            {!data?.authenticated && isDisconnected && address && <>
                <button className="btn btn-outline btn-sm md:btn-md text-lg text-base-content md:text-xl mx-1" onClick={() => router.push(`/login`)} >未签名</button></>} */}

            {data && data.type === SessionType.WithProfile && (
                <Link className="avatar online" replace href={`/login`}>
                    <div className="w-12 rounded-full">
                        <img
                            src="/rlogo.png" // 使用默认的占位符图片
                            alt="optimized on"
                        />
                    </div>
                </Link>
            )}

            <div className="dropdown dropdown-bottom dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-square  btn-ghost mx-1"><RiMenu3Fill size={24} /></div>


                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 border">
                    {data && data.type === SessionType.WithProfile &&
                        <b>
                            <li><Link href={`/wallet`}><RiWallet2Line size={24} />钱包</Link></li>
                            <li><Link href={`/settings`}><RiSettingsLine size={24} />设置</Link></li>
                            <li onClick={() => logout()}><Link replace href={`/login`}> <RiLogoutBoxRLine size={24} />注销</Link></li>
                            <li className="my-1"></li>
                        </b>
                    }


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
                    <li><Link href={`/fqa`}> <RiQuestionLine size={24} />常见问题</Link></li>
                    <li><Link href={`/about`}> <RiInformation2Line size={24} />关于应用</Link></li>


                </ul>
            </div>
        </>
    );
}
/* function ImgProfileSession() {
    const { data } = useSession<ProfileSession>();

    return (
        <div>
            {data && data.type === SessionType.WithProfile && (
                <Link className="avatar online" replace href={`/login`}>



                </Link>
            )}


        </div>
    )
} */