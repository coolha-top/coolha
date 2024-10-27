'use client'

import { metadata } from '@/config/Wagmi'
import * as React from 'react'
import { Connector, useConnect } from 'wagmi'
import {/*  walletConnect,safe,   */injected, metaMask, coinbaseWallet, walletConnect, } from 'wagmi/connectors'
export function ConnectWalletButton() {
  const { connectors, connect } = useConnect()
  const walletConnectors = [
    {
      connector: injected({ shimDisconnect: true }),
      logoSrc: "/logo/browser-wallet.svg",
      buttonText: "Browser Wallet",
    },
    {
      connector: metaMask(),
      logoSrc: "/logo/MetaMask.png", // 注意：这里你可能想用不同的图标，比如 MetaMask 的图标  
      buttonText: "MetaMask",
    },
    {
      connector: coinbaseWallet({ appName: metadata.name, appLogoUrl: metadata.icons[0] }),
      logoSrc: "/logo/coinbase.svg",
      buttonText: "CoinBase",
    },
    /*     {
          connector: walletConnect({projectId}),
          logoSrc: "/logo/walletconnect.svg",
          buttonText: "WalletConnect",
        }, */

  ];
  /*   return connectors.map((connector) => (
      <WalletOption
        key={connector.uid}
        connector={connector}
        onClick={() => connect({ connector })}
      />
    )) */
  return (
    <>
      <div className='flex-col flex justify-center items-center my-2'>
        {walletConnectors.map((wc, index) => (
          <button
            key={wc.buttonText}
            onClick={() => connect({ connector: wc.connector })}
            className='btn btn-outline hover:bg-primary hover:text-base-content my-2 flex items-center w-full lg:btn-wide'
          >
            <img src={wc.logoSrc} alt={wc.buttonText} className='w-8 h-8 mx-2 ' />
            <span className='flex-1 text-left'>{wc.buttonText}</span>
          </button>
        ))}
{/*         <button
          key={`WalletConnect`}
          onClick={() => open()}
          className='btn btn-outline my-2 flex items-center w-full lg:btn-wide'
        >
          <img src={`/logo/walletconnect.svg`} alt={`WalletConnect`} className='w-8 h-8 mx-2 ' />
          <span className='flex-1 text-left'>WalletConnect</span>
        </button> */}
      </div>
    </>
  )
}

/* function WalletButton({ children }) {
  return (
    <div>
      <button className="btn btn-primary" onClick={() => document.getElementById('my_modal_5').showModal()}>连接钱包</button>
      <dialog id="my_modal_5" className="modal modal-bottom md:modal-middle z-20">
        <div className="modal-box border">

          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-6">✕</button>
            <h3 className="font-bold text-lg">连接钱包</h3>
          </form>
          <div className="my-4">{children}</div>
        </div>
      </dialog>
    </div>
  )
} */

/* function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector
  onClick: () => void
}) {
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    ; (async () => {
      const provider = await connector.getProvider()
      setReady(!!provider)
    })()
  }, [connector])

  return (
    <>
      <div className='flex-row flex justify-center items-center my-2'>
        <button disabled={!ready} onClick={onClick} className='btn  btn-outline btn-wide'>
          {connector.name}
        </button>
      </div>
    </>

  )
} */