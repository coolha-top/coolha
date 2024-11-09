'use client'

import { Avatar, ChainIcon, ConnectKitButton, useChains, useModal } from "connectkit";

export default function A() {
  const { openSwitchNetworks } = useModal()
  return (
    <>
      <ConnectKitButton.Custom>
        {({ isConnected, isConnecting, show, hide, address, truncatedAddress, ensName, chain }) => {
          return (
            <button onClick={show} className=" btn btn-primary">
              {isConnecting ?
                (<div><span className="loading loading-spinner"></span></div>)
                :
                (isConnected ? ensName ?? truncatedAddress : "连接")
              }
              <ChainIcon id={chain?.id} />
            </button>
          );
        }}</ConnectKitButton.Custom>

<ConnectKitButton />


    </>
  )
}