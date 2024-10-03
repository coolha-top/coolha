'use client'
import { formatNumberWithUnit } from "@/utils/formatNumber";
import { AnyPublication, PublicationReactionType, useCreateMirror, useHidePublication, useReactionToggle } from "@lens-protocol/react-web";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiChat3Line, RiCopperCoinLine, RiHeart3Fill, RiHeart3Line, RiLoopLeftFill, RiShoppingBagLine } from "react-icons/ri";

export default function interactCard({ dataname }) {
  const ButtonCSS = 'flex gap-0.5 justify-start items-center  rounded-full size-7 py-5 px-2 w-full sm:w-2/3 md:w-1/2 hover:bg-[var(--button-bg)]'
  const router = useRouter();
  return (
    <div className='flex justify-items-start md:max-w-[100%]  text-base-content/70 mt-2 '>

      {/* 评论 */}
      <div className="w-1/4" >
        <div className={`${ButtonCSS} hover:text-info`} onClick={() => router.push(`/posts/${dataname.id}`)} >
          <RiChat3Line className="size-5 md:size-7 " />
          <p className="text-center text-sm">{formatNumberWithUnit(dataname.stats.comments)}</p>
        </div>
      </div>

      {/* 转发 + 转贴 */}
      <MirrorsToggle dataname={dataname} />


      {/* 点赞 */}
      <UpvoteToggle dataname={dataname} />

      {/* 出版 收集 */}
      <CardButton hovertext={`hover:text-success`}>
        <RiShoppingBagLine className="size-5 md:size-7 " />
        <p className="text-center text-sm">{formatNumberWithUnit(dataname.stats.collects)}</p>
      </CardButton>



    </div>
  )
}

function CardButton({ children, hovertext }) {
  return (
    <div className="w-1/4">
      <div className={`flex gap-0.5 justify-start items-center  rounded-full size-7 py-5 px-2 w-full sm:w-2/3 md:w-1/2 hover:bg-[var(--button-bg)] btn-disabled text-zinc-300 ${hovertext}`}  >
        {children}
      </div>
    </div>
  )
}


/* 转发 */
function MirrorsToggle({ dataname }) {
  const [showSuccessModal, setShowSuccessModal] = useState(false); // 控制弹窗的显示
  const { execute: createMirror, loading: creatingMirror } = useCreateMirror();
  const { execute: hideMirror, loading: hidingMirror } = useHidePublication();
  const [isMirrored, setIsMirrored] = useState(dataname.operations.hasMirrored); // 当前转发状态


  // 如果转发，执行取消转发
  const hideMirrorToggle = async () => {
    const result = await hideMirror({ publication: dataname });
    if (result.isFailure()) {
      console.log('取消转发失败:');
      return;
    }
    console.log('取消转发成功');
    setIsMirrored(false);
  }

  // 如果未转发，执行转发
  const createMirrorToggle = async () => {
    const result = await createMirror({
      mirrorOn: dataname.id,
    });
    if (result.isFailure()) {
      console.log('转发失败:', result.error.message);
      return;
    }
    console.log('转发成功');
    setIsMirrored(true);

    // 显示成功弹窗
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 3000);
  }

  return (
    <>

      {isMirrored ?
        <button onClick={hideMirrorToggle} disabled={hidingMirror} className="w-1/4">
          <div className={`flex gap-0.5 justify-start items-center rounded-full size-7 py-5 px-2 w-full sm:w-2/3 md:w-1/2 hover:bg-[var(--button-bg)] hover:text-success text-success`}>
            <RiLoopLeftFill className="size-5 md:size-7" />
            <p className="text-center text-sm">
              {formatNumberWithUnit(dataname.stats.mirrors + dataname.stats.quotes)}
            </p>
          </div>
        </button>
        :
        <button onClick={createMirrorToggle} disabled={creatingMirror} className="w-1/4">
          <div className={`flex gap-0.5 justify-start items-center rounded-full size-7 py-5 px-2 w-full sm:w-2/3 md:w-1/2 hover:bg-[var(--button-bg)] hover:text-success`}>
            <RiLoopLeftFill className="size-5 md:size-7" />
            <p className="text-center text-sm">
              {formatNumberWithUnit(dataname.stats.mirrors + dataname.stats.quotes)}
            </p>
          </div>
        </button>
      }


      {/* 成功提示弹窗 */}
      {showSuccessModal && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-100" role="alert">
          <span className="block sm:inline">{isMirrored ? '转发成功！' : '转发已取消！'}</span>
        </div>
      )}
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

      <button onClick={Upvotetoggle} disabled={loading} className="w-1/4">
        <div className={` flex gap-0.5 justify-start items-center rounded-full size-7 py-5 px-2 w-full sm:w-2/3 md:w-1/2 hover:bg-[var(--button-bg)]  hover:text-error ${dataname.operations.hasUpvoted ? 'text-red-500' : ''}`}  >

          {dataname.operations.hasUpvoted ? (
            <RiHeart3Fill className="size-5 md:size-7" /> // 红色填充图标表示已点赞
          ) : (
            <RiHeart3Line className="size-5 md:size-7" /> // 空心图标表示未点赞
          )}

          <p className="text-center text-sm">{formatNumberWithUnit(dataname.stats.upvotes)}</p>

        </div>
      </button>
    </>
  )
}
