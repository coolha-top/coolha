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
import InteractCard from '@/components/postslist/InteractCard';

import { RiLoader4Line } from "react-icons/ri";
import Posimg from '@/components/postslist/Posimg';
import Avatarimg from '@/components/postslist/Avatarimg';
import AvatarName from '@/components/postslist/AvatarName';
import PosText from '@/components/postslist/PosText';
import { useRouter } from 'next/navigation';


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
        {
          loadingPubs && (
            <div className=" flex justify-center items-center ">
              <RiLoader4Line className="h-12 w-12 animate-spin" />
            </div>
          )
        }


        {publications?.map((publication: any) => (
          <div key={publication.id} className="md:border  border-b border-t-0 hover:bg-[--link-hover-background] w-dvw  lg:max-w-4xl py-6 lg:px-6" >

            {/* users  */}
            <div className=" flex px-6 lg:px-0">
              <div className="flex " >
                <Avatarimg dataname={publication} />
                <AvatarName dataname={publication} />
              </div>
            </div>

            {/* users posts data  */}
            <div className='px-6  lg:px-0' onClick={() => router.push(`/${publication.by.handle.localName}.lens/posts/${publication.id}`)}>
              <PosText content={publication.metadata.content} />


              {/* <Posimg src={publication.__typename === 'Post' ? publication.metadata?.asset?.image?.optimized.url : ''} /> */}
            </div>

            {/* InteractCard */}
            <InteractCard dataname={publication} />

          </div>
        ))}


      </div>
    </>
  )
}

