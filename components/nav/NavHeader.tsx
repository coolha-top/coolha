'use client'
import { usePathname } from "next/navigation";
import { RiAddCircleLine, RiSearchLine } from "react-icons/ri";
import { LoginButton } from "../header/LoginButton";

export default function NavHeader() {
    const pathname = usePathname();

    return (
        <>
            {["/find", , "/profile"].includes(pathname) ? (
                <div className="sm:hidden flex navbar border-b sm:border-0 w-100vw p-0">
                    {pathname === "/find" && <Find />}
                    {/* {pathname === "/message/chat" && <Message />} */}
                    {pathname && pathname.startsWith("/profile") && null}
                    {pathname === "/profile" && <Profile />}
                    {pathname === `/@` && <Users />}
                </div>
            ) : null}
        </>
    )
}

function Find() {
    return (
        <div className="navbar py-0">
            <div className=" navbar-start"> </div>
            <div className=" navbar-center">发现</div>
            <div className=" navbar-end">
                <button className="btn btn-square btn-ghost">
                    <RiSearchLine size={24} />
                </button>
            </div>
        </div>
    )
}

function Message() {
    return (
        <div className="navbar py-0">
            <div className=" navbar-start"> </div>
            <div className=" navbar-center">消息</div>
            <div className=" navbar-end">
                <button className="btn btn-square  btn-ghost">
                    <RiAddCircleLine size={24}/>
                </button>
            </div>
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
                <LoginButton />
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
