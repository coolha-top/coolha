'use client'

import { SessionType, useSession } from "@lens-protocol/react-web";
import { useAccount as useWagmiAccount } from "wagmi";
import { config } from "@/config/Wagmi";
import { useWeb3Modal } from '@web3modal/wagmi/react'
import ConnectWalletButton from "@/app/login/ConnectWalletButton";
import { DisconnectWalletButton } from "@/app/login/DisconnectWalletButton";
import LoginForm from "@/app/login/LoginForm";
import { LogoutButton } from "@/app/login/LogoutButton";
import { truncateEthAddress } from "@/utils/truncateEthAddress";
import ThemeSwap from "@/components/ThemeSwap";



export function WelcomeToLens() {
    const { isConnected, address } = useWagmiAccount({ config });
    const { data } = useSession();
    const { open, close } = useWeb3Modal()

    return (
        <div className=" flex justify-center items-center">
            <div className=" gap-14 w-dvw">

                {!isConnected && (
                    <div className="flex flex-row justify-center items-center">
{/*                         <p className="mb-4" onClick={()=>open({ view: 'Networks' })}>连接您的钱包</p> */}
                        
                        <ConnectWalletButton />
                    </div>
                )}

                {!data?.authenticated && address && (
                    <>
                        <p className="">当前连接的钱包: </p>
                        <div className="mt-2 mb-16 flex-row flex justify-between items-center">
                            <button className='btn btn-outline' onClick={()=>open({ view: 'Account' })} >{truncateEthAddress(address)}</button>
                            <DisconnectWalletButton />
                        </div>

                        <LoginForm owner={address} />
                    </>
                )}
                {data && data.type === SessionType.WithProfile && (
                    <>
                        <p className="">当前登入的Lens账号 </p>
                        <div className="mt-2  flex-row flex justify-between items-center">
                            <button className='btn btn-outline btn-primary font-semibold' >{data.profile.handle?.fullHandle ?? data.profile.id}
                            </button>
                            <LogoutButton />
                        </div>
                    </>
                )}

            </div>
        </div>

    );
}
