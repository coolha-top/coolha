'use client'

import { formatDate } from "@/utils/formatDate"
import { truncateEthAddress } from "@/utils/truncateEthAddress"
import Link from "next/link"

export default function UsersMetadata({ profile }) {
    const ensName = profile?.onchainIdentity?.ens?.name;
    const ethAddress = profile?.ownedBy?.address;
    const ethAddressText = ensName ? 
    <> {ensName} <img className="size-4" src="/logo/ens_mark_primary.svg" alt="ENS.logo" /></>
        :
        truncateEthAddress(`${ethAddress}`);

    return (
        <div className="flex flex-row items-center  px-6 ">

            <div className="">
                {profile?.metadata?.picture ? (
                    <>
                        {profile.metadata.picture.optimized?.uri && (
                            <img
                                width={100}
                                height={100}
                                className="rounded-full border border-base-content"
                                src={profile.metadata.picture.optimized.uri}
                                alt="picture Set"
                            />
                        )}
                        {profile.metadata.picture.__typename === 'ProfilePicture_NftImage_' && (
                            <img
                                width={100}
                                height={100}
                                className="rounded-full border border-base-content"
                                src={profile.metadata.picture.uri}
                                alt="picture NFT"
                            />
                        )}
                    </>
                ) : (
                    <img
                        width={100}
                        height={100}
                        className="rounded-full border border-base-content w-[100px] h-[100px]"
                        src="/rlogo.png" // 使用默认的占位符图片
                        alt="optimized on"
                    />
                )}
            </div>


            <div className=" ml-2">
                <b className="text-2xl ">{profile?.metadata?.displayName}</b>
                <p className="text-gray-500"> {profile?.handle?.localName}.{profile?.handle?.namespace}</p>
                <p className="text-gray-500 font-bold hover:text-primary w-full">
                    <Link href={`https://www.oklink.com/zh-hans/multi-search#key=${ensName ? ensName : ethAddress}`} target='_blank'>
                        <span className="flex-1 inline-flex items-center hover:text-primary  w-full">{ethAddressText}</span>
                    </Link>
                </p>
                <p className="text-gray-500"> <span className="font-bold w-full">{profile?.createdAt ? formatDate(profile?.createdAt) : ''}</span> </p>
                {/*  <p className="text-gray-500"><span className="font-bold">{truncateEthAddress(`${profile?.ownedBy?.address}`)}</span>   </p> */}
            </div>
            <div className="flex-1 ml-2"></div>



            <div>
                <button className={`btn-primary btn  text-base-content ${profile?.operations?.canFollow
                    ? 'btn btn-md  text-base-content text-xl'
                    : 'btn btn-md  text-base-content text-xl'
                    }`} >
                    {profile?.operations?.canFollow ? '关注' : '取关'}
                </button>
            </div>

        </div>
    )
}
