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
export default function MintNFT() {
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
    /*     const balance = data[0]?.toString();
        const ownerOf = data[1]?.toString();
        const totalSupply = data[2]?.toString();
        const currentPrice = data[3]?.toString();
        const name = data[4]?.toString();
        const symbol = data[5]?.toString();
        const tokenURI = data[6]?.toString();
        const walletLimit = data[7]?.toString(); */


    return (
        <div className='mt-16 p-4'>
            {tokenURI}
            <div className="">
                MintNFT
                <div>余额: {balanceOf}</div>
                <div>名称: {name}</div>
                <div>符号: {symbol}</div>
                <div>图片: {tokenURI && <img src={`${tokenURI}`} alt="NFT Image" />}</div>


                <div>总供应量: {MAX_SUPPLY ? weiToDawei(MAX_SUPPLY) : ''}</div>
                <div>价格: {currentPrice ? `${weiToEth(currentPrice)} ETH` : 'N/A'}</div>
                <div>所有者: {truncateEthAddress(owner?.toString())}</div>
                <div>合约:{truncateEthAddress('0x9397B18fEE5dCf61CE91Ce1e734eFAD8a66C356A')}</div>
                {/* <div>钱包限制: {walletLimit ? `${weiToDawei(walletLimit)}` : ''}</div> */}
            </div>


            <div className="card w-96 bg-base-100 shadow-xl border">
                <figure><img src={`https://gateway.pinata.cloud/ipfs/${tokenURI}`} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">名称: {name}</h2>
                    <h2 className="card-title">符号: {symbol}</h2>
                    <p>NFT简介</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Mint NFT</button>
                    </div>
                </div>
            </div>

            <div>
            <ChainSwitcher />
            </div>

        </div>
    )
}
