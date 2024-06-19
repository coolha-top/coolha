'use client'

import UseBio from "@/components/lnes/DataUsers/UseBio";
import UsersMetadata from "@/components/lnes/DataUsers/UsersMetadata";
import UsersNav from "@/components/lnes/DataUsers/UsersNav";
import UsersPicimg from "@/components/lnes/DataUsers/UsersPicimg";
import UsersStats from "@/components/lnes/DataUsers/UsersStats";
import { SessionType, useProfile, useSession } from "@lens-protocol/react-web";

export default function page() {
   const { data } = useSession({ suspense: true });

   if (data && data.type === SessionType.Anonymous) {
      return (
         <div className="mx-auto max-w-4xl md:mt-16 justify-center sm:border-x flex-1">
            <p>Profile</p>
            <div>暂未登录 Lens 账户</div>
         </div>
      );
   }
   if (data && data.type === SessionType.WithProfile) {
      const Profile = data.profile.handle?.fullHandle ?? data.profile.id;

      return (
         <div className="mx-auto max-w-4xl md:mt-16 justify-center sm:border-x flex-1">
            <div>

               <p>address: {data.address}</p>

               <p>Lens id: {Profile}</p>
               <div>
                  {/* 背景 */}
                  <UsersPicimg profile={data.profile} />

                  {/* 用户信息 */}
                  <UsersMetadata profile={Profile} />

                  {/* 用户数据 */}
                  {/* <UsersStats profile={profile} name={data.profile.handle?.localName} /> */}

                  {/* 简介 */}
                  <div className='w-full'>
                     <UseBio profile={Profile} />

                     {/* <UseMutualFollowers profile={profile}/> */}

                     {/* <UsersInterests profile={profile} /> */}
                  </div>

                  {/* 展开选项卡 */}
                  <UsersNav profile={Profile} name={data.profile.handle?.localName} />
               </div>
            </div>
         </div>
      );
   }
}