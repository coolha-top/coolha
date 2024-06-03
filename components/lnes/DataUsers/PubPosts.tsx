'use client'
import { LimitType, Profile, PublicationType, usePublications } from "@lens-protocol/react-web"
import Avatarimg from "../PostsCard/Avatarimg"
import AvatarName from "../PostsCard/AvatarName"
import ReactMarkdown from "react-markdown"
import InteractCard from "../PostsCard/InteractCard"
import Avatar from "@/gui/flowbite/Avatar"
import router from "next/router"
import Link from "next/link"

export function PubPosts({
  profile
}: {
  profile: Profile
}) {
  let { data: publications } = usePublications({
    where: {
      publicationTypes: [PublicationType.Post],
      from: [profile.id],
    },
    limit: LimitType.TwentyFive
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
            <Link href={`/${pub.by.handle.localName}.lens/posts/${pub.id}`}>
              <ReactMarkdown className=" h-auto">
                {pub.metadata.content.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '[LINK]($1)')}
              </ReactMarkdown>

              {pub.metadata?.asset?.image?.optimized?.uri && (
                <img
                  alt="user posts img"
                  className='sm:max-w-[400px] max-w-[100%] h-auto  mb-3 rounded-2xl object-cover'
                  src={pub.metadata?.asset?.image?.optimized?.uri}
                />
              )}
            </Link>
          </div>



          <InteractCard dataname={pub} />

        </div>
      ))}

    </div>
  )
}