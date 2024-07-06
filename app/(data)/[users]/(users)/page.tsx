'use client'

import { useProfile } from '@lens-protocol/react-web'

import { PUBposts } from '@/components/lnes/DataUsers/list/PUBposts';


export default function ProfileA({ params: { users }, }) {

  // 将用户的名字和命名空间从 'users' 参数中拆分出来
  //users = users.split('.')[0];
  //const namespace = users.split('.')[1];

  // 使用拆分出来的命名空间和用户名调用 useProfile 钩子
  let { data: profile, loading } = useProfile({
    forHandle: `lens/${users}`
  });

  return (
    <div className='lg:min-w-4xl mx-auto  '>
      {loading && <div className=" w-full"><Loading /><Loading /><Loading /></div>}
      {profile && <PUBposts profile={profile} />}

    </div>
  )
}
function Loading() {
  return (
    <>
      <div className="flex flex-col gap-4  max-w-4xl lg:min-w-4xl p-6">

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

        <div className=" justify-around flex items-center">
          <div className="skeleton w-8 h-8 rounded-lg shrink-0"></div>
          <div className="skeleton w-8 h-8 rounded-lg shrink-0"></div>
          <div className="skeleton w-8 h-8 rounded-lg shrink-0"></div>
          <div className="skeleton w-8 h-8 rounded-lg shrink-0"></div>
        </div>

      </div>
    </>
  )
}










