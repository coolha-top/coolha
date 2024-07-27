'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
import { PosAtext } from '@/components/lnes/PostsCard/PosAtext';
import PosImage from '@/components/lnes/PostsCard/PosImage';
import PosVideo from '@/components/lnes/PostsCard/PosVideo'; // 添加视频组件
import PosMusic from '@/components/lnes/PostsCard/PosMusic'; // 添加音频组件
import InteractCard from '@/components/lnes/PostsCard/InteractCard';

import { useInfiniteScroll } from '@/hooks/lens/useInfiniteScroll';
import { timeAgo } from '@/utils/formatDate';
import Meide from '@/components/lnes/PostsCard/Meide';



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


  let { data: publications, loading: loadingPubs, hasMore, observeRef } = useInfiniteScroll(useExplorePublications({
    limit: LimitType.TwentyFive,
    orderBy: ExplorePublicationsOrderByType.LensCurated,
    where: {
      publicationTypes: [ExplorePublicationType.Post, ExplorePublicationType.Quote],
    }
  })) as any



  publications = publications?.filter(p => {
    if (p.metadata && p.metadata.asset) {
      if (p.metadata.asset.image) return true;
      if (p.metadata.asset.video || p.metadata.asset.audio) return true; // 添加音频和视频的判断
      return false;
    }
    return true;
  });

  return (
    <>
      <div className="flex flex-wrap flex-col justify-normal lg:justify-center lg:w-full w-[100vw]">
        {
          loadingPubs && (
            <div className=" flex justify-center items-center w-full flex-col">
              <Loading />
              <Loading />

              {/*    <RiLoader4Line className="h-12 w-12 animate-spin" /> */}
            </div>
          )
        }


        {publications?.map((pub: any) => (
          <Link href={`posts/${pub.id}`} key={pub.id}>
            <div className=" bg-base-100 hover:bg-[--link-hover-background] w-dvw  lg:max-w-4xl p-4 mt-2" >

              <div className=" flex ">
                <div className="flex " >
                  <Avatarimg
                    href={pub.by.handle.localName}
                    src={pub.by}

                  />
                  <AvatarName
                    localName={pub.by.handle.localName}
                    displayName={pub.by.metadata?.displayName}
                    namespace={pub.by.handle.namespace}
                    createdAt={pub.createdAt}
                  />
                </div>

              </div>

              <div className=' '>

                <PosAtext content={pub.metadata.content} />
                <Meide pub={pub.metadata.asset} />
              </div>


              <InteractCard dataname={pub} />

            </div>
          </Link>
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


function Loading() {
  return (
    <>
      <div className="flex flex-col gap-4 w-full p-6  bg-base-100">

        <div className="flex gap-4 items-center w-full">
          <div className="skeleton w-12 h-12 rounded-full shrink-0"></div>
          <div className="flex flex-col gap-0.5">
            <div className="skeleton h-6 w-32"></div>
            <div className="skeleton h-5 w-32"></div>
          </div>
          <div className='flex-1'></div>
          <div className="skeleton w-6 h-6 rounded-full shrink-0"></div>
        </div>

        <div className="skeleton h-2 w-full px-6"></div>
        <div className="skeleton h-2 w-full px-6"></div>
        <div className="skeleton h-2 w-full px-6"></div>

        <div className="skeleton h-96 w-full lg:w-1/2 px-6"></div>

        <div className=" gap-0.5 justify-around flex items-center">
          <div className="skeleton w-8 h-8 rounded-lg shrink-0"></div>
          <div className="skeleton w-8 h-8 rounded-lg shrink-0"></div>
          <div className="skeleton w-8 h-8 rounded-lg shrink-0"></div>
          <div className="skeleton w-8 h-8 rounded-lg shrink-0"></div>
        </div>

      </div>
    </>
  )
}