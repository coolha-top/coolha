'use client'


import UsersHeader from '@/components/lnes/DataUsers/UsersHeader';
import UsersPicimg from '@/components/lnes/DataUsers/UsersPicimg';
import UsersMetadata from '@/components/lnes/DataUsers/UsersMetadata';
import UsersStats from '@/components/lnes/DataUsers/UsersStats';
import UsersNav from '@/components/lnes/DataUsers/UsersNav'
import { useProfile } from '@lens-protocol/react-web';
import Loading from './loading';
import UsersInterests from '@/components/lnes/DataUsers/UsersInterests';
import UseMutualFollowers from '@/components/lnes/DataUsers/UseMutualFollowers';
import UseBio from '@/components/lnes/DataUsers/UseBio';


/* export async function generateMetadata({ params: { users }  }) {
    return {
        title: `${users} | VimCord`,
    };
} */

export default function layout({ children, params: { users } }) {

    // 将用户的名字和命名空间从 'users' 参数中拆分出来
    //users = users.split('.')[0];
    //const namespace = users.split('.')[1];

    // 使用拆分出来的命名空间和用户名调用 useProfile 钩子
    let { data: profile, loading } = useProfile({
        forHandle: `lens/${users}`
    });

    return (
        <div className=' md:border-x max-w-4xl lg:min-w-4xl mx-auto mt-0 md:mt-16 w-full'>
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
                    <div className='w-full'>
                        <UseBio profile={profile} />

                        {/*   <UseMutualFollowers  profile={profile}/> */}

                        {/*  <UsersInterests profile={profile} /> */}
                    </div>


                    {/* 展开选项卡 */}
                    <UsersNav name={users} profile={profile} />



                </>)}

                {children}

            </div>
        </div>
    )
}

