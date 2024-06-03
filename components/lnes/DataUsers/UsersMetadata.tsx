'use client'

import { formatDate } from "@/utils/formatDate"
import { truncateEthAddress } from "@/utils/truncateEthAddress"
import Link from "next/link"

export default function UsersMetadata({ profile }) {
    const ensName = profile?.onchainIdentity?.ens?.name;
    const ethAddress = profile?.ownedBy?.address;
    const ethAddressText = ensName ? <span className="flex-1 inline-flex items-center hover:text-primary">
        {ensName} <img className="size-4" src="/logo/ens_mark_primary.svg" alt="ENS.logo" />
    </span> : truncateEthAddress(`${ethAddress}`);

    return (
        <div className="flex flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6 px-6  rounded-lg">


            {profile?.metadata?.picture?.__typename === 'ImageSet' && (
                <img
                    alt="posts data"
                    width={100}
                    height={100}
                    className="rounded-full border border-base-content"
                    src={profile.metadata.picture.optimized?.uri}
                />
            )}


            <div className="flex-1 ml-2">
                <b className="text-2xl ">{profile?.metadata?.displayName}</b>
                <p className="text-gray-500"> {profile?.handle?.localName}.{profile?.handle?.namespace}</p>
                <p className="text-gray-500 font-bold hover:text-primary">
                    <Link href={`https://www.oklink.com/zh-hans/multi-search#key=${ensName ? ensName : ethAddress}`} target='_blank'>
                       {ethAddressText}
                    </Link>
                </p>
                <p className="text-gray-500"> <span className="font-bold">{profile?.createdAt ? formatDate(profile?.createdAt) : ''}</span> </p>
                {/*  <p className="text-gray-500"><span className="font-bold">{truncateEthAddress(`${profile?.ownedBy?.address}`)}</span>   </p> */}
            </div>


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
