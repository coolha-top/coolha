'use client'
import { useState } from 'react'
import {
  useExploreProfiles,
  useExplorePublications,
  ExploreProfilesOrderByType,
  ExplorePublicationsOrderByType,
  ExplorePublicationType,
  LimitType,
  useRecommendedProfiles,
  profileId,
  useSession,
  useProfile,
  SessionType
} from '@lens-protocol/react-web'



import { RiLoader4Line } from 'react-icons/ri'
import { useRouter } from 'next/navigation'
import Avatar from '@/gui/flowbite/Avatar'
import { useInfiniteScroll } from '@/components/lnes/DataUsers/hook/useInfiniteScroll'
import AvatarName from '@/components/lnes/PostsCard/AvatarName'
import BFollow from '@/components/lnes/DataUsers/hook/BFollow'
import Avatarimg from '@/components/lnes/PostsCard/Avatarimg'



export default function Page() {
  const { data: datauseSession } = useSession({ suspense: true });

  let { data: profiles, error: profileError, loading: loadingProfiles, hasMore, observeRef } = useInfiniteScroll(useExploreProfiles({
    limit: LimitType.TwentyFive,
    orderBy: ExploreProfilesOrderByType.MostFollowers
  })) as any



  profiles = profiles?.filter(p => p.metadata?.picture?.optimized?.uri)


  const router = useRouter()
  /* if (profiles.length === 0) return <p>No profiles found</p>; */

  if (datauseSession && datauseSession.type === SessionType.WithProfile) {
    const ProfileWithProfile = datauseSession.profile.handle?.fullHandle ?? datauseSession.profile.id;
    const { data: profile } = useProfile({
      forHandle: ProfileWithProfile
    });
    const { data: RecommendedProfiles } = useRecommendedProfiles({
      for: profileId(profile?.id ? profile?.id : ''),
    });
    return (
      <div className="flex mx-auto max-w-3xl justify-center">

        <div className=' flex  lg:flex-wrap flex-col w-full '>
          {RecommendedProfiles?.map(profile => (
            <div
              key={profile.id}
              className="p-4 mt-2 bg-base-100 hover:bg-[--link-hover-background]  cursor-pointer"
              onClick={() => router.push(`/u/${profile?.handle?.localName}`)}>
              <div className="space-y-3 flex">
                <div className="overflow-hidden rounded-md flex flex-row">
                  <Avatarimg
                    href={profile.handle ? profile.handle.localName : profile.id}
                    src={profile} />
                  <AvatarName localName={profile.handle?.localName ?? profile.id} displayName={profile?.metadata?.displayName} namespace={`lens`} createdAt={profile.createdAt} id={profile} />
                </div>
                <div className='flex-1'></div>
                {/* <BFollow profile={profile} /> */}
              </div>
            </div>
          ))}
        </div>

      </div>
    )
  }

  return (
    <>
      <div className="flex mx-auto max-w-3xl justify-center">

        <div className=' flex  lg:flex-wrap flex-col w-full '>
          {profiles?.map(profile => (
            <div
              key={profile.id}
              className="p-4 mt-2 bg-base-100 hover:bg-[--link-hover-background]  cursor-pointer"
              onClick={() => router.push(`/u/${profile.handle.localName}`)}>
              <div className="space-y-3 flex">
                <div className="overflow-hidden rounded-md flex flex-row">
                  <Avatar
                    /* className="h-auto w-auto object-cover transition-all hover:scale-105 aspect-square" */
                    src={profile.metadata?.picture?.optimized?.uri
                    }
                    alt={`${profile.metadata?.displayName}.Avatar`} />

                  <AvatarName localName={profile.handle?.localName ?? profile.id} displayName={profile.metadata.displayName} namespace={`lens`} createdAt={profile.createdAt} id={profile} />
                </div>
                <div className='flex-1'></div>
                {/* <BFollow profile={profile} /> */}
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

      {/*       {loadingProfiles && (
        <div className=" flex flex-1 justify-center items-center ">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )} */}
    </>
  )
}