'use client'

import { useProfile } from '@lens-protocol/react-web'

import Loading from './loading'
import { PUBposts } from '@/components/lnes/DataUsers/list/PUBposts';


export default function ProfileA({ params: { users }, }) {

  // 将用户的名字和命名空间从 'users' 参数中拆分出来
  //users = users.split('.')[0];
  //const namespace = users.split('.')[1];

  // 使用拆分出来的命名空间和用户名调用 useProfile 钩子
  let { data: profile, loading } = useProfile({
    forHandle: `lens/${users}`
  });

  
  if (loading) return <p className="md:mt-16 w-full"><Loading /><Loading /><Loading /></p>

  return (
    <div className='lg:min-w-4xl mx-auto biorder-b '>

      {profile && <PUBposts profile={profile} />}

    </div>
  )
}











