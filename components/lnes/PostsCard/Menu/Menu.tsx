
import { formatNumberWithUnit } from "@/utils/formatNumber"
import { RiAlertLine, RiBookmarkFill, RiBookmarkLine, RiCheckboxMultipleBlankLine, RiCopperCoinLine, RiEyeOffLine, RiMore2Fill, RiShareForwardBoxLine, RiSparkling2Line, RiThumbDownFill, RiThumbDownLine } from "react-icons/ri"
import { AnyPublication, PublicationReactionType, PublicationReportReason, useBookmarkToggle, useLogin, useNotInterestedToggle, useReactionToggle, useReportPublication } from '@lens-protocol/react-web';
import Report from './Report'

export default function Menu({ pub }) {
    return (
        <>
            <div className="dropdown dropdown-end " onClick={(e) => e.stopPropagation()}>
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle  btn-sm text-base-content/70 hover:text-base-content"><RiMore2Fill className="size-6 " /></div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1]  w-52 p-2 shadow border">
                    <li>  <RewardToggle publication={pub} /> </li>
                    <li>  <BookmarkToggle publication={pub} /> </li>
                    <li>  <DownvoteToggle publication={pub} /></li>
                    <li> <EyeOffToggle publication={pub} /> </li>
                    <li> <SparklingToggle publication={pub} /> </li>

                    <li className="my-1"></li>
                    <li> <CheckboxMultipleBlankToggle publication={pub} /> </li>
                    <li> <ShareForwardBoxToggle publication={pub} /> </li>

                    <li className="my-1"></li>
                    <li > <Report publication={pub} /></li>
                </ul>
            </div>
        </>
    )
}

/* 收藏 */
function RewardToggle({ publication }) {

    return (
        <button className={`flex flex-row  btn-disabled text-zinc-400`}>
            <RiCopperCoinLine className="size-6" /><span>打赏</span>
        </button>
    );
}

/* 收藏 */
function BookmarkToggle({ publication }) {
    const { execute: toggle, loading } = useBookmarkToggle();
    return (
        <button onClick={() => toggle({ publication })} disabled={loading} className={`flex flex-row text-base-content `}>
            {publication?.operations?.hasBookmarked ? (
                <> <RiBookmarkFill className="size-6" /><span>取消收藏</span></>
            ) : (
                <> <RiBookmarkLine className="size-6" /><span>收藏</span></>
            )}
        </button>
    );
}

/* 差 */
function DownvoteToggle({ publication }) {
    const { execute: toggle, loading, error } = useReactionToggle();

    const toggleReaction = async () => {
        await toggle({
            reaction: PublicationReactionType.Downvote,
            publication: publication,
        });
    };



    return (
        <button
            onClick={toggleReaction}
            disabled={loading}
            className={`flex flex-row text-base-content ${publication.operations?.hasDownvote ? ' text-amber-500' : ''}`}>
            {publication.operations?.hasDownvote ? (
                <RiThumbDownFill className="size-6 " />
            ) : (
                <RiThumbDownLine className="size-6 " />
            )}

            {publication.operations?.hasDownvote ? '取消反对' : '反对'}
        </button>
    )
}

/* 不感兴趣 */
function EyeOffToggle({ publication }: { publication: AnyPublication }) {
    const { execute, loading } = useNotInterestedToggle();

    const toggle = async () => {
        await execute({ publication })
    };
    return (
        <button onClick={toggle} disabled={loading} className={`flex flex-row`}>
            <RiEyeOffLine className="size-6" />
            <span>
                {publication.__typename === 'Mirror' ? '' : publication.operations?.isNotInterested ? '不感兴趣' : '推荐兴趣'}
            </span>
        </button>
    );
}
/* 推荐兴趣 */
function SparklingToggle({ publication }) {
    return (
        <button /* onClick={} disabled={} */ className={`flex flex-row  btn-disabled text-zinc-400`}>
            <RiSparkling2Line className="size-6" /><span>推荐兴趣</span>
        </button>
    );
}
/* 复制文本 */
function CheckboxMultipleBlankToggle({ publication }) {
    return (
        <button /* onClick={} disabled={} */ className={`flex flex-row btn-disabled text-zinc-400`}>
            <RiCheckboxMultipleBlankLine className="size-6" /><span>复制文本</span>
        </button>
    );
}
/* 分享链接 */
function ShareForwardBoxToggle({ publication }) {
    return (
        <button /* onClick={} disabled={} */ className={`flex flex-row btn-disabled text-zinc-400`}>
            <RiShareForwardBoxLine className="size-6" /><span>分享链接</span>
        </button>
    );
}