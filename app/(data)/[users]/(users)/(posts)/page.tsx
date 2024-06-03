'use client'

import { useProfile } from '@lens-protocol/react-web'

import { PubPosts } from '@/components/lnes/DataUsers/PubPosts'
import Loading from './loading'


export default function ProfileA({ params: { users }, }) {

  const namespace = users.split('.')[1]
  users = users.split('.')[0]
  let { data: profile, loading } = useProfile({
    forHandle: `${namespace}/${users}`
  })
  if (loading) return <p className="md:mt-16 w-full"><Loading /><Loading /><Loading /></p>

  return (
    <div className='lg:min-w-4xl mx-auto biorder-b '>

      {profile && <PubPosts profile={profile} />}

    </div>
  )
}











