'use client'
import { useState } from 'react'
import {
  useExploreProfiles,
  useExplorePublications,
  ExploreProfilesOrderByType,
  ExplorePublicationsOrderByType,
  ExplorePublicationType,
  LimitType
} from '@lens-protocol/react-web'


import ReactMarkdown from 'react-markdown'

import InteractCard from '@/components/lnes/PostsCard/InteractCard'
import { RiLoader4Line } from 'react-icons/ri'
import { useRouter } from 'next/navigation'
import Avatar from '@/gui/flowbite/Avatar'
import Avatarimg from '@/components/lnes/PostsCard/Avatarimg'
import AvatarName from '@/components/lnes/PostsCard/AvatarName'
import PosMusic from '@/components/lnes/PostsCard/PosMusic'
enum PublicationMetadataMainFocusType {
  Article = "ARTICLE",
  Audio = "AUDIO",
  CheckingIn = "CHECKING_IN",
  Embed = "EMBED",
  Event = "EVENT",
  Image = "IMAGE",
  Link = "LINK",
  Livestream = "LIVESTREAM",
  Mint = "MINT",
  ShortVideo = "SHORT_VIDEO",
  Space = "SPACE",
  Story = "STORY",
  TextOnly = "TEXT_ONLY",
  ThreeD = "THREE_D",
  Transaction = "TRANSACTION",
  Video = "VIDEO"
}
export default function Page() {
  const router = useRouter()
  let { data: profiles, error: profileError, loading: loadingProfiles } = useExploreProfiles({
    limit: LimitType.TwentyFive,
    orderBy: ExploreProfilesOrderByType.MostFollowers
  }) as any

  let { data: musicPubs, loading: loadingMusicPubs } = useExplorePublications({
    limit: LimitType.TwentyFive,
    orderBy: ExplorePublicationsOrderByType.TopCommented,
    where: {
      publicationTypes: [ExplorePublicationType.Post],
      metadata: {
        mainContentFocus: [PublicationMetadataMainFocusType.Audio]
      }
    }
  }) as any

  let { data: publications, loading: loadingPubs } = useExplorePublications({
    limit: LimitType.TwentyFive,
    orderBy: ExplorePublicationsOrderByType.LensCurated,
    where: {
      publicationTypes: [ExplorePublicationType.Post],
    }
  }) as any


  profiles = profiles?.filter(p => p.metadata?.picture?.optimized?.uri)

  publications = publications?.filter(p => {
    if (p.metadata && p.metadata.asset) {
      if (p.metadata.asset.image) return true
      return false
    }
    return true
  })

  return (
    <>
      <div className="flex flex-wrap flex-col justify-normal lg:justify-center lg:w-full w-[100vw]">


        {loadingMusicPubs && (
          <div className=" flex flex-1 justify-center items-center ">
            <RiLoader4Line className="h-12 w-12 animate-spin" />
          </div>
        )}


        {musicPubs?.map(mpub => (
          <div
            className="md:border  border-b border-t-0 hover:bg-[--link-hover-background] w-dvw  lg:max-w-4xl py-6 lg:px-6"
            key={mpub.id}
            onClick={() => router.push(`https://share.lens.xyz/p/${mpub.id}`)}
          >

            <div className=" flex px-6 lg:px-0">
              <div className="flex">
                <Avatarimg href={`/${mpub.by.handle.localName}`} src={mpub.by?.metadata?.picture?.optimized?.uri} alt={mpub.by.handle.localName} />
                <AvatarName localName={mpub.by.handle.localName} displayName={mpub.by.metadata.displayName} namespace={mpub.by.handle.namespace} />
              </div>
            </div>


            <div className='px-6  lg:px-0' >
              <ReactMarkdown className=" mt-4 break-words ">
                {mpub.metadata.content.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '[LINK]($1)')}
              </ReactMarkdown>
              <img
                className={`sm:max-w-[400px] h-auto max-w-[100%]   sm:h-auto mb-3  sm:rounded-none  rounded-2xl object-cover`}
                alt='audio img'
                src={mpub.__typename === 'Post' ?
                  mpub.metadata?.asset?.cover?.optimized?.uri ?
                    mpub.metadata?.asset?.cover?.optimized?.uri :
                    mpub.metadata?.asset?.cover?.optimized?.raw?.uri : ''}
              />
              <PosMusic
                type={mpub.metadata?.asset?.audio?.optimized?.mimeType}
                src={mpub.metadata?.asset?.audio?.optimized?.uri}
              />
            </div>


            <InteractCard dataname={mpub} />



          </div>
        ))
        }
      </div>
    </>
  )
}