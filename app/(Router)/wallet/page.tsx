'use client'
import { truncateEthAddress } from '@/utils/truncateEthAddress'
import Link from 'next/link'
import { useAccount, useEnsAvatar, useEnsName } from 'wagmi'

export default function Wallet() {
    const { address } = useAccount()
    const { data: ensName } = useEnsName({ address })
    const { data: ensAvatar } = useEnsAvatar({ name: ensName! })

    return (
        <div className='mt-16'>

            <div className="flex justify-center items-center mx-auto max-w-4xl pt-2">
                {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
                {address &&
                    <Link
                        href={`https://debank.com/profile/${ensName ? ensName : address}`}
                        className='btn  btn-neutral'
                        target='_blank'>
                        {ensName ? `${ensName} (${truncateEthAddress(address)})`
                            : truncateEthAddress(address)}↗
                    </Link>}
            </div>

        </div>
    )
}