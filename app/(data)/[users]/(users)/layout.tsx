'use client'


import UsersHeader from '@/components/lnes/DataUsers/UsersHeader';
import UsersPicimg from '@/components/lnes/DataUsers/UsersPicimg';
import UsersMetadata from '@/components/lnes/DataUsers/UsersMetadata';
import UsersStats from '@/components/lnes/DataUsers/UsersStats';
import UsersNav from '@/components/lnes/DataUsers/UsersNav'
import { useProfile } from '@lens-protocol/react-web';
import Loading from './loading';


/* export async function generateMetadata({ params: { users }  }) {
    return {
        title: `${users} | VimCord`,
    };
} */

export default function layout({ children, params: { users } }) {
    const namespace = users.split('.')[1];
    users = users.split('.')[0];
    const { data: profile, loading } = useProfile({
        forHandle: `${namespace}/${users}`
    });


    return (
        <div className='max-w-4xl lg:min-w-4xl mx-auto mt-0 md:mt-16 w-full'>
            <UsersHeader name={users} />
            <div className=' flex-1'>

                {loading ? (
                    <p className="max-w-4xl lg:min-w-4xl mx-auto w-full"><Loading /></p>
                ) : (<>

                    {/* 背景 */}
                    < UsersPicimg profile={profile} />


                    {/* 用户信息 */}
                    <UsersMetadata profile={profile} />

                    {/* 用户数据 */}
                    <UsersStats profile={profile} name={users} />

                    {/* 简介 */}
                    <div className='py-2 px-6'><p className="text-base">{profile?.metadata?.bio}</p></div>

                    {/* 展开选项卡 */}
                    <UsersNav name={users} profile={profile} />
                    
                </>)}

                {children}

            </div>
        </div>
    )
}

