'use client'
import { useState } from 'react'
import {
  useExploreProfiles,
  useExplorePublications,
  ExploreProfilesOrderByType,
  ExplorePublicationsOrderByType,
  ExplorePublicationType,
  LimitType,
  PublicationMetadataMainFocusType
} from '@lens-protocol/react-web'


import ReactMarkdown from 'react-markdown'

import InteractCard from '@/components/lnes/PostsCard/InteractCard'

import Avatar from '@/gui/flowbite/Avatar'
import Avatarimg from '@/components/lnes/PostsCard/Avatarimg'
import AvatarName from '@/components/lnes/PostsCard/AvatarName'
import { UsersPosAtext } from '@/components/lnes/PostsCard/PosAtext'
import { useInfiniteScroll } from '@/components/lnes/DataUsers/hook/useInfiniteScroll'
import Menu from '@/components/lnes/PostsCard/Menu/Menu'
import PosVideo from '@/components/lnes/PostsCard/PosVideo'
import { useOrderBy } from '../_contexts/OrderByContext'
import { orderOptions } from '../_contexts/OrderBylist'
import PosImage from '@/components/lnes/PostsCard/PosImage'
import Link from 'next/link'

export default function Page() {
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
        mainContentFocus: [PublicationMetadataMainFocusType.Image]
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
              className={`px-1 md:btn md:btn-sm ${orderBy === option.key ? ' text-info md:btn-primary' : ''}`}
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
          /*  onClick={() => router.push(`https://share.lens.xyz/p/${mpub.id}`)} */
          >

            <div className=" flex">
              <div className="flex">
                <Avatarimg
                  href={mpub.by && mpub.by.handle ? mpub.by.handle.localName : mpub.by.id}
                  src={mpub.by}
                />
                <AvatarName
                  localName={mpub.by && mpub.by.handle ? mpub.by.handle.localName : mpub.by.id}
                  displayName={mpub.by?.metadata?.displayName} 
                  namespace={mpub.by && mpub.by.handle ? mpub.by.handle.namespace : ''}
                  id={mpub}
                  createdAt={mpub.createdAt} />
              </div>
              <div className="flex-1 flex" ><Link href={`posts/${mpub.id}`} className="flex-1"></Link></div>
              <Menu pub={mpub} />
            </div>


            <div className='' >

              <UsersPosAtext content={mpub.metadata.content} />

              <PosImage
                src={mpub.metadata?.asset?.image?.optimized?.uri}
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