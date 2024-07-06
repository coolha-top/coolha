'use client'


import Link from 'next/link';
import { SessionType, useProfile, useSession } from "@lens-protocol/react-web";
import { truncateEthAddress } from '@/utils/truncateEthAddress';
import { RiCheckboxCircleFill } from 'react-icons/ri';
import { formatNumberWithUnit } from '@/utils/formatNumber';
import { formatDate } from '@/utils/formatDate';
import { convertLinksToHTML } from "@/utils/convertLinksToHTML";
import UsersPicimg from "@/components/lnes/DataUsers/UsersPicimg";
import UsersStats from "@/components/lnes/DataUsers/UsersStats";
import UseBio from "@/components/lnes/DataUsers/UseBio";

export default function page() {
   const { data } = useSession({ suspense: true });

   if (data && data.type === SessionType.Anonymous) {
      return (
         <div className="mx-auto max-w-4xl min-h-dvh justify-center flex-1">
            <p>Profile</p>
            <div>暂未登录 Lens 账户</div>
         </div>
      );
   }
   if (data && data.type === SessionType.WithProfile) {
      const ProfileWithProfile = data.profile.handle?.fullHandle ?? data.profile.id;
      let { data: Profile, loading } = useProfile({
         forHandle: ProfileWithProfile
      });
      return (
         <div className="mx-auto max-w-4xl min-h-dvh  justify-center flex-1">
            <div className='h-full'>
               {loading ? (<Loading />) : (
                  <>
                     {/* 背景 */}
                     <UsersPicimg profile={Profile} />
                     {/* 用户信息 */}
                     <UsersMetadata profile={Profile} />
                     {/* 用户数据 */}
                     <UsersStats profile={Profile} name={data.profile.handle?.localName} />
                     {/* 简介 */}
                     <div className='w-full'>
                        <UseBio profile={Profile} />
                     </div>
                  </>
               )}



            </div>
         </div>
      );
   }
}



function UsersMetadata({ profile }) {
   const ensName = profile?.onchainIdentity?.ens?.name;
   const ethAddress = profile?.ownedBy?.address;
   const ethAddressText = ensName ?
       <> {ensName} <img className="size-4 ml-1" src="/logo/ens_mark_primary.svg" alt="ENS.logo" /></>
       :
       truncateEthAddress(`${ethAddress}`);

   return (
       <div className="flex flex-row items-center  px-6 pt-1">

           <div className="w-16 h-16 md:w-24 md:h-24 ">
               {profile?.metadata?.picture ? (
                   <>
                       {profile.metadata.picture.optimized?.uri && (
                           <img
                               className="rounded-full border border-base-content w-16 h-16 md:w-24 md:h-24 "
                               src={profile.metadata.picture.optimized.uri}
                               alt="picture Set"
                           />
                       )}
                       {profile.metadata.picture.__typename === 'ProfilePicture_NftImage_' && (
                           <img
                               className="rounded-full border border-base-content w-16 h-16 md:w-24 md:h-24 "
                               src={profile.metadata.picture.uri}
                               alt="picture NFT"
                           />
                       )}
                   </>
               ) : (
                   <img
                       className="rounded-full border border-base-content w-16 h-16 md:w-24 md:h-24 "
                       src="/rlogo.png" // 使用默认的占位符图片
                       alt="optimized on"
                   />
               )}
           </div>


           <div className="ml-2 lg:ml-4">
               <b className="md:text-xl flex flex-row items-center  font-bold">{profile?.metadata?.displayName}<RiCheckboxCircleFill className="ml-1 size-5 text-primary bg-black rounded-full" /></b>
               <p className="text-[#878787] text-sm"> {profile?.handle?.localName}.{profile?.handle?.namespace}</p>
               <p className="text-[#878787]  text-sm font-bold hover:text-primary w-full">
                   <Link href={`https://www.oklink.com/zh-hans/multi-search#key=${ensName ? ensName : ethAddress}`} target='_blank'>
                       <span className="flex-1 inline-flex items-center hover:text-primary  w-full">{ethAddressText}</span>
                   </Link>
               </p>
               {/* <p className="badge badge-outline text-gray-500"> <span className="font-bold w-full">{profile?.createdAt ? formatDate(profile?.createdAt) : ''}</span> </p> */}
               {/*  <p className="text-gray-500"><span className="font-bold">{truncateEthAddress(`${profile?.ownedBy?.address}`)}</span>   </p> */}
           </div>
           <div className="flex-1 lg:ml-2"></div>



           <div >
              <button className="btn btn-sm btn-primary text-black">编辑资料</button>
           </div>

       </div>
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


         </div>
      </>
   )
}