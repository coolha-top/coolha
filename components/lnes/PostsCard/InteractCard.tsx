'use client'
import { formatNumberWithUnit } from "@/utils/formatNumber";
import { useRouter } from "next/navigation";
import { RiBookmarkLine, RiChat1Line, RiCopperCoinLine, RiHeart3Line, RiRepeat2Line, RiShare2Line, RiShieldCheckLine, RiTicketLine } from "react-icons/ri";
export default function interactCard({ dataname }) {
  const router = useRouter();
  return (
    <div className='flex justify-items-start md:max-w-[100%] w-full  text-base-content/50'>

      {/* 评论 */}
      <div className=" flex gap-0.5 justify-start items-center pt-1 rounded-full size-7 w-1/6 hover:text-info" onClick={() => router.push(`/${dataname.by.handle.localName}/posts/${dataname.id}`)} >
        <RiChat1Line className="size-5 " />
        <p className="text-center text-sm">{formatNumberWithUnit(dataname.stats.comments)}</p>
      </div>

      {/* 转发 + 转贴 */}
      <div className=" flex gap-0.5 justify-start items-center pt-1 rounded-full size-7 w-1/6  hover:text-success"  >
        <RiRepeat2Line className="size-5" />
        <p className=" text-center text-sm">{formatNumberWithUnit(dataname.stats.mirrors + dataname.stats.quotes)}</p>
      </div>

      {/* 点赞 */}
      <div className=" flex gap-0.5 justify-start items-center pt-1 rounded-full size-7 w-1/6  hover:text-error"  >
        <RiHeart3Line className="size-5 " />{/* RiHeart3Fill  */}
        <p className="text-center text-sm">{formatNumberWithUnit(dataname.stats.upvotes)}</p>
      </div>

      {/* 出版 收藏 */}
      <div className=" flex gap-0.5 justify-start items-center pt-1 rounded-full size-7 w-1/6  hover:text-[#00d176]"  >
        <RiTicketLine className="size-5 " />
        <p className="text-center text-sm">{formatNumberWithUnit(dataname.stats.collects)}</p>
      </div>

      {/* 打赏 */}
      {/*       <div className=" flex gap-0.5 justify-start items-center pt-1 rounded-full size-7  hover:text-[#d1a000]"  >
        <RiCopperCoinLine className="size-5 " />
        <p className="text-center text-sm">{dataname.stats.bookmarks}</p>
      </div> */}

      {/* 书签 */}
      <div className="w-1/6"></div>
      <div className=" flex gap-0.5 justify-start items-center pt-1 rounded-full size-7  w-1/6 hover:text-[#d1a000]"  >
        <RiBookmarkLine className="size-5 " />
        <p className="text-center text-sm">{formatNumberWithUnit(dataname.stats.bookmarks)}</p>
      </div>
       
{/*       <div className=" flex gap-0.5 justify-start items-center pt-1 rounded-full size-7  w-1/6 hover:text-[#d1a000]"  >
        <RiShare2Line className="size-5 hover:bg-[#d1a000]/20 rounded-full" />
      </div> */}





    </div>
  )
}

