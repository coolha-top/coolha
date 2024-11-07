'use client'

import { config } from "@/config/Wagmi";
import { useAccount, useDisconnect } from "wagmi";

export function DisconnectWalletButton() {
  const { address} = useAccount();
  const { disconnect } = useDisconnect({config});
 
  if (!address) {
    return null;
  }

  return <button className='btn btn-primary' onClick={()=>disconnect()}>断开钱包</button>;
}
