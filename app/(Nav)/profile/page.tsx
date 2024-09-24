'use client'


import Link from 'next/link';
import { SessionType, useProfile, useSession } from "@lens-protocol/react-web";
import { truncateEthAddress } from '@/utils/truncateEthAddress';
import { RiBarChart2Line, RiCopperCoinLine, RiHistoryLine, RiNftLine, RiPuzzleLine, RiTrophyLine, RiUserSettingsLine, RiVerifiedBadgeLine, RiCheckboxCircleFill } from "react-icons/ri";
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
         <div className="">
            <p>Profile</p>
            <div>暂未登录 Lens 账户</div>
            <Card />
         </div>
      );
   }
   if (data && data.type === SessionType.WithProfile) {
      const ProfileWithProfile = data.profile.handle?.fullHandle ?? data.profile.id;
      let { data: Profile, loading } = useProfile({
         forHandle: ProfileWithProfile
      });
      return (
         <div className="">
            <div className='h-full'>
               {loading ? (<>loading...</>) : (
                  <div className='rounded-[--rounded-box] mx-0  md:mx-4'>
                     <div className='w-full  bg-base-100 py-2'>
                        {/* 用户信息 */}
                        <UsersMetadata profile={Profile} />

                        {/* 用户数据 */}
                        <UsersStats profile={Profile} name={data.profile.handle?.localName} />
                        <UseBio profile={Profile} />
                     </div>
                  </div>
               )}

               <Card />


            </div>
         </div>
      );
   }
}
function Card() {
   const assetData = [
      { label: 'Token', href: '/wallet', icon: RiCopperCoinLine, },
      { label: 'NFT', href: '/wallet', icon: RiNftLine, },
      { label: '交易记录', href: '/wallet', icon: RiHistoryLine, },
      { label: '会员', href: '', icon: RiVerifiedBadgeLine, }
   ];

   const userData = [
      { label: '账户设置', icon: RiUserSettingsLine, },
      { label: '扩展功能', icon: RiPuzzleLine, },
      { label: '数据分析', icon: RiBarChart2Line, },
      { label: '成就等级', icon: RiTrophyLine, }
   ];

   return (
      <div>

         <div className='bg-base-100 m-4 h-32 w-auto rounded-[--rounded-box]'>
            <h1 className="p-4 text-xl font-bold">资产</h1>
            <div className='flex-row  grid grid-cols-4 justify-items-stretch '>
               {assetData.map((item, index) => (
                  <Link href={`/wallet`} key={index} className=' grid justify-items-center hover:bg-[--link-hover-background]'>
                     <item.icon size={24} /> <p >{item.label}</p>
                  </Link>
               ))}
            </div>
         </div>


         <div className='bg-base-100 m-4 h-32 w-auto rounded-[--rounded-box]'>
            <h1 className="p-4 text-xl font-bold">用户</h1>
            <div className='flex-row h-auto w-auto py-2 grid grid-cols-4 justify-items-stretch  '>
               {userData.map((item, index) => (
                  <div key={index} className='grid justify-items-center hover:bg-[--link-hover-background]'>
                     <item.icon size={24} /> <p>{item.label}</p>
                  </div>
               ))}
            </div>
         </div>

      </div>
   )
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



         <div className='flex flex-row gap-2'>
            <Link href={`/${profile?.handle?.localName}`} className='btn btn-sm btn-primary text-black'>查看主页</Link>
            <Link href={`/edit_profile`} className="btn btn-sm btn-primary text-black">编辑资料</Link>
         </div>

      </div>
   )
}


