'use client'


import Link from 'next/link';
import { SessionType, useProfile, useSession } from "@lens-protocol/react-web";
import { truncateEthAddress } from '@/utils/truncateEthAddress';
import { RiBarChart2Line, RiCopperCoinLine, RiHistoryLine, RiNftLine, RiPuzzleLine, RiTrophyLine, RiUserSettingsLine, RiVerifiedBadgeLine, RiVerifiedBadgeFill, RiMedalLine, RiUserVoiceLine, RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";
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
         <div>
            <div className='rounded-[--rounded-box] px-2  md:px-4'>
               <div className=' rounded-[--rounded-box]   bg-base-100 mt-4 py-2 px-1'>
                  <div className=" h-16  md:h-24 ml-2 lg:ml-4">
                     <p>Profile</p>
                     <div>暂未登录 Lens 账户</div>
                  </div>
               </div>
            </div>
            <Card />
         </div>
      );
   }
   if (data && data.type === SessionType.WithProfile) {
      const ProfileWithProfile = data.profile.handle?.fullHandle ?? data.profile.id;
      let { data: Profile } = useProfile({
         forHandle: ProfileWithProfile
      });
      return (
         <div className="">
            <div className='h-full '>
               <div className='rounded-[--rounded-box] px-2  md:px-4'>
                  <div className=' rounded-[--rounded-box]   bg-base-100 mt-4 py-2 px-1'>
                     {/* 用户信息 */}
                     <UsersMetadata profile={Profile} />

                     {/* 用户数据 */}
                     {/*                         <UsersStats profile={Profile} name={data.profile.handle?.localName} />
                        <UseBio profile={Profile} /> */}
                  </div>
               </div>

               <Card />


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
      <div className="flex flex-row items-center ">

         <div className="w-16 h-16 md:w-24 md:h-24 ml-2 lg:ml-4">
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
            <b className="md:text-xl flex flex-row items-center  font-bold">
               {profile?.metadata?.displayName}
               <RiVerifiedBadgeFill className=" size-4 ml-1 text-primary rounded-full" />
            </b>
            <p className="text-[#878787] text-sm"> {profile?.handle?.namespace}/{profile?.handle?.localName} {profile?.id}  </p>



            <p className="text-[#878787]  text-sm font-bold hover:text-primary w-full">
               <Link href={`https://www.oklink.com/zh-hans/multi-search#key=${ensName ? ensName : ethAddress}`} target='_blank'>
                  <span className="flex-1 inline-flex items-center hover:text-primary  w-full">{ethAddressText}</span>
               </Link>
            </p>
            {/* <p className="badge badge-outline text-gray-500"> <span className="font-bold w-full">{profile?.createdAt ? formatDate(profile?.createdAt) : ''}</span> </p> */}
            {/*  <p className="text-gray-500"><span className="font-bold">{truncateEthAddress(`${profile?.ownedBy?.address}`)}</span>   </p> */}
         </div>
         <div className="flex-1 lg:ml-2"></div>



         <div className='flex flex-col  md:flex-row gap-2 mr-2 lg:mr-4'>
            <Link href={`/u/${profile?.handle?.localName}`} className='btn btn-sm btn-primary text-black text-xs md:text-md'>查看主页</Link>
            <Link href={`/settings/edit_profile`} className="btn btn-sm btn-primary text-black text-xs md:text-md">编辑资料</Link>
         </div>

      </div>
   )
}


function Card() {
   const assetData = [
      { label: 'Token', href: '/wallet', icon: RiCopperCoinLine, },
      { label: 'NFT', href: '/wallet', icon: RiNftLine, },
      { label: '交易记录', href: '/wallet', icon: RiHistoryLine, },
      { label: '会员', href: '/a', icon: RiVerifiedBadgeLine, }
   ];

   const userData = [
      { label: '我的书签', href: '/profile/bookmarks', icon: RiBookmarkLine, },
      { label: '数据分析', href: '/profile/analyse', icon: RiBarChart2Line, },
      { label: '成就等级', href: '/profile/grade', icon: RiMedalLine, },
      { label: '扩展功能', href: '/profile/extend', icon: RiPuzzleLine, },
      { label: '邀请用户', href: '/profile/invite', icon: RiUserVoiceLine, }
   ];

   return (
      <div>

         <div className='bg-base-100 m-2 md:m-4 h-auto w-auto rounded-[--rounded-box]'>
            <h1 className="p-2 md:p-4 text-xl font-bold">资产</h1>
            <div className='flex-row grid grid-cols-4 justify-items-stretch   h-auto w-auto  p-3 my-2'>
               {assetData.map((item, index) => (
                  <Link href={item.href} key={index} className=' grid justify-items-center hover:bg-[--button-bg] rounded-xl sm:rounded-full p-1 mt-1 md:p-3'>
                     <item.icon size={24} /> <p className='text-[0.5rem] xs:text-xs  md:text-base'>{item.label}</p>
                  </Link>
               ))}
            </div>
         </div>


         <div className='bg-base-100 m-2 md:m-4 h-auto w-auto rounded-[--rounded-box]'>
            <h1 className="p-2 md:p-4 text-xl font-bold">用户</h1>
            <div className='flex-row  grid grid-cols-4 justify-items-stretch h-auto w-auto  p-3 my-2'>
               {userData.map((item, index) => (
                  <Link href={item.href ? item.href : ''} key={index} className='  grid justify-items-center hover:bg-[--button-bg]  rounded-xl sm:rounded-full p-1 mt-1 md:p-3 '>
                     <item.icon size={24} /> <p className='text-[0.5rem] xs:text-xs md:text-base'>{item.label}</p>
                  </Link>
               ))}
            </div>
         </div>

      </div>
   )
}
