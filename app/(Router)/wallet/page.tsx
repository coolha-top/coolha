'use client'
import { truncateEthAddress } from '@/utils/truncateEthAddress'
import Link from 'next/link'
import { useAccount, useEnsAvatar, useEnsName } from 'wagmi'
import Token from './_token/token'

export default function Wallet() {
    const { address } = useAccount()
    const { data: ensName } = useEnsName({ address })
    const { data: ensAvatar } = useEnsAvatar({ name: ensName! })
    return (
        <div className=''>

            <div className="">
                {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
                {address &&
                    <Link
                        href={`https://debank.com/profile/${ensName ? ensName : address}`}
                        className=' link link-hover btn'
                        target='_blank'>
                        {ensName ? `${ensName} (${truncateEthAddress(address)})`
                            : truncateEthAddress(address)}↗
                    </Link>}
            </div>

            <Token />


        </div>
    )
}