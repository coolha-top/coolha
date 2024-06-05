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

export function PUBposts({
  profile
}: {
  profile: Profile
}) {
  let { data: publications } = usePublications({
    limit: LimitType.TwentyFive,
    //orderBy: ExplorePublicationsOrderByType.LensCurated,
    where: {
      from: [profile?.id],
      publicationTypes: [PublicationType.Post],
    },
  })
  return (
    <div className=" flex flex-wrap flex-col justify-normal lg:justify-center lg:w-full w-dvw">

      {publications?.map((pub: any, index: number) => (
        <div key={index} className=" border-b  hover:bg-[--link-hover-background]  lg:max-w-4xl w-dvw  py-6 pb-8">

          {/* users  */}
          <div className="flex  px-6">
            <div className="flex" >
              <Avatar src={pub.by?.metadata?.picture?.optimized?.uri} alt={pub.by.handle.localName} />
              <AvatarName localName={pub.by.handle.localName} displayName={pub.by.metadata?.displayName} namespace={pub.by.handle.namespace} />
            </div>
          </div>

          {/* users posts data  */}
          <div className=' px-6'>
            <Link href={`/${pub.by.handle.localName}/posts/${pub.id}`}>
              <ReactMarkdown className=" h-auto">
                {pub.metadata?.content && (
                  pub.metadata.content.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '[LINK]($1)')
                )}
              </ReactMarkdown>
              <PosImage src={pub.metadata?.asset?.image?.optimized?.uri} />
            </Link>
          </div>



          <InteractCard dataname={pub} />

        </div>
      ))}



    </div>
  )
}