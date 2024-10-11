'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiArrowDropLeftLine, RiCursorLine, RiDatabase2Line, RiEditLine, RiHandCoinLine, RiLinksLine, RiLock2Line, RiShieldKeyholeLine, RiSoundModuleLine, RiSparkling2Line, RiTimeLine, RiUserForbidLine, RiUserSettingsLine } from "react-icons/ri";

const LinkEditProfile = [
    {
        logo: <RiEditLine />,
        href: '',
        title: '编辑资料'
    },
    {
        logo: <RiUserSettingsLine />,
        href: '/account',
        title: '账户设置'
    },
    {
        logo: <RiLinksLine />,
        href: '/handles',
        title: '账户关联'
    },
    {
        logo: <RiSoundModuleLine />,
        href: '/preferences',
        title: '应用偏好'
    },
    {
        logo: <RiSparkling2Line />,
        href: '/interests',
        title: '推荐兴趣'
    },
    {
        logo: <RiLock2Line />,
        href: '/manager',
        title: '管理权限'
    },
    {
        logo: <RiHandCoinLine />,
        href: '/allowance',
        title: '津贴打赏'
    },
    {
        logo: <RiTimeLine />,
        href: '/sessions',
        title: '登入历史'
    },
    {
        logo: <RiCursorLine />,
        href: '/action',
        title: '操作记录'
    },
    {
        logo: <RiUserForbidLine />,
        href: '/blocked',
        title: '屏蔽用户'
    },
    {
        logo: <RiDatabase2Line />,
        href: '/export',
        title: '导出数据'
    },
    {
        logo: <RiShieldKeyholeLine />,
        href: '/danger',
        title: '安全中心'
    },
]
export default function Layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="flex ">

            {/* 侧边栏 */}
            <aside className="w-64 fixed h-svh bg-base-100 shadow-md p-4 hidden md:block">
                <nav className="space-y-2 p-1">
                    {LinkEditProfile.map((litm) => (
                        <Link
                            href={`/edit_profile${litm.href}`}
                            className={` p-2 pl-6 rounded-full hover:bg-[var(--button-bg)] flex flex-row items-center gap-2
                            ${pathname === `/edit_profile${litm.href}` ? 'bg-[var(--button-bg)] ' : ''}`}
                        >
                            <span className="text-xl">{litm.logo}</span>
                            <span className="">{litm.title}</span>
                            {/* {pathname === `/edit_profile${litm.href}` ? <RiArrowDropLeftLine size={24} /> : ''} */}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* 侧边栏 */}
            <aside className="w-1/3 h-dvh bg-base-100 shadow-md block md:hidden">
                <nav className="space-y-2 p-1">
                    {LinkEditProfile.map((litm) => (
                        <Link
                            href={`/edit_profile${litm.href}`}
                            className={` p-1 pl-3 rounded-full hover:bg-[var(--button-bg)] flex flex-row items-center gap-2
                            ${pathname === `/edit_profile${litm.href}` ? 'bg-[var(--button-bg)] ' : ''}`}
                        >
                            <span className="">{litm.logo}</span>
                            <span className="">{litm.title}</span>
                            {/* {pathname === `/edit_profile${litm.href}` ? <RiArrowDropLeftLine size={24} /> : ''} */}
                        </Link>
                    ))}
                </nav>
            </aside>


            {/* 主内容区域 */}
            <main className="flex-1 p-2 md:p-6 md:ml-64 bg-base-100">
                {children}
            </main>
        </div>
    );
}
