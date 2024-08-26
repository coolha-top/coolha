'use client'

import { formatNumberWithUnit } from "@/utils/formatNumber"
import { RiAlertLine, RiBookmarkLine, RiCheckboxMultipleBlankLine, RiEyeOffLine, RiMore2Fill, RiShareForwardBoxLine, RiSparkling2Line, RiThumbDownLine } from "react-icons/ri"

export default function Menu() {
    return (
        <>
            <div className="dropdown dropdown-end ">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle  btn-sm text-base-content/70 hover:text-base-content"><RiMore2Fill className="size-6 " /></div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow border">

                    <li><a> <RiBookmarkLine className="size-6 " /> 收藏 </a></li>
                    <li><a> <RiThumbDownLine className="size-6 " /> 差 </a></li>
                    <li><a> <RiEyeOffLine className="size-6 " /> 不感兴趣 </a></li>
                    <li><a> <RiSparkling2Line className="size-6 " /> 推荐兴趣 </a></li>

                    <li className="my-1"></li>
                    <li><a> <RiCheckboxMultipleBlankLine className="size-6 " /> 复制文本 </a></li>
                    <li><a> <RiShareForwardBoxLine className="size-6 " /> 分享链接</a></li>

                    <li className="my-1"></li>
                    <li><a className=" text-red-600"> <RiAlertLine className="size-6 " /> 举报 </a></li>
                </ul>
            </div>
        </>
    )
}