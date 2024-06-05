'use client'

import { truncateEthAddress } from "@/utils/truncateEthAddress"
import { formatDate } from "@/utils/formatDate"
import Link from "next/link"

export default function UsersStats({ name, profile }) {
    const statsData = [
        { label: "关注", value: profile?.globalStats?.following, link: `/${name}.lens/following` },
        { label: "粉丝", value: profile?.globalStats?.followers, link: `/${name}.lens/followers` },
        { label: "获赞", value: profile?.globalStats?.upvotes, link: `/${name}.lens/upvotes` },
    ];
    const statsData1 = [
        { label: "出版", value: profile?.globalStats?.publications, link: `/${name}.lens/publications` },
        { label: "得分", value: profile?.globalStats?.lensClassifierScore, link: `/${name}.lens/lensClassifierScore` },
        { label: "id", value: profile?.globalStats?.id, link: `/${name}.lens/id` },
    ];
    
    return (
        <>
            <div className="flex flex-row px-6 mt-1 gap-1">

                {/* <p className="text-gray-500"> <span className="font-bold">{profile?.createdAt ? formatDate(profile?.createdAt) : ''}</span> </p> */}
            </div >


            <div className="stats-container px-6 my-4 flex flex-col  w-[100%] gap-2">


                <div className="flex  flex-row justify-around  rounded-md  w-[100%] lg:w-1/2">
                    {statsData.map((item, index) => (
                        <Link href={item.link} key={index} className="stat-item text-left  w-1/3 flex items-center">
                            <span className="stat-label text-[#878787] block mr-1">{item.label}</span>
                            <span className=" text-xl font-bold hover:text-primary">{item.value}</span>
                        </Link>
                    ))}
                </div>


                <div className="flex  flex-row justify-around rounded-md  w-[100%] lg:w-1/2">
                    {statsData1.map((item, index) => (
                        <Link href={item.link} key={index} className="stat-item text-left  w-1/3 flex items-center">
                            <span className="stat-label text-[#878787] block mr-1">{item.label}</span>
                            <span className=" text-xl font-bold hover:text-primary">{item.value}</span>
                        </Link>
                    ))}
                </div>


            </div>
        </>
    )
}
