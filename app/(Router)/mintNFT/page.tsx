'use client'
import { config } from '@/config/Wagmi'
import { useReadContracts, useAccount, useChainId, useChains } from 'wagmi'
import { HaYiABI } from './HaYi'
import { weiToEth, weiToDawei } from '@/utils/uint256to'
import { truncateEthAddress } from '@/utils/truncateEthAddress'
import { useEffect, useState } from 'react'
import ChainSwitcher from '@/components/wagmi/ChainSwitcher'

const HaYiNFTContract = {
    address: '0x149ddd93d774e501e0961be1efea5841ed242678',
    abi: HaYiABI,
} as const
export default async function MintNFT() {
    const { address } = useAccount({ config });
    const { data, error, isPending } = useReadContracts({
        config,
        contracts: [
            {
                ...HaYiNFTContract,
                functionName: 'balanceOf',
                args: [`0x96286Bb80C494d5917f4D0f9a8e7255023Ef6ee6`],
            },
            { ...HaYiNFTContract, functionName: 'owner' },
            { ...HaYiNFTContract, functionName: 'name', },
            { ...HaYiNFTContract, functionName: 'symbol', },
            { ...HaYiNFTContract, functionName: 'tokenURI' },

        ]
    })
    if (isPending) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    const [balanceOf, owner, MAX_SUPPLY, currentPrice, name, symbol, tokenURI] = data.map(item => item.result?.toString());

    const { request } = await simulateContract(config, {
        ...HaYiNFTContract,
        functionName: 'transferFrom',
        args: [
            '0xd2135CfB216b74109775236E36d4b433F1DF507B',
            '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
            {BigInt(address)},
        ],
    })
    const hash = await writeContract(config, request)

    return (
        <div className='mt-16 p-4'>


            <div className="card w-96 bg-base-100 shadow-xl border">

                <figure><img src={`https://gateway.pinata.cloud/ipfs/QmU43j1wy1xkTNSqo5kpq5wSxpM59AEUNPxLXQSpHXfyNb`} alt="Shoes" /></figure>

                <div className="card-body border-t">
                    <p>NFT简介</p>
                    <div>名称: {name}</div>
                    <div>符号: {symbol}</div>
                    <div>图片: {tokenURI && <img src={`${tokenURI}`} alt="NFT Image" />}</div>


                    <div>总供应量: {MAX_SUPPLY ? weiToDawei(MAX_SUPPLY) : ''}</div>
                    <div>价格: {currentPrice ? `${weiToEth(currentPrice)} ETH` : 'N/A'}</div>
                    <div>所有者: {truncateEthAddress(owner?.toString())}</div>
                    <div>合约:{truncateEthAddress(HaYiNFTContract.address)}</div>

                    <div className="card-actions flex justify-between mt-4 ">
                        <button className="btn  btn-outline">余额: {balanceOf}</button>
                        <button className="btn btn-primary">Mint NFT</button>
                    </div>
                </div>

            </div >



        </div >
    )
}
function WriteNFT() {

    return (
        <div>page</div>
    )
}
