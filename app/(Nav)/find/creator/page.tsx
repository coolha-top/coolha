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



import { RiLoader4Line } from 'react-icons/ri'
import { useRouter } from 'next/navigation'
import Avatar from '@/gui/flowbite/Avatar'
import { useInfiniteScroll } from '@/hooks/lens/useInfiniteScroll'
import AvatarName from '@/components/lnes/PostsCard/AvatarName'



export default function Page() {

  let { data: profiles, error: profileError, loading: loadingProfiles, hasMore, observeRef } = useInfiniteScroll(useExploreProfiles({
    limit: LimitType.TwentyFive,
    orderBy: ExploreProfilesOrderByType.MostFollowers
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
  const router = useRouter()
  /* if (profiles.length === 0) return <p>No profiles found</p>; */
  return (
    <>
      <div className="flex mx-auto max-w-4xl justify-center">

        <div className=' flex  lg:flex-wrap flex-col w-full'>
          {profiles?.map(profile => (
            <div
              key={profile.id}
              className="p-4 hover:bg-[--link-hover-background]  sm:border sm:border-t-0 border-b border-e-0 cursor-pointer"
              onClick={() => router.push(`/${profile.handle.localName}`)}>
              <div className="space-y-3">
                <div className="overflow-hidden rounded-md flex flex-row">
                  <Avatar
                    /* className="h-auto w-auto object-cover transition-all hover:scale-105 aspect-square" */
                    src={profile.metadata?.picture?.optimized?.uri
                    }
                    alt={`${profile.metadata?.displayName}.Avatar`} />

                  <AvatarName localName={profile.handle?.localName ?? profile.id} displayName={profile.metadata.displayName} namespace={`lens`} createdAt={profile.createdAt} />
                </div>
                <div className='flex-1'></div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {hasMore && (
        <div className="flex justify-center my-4">
          <span ref={observeRef} className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {loadingProfiles && (
        <div className=" flex flex-1 justify-center items-center ">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
    </>
  )
}