'use client'
import Header from "@/components/header/Header";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { RiArrowDropLeftLine, RiArrowLeftLine, RiCursorLine, RiDatabase2Line, RiEditLine, RiHandCoinLine, RiLinksLine, RiLock2Line, RiShieldKeyholeLine, RiSoundModuleLine, RiSparkling2Line, RiTimeLine, RiUserForbidLine, RiUserSettingsLine } from "react-icons/ri";

const LinkEditProfile = [
    {
        logo: <RiSoundModuleLine />,
        href: '',
        title: '应用设置'
    },
    {
        logo: <RiEditLine />,
        href: '/edit_profile',
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
        logo: <RiLock2Line />,
        href: '/manager',
        title: '管理权限'
    },
    {
        logo: <RiSparkling2Line />,
        href: '/interests',
        title: '推荐兴趣'
    },
    {
        logo: <RiHandCoinLine />,
        href: '/allowance',
        title: '津贴打赏'
    },
    {
        logo: <RiUserForbidLine />,
        href: '/blocked',
        title: '屏蔽用户'
    },
    {
        logo: <RiTimeLine />,
        href: '/sessions',
        title: '登入历史'
    },
    {
        logo: <RiCursorLine />,
        href: '/actions',
        title: '操作记录'
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
    }
]
export default function Layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter()
    return (
        <div>
            <Header />
            <div className="navbar py-0 bg-base-100 border-b md:hidden">
                <div className=" navbar-start">
                    <button className="btn btn-square btn-ghost" onClick={() => router.back()}>
                        <RiArrowLeftLine size={24} />
                    </button>
                </div>
                <div className=" navbar-center">设置</div>
                <div className=" navbar-end"></div>
            </div>
            <div className="h-0 md:h-16" />


            {/* 侧边栏 */}
            <aside className=" md:w-64 z-50 md:h-dvh md:fixed bg-base-100 shadow-md p-4 border-b">
                <nav className="space-y-2 p-1">
                    {LinkEditProfile.map((litm) => (
                        <Link
                            href={`/settings${litm.href}`}
                            className={`p-1 pl-3 md:p-2 md:pl-6 rounded-full hover:bg-[var(--button-bg)] flex flex-row items-center gap-2
                            ${pathname === `/settings${litm.href}` ? 'bg-[var(--button-bg)] ' : ''}`}
                            replace
                        >
                            <span className="md:text-xl">{litm.logo}</span>
                            <span className="">{litm.title}</span>
                            {/* {pathname === `/settings${litm.href}` ? <RiArrowDropLeftLine size={24} /> : ''} */}
                        </Link>
                    ))}
                    <div className={`text-error p-2 pl-6 rounded-full hover:bg-[var(--button-bg)] flex flex-row items-center gap-2`}>开发中！</div>
                </nav>
            </aside>




            {/* 主内容区域 */}
            <main className="flex-1 p-2 md:p-6 md:ml-64 bg-base-100  min-h-dvh mx-auto max-w-4xl ">
                {children}
            </main>
        </div>
    );
}
