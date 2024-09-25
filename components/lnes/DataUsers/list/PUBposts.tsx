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
import { useInfiniteScroll } from "@/components/lnes/DataUsers/hook/useInfiniteScroll"
import { UsersPosAtext } from "../../PostsCard/PosAtext"
import Meide from "../../PostsCard/Meide"
import Menu from "../../PostsCard/Menu/Menu"
import { RiLoopLeftFill } from "react-icons/ri"

export function PUBposts({
  profile
}) {
  let { data: publications, hasMore, loading, observeRef } = useInfiniteScroll(usePublications({
    limit: LimitType.TwentyFive,
    //orderBy: ExplorePublicationsOrderByType.LensCurated,
    where: {
      from: [profile?.id],
      publicationTypes: [PublicationType.Mirror, PublicationType.Post, PublicationType.Quote],
    },
  }))

  return (
    <div className=" flex flex-wrap flex-col justify-normal lg:justify-center lg:w-full w-dvw">

      {publications?.map((pub: any, index: number) => (
        <div key={index} className=" bg-base-100 hover:bg-[--link-hover-background]  lg:max-w-4xl w-dvw mt-2 p-4 pb-6">

          {pub.__typename === "Mirror" ? (
            <>
              <div className="mb-3 flex flex-row gap-0.5 text-base-content/70">
                <RiLoopLeftFill className="size-6" />
                <b className=""> {pub.by.metadata?.displayName} </b>
                <span className=""> 转发了</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex  ">
                <div className="flex" >
                  <Avatarimg src={pub.by} href={pub.by.handle.localName} />
                  <AvatarName
                    localName={pub.by.handle.localName}
                    displayName={pub.by.metadata?.displayName}
                    namespace={pub.by.handle.namespace}
                    id={pub}
                    createdAt={pub.createdAt}
                  />
                </div>
                <div className="flex-1" ></div>
                <Menu pub={pub} />
              </div>
              <Link href={`/posts/${pub.id}`} passHref legacyBehavior>
                <div>

                  <UsersPosAtext content={pub.metadata.content} />
                  <Meide pub={pub.metadata.asset} />

                </div>
              </Link>
            </>

          )}

          {/* 如果是引用类型的帖子，显示引用的内容 */}
          {
            pub.__typename === "Quote" && (
              <div className="p-6 pl-0">
                <div className="p-4 border rounded-2xl hover:bg-[--link-hover-background]">

                  <div className="flex" >
                    <Avatarimg src={pub.quoteOn.by} href={pub.by.handle.localName} />
                    <AvatarName
                      localName={pub.quoteOn.by.handle.localName}
                      displayName={pub.quoteOn.by.metadata?.displayName}
                      namespace={pub.quoteOn.by.handle.namespace}
                      id={pub.quoteOn}
                      createdAt={pub.quoteOn.createdAt}
                    />
                    <div className="flex-1" ></div>
                  </div>

                  <Link href={`/posts/${pub.quoteOn.id}`} passHref>
                    <UsersPosAtext content={pub.quoteOn.metadata.content} />
                    <Meide pub={pub.quoteOn.metadata.asset} />
                  </Link>
                </div>
              </div>
            )
          }

          {/*Mirror  */}
          {pub.__typename === "Mirror" && (
            <div >

              <div className="flex" >
                <Avatarimg src={pub.mirrorOn.by} href={pub.by.handle.localName} />
                <AvatarName
                  localName={pub.mirrorOn.by.handle.localName}
                  displayName={pub.mirrorOn.by.metadata?.displayName}
                  namespace={pub.mirrorOn.by.handle.namespace}
                  id={pub.mirrorOn}
                  createdAt={pub.mirrorOn.createdAt}
                />
                <div className="flex-1" ></div>
                <Menu pub={pub.mirrorOn} />
              </div>

              <Link href={`/posts/${pub.mirrorOn.id}`} passHref>
                <UsersPosAtext content={pub.mirrorOn.metadata.content} />
                <Meide pub={pub.mirrorOn.metadata.asset} />
              </Link>
            </div>
          )
          }


          {pub.__typename === "Mirror" ? (<><InteractCard dataname={pub.mirrorOn} /></>
          ) : (<InteractCard dataname={pub} />)}

        </div >
      ))
      }

      {
        hasMore && (
          <div className="flex justify-center my-4 bg-base-100">
            <span ref={observeRef} className="loading loading-spinner loading-lg"></span>
          </div>
        )
      }

    </div >
  )
}