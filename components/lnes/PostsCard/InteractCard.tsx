'use client'
import { useRouter } from "next/navigation";
import { RiBookmarkLine, RiChat1Line, RiCopperCoinLine, RiHeart3Line, RiRepeat2Line, RiShieldCheckLine, RiTicketLine } from "react-icons/ri";
export default function interactCard({ dataname }) {
  const router = useRouter();
  return (
    <div className='sm:max-w-[50%] w-dvw justify-around flex items-center mt-1 text-base-content/60'>

      {/* 评论 */}
      <button className=" grid justify-items-center pt-1 rounded-full size-7  hover:text-info" onClick={() => router.push(`/${dataname.by.handle.localName}/posts/${dataname.id}`)} >
        <RiChat1Line className="size-5 " />
        <p className=" text-sm">{dataname.stats.comments}</p>
      </button>

      {/* 转发 + 转贴 */}
      <button className=" grid justify-items-center pt-1 rounded-full size-7  hover:text-success"  >
        <RiRepeat2Line className="size-5" />
        <p className=" text-sm">{dataname.stats.mirrors + dataname.stats.quotes}</p>
      </button>

      {/* 点赞 */}
      <button className=" grid justify-items-center pt-1 rounded-full size-7  hover:text-error"  >
        <RiHeart3Line className="size-5 " />{/* RiHeart3Fill  */}
        <p className=" text-sm">{dataname.stats.upvotes}</p>
      </button>

      {/* 出版 收藏 */}
      <button className=" grid justify-items-center pt-1 rounded-full size-7  hover:text-[#00d176]"  >
        <RiTicketLine className="size-5 " />
        <p className=" text-sm">{dataname.stats.collects}</p>
      </button>

      {/* 打赏 */}
      {/*       <button className=" grid justify-items-center pt-1 rounded-full size-7  hover:text-[#d1a000]"  >
        <RiCopperCoinLine className="size-5 " />
        <p className=" text-sm">{dataname.stats.bookmarks}</p>
      </button> */}

      {/* 书签 */}
      <button className=" grid justify-items-center pt-1 rounded-full size-7  hover:text-[#d1a000]"  >
        <RiBookmarkLine className="size-5 " />
        <p className=" text-sm">{dataname.stats.bookmarks}</p>
      </button>
    </div>
  )
}

