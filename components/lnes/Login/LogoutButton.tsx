'use client'
import { config } from "@/config/Wagmi";
import { useLogout } from "@lens-protocol/react-web";

import { useAccount, useDisconnect } from "wagmi";

export function LogoutButton() {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect({config });
  const { execute } = useLogout();

   const logout = () => {
    void execute();
    disconnect();
  };

  if (!isConnected) {
    return <button className='btn btn-info'  onClick={() => execute()}>注销</button>;
  }

  return <button className='btn btn-info'  onClick={() => logout()}>注销</button>;
}
