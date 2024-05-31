'use client'
import { SessionType, useSession, useProfile, useLogout, } from "@lens-protocol/react-web";
import { useAccount, useDisconnect } from "wagmi";
import { config } from "@/config/Wagmi";
import { useRouter } from "next/navigation";
import ThemeSwap from "../ThemeSwap";
import { RiMenu3Fill, RiSettingsLine, RiWallet2Line, RiNewsLine, RiTranslate, RiInformation2Line, RiLogoutBoxRLine, RiThumbUpLine, RiBardFill, RiServiceLine, RiQuestionLine, RiSunLine, RiMoonClearLine } from "react-icons/ri";
import Link from "next/link";
import { useTheme } from "next-themes";


export function LoginButton() {
    const router = useRouter();
    const { isConnected, address } = useAccount({ config });
    const { data } = useSession();
    const { theme, setTheme } = useTheme();



    /*     if (!isConnected) {
            return (
                <>
                    <button className="btn" color="primary" onClick={() => router.push(`/sigup`)}>注册</button>
                    <button className="btn" color="primary" onClick={() => router.push(`/login`)} >登入</button>
                </>
            );
        }
    
    
        // step 3. show Profile details
        if (data && data.type === SessionType.WithProfile) {
    
            return (
                <>
                    <div className="dropdown dropdown-bottom dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-circle m-1 "><RiMenu3Fill size={24} /></div>
    
    
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 border">
    
    
                            {!isConnected && <>
                                <button className="btn" color="primary" onClick={() => router.push(`/sigup`)}>注册</button>
                                <button className="btn" color="primary" onClick={() => router.push(`/login`)} >登入</button></>}
    
                            {data && data.type === SessionType.WithProfile &&
                                <b>
                                    <li><Link href={`/wallet`}><RiWallet2Line size={24} />钱包</Link></li>
                                    <li><Link href={`/settings`}><RiSettingsLine size={24} />设置</Link></li>
                                    <li></li>
                                    <li><Link href={`/login`}> <RiLogoutBoxRLine size={24} />注销</Link></li>
                                </b>
                            }
    
    
                            <li></li>
                            <li><a onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                                {theme === 'dark' ?
                                    (<RiSunLine size={24} />)
                                    : (<RiMoonClearLine size={24} />)}
                                <span>切换主题</span></a>
                            </li>
                            <li><Link href={`/locales`}><RiTranslate size={24} />语言地区</Link></li>
    
                            <li></li>
                            <li><Link href={`/sponsor`}> <RiServiceLine size={24} />赞助合作</Link></li>
                            <li><Link href={`/fqa`}> <RiQuestionLine size={24} />常见问题</Link></li>
                            <li><Link href={`/about`}> <RiInformation2Line size={24} />关于应用</Link></li>
    
    
                        </ul>
                    </div>
                </>
            );
        } */

    return (
        <>
            {!isConnected && <>
                <button className="btn btn-square  btn-ghost" color="primary" onClick={() => router.push(`/sigup`)}>注册</button>
                <button className="btn btn-square  btn-ghost" color="primary" onClick={() => router.push(`/login`)} >登入</button></>}


            <div className="dropdown dropdown-bottom dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-square  btn-ghost"><RiMenu3Fill size={24} /></div>


                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 border">




                    {data && data.type === SessionType.WithProfile &&
                        <b>
                            <li><Link href={`/wallet`}><RiWallet2Line size={24} />钱包</Link></li>
                            <li><Link href={`/settings`}><RiSettingsLine size={24} />设置</Link></li>
                            <li><Link href={`/login`}> <RiLogoutBoxRLine size={24} />注销</Link></li>
                        </b>
                    }


                    <li></li>
                    <li><a onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                        {theme === 'dark' ?
                            (<RiSunLine size={24} />)
                            : (<RiMoonClearLine size={24} />)}
                        <span>切换主题</span></a>
                    </li>
                    <li><Link href={`/locales`}><RiTranslate size={24} />界面语言</Link></li>

                    <li></li>
                    <li><Link href={`/sponsor`}> <RiServiceLine size={24} />赞助合作</Link></li>
                    <li><Link href={`/fqa`}> <RiQuestionLine size={24} />常见问题</Link></li>
                    <li><Link href={`/about`}> <RiInformation2Line size={24} />关于应用</Link></li>


                </ul>
            </div>
        </>
    );
}
