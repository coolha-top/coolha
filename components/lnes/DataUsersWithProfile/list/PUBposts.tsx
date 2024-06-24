'use client'
import { ExplorePublicationsOrderByType, LimitType, Profile, profileId, PublicationType, usePublications } from "@lens-protocol/react-web"
import Avatarimg from "../../PostsCard/Avatarimg"
import AvatarName from "../../PostsCard/AvatarName"
import ReactMarkdown from "react-markdown"
import InteractCard from "../../PostsCard/InteractCard"
import Avatar from "@/gui/flowbite/Avatar"
import router from "next/router"
import Link from "next/link"
import PosImage from "../../PostsCard/PosImage"
import { useInfiniteScroll } from "@/hooks/lens/useInfiniteScroll"
import { UsersPosAtext } from "../../PostsCard/PosAtext"
import Meide from "../../PostsCard/Meide"

export function PUBposts({
  profile
}: {
  profile: Profile
}) {
  let { data: publications, hasMore, loading, observeRef } = useInfiniteScroll(usePublications({
    limit: LimitType.TwentyFive,
    //orderBy: ExplorePublicationsOrderByType.LensCurated,
    where: {
      from: [profile?.id],
      publicationTypes: [/*PublicationType.Mirror,*/PublicationType.Post, PublicationType.Quote],
    },
  }))



  return (
    <div className=" flex flex-wrap flex-col justify-normal lg:justify-center lg:w-full w-dvw">

      {publications?.map((pub: any, index: number) => (
        <div key={index} className=" border-b  hover:bg-[--link-hover-background]  lg:max-w-4xl w-dvw  p-6 pb-8">

          {/* users  */}
          <div className="flex  ">
            <div className="flex" >
              <Avatar src={pub.by?.metadata?.picture?.optimized?.uri} alt={pub.by.handle.localName} />
              <AvatarName
                localName={pub.by.handle.localName}
                displayName={pub.by.metadata?.displayName}
                namespace={pub.by.handle.namespace}
                createdAt={pub.by.createdAt}
              />
            </div>
          </div>

          {/* users posts data  */}
          <div className='mb-1'>
            <Link href={`/posts/${pub.id}`} passHref legacyBehavior>
              <div>
                {pub.metadata.content && <UsersPosAtext content={pub.metadata.content} />}
                <Meide pub={pub.metadata.asset}/>
              </div>
            </Link>
          </div>

          {/* 如果是引用类型的帖子，显示引用的内容 */}
          {pub.__typename === "Quote" && (
            <div className="p-4 border rounded-2xl hover:bg-[--link-hover-background]">

              <div className="flex" >
                <Avatarimg src={pub.quoteOn.by?.metadata?.picture?.optimized?.uri}  href={pub.by.handle.localName} />
                <AvatarName
                  localName={pub.quoteOn.by.handle.localName}
                  displayName={pub.quoteOn.by.metadata?.displayName}
                  namespace={pub.quoteOn.by.handle.namespace}
                  createdAt={pub.quoteOn.by.createdAt}
                />
              </div>

              <Link href={`/posts/${pub.quoteOn.id}`} passHref>
                <UsersPosAtext content={pub.quoteOn.metadata.content} />
                <Meide pub={pub.quoteOn.metadata.asset} />
              </Link>
            </div>
          )}

          <InteractCard dataname={pub} />

        </div>
      ))}

      {hasMore && (
        <div className="flex justify-center my-4">
          <span ref={observeRef} className="loading loading-spinner loading-lg"></span>
        </div>
      )}

    </div>
  )
}