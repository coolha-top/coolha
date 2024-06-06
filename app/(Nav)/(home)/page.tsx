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


import Avatarimg from '@/components/lnes/PostsCard/Avatarimg';
import AvatarName from '@/components/lnes/PostsCard/AvatarName';
import PosAtext from '@/components/lnes/PostsCard/PosAtext';
import PosImage from '@/components/lnes/PostsCard/PosImage';
import InteractCard from '@/components/lnes/PostsCard/InteractCard';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Loading from './loading';



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
            <div className=" flex justify-center items-center w-full flex-col">
              <Loading />
              <Loading />
              <Loading />
              {/*    <RiLoader4Line className="h-12 w-12 animate-spin" /> */}
            </div>
          )
        }


        {publications?.map((pub: any) => (
          <div key={pub.id} className="md:border  border-b border-t-0 hover:bg-[--link-hover-background] w-dvw  lg:max-w-4xl py-6 pb-8" >


            <div className=" flex px-6 ">
              <div className="flex " >
                <Avatarimg
                  href={`/${pub.by.handle.localName}`}
                  src={pub.by?.metadata?.picture?.optimized?.uri}
                  alt={pub.by.handle.localName} />
                <AvatarName
                  localName={pub.by.handle.localName}
                  displayName={pub.by.metadata?.displayName}
                  namespace={pub.by.handle.namespace} />
                {pub.metadata?.publishedOn?.InputMaybe}
              </div>
            </div>

            <div className='px-6 '>
              <Link href={`/${pub.by.handle.localName}/posts/${pub.id}`}>
                <PosAtext content={pub.metadata.content} />
                <PosImage src={pub.metadata?.asset?.image?.optimized?.uri} />
              </Link>
            </div>


            <InteractCard dataname={pub} />

          </div>
        ))}


      </div>
    </>
  )
}

