'use client'


import Link from 'next/link';
import { SessionType, useProfile, useSession } from "@lens-protocol/react-web";
import { truncateEthAddress } from '@/utils/truncateEthAddress';
import { RiBarChart2Line, RiPuzzleLine, RiVerifiedBadgeLine, RiVerifiedBadgeFill, RiMedalLine, RiUserVoiceLine, RiBookmarkLine, RiServiceLine, RiWallet3Line, RiGiftLine } from "react-icons/ri";


export default function page() {
   const { data } = useSession();
   const { data: Profile } = useProfile({
      forHandle: data?.type === SessionType.WithProfile
         ? data?.profile?.handle?.fullHandle ?? data?.profile?.id
         : null
   });

   // 如果未登录
   if (data?.type !== SessionType.WithProfile) {
      return (
         <div>
            <div className='rounded-[--rounded-box] px-2 md:px-4'>
               <div className='rounded-[--rounded-box] bg-base-100 mt-4 py-2 px-1'>
                  <div className="h-16 md:h-24 ml-2 lg:ml-4">
                     <p>Profile</p>
                     <div>暂未登录 Lens 账户</div>
                  </div>
               </div>
            </div>
         </div>
      );
   }

   // 如果已登录并获取到 Profile 数据
   return (
      <div className="h-full">
         <div className='rounded-[--rounded-box] px-2 md:px-4'>
            <div className='rounded-[--rounded-box] bg-base-100 mt-4 py-2 px-1'>
               {Profile && <UsersMetadata profile={Profile} />}
            </div>
         </div>
         <Card />
      </div>
   );
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
      { label: '资产', href: '/wallet', icon: RiWallet3Line, },
      { label: '会员', href: '/vip', icon: RiVerifiedBadgeLine, },
      { label: '成就等级', href: '/grade', icon: RiMedalLine, },
      { label: '数据分析', href: '/analyse', icon: RiBarChart2Line, },
      { label: '我的书签', href: '/bookmarks', icon: RiBookmarkLine, },
   ];

   const userData = [
      { label: '扩展功能', href: '/extend', icon: RiPuzzleLine, },
      { label: '邀请用户', href: '/invite', icon: RiUserVoiceLine, },
      { label: '测试奖励', href: '/mintNFT', icon: RiGiftLine, },
   ];

   return (
      <div>

         <div className='bg-base-100 m-2 md:m-4 h-auto w-auto rounded-[--rounded-box]'>
            {/* <h1 className="p-2 md:p-4 text-xl font-bold">资产</h1> */}
            <div className='flex-row grid grid-cols-4 justify-items-stretch   h-auto w-auto  p-3 '>
               {assetData.map((item, index) => (
                  <Link href={item.href} key={index} className=' grid justify-items-center hover:bg-[--button-bg] rounded-xl sm:rounded-full p-2 my-2 md:p-3'>
                     <item.icon size={24} /> <p className='text-[0.5rem] xs:text-xs  md:text-base'>{item.label}</p>
                  </Link>
               ))}
            </div>
         </div>


         <div className='bg-base-100 m-2 md:m-4 h-auto w-auto rounded-[--rounded-box]'>
            {/* <h1 className="p-2 md:p-4 text-xl font-bold">用户</h1> */}
            <div className='flex-row  grid grid-cols-4 justify-items-stretch h-auto w-auto  p-3 '>
               {userData.map((item, index) => (
                  <Link href={item.href ? item.href : ''} key={index} className='  grid justify-items-center hover:bg-[--button-bg]  rounded-xl sm:rounded-full p-2 my-2 md:p-3 '>
                     <item.icon size={24} /> <p className='text-[0.5rem] xs:text-xs md:text-base'>{item.label}</p>
                  </Link>
               ))}
            </div>
         </div>

      </div>
   )
}
