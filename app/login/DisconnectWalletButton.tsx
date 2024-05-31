import { config } from "@/config/Wagmi";
import { useAccount, useDisconnect } from "wagmi";

export function DisconnectWalletButton() {
  const { isConnected ,} = useAccount();
  const { disconnect } = useDisconnect({config});

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    disconnect();
  };

  if (!isConnected) {
    return null;
  }

  return <button className='btn btn-primary' onClick={handleClick}>断开钱包</button>;
}
