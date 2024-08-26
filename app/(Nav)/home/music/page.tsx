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
import Menu from '@/components/lnes/PostsCard/Menu'
import { useOrderBy } from '../_contexts/OrderByContext'
import { orderOptions } from '../_contexts/OrderBylist'
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
  const { state, dispatch } = useOrderBy(); // 使用useOrderBy获取全局状态和dispatch函数
  const { orderBy } = state;

  const handleOrderByChange = (type: ExplorePublicationsOrderByType) => {
    dispatch({ type: 'SET_ORDER_BY', payload: type });
  };


  let { data: musicPubs, loading: loadingMusicPubs, hasMore, observeRef } = useInfiniteScroll(useExplorePublications({
    limit: LimitType.TwentyFive,
    orderBy,
    where: {
      publicationTypes: [ExplorePublicationType.Post],
      metadata: {
        mainContentFocus: [PublicationMetadataMainFocusType.Audio]
      }
    }
  })) as any



  return (
    <>
      {/* 算法 */}
      <div className="flex flex-row w-full z-20 h-12 items-center bg-base-100 overflow-x-auto">
        {orderOptions.map((option) => (
          <div className='m-1' key={option.key}>
            <button
              className={`btn btn-sm ${orderBy === option.key ? 'text-info' : ''}`}
              onClick={() => handleOrderByChange(option.key)}
            >
              {option.title}
            </button>
          </div>
        ))}
      </div>

      
      <div className="flex flex-wrap flex-col justify-normal lg:justify-center lg:w-full w-[100vw]">


        {loadingMusicPubs && (
          <div className=" flex flex-1 justify-center items-center ">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}


        {musicPubs?.map(mpub => (
          <div
            className="bg-base-100 hover:bg-[--link-hover-background] w-dvw  lg:max-w-4xl p-4 mt-2 "
            key={mpub.id}
            
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
                  createdAt={mpub.createdAt} />
              </div>
              <div className="flex-1" ></div>
              <Menu />
            </div>


            <div className='' onClick={() => router.push(`https://share.lens.xyz/p/${mpub.id}`)}>

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