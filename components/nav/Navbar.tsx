"use client";

import Link from "next/link";

import { usePathname, } from 'next/navigation'

import { RiApps2Fill, RiApps2Line, RiHome5Fill, RiHome5Line, RiMessage2Fill, RiMessage2Line, RiMessage3Fill, RiMessage3Line, RiMessageFill, RiMessageLine, RiUserFill, RiUserLine } from "react-icons/ri";


export default function Home() {
    return (
        <div >

            <div className="sm:hidden flex fixed bottom-0 w-dvw h-14 bg-[var(--background-end-rgb)] backdrop-filter backdrop-saturate-180 backdrop-blur-16 border-t">

                <NavLink
                    href='/'
                    activeHrefs={['/', "/article", "/image", "/music", "/video",]}
                    icon={<RiHome5Line className="size-7" />}
                    activeIcon={<RiHome5Fill className="size-7" />}
                    text='首页'
                />

                <NavLink
                    href='/find'
                    activeHrefs={['/find']}
                    icon={<RiApps2Line className="size-7" />}
                    activeIcon={<RiApps2Fill className="size-7" />}
                    text='发现'
                />

                <NavLink
                    href='/message'
                    activeHrefs={['/message']}
                    icon={<RiMessageLine   className="size-7" />}
                    activeIcon={<RiMessageFill   className="size-7" />}
                    text='消息'
                />

                <NavLink
                    href={`/profile`}
                    activeHrefs={[`/profile`]}
                    icon={<RiUserLine className="size-7" />}
                    activeIcon={<RiUserFill className="size-7" />}
                    text='资料'
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
            className={`flex-1 flex flex-col items-center justify-center h-full  text-[var(--navlink-color)] hover:bg-[var(--link-hover-background)] ${isActive ? 'text-[var(--foreground-rgb)]' : ''}`}
            href={href}
            prefetch={true} passHref
        >

            <div className="flex flex-col items-center justify-center">
                {activeHrefs.includes(pathname) ? activeIcon : icon}
                <span className="text-sm ">{text}</span>
            </div>

        </Link>
    );
}
