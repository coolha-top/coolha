'use client'
import { formatNumberWithUnit } from "@/utils/formatNumber";
import { PublicationReactionType, useCreateMirror, useReactionToggle } from "@lens-protocol/react-web";
import { useRouter } from "next/navigation";
import { RiChat3Line, RiCopperCoinLine, RiHeart3Fill, RiHeart3Line, RiLoopLeftFill, RiShoppingBagLine } from "react-icons/ri";

export default function interactCard({ dataname }) {
  const router = useRouter();
  return (
    <div className='flex justify-items-start md:max-w-[100%] text-base-content/70 my-1'>

      {/* 评论 */}
      <div className="w-1/6" >
        <div className="flex gap-0.5 justify-start items-center  rounded-full size-7 w-3/4 md:w-1/2 px-1   hover:text-info" onClick={() => router.push(`/posts/${dataname.id}`)} >
          <RiChat3Line className="size-7 " />
          <p className="text-center text-sm">{formatNumberWithUnit(dataname.stats.comments)}</p>
        </div>
      </div>

      {/* 转发 + 转贴 */}
      <MirrorsToggle dataname={dataname} />


      {/* 点赞 */}
      <UpvoteToggle dataname={dataname} />

      {/* 出版 收集 */}
      <CardButton hovertext={`hover:text-success`}>
        <RiShoppingBagLine className="size-7 " />
        <p className="text-center text-sm">{formatNumberWithUnit(dataname.stats.collects)}</p>
      </CardButton>

      {/* 打赏 */}
      <CardButton hovertext={`hover:text-[#D1B200]`}>
        <RiCopperCoinLine className="size-7 " />
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


/* 转发 */
function MirrorsToggle({ dataname }) {
  const { execute, error, loading } = useCreateMirror();

  const handleSubmit = async () => {
    await execute({
      mirrorOn: dataname.id,
    });
  }

  return (
    <>
      <button onClick={handleSubmit} disabled={loading} className="w-1/6">
        <div className={`flex gap-0.5 justify-start items-center rounded-full size-7 w-3/4 md:w-1/2 px-1 hover:text-success ${dataname.operations.hasMirrored ? 'text-success' : ''}`}>
          <RiLoopLeftFill className="size-7" />
          <p className="text-center text-sm">{formatNumberWithUnit(dataname.stats.mirrors + dataname.stats.quotes)}</p>
        </div>
      </button>
    </>
  );
}

/* 点赞 */
function UpvoteToggle({ dataname }) {
  const { execute: upvotetoggle, loading, error } = useReactionToggle();

  const Upvotetoggle = async () => {
    await upvotetoggle({
      reaction: PublicationReactionType.Upvote,
      publication: dataname,
    });
  };
  if (error) {
    return <p>Error reacting to publication: {error}</p>;
  }


  return (
    <>

      <button onClick={Upvotetoggle} disabled={loading} className="w-1/6">
        <div className={` flex gap-0.5 justify-start items-center rounded-full size-7 w-3/4 md:w-1/2 px-1  hover:text-error ${dataname.operations.hasUpvoted ? 'text-red-500' : ''}`}  >

          {dataname.operations.hasUpvoted ? (
            <RiHeart3Fill className="size-7" /> // 红色填充图标表示已点赞
          ) : (
            <RiHeart3Line className="size-7" /> // 空心图标表示未点赞
          )}

          <p className="text-center text-sm">{formatNumberWithUnit(dataname.stats.upvotes)}</p>

        </div>
      </button>
    </>
  )
}
