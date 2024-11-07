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
import { useConnectModal, useAccountModal, useChainModal, ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import ChainSwitcher from "@/components/wagmi/ChainSwitcher";


export function WelcomeToLens() {
    const { isConnected, address } = useAccount({ config });
    const { data } = useSession({
        suspense: true,
    });
    const { openConnectModal } = useConnectModal();
    const { openAccountModal } = useAccountModal();
    const { openChainModal } = useChainModal();
    return (
        <div className=" flex justify-center items-center">
            <div className=" gap-14 w-dvw">

                {!address && (
                    <div className="flex flex-row justify-center items-center m-2">
                            {!address && (
                                <button onClick={openConnectModal} type="button" className="btn btn-primary">
                                    连接钱包
                                </button>
                            )}
                    </div>
                )}


                {!data?.authenticated && address && (
                    <>
                        <p className="">当前连接的钱包: </p>
                        <div className="mt-2 mb-16 flex-row flex justify-between items-center">
                            <button onClick={openChainModal} type="button" className='btn btn-outline'>
                                选择链
                            </button>
                            <DisconnectWalletButton />
                        </div>

                        <LoginForm wallet={address} />

                        <div className="divider">没有Lens账户?
                            <Link href={'/signup'} className="link link-hover link-info">前往注册</Link>
                        </div>
                    </>
                )}

                {data && data.type === SessionType.WithProfile && (
                    <>
                        {address && <div>
                            <p className="">当前连接的钱包: </p>
                            <div className="mt-2 mb-16 flex-row flex justify-between items-center">
                                <button onClick={openChainModal} type="button" className='btn btn-outline'>
                                    选择链
                                </button>
                                <DisconnectWalletButton />
                            </div>
                        </div>}

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
