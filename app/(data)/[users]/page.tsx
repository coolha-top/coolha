'use client'
import Avatarimg from '@/components/postslist/Avatarimg'
import InteractCard from '@/components/postslist/InteractCard'
import {
  useProfile, usePublications, Profile, LimitType, PublicationType
} from '@lens-protocol/react-web'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

export default function ProfileA({ params: { users } }) {
  const namespace = users.split('.')[1]
  users = users.split('.')[0]
  let { data: profile, loading } = useProfile({
    forHandle: `${namespace}/${users}`
  })
  if (loading) return <p className="p-14">Loading ...</p>

  return (
    <div className='max-w-4xl mx-auto'>
      <div className="flex items-center space-x-4">
        {profile?.metadata?.picture?.__typename === 'ImageSet' && (
          <img
            alt='posts data'
            width={100}
            height={100}
            className="rounded-xl w-[100px] h-[100px]"
            src={profile.metadata.picture.optimized?.uri}
          />
        )}
        <div>
          <b className=" text-xl">{profile?.metadata?.displayName}</b>
          <p className="text-xs caret-slate-500">{profile?.handle?.localName}.{profile?.handle?.namespace}
          </p>
        </div>
      </div>
      <div><p className="text-base">{profile?.metadata?.bio}</p></div>
      {profile && <Publications profile={profile} />}
    </div>
  )
}

function Publications({
  profile
}: {
  profile: Profile
}) {
  let { data: publications } = usePublications({
    where: {
      publicationTypes: [PublicationType.Post],
      from: [profile.id],
    },
    limit: LimitType.TwentyFive
  })
  return (
    <>

      {publications?.map((pub: any, index: number) => (
        <div key={index} className="border border-b-0   sm:rounded-none hover:bg-[--link-hover-background] p-6 sm:px-2">

          {/* users  */}
          <div className="flex">
            <div className="flex" >
              <Avatarimg dataname={pub.by?.metadata?.picture?.optimized?.uri} />

              <div className="sm:ml-3 ml-4">
                <b>{pub.by.metadata?.displayName}</b>
                <p className="text-[#878787]">
                  {pub.by.handle.localName}.{pub.by.handle.namespace}
                </p>
              </div>
            </div>
          </div>

          {/* users posts data  */}
          <div className='max-w-[100%] '>
            <ReactMarkdown className=" h-auto">
              {pub.metadata.content.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '[LINK]($1)')}
            </ReactMarkdown>
          </div>
          {pub.metadata?.asset?.image?.optimized?.uri && (
            <img
              alt="user posts img"
              className='max-w-[400px] h-auto sm:max-w-[100%] sm:h-auto sm:rounded-none  rounded-2xl object-cover'
              src={pub.metadata?.asset?.image?.optimized?.uri}
            />
          )}

          {/* InteractCard */}
          <InteractCard dataname={pub} />

        </div>
      ))
      }
    </>
  )
}

