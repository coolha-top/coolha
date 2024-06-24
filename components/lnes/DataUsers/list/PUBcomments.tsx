'use client'

import Avatar from "@/gui/flowbite/Avatar";
import { usePublications, Profile, PublicationType, LimitType, publicationId } from "@lens-protocol/react-web";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import PosImage from "../../PostsCard/PosImage";
import AvatarName from "../../PostsCard/AvatarName";
import InteractCard from "../../PostsCard/InteractCard";
import { useInfiniteScroll } from "@/hooks/lens/useInfiniteScroll";
import { UsersPosAtext } from "../../PostsCard/PosAtext";
import Avatarimg from "../../PostsCard/Avatarimg";
import Meide from "../../PostsCard/Meide";

export default function PUBcomments({ profile }) {
  const { data, hasMore, loading, observeRef } = useInfiniteScroll(usePublications({
    limit: LimitType.Ten,
    //orderBy: ExplorePublicationsOrderByType.LensCurated,
    where: {
      from: [profile?.id],
      publicationTypes: [PublicationType.Comment],
    },
  }))


  return (
    <>
      {data?.map((comment: any, index: number) => (
        <>

          <div key={index} className="  lg:max-w-4xl w-dvw pb-4  border-b">

            {/* 如果是引用类型的帖子，显示引用的内容 */}
            {comment.__typename === "Comment" && (
              <div className="pb-6">
                <div className="p-4 border-b hover:bg-[--link-hover-background]">
                  <div className="flex" >
                    <Avatarimg src={comment.commentOn.by} href={comment.by.handle.localName} />
                    <AvatarName
                      localName={comment.commentOn.by.handle.localName}
                      displayName={comment.commentOn.by.metadata?.displayName}
                      namespace={comment.commentOn.by.handle.namespace}
                      createdAt={comment.commentOn.by.createdAt}
                    />
                  </div>

                  <Link href={`/posts/${comment.commentOn.id}`} passHref>
                    <UsersPosAtext content={comment.commentOn.metadata.content} />
                    <Meide pub={comment.commentOn.metadata.asset} />
                  </Link>
                  <InteractCard dataname={comment.commentOn} />
                </div>

                <div className="h-10 w-0.5 border ml-10 absolute"></div>{/* 连线 */}
              </div>
            )}


            {/* 用户的评论 */}
            <div className="py-4 px-6">
              <div className="p-4 border rounded-2xl hover:bg-[--link-hover-background]">

                {/* users */}
                <div className="flex">
                  <Avatarimg src={comment.by} href={comment.by.handle.localName} />
                  <AvatarName localName={comment.by.handle.localName} displayName={comment.by.metadata?.displayName} namespace={comment.by.handle.namespace} createdAt={comment.by.createdAt} />
                </div>

                {/* users posts data */}
                <div className=''>
                  <Link href={`/posts/${comment.id}`}>
                    {comment.metadata.content && <UsersPosAtext content={comment.metadata.content} />}
                    <Meide pub={comment.commentOn.metadata.asset} />
                  </Link>
                </div>


                <InteractCard dataname={comment} />


              </div>
            </div>




          </div >




        </>
      ))}


      {
        hasMore && (
          <div className="flex justify-center my-4">
            <span ref={observeRef} className="loading loading-spinner loading-lg"></span>
          </div>
        )
      }


    </>
  );
}
