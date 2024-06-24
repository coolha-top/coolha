'use client'

import { truncateEthAddress } from "@/utils/truncateEthAddress"
import { formatDate } from "@/utils/formatDate"
import Link from "next/link"
import { formatNumberWithUnit } from "@/utils/formatNumber";

export default function UsersStats({ name, profile }) {


    const statsData = [
        { label: "关注", value: profile?.globalStats?.following, link: `/${name}/following` },
        { label: "粉丝", value: formatNumberWithUnit(profile?.globalStats?.followers), link: `/${name}/followers` },
        { label: "获赞", value: formatNumberWithUnit(profile?.globalStats?.upvotes), link: `` },
    ];


    const statsData1 = [
        { label: "出版", value: profile?.createdAt ? formatDate(profile?.createdAt) : '', link: `/${name}/publications` },
        { label: "id", value: profile?.globalStats?.id ? `# ${parseInt(profile?.globalStats?.id, 16)}` : '#', link: `` },
        { label: "得分", value: profile?.globalStats?.lensClassifierScore, link: `/${name}/lensClassifierScore` },
    ];

    return (
        <>
            <div className="flex flex-row px-4 mt-1 gap-1">

                {/* <p className="text-gray-500"> <span className="font-bold">{profile?.createdAt ? formatDate(profile?.createdAt) : ''}</span> </p> */}
            </div >


            <div className="stats-container px-4 my-4 flex flex-col  w-[100%] gap-2">


                <div className="flex  flex-row justify-around  rounded-md  w-[100%] lg:w-1/2">
                    {statsData.map((item, index) => (
                        <Link replace href={item.link} key={index} className="stat-item text-left  text-base md:text-xl w-1/3 flex items-center hover:text-primary">
                            <span className=" font-bold">{item.value}</span>
                            <span className="stat-label text-base text-[#878787] block ml-1">{item.label}</span>
                        </Link>
                    ))}
                </div>



                <div className="flex  flex-row rounded-md w-[100%] lg:w-1/2 ">
                    {statsData1.map((item, index) => (
                        <div key={index} className=" text-left  w-1/3 flex items-center">
                            <span className="badge badge-outline font-bold text-[#878787] hover:text-primary">{item.value}</span>
                        </div>
                    ))}
                </div>


            </div>
        </>
    )
}
