'use client'
import { truncateEthAddress } from '@/utils/truncateEthAddress'
import Link from 'next/link'
import { useAccount, useEnsAvatar, useEnsName, useSwitchChain } from 'wagmi'
import Token from './_token/token'

export default function Wallet() {
    const { address } = useAccount()
    const { data: ensName } = useEnsName({ address })
    const { data: ensAvatar } = useEnsAvatar({ name: ensName! })
    const { chains, switchChain } = useSwitchChain()
    return (
        <div className='mt-16'>

            <div className="">
                {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
                {address &&
                    <Link
                        href={`https://debank.com/profile/${ensName ? ensName : address}`}
                        className=' link link-hover '
                        target='_blank'>
                        {ensName ? `${ensName} (${truncateEthAddress(address)})`
                            : truncateEthAddress(address)}↗
                    </Link>}
            </div>

            <Token />

            {chains.map((chain) => (
                <div className="">
                    <button key={chain.id} onClick={() => switchChain({ chainId: chain.id })} className='btn btn-outline'>
                        {chain.name}
                    </button>
                </div>
            ))}

        </div>
    )
}