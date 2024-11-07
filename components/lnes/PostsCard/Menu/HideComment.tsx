'use client'
import { Comment, useHideCommentToggle } from '@lens-protocol/react-web';
import { RiChatDeleteFill, RiChatDeleteLine, } from 'react-icons/ri';

export default function HideableComment({ comment }: { comment: Comment }) {
  const { execute: HideComment, loading } = useHideCommentToggle();

  return (
    <button onClick={() => HideComment({ comment })} disabled={loading}>
      {comment.hiddenByAuthor ?
        <>
          <RiChatDeleteFill className="size-6" />
          <span className="">取消隐藏</span>
        </>
        :
        <>
          <RiChatDeleteLine className="size-6 text-red-600" />
          <span className="text-red-600">隐藏评论</span>
        </>
      }
    </button>
  );
}