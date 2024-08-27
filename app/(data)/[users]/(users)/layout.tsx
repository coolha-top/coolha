'use client'
import { useProfile, useSession, SessionType } from '@lens-protocol/react-web';


import UsersHeader from '@/components/lnes/DataUsers/UsersHeader';
import UsersPicimg from '@/components/lnes/DataUsers/UsersPicimg';
import UsersMetadata from '@/components/lnes/DataUsers/UsersMetadata';
import UsersStats from '@/components/lnes/DataUsers/UsersStats';
import UseBio from '@/components/lnes/DataUsers/UseBio';

import UsersNav from '@/components/lnes/DataUsers/UsersNav';



export default function layout({ children, params: { users } }) {
    const { data: session } = useSession({ suspense: true });

    //当前登入的账户
    let profileHandle;
    if (session.type === SessionType.WithProfile && session.profile?.handle?.fullHandle) {
        profileHandle = session.profile.handle.fullHandle;
    }
    const isCurrentUser = profileHandle === `lens/${users}`;

    //获取路由params: { users }传入账户的数据
    const { data: profile, loading: loadingProfile } = useProfile({ forHandle: `lens/${users}` });

    //获取当前登入账户的数据
    const { data: profileWithProfile, loading: loadingWithProfile } = useProfile({ forHandle: profileHandle });






    /*   if (`lens/${users}` == profileHandle ) { */
    return (
        <div className="flex flex-wrap flex-col justify-normal lg:justify-center lg:w-full w-dvw ">
            <div className=' max-w-4xl lg:min-w-4xl mx-auto  w-full'>

                <UsersHeader name={users} />
                <div className=' flex-1 bg-base-200'>

                    {/* 当路由lens/${users}是profileHandle时显示profileWithProfile的组件,不是时显示params: { users }lens/${users}传入profile的组件 */}

                    <>

                        {/* 背景 */}
                        <UsersPicimg profile={profile} />
                        {/* 用户信息 */}
                        <UsersMetadata profile={profile} />
                        {/* 用户数据 */}
                        <div className='bg-base-100'>
                            <UsersStats profile={profile} name={users} />
                        </div>
                        {/* 简介 */}
                        <div className='w-full'>
                            <UseBio profile={profile} />
                        </div>
                        {/* 展开选项卡 */}
                        <UsersNav profile={profile} name={users} />
                    </>

                    {loadingProfile || loadingWithProfile && <>
                        <div className="max-w-4xl lg:min-w-4xl mx-auto w-full"><Loading /></div>
                    </>}
                    {children}
                </div>


            </div>
        </div >
    )
}


function Loading() {
    return (
        <>
            <div className="flex flex-col gap-4 w-full">

                <div className="skeleton h-36 w-full"></div>

                <div className="flex gap-4 items-center w-full px-6">
                    <div className="skeleton w-24 h-24 rounded-full shrink-0"></div>
                    <div className="flex flex-col gap-0.5">
                        <div className="skeleton h-8 w-28"></div>
                        <div className="skeleton h-5 w-28"></div>
                        <div className="skeleton h-5 w-28"></div>
                        <div className="skeleton h-5 w-28"></div>
                    </div>
                    <div className='flex-1'></div>
                    <div className="skeleton w-20 h-12 rounded-xl shrink-0"></div>
                </div>

                <div className="skeleton h-14 w-full px-6"></div>
                <div className="skeleton h-2 w-full px-6"></div>
                <div className="skeleton h-2 w-full px-6"></div>
                <div className="skeleton h-2 w-full px-6"></div>


                <div className="flex  gap-0.5 items-center">
                    <div className="skeleton w-1/4 h-12 rounded-sm shrink-0 mx-0.5"></div>
                    <div className="skeleton w-1/4 h-12 rounded-sm shrink-0 mx-0.5"></div>
                    <div className="skeleton w-1/4 h-12 rounded-sm shrink-0 mx-0.5"></div>
                    <div className="skeleton w-1/4 h-12 rounded-sm shrink-0 mx-0.5"></div>
                </div>

            </div>
        </>
    )
}