'use client'
import { RiChat1Line, RiFileTextLine, RiHeart3Line, RiShieldCheckLine, } from "react-icons/ri";
import { usePathname } from 'next/navigation'

import Link from "next/link"

export default function UsersNav({ name, profile }) {
    const pathname = usePathname();

    return (
        <>
            <div className="flex flex-row  w-[100vw] lg:w-full z-20 h-16  items-center bg-base-100">
                {linknav.map((item) => (
                    <div className='mx-auto flex-col sm:flex-row  justify-around w-1/4 flex border-b hover:bg-[--link-hover-background]  z-20' key={item.href}>

                        <Link
                            replace
                            href={`/${name}${item.href}`}
                            className={`z-20 flex items-center justify-center w-[100%]  h-16 text-[#878787]  border-b 
                        ${pathname === `/${name}${item.href}` ? 'text-info border-b-2 border-b-info ' : ''}
                        `}>
                            <div className='flex-col sm:flex-row'>

                                {/*                             <div className=' justify-center text-2xl sm:text-3xl z-20'> {item.logo} </div> */}
                                <p className=" text-lg text-inherit z-20 text-center ">{item.name}</p>
                                {item.name === '帖子' && (
                                    <p className="text-center">
                                        {profile?.globalStats?.posts +
                                            profile?.globalStats?.quotes +
                                            profile?.globalStats?.mirrors }
                                    </p>
                                )}
                                {item.name !== '帖子' && (
                                    <p className="text-center">{profile?.globalStats?.[item.globalStats]}</p>
                                )}
                            </div>
                        </Link>

                    </div>
                ))}
            </div>

        </>
    )
}
const linknav = [
    {
        href: "",
        logo: <RiFileTextLine />,
        name: "帖子",
        globalStats: "posts",
        globalStatsA: "quotes",
        globalStatsC: "mirrors",
    },
    {
        href: "/comments",
        logo: <RiChat1Line />,
        name: "评论",
        globalStats: "comments",
    },
/*     {
        href: "/quotes",
        logo: <RiShieldCheckLine />,
        name: "引用",
        globalStats: "quotes",
    },
    {
        href: "/mirrors",
        logo: <RiShieldCheckLine />,
        name: "转发",
        globalStats: "mirrors",
    }, */
    {
        href: "/upvoted",
        logo: <RiHeart3Line />,
        name: "点赞",
        globalStats: "upvoted",

    },
    {
        href: "/collects",
        logo: <RiShieldCheckLine />,
        name: "收集",
        globalStats: "collects",
    }
]