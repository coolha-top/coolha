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

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {data?.map((comment: any, index: number) => (
        <>

          <div key={index} className=" border-b hover:bg-[--link-hover-background] lg:max-w-4xl w-dvw py-4  ">

            {/* 如果是引用类型的帖子，显示引用的内容 */}
            {comment.__typename === "Comment" && (
              <div className="p-6">
                <div className="p-4 border rounded-2xl hover:bg-[--link-hover-background]">
                  <div className="flex" >
                    <Avatarimg src={comment.commentOn.by?.metadata?.picture?.optimized?.uri} alt={comment.by.handle.localName} href={comment.by.handle.localName} />
                    <AvatarName
                      localName={comment.commentOn.by.handle.localName}
                      displayName={comment.commentOn.by.metadata?.displayName}
                      namespace={comment.commentOn.by.handle.namespace}
                      createdAt={comment.commentOn.by.createdAt}
                    />
                  </div>

                  <Link href={`/posts/${comment.commentOn.id}`} passHref>
                    <p className="">{comment.commentOn.metadata.content}</p>
                   
                    <Meide pub={comment.commentOn.metadata.asset} type={comment.commentOn.metadata?.asset?.audio?.optimized?.mimeType} />
                  </Link>
                  <InteractCard dataname={comment.commentOn} />
                </div>
              </div>
            )}



            <div className="p-6">
              <div className="p-4 border rounded-2xl hover:bg-[--link-hover-background]">

                {/* users */}
                <div className="flex">
                  <Avatar src={comment.by?.metadata?.picture?.optimized?.uri} alt={comment.by.handle.localName} />
                  <AvatarName localName={comment.by.handle.localName} displayName={comment.by.metadata?.displayName} namespace={comment.by.handle.namespace} createdAt={comment.by.createdAt} />
                </div>

                {/* users posts data */}
                <div className=''>
                  <Link href={`posts/${comment.id}`}>
                    {comment.metadata.content && <UsersPosAtext content={comment.metadata.content} />}
                    {comment.metadata?.asset?.image?.optimized?.uri && (
                      <PosImage src={comment.metadata.asset.image.optimized.uri} />
                    )}
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
