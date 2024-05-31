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
import Image from "next/image"


import ReactMarkdown from 'react-markdown'

import InteractCard from '@/components/postslist/InteractCard'
import { RiLoader4Line } from 'react-icons/ri'
import { useRouter } from 'next/navigation'
import Avatar from '@/gui/flowbite/Avatar'
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
      <div className="flex flex-1 flex-wrap flex-col max-w-4xl mx-auto">


        {loadingMusicPubs && (
          <div className=" flex flex-1 justify-center items-center ">
            <RiLoader4Line className="h-12 w-12 animate-spin" />
          </div>
        )}


        {musicPubs?.map(publication => (
          <div
            className="border-b border-l border-r sm:border-r-0 sm:border-l-0 hover:bg-[#6463631a]"
            key={publication.id}
            onClick={() => router.push(`https://share.lens.xyz/p/${publication.id}`)}
          >
            <div className="space-y-3 mb-4 p-4">


              <div className="flex">

                <Avatar src={publication.by?.metadata?.picture?.optimized?.uri} alt={publication.by.handle.localName} />

                <div className="ml-4">
                  <h3 className="mb-1 font-medium leading-none">{publication.by.handle.localName}.{publication.by.handle.namespace}</h3>
                  <p className="text-xs text-muted-foreground">{publication.by.handle.fullName}</p>
                </div>
              </div>


              <div>
                <img
                  className={`max-w-[400px] h-auto sm:max-w-[100%]   sm:h-auto mb-3  sm:rounded-none  rounded-2xl object-cover`}
                  alt='audio img'
                  src={publication.__typename === 'Post' ?
                    publication.metadata?.asset?.cover?.optimized?.uri ?
                      publication.metadata?.asset?.cover?.optimized?.uri :
                      publication.metadata?.asset?.cover?.optimized?.raw?.uri : ''}
                />
                <audio controls>
                  <source
                    type={publication.metadata?.asset?.audio?.optimized?.mimeType}
                    src={publication.metadata?.asset?.audio?.optimized?.uri}
                  />
                </audio>
                <ReactMarkdown className=" mt-4 break-words ">
                  {publication.metadata.content.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '[LINK]($1)')}
                </ReactMarkdown>
              </div>


              <InteractCard dataname={publication} />


            </div>

          </div>
        ))
        }
      </div>
    </>
  )
}