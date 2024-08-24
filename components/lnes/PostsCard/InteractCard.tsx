'use client'
import { formatNumberWithUnit } from "@/utils/formatNumber";
import { AnyPublication, useBookmarkToggle } from "@lens-protocol/react-web";
import { useRouter } from "next/navigation";
import { RiBookmarkLine, RiChat1Line, RiCopperCoinLine, RiHeart3Line, RiRepeat2Line, RiShare2Line, RiShieldCheckLine, RiTicketLine } from "react-icons/ri";

export default function interactCard({ dataname }) {
  const router = useRouter();
  return (
    <div className='flex justify-items-start md:max-w-[100%] text-base-content/70'>

      {/* 评论 */}
      <div className="w-1/6" >
        <div className="flex gap-0.5 justify-start items-center  rounded-full size-7 w-3/4 md:w-1/2 px-1   hover:text-info" onClick={() => router.push(`/${dataname.by.handle.localName}/posts/${dataname.id}`)} >
          <RiChat1Line className="size-6 " />
          <p className="text-center text-sm">{formatNumberWithUnit(dataname.stats.comments)}</p>
        </div>
      </div>


      {/* 转发 + 转贴 */}
      <CardButton hovertext={`hover:text-success`}>
        <RiRepeat2Line className="size-5" />
        <p className=" text-center text-sm">{formatNumberWithUnit(dataname.stats.mirrors + dataname.stats.quotes)}</p>
      </CardButton>


      {/* 点赞 */}
      <CardButton hovertext={`hover:text-error`}>
        <RiHeart3Line className="size-6 " />{/* RiHeart3Fill  */}
        <p className="text-center text-sm">{formatNumberWithUnit(dataname.stats.upvotes)}</p>
      </CardButton>


      {/* 出版 收藏 */}
      <CardButton hovertext={`hover:text-[#00d176]`}>
        <RiTicketLine className="size-6 " />
        <p className="text-center text-sm">{formatNumberWithUnit(dataname.stats.collects)}</p>
      </CardButton>


      {/* 书签 */}
      <CardButton hovertext={`hover:text-[#D1B200]`}>
        <RiBookmarkLine className="size-6 " />
        <p className="text-center text-sm">{formatNumberWithUnit(dataname.stats.bookmarks)}</p>
      </CardButton>







    </div>
  )
}

function CardButton({ children, hovertext }) {
  return (
    <div className="w-1/6">
      <div className={` flex gap-0.5 justify-start items-center rounded-full size-7 w-3/4 md:w-1/2 px-1  ${hovertext}`}  >
        {children}
      </div>
    </div>
  )
}

