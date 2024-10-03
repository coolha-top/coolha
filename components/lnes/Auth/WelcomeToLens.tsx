'use client'

import { Profile, SessionType, useSession } from "@lens-protocol/react-web";
import { useAccount } from "wagmi";
import { config } from "@/config/Wagmi";
//import { useWeb3Modal } from '@web3modal/wagmi/react'
import { ConnectWalletButton } from "@/components/wagmi/ConnectWalletButton";
import { DisconnectWalletButton } from "@/components/wagmi/DisconnectWalletButton";
import { truncateEthAddress } from "@/utils/truncateEthAddress";
import ThemeSwap from "@/gui/ThemeSwap";
import LoginForm from "@/components/lnes/Auth/LoginForm";
import { LogoutButton } from "@/components/lnes/Auth/LogoutButton";


export function WelcomeToLens() {
    const { isConnected, address } = useAccount({ config });
    const { data } = useSession({
        suspense: true,
    });
    //const { open, close } = useWeb3Modal()

    return (
        <div className=" flex justify-center items-center">
            <div className=" gap-14 w-dvw">

                {!isConnected && (
                    <div className="flex flex-row justify-center items-center">
                        <ConnectWalletButton />
                    </div>
                )}


                {!data?.authenticated && address && (
                    <>
                        <p className="">当前连接的钱包: </p>
                        <div className="mt-2 mb-16 flex-row flex justify-between items-center">
                            <button className='btn btn-outline'/*  onClick={() => open({ view: 'Account' })} */ >{truncateEthAddress(address)}</button>
                            <DisconnectWalletButton />
                        </div>

                        <LoginForm wallet={address} />
                    </>
                )}


                {data && data.type === SessionType.WithProfile && (
                    <>


                        <p className="">当前登入的Lens账号 </p>
                        <div className="mt-2  flex-row flex justify-between items-center">
                            <button className='btn btn-outline  text-base-content  font-semibold' >{data.profile.handle?.fullHandle ?? data.profile.id}
                            </button>
                            <LogoutButton />
                        </div>
                    </>
                )}

            </div>
        </div>

    );
}
