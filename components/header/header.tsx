"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { RiSearchLine } from "react-icons/ri";
import { MenuButton } from "./MenuButton";

export default function Header() {
    const pathname = usePathname();

    return (
        <>



            <div className="navbar py-0 px-0 lg:px-2 md:border-b bg-base-100  hidden md:flex fixed top-0 left-0 z-50">


                <div className="navbar-start">

                    <a className="btn btn-ghost px-4 text-xl">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Image
                                src='/favicon.ico'
                                width={40}
                                height={40}
                                alt='Q'
                            />
                        </motion.div>
                    </a>

                    <label className="input w-44 lg:w-72 input-bordered flex items-center gap-2">
                        <input type="text" className="grow" placeholder="搜索" />
                        <RiSearchLine size={24} />
                    </label>

                </div>


                <div className="navbar-center hidden sm:flex">
                    <ul className="menu menu-horizontal gap-x-2 w-auto">
                        {/*                         <li>
                            <details>
                                <summary>Parent</summary>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </details>
                        </li> */}
                        <li><Link
                            href='/'
                            className={`btn btn-ghost btn-primary  lg:text-xl ${pathname === "/" ? "btn-active text-info" : ""}`}>
                            首页
                        </Link></li>

                        <li> <Link
                            href='/find'
                            className={`btn btn-ghost btn-primary  lg:text-xl ${pathname && pathname.startsWith("/find") ? "btn-active text-info" : ""}`}>
                            发现
                        </Link></li>

                        <li> <Link
                            href='/message/chat'
                            className={` btn btn-ghost btn-primary  lg:text-xl ${pathname && pathname.startsWith("/message") ? "btn-active text-info" : ""}`}>
                            消息
                        </Link></li>
                        <li> <Link
                            href='/profile'
                            className={`btn btn-ghost btn-primary  lg:text-xl ${pathname && pathname.startsWith("/profile") ? "btn-active text-info" : ""}`}>
                            资料
                        </Link></li>
                    </ul>
                </div>

                <div className="navbar-end">
                    <MenuButton />
                </div>

            </div>


{/*             {["/find", "/message/chat", "/profile"].includes(pathname) ? (
                <div className="sm:hidden flex navbar border-b sm:border-0 w-100vw p-0">
                    {pathname === "/find" && <Find />}
                    {pathname === "/message/chat" && <Message />}
                    {pathname && pathname.startsWith("/profile") && null}
                    {pathname === "/profile" && <Profile />}
                    {pathname === `/@` && <Users />}
                </div>
            ) : null} */}




        </>)
}

function Find() {
    return (
        <div className="navbar py-0">
            <div className=" navbar-start"> </div>
            <div className=" navbar-center">发现</div>
            <div className=" navbar-end">
                <div className="btn btn-square btn-ghost">
                    <RiSearchLine size={24} />
                </div>
            </div>
        </div>
    )
}

function Message() {
    return (
        <div className="navbar py-0">
            <div className=" navbar-start"> </div>
            <div className=" navbar-center">消息</div>
            <div className=" navbar-end"> </div>
        </div>
    );
}

function Profile() {
    return (
        <div className="navbar py-0">
            <div className="navbar-start">
            </div>
            <div className="navbar-center"> </div>
            <div className="navbar-end">
                <MenuButton />
            </div>
        </div>
    )
}


function Users() {
    return (
        <div className="navbar py-0">
            <div className=" navbar-start"> </div>
            <div className=" navbar-center">用户</div>
            <div className=" navbar-end"> </div>
        </div>
    )
}
