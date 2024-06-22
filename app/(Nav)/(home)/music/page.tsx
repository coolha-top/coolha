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
import { UsersPosAtext } from '@/components/lnes/PostsCard/PosAtext'
import PosMusic from '@/components/lnes/PostsCard/PosMusic'
import { useInfiniteScroll } from '@/hooks/lens/useInfiniteScroll'
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

  let { data: musicPubs, loading: loadingMusicPubs, hasMore, observeRef } = useInfiniteScroll(useExplorePublications({
    limit: LimitType.TwentyFive,
    orderBy: ExplorePublicationsOrderByType.TopCommented,
    where: {
      publicationTypes: [ExplorePublicationType.Post],
      metadata: {
        mainContentFocus: [PublicationMetadataMainFocusType.Audio]
      }
    }
  })) as any

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
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}


        {musicPubs?.map(mpub => (
          <div
            className="border-b border-x hover:bg-[--link-hover-background] w-dvw  lg:max-w-4xl p-6 "
            key={mpub.id}
            onClick={() => router.push(`https://share.lens.xyz/p/${mpub.id}`)}
          >

            <div className=" flex">
              <div className="flex">
                <Avatarimg
                  href={mpub.by.handle.localName}
                  src={mpub.by}
                />
                <AvatarName
                  localName={mpub.by.handle.localName}
                  displayName={mpub.by?.metadata?.displayName} namespace={mpub.by.handle.namespace}
                  createdAt={mpub.by.createdAt} />
              </div>
            </div>


            <div className='' >

              <UsersPosAtext content={mpub.metadata.content} />
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
        ))}

        {hasMore && (
          <div className="flex justify-center my-4">
            <span ref={observeRef} className="loading loading-spinner loading-lg"></span>
          </div>
        )}

      </div>
    </>
  )
}