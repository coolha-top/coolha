'use client'

import { SessionType, useSession } from "@lens-protocol/react-web";
import { useAccount } from "wagmi";
import { config } from "@/config/Wagmi";
//import { useWeb3Modal } from '@web3modal/wagmi/react'
import { ConnectWalletButton } from "@/components/wagmi/ConnectWalletButton";
import { DisconnectWalletButton } from "@/components/wagmi/DisconnectWalletButton";
import { truncateEthAddress } from "@/utils/truncateEthAddress";
import ThemeSwap from "@/gui/ThemeSwap";
import LoginForm from "@/components/lnes/Auth/LoginForm";
import { LogoutButton } from "@/components/lnes/Auth/LogoutButton";
import Link from "next/link";
import ChainSwitcher from "@/components/wagmi/ChainSwitcher";
import { Avatar, ChainIcon, ConnectKitButton, useModal } from "connectkit";
import { Types } from "connectkit";
export function WelcomeToLens() {
    const { isConnected, address } = useAccount({ config });
    const { data } = useSession({
        suspense: true,
    });
    const { openSwitchNetworks } = useModal()


    return (
        <div className=" flex justify-center items-center">
            <div className=" gap-14 w-dvw">
                <div className="mt-2 mb-16 flex flex-col md:flex-row  justify-between items-center gap-3">
                    {address && (
                        <ConnectKitButton.Custom>
                            {({ chain }) => {
                                return (
                                    <button onClick={() => openSwitchNetworks()} className=" btn btn-primary">
                                        <ChainIcon id={chain?.id} /> {chain?.name}
                                    </button>
                                );
                            }}
                        </ConnectKitButton.Custom>
                    )}
                    <div className="flex flex-row justify-center items-center m-1">
                        <ConnectKitButton.Custom>
                            {({ isConnected, isConnecting, show, hide, address, truncatedAddress, ensName, chain }) => {
                                return (
                                    <button onClick={show} className=" btn btn-primary flex flex-row">
                                        {address && <div className=" hidden md:block "> <Avatar name={ensName} size={32} />  </div>}
                                        {isConnecting ?
                                            (<div><span className="loading loading-spinner"></span></div>)
                                            :
                                            (isConnected ? ensName ?? truncatedAddress : "连接钱包")
                                        }
                                    </button>
                                );
                            }}
                        </ConnectKitButton.Custom>
                    </div>
                </div>

                {!data?.authenticated && address && (
                    <>
                        <LoginForm wallet={address} />

                        <div className="divider">没有Lens账户?
                            <Link href={'/signup'} className="link link-hover link-info">前往注册</Link>
                        </div>
                    </>
                )}

                {data && data.type === SessionType.WithProfile && (
                    <>
                        <p className="">当前登入的Lens账号 </p>
                        <div className="mt-2  flex-row flex justify-between items-center">
                            <button className='btn btn-outline  text-base-content  font-semibold' >
                                {data.profile.handle?.fullHandle ?? data.profile.id}
                            </button>
                            <LogoutButton />
                        </div>
                    </>
                )}

            </div>
        </div>

    );
}
