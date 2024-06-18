'use client'

import UseFollow from "@/hooks/lens/useFollow";
import { truncateEthAddress } from "@/utils/truncateEthAddress"
import { useFollow } from "@lens-protocol/react-web";
import Link from "next/link"
import { RiCheckboxCircleFill } from "react-icons/ri";

export default function UsersMetadata({ profile }) {
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
        
                <UseFollow profile={profile} />
            </div>

        </div>
    )
}
