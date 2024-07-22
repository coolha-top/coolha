"use client";

import Link from "next/link";

import { usePathname, } from 'next/navigation'

import { RiApps2Fill, RiApps2Line, RiArchiveFill, RiArchiveLine, RiChat1Fill, RiChat1Line, RiCompass3Fill, RiCompass3Line, RiHome5Fill, RiHome5Line, RiMailFill, RiMailLine, RiMessageFill, RiMessageLine, RiUserFill, RiUserLine } from "react-icons/ri";


export default function NavNavLink() {
    return (
        <div >

            <div className="md:hidden flex fixed bottom-0 w-dvw h-14 bg-[var(--background-end-rgb)] backdrop-filter backdrop-saturate-180 backdrop-blur-16">

                <NavLink
                    href='/home'
                    activeHrefs={['/home', "/home/article", "/home/image", "/home/music", "/home/video",]}
                    icon={<RiHome5Line className="size-6" />}
                    activeIcon={<RiHome5Fill className="size-6" />}
                    text='首页'
                />

                <NavLink
                    href='/find'
                    activeHrefs={['/find']}
                    icon={<RiCompass3Line  className="size-6" />}
                    activeIcon={<RiCompass3Fill  className="size-6" />}
                    text='发现'
                />

                <NavLink
                    href='/message/chat'
                    activeHrefs={['/message/chat','/message/community','/message/notice',]}
                    icon={<RiChat1Line    className="size-6" />}
                    activeIcon={<RiChat1Fill    className="size-6" />}
                    text='消息'
                />

                <NavLink
                    href={`/profile`}
                    activeHrefs={[`/profile`]}
                    icon={<RiUserLine className="size-6" />}
                    activeIcon={<RiUserFill className="size-6" />}
                    text='个人'
                />

                {/*        {address ? () : (
          <NavLink
            href={`/profile/sin`}
            activeHrefs={[`/profile/sin`]}
            icon={<RiUserLine className="Navicon" />}
            activeIcon={<RiUserFill className="Navicon" />}
          />
        )}
 */}
            </div>


        </div>
    );
}


function NavLink({ href, activeIcon, icon, activeHrefs, text }) {
    const pathname = usePathname();
    const isActive = activeHrefs.includes(pathname);



    return (
        <Link
            className={`flex-1 flex flex-col items-center justify-center h-full  transition-shadow text-[var(--navlink-color)] hover:bg-[var(--link-hover-background)] ${isActive ? ' text-info' : ''}`}
            href={href}
            prefetch={true} passHref
        >

            <div className="flex flex-col items-center justify-center">
                {activeHrefs.includes(pathname) ? activeIcon : icon}
                {/* <span className="text-xs mt-0.5">{text}</span> */}
            </div>

        </Link>
    );
}
