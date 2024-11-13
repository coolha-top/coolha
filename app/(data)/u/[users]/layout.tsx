'use client'
import { useProfile, useSession, SessionType, useProfiles, profileId } from '@lens-protocol/react-web';


import UsersHeader from '@/components/lnes/DataUsers/UsersHeader';
import UsersPicimg from '@/components/lnes/DataUsers/UsersPicimg';
import UsersMetadata from '@/components/lnes/DataUsers/UsersMetadata';
import UsersStats from '@/components/lnes/DataUsers/UsersStats';
import UseBio from '@/components/lnes/DataUsers/UseBio';

import UsersNav from '@/components/lnes/DataUsers/UsersNav';



export default function layout({ children, params: { users } }) {

    let profileData;
    let handle;

    const isProfileId = /^0x[0-9a-fA-F]+$/.test(users);

    if (isProfileId) {
        // 如果是 profileId，尝试获取对应的 handle
        const { data: profileById } = useProfile({
            forProfileId: users
        });

        if (profileById) {
            handle = profileById.handle?.localName
            if (handle) {
                const { data: profileByHandle } = useProfile({ forHandle: `lens/${profileById.handle?.localName}` });
                profileData = profileByHandle;
            }
        }
    } else {
        // 如果是 handle，直接使用
        handle = `lens/${users}`;
        const { data: profileByHandle } = useProfile({ forHandle: handle });
        profileData = profileByHandle;
    }


    return (
        <div className="flex flex-wrap flex-col justify-normal lg:justify-center lg:w-full w-dvw ">
            <div className='  lg:min-w-3xl mx-auto max-w-3xl  w-full'>

                <UsersHeader name={users} profile={profileData} />
                <div className=' flex-1 bg-base-200'>
                    {/* 当路由lens/${users}是profileHandle时显示profileWithProfile的组件,不是时显示params: { users }lens/${users}传入profile的组件 */}

                    <>

                        {/* 背景 */}
                        <UsersPicimg profile={profileData} />
                        {/* 用户信息 */}
                        <UsersMetadata profile={profileData} />
                        {/* 用户数据 */}
                        <div className='bg-base-100'>
                            <UsersStats profile={profileData} name={users} />
                        </div>
                        {/* 简介 */}
                        <div className='w-full'>
                            <UseBio profile={profileData} />
                        </div>
                        {/* 展开选项卡 */}
                        <UsersNav profile={profileData} name={users} />
                    </>

                    {children}
                </div>


            </div>
        </div >
    )
}


