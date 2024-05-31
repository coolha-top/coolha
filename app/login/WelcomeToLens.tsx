'use client'

import { SessionType, useSession } from "@lens-protocol/react-web";
import { useAccount as useWagmiAccount } from "wagmi";
import { config } from "@/config/Wagmi";

import ConnectWalletButton from "@/app/login/ConnectWalletButton";
import { DisconnectWalletButton } from "@/app/login/DisconnectWalletButton";
import LoginForm from "@/app/login/LoginForm";
import { LogoutButton } from "@/app/login/LogoutButton";
import { truncateEthAddress } from "@/utils/truncateEthAddress";
import ThemeSwap from "@/components/ThemeSwap";



export function WelcomeToLens() {
    const { isConnected, address } = useWagmiAccount({ config });
    const { data } = useSession();

    return (
        <div className=" flex justify-center items-center">
            <div className=" gap-14 w-dvw">

                {!isConnected && (
                    <div className="flex flex-col justify-center items-center">
                        <p className="mb-4">连接您的钱包</p>
                        <ConnectWalletButton />
                    </div>
                )}

                {!data?.authenticated && address && (
                    <>
                        <p className="">当前连接的钱包: </p>
                        <div className="mt-2 mb-16 flex-row flex justify-between items-center">
                            <button className='btn btn-primary'>{truncateEthAddress(address)}</button>
                            <DisconnectWalletButton />
                        </div>

                        <LoginForm owner={address} />
                    </>
                )}
                {data && data.type === SessionType.WithProfile && (
                    <>
                        <p className="">当前登入的Lens账号 </p>
                        <div className="mt-2  flex-row flex justify-between items-center">
                            <button className='btn btn-primary font-semibold' >{data.profile.handle?.fullHandle ?? data.profile.id}
                            </button>
                            <LogoutButton />
                        </div>
                    </>
                )}

            </div>
        </div>

    );
}
