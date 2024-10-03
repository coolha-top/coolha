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
  LimitType,
  PublicationMetadataMainFocusType
} from '@lens-protocol/react-web'



import Avatarimg from '@/components/lnes/PostsCard/Avatarimg';
import AvatarName from '@/components/lnes/PostsCard/AvatarName';
import { PosAtext, UsersPosAtext } from '@/components/lnes/PostsCard/PosAtext';
import PosImage from '@/components/lnes/PostsCard/PosImage';
import PosVideo from '@/components/lnes/PostsCard/PosVideo'; // 添加视频组件
import PosMusic from '@/components/lnes/PostsCard/PosMusic'; // 添加音频组件
import InteractCard from '@/components/lnes/PostsCard/InteractCard';

import { useInfiniteScroll } from '@/components/lnes/DataUsers/hook/useInfiniteScroll';
import { timeAgo } from '@/utils/formatDate';
import Meide from '@/components/lnes/PostsCard/Meide';
import Menu from '@/components/lnes/PostsCard/Menu/Menu';
import { useOrderBy } from './_contexts/OrderByContext';
import { orderOptions } from './_contexts/OrderBylist';





export default function Page() {
  const { state, dispatch } = useOrderBy(); // 使用useOrderBy获取全局状态和dispatch函数
  const { orderBy } = state;

  const handleOrderByChange = (type: ExplorePublicationsOrderByType) => {
    dispatch({ type: 'SET_ORDER_BY', payload: type });
  };

  let { data: publications, loading: loadingPubs, hasMore, observeRef } = useInfiniteScroll(useExplorePublications({
    limit: LimitType.Ten,
    orderBy,
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

      {/* 算法 */}
      <div className="  flex flex-row  z-20 h-12 items-center bg-base-100 overflow-x-auto">
        {orderOptions.map((option) => (
          <div className='m-1' key={option.key}>
            <button
              className={`px-1 md:btn md:btn-sm ${orderBy === option.key ? 'text-info md:btn-primary' : ''}`}
              onClick={() => handleOrderByChange(option.key)}
            >
              {option.title}
            </button>
          </div>
        ))}
      </div>


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
          <div className=" bg-base-100 hover:bg-[--link-hover-background] w-dvw  lg:max-w-4xl p-4 mt-2" key={pub.id}>

            <div className=" flex ">
              <div className="flex " onClick={(e) => e.stopPropagation()}>
                <Avatarimg
                  href={pub.by && pub.by.handle ? pub.by.handle.localName : pub.by.id}
                  src={pub.by}
                />
                <AvatarName
                  localName={pub.by && pub.by.handle ? pub.by.handle.localName : pub.by.id}
                  displayName={pub.by && pub.by.metadata ? pub.by.metadata.displayName : ''}
                  namespace={pub.by && pub.by.handle ? pub.by.handle.namespace : ''}
                  id={pub}
                  createdAt={pub.createdAt}
                />
              </div>

              <div className="flex-1 flex" ><Link href={`posts/${pub.id}`} className="flex-1"></Link></div>
              <Menu pub={pub} />

            </div>

            <div className=' '>
              <Link href={`posts/${pub.id}`} >
                <PosAtext content={pub.metadata.content} />
                <Meide pub={pub.metadata.asset} />
              </Link>

              {/* 如果是引用类型的帖子，显示引用的内容 */}
              {pub.__typename === "Quote" && (
                <div className="pl-0 pt-2">
                  <div className="p-4 border rounded-2xl hover:bg-[--link-hover-background]">

                    <div className="flex" >
                      <Avatarimg src={pub.quoteOn.by} href={pub.by.handle.localName} />
                      <AvatarName
                        localName={pub.quoteOn.by.handle.localName}
                        displayName={pub.quoteOn.by.metadata?.displayName}
                        namespace={pub.quoteOn.by.handle.namespace}
                        id={pub.quoteOn}
                        createdAt={pub.quoteOn.createdAt}
                      />
                      <div className="flex-1 flex" ><Link href={`/posts/${pub.quoteOn.id}`} passHref className="flex-1"></Link></div>
                    </div>

                    <Link href={`/posts/${pub.quoteOn.id}`} passHref>
                      <PosAtext content={pub.quoteOn.metadata.content} />
                      <Meide pub={pub.quoteOn.metadata.asset} />
                    </Link>
                  </div>
                </div>
              )}

            </div>


            <InteractCard dataname={pub} />

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


function Loading() {
  return (
    <>
      <div className="flex flex-col gap-4 w-full p-4 bg-base-100">

        <div className="flex gap-4 items-center w-full">
          <div className="skeleton w-12 h-12 rounded-full shrink-0"></div>
          <div className="flex flex-col gap-0.5">
            <div className="skeleton h-6 w-64"></div>
            <div className="skeleton h-5 w-16"></div>
          </div>
          <div className='flex-1'></div>
          <div className="skeleton w-8 h-8 rounded-full shrink-0"></div>
        </div>

        <div className="skeleton h-2 w-full px-6"></div>
        <div className="skeleton h-2 w-full px-6"></div>
        <div className="skeleton h-2 w-full px-6"></div>

        <div className="skeleton h-96 w-full lg:w-1/2 px-6"></div>

        <div className=" gap-0.5 justify-around flex items-center ">
          <div className="skeleton w-8 h-8 rounded-lg shrink-0"></div>
          <div className="skeleton w-8 h-8 rounded-lg shrink-0"></div>
          <div className="skeleton w-8 h-8 rounded-lg shrink-0"></div>
          <div className="skeleton w-8 h-8 rounded-lg shrink-0"></div>
          <div className="skeleton w-8 h-8 rounded-lg shrink-0"></div>
        </div>

      </div>
    </>
  )
}