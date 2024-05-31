
import { useWeb3Modal } from '@web3modal/wagmi/react'

export default function ConnectButton() {
  // 4. Use modal hook
  const { open } = useWeb3Modal()

  return (
    <div className='flex-row flex justify-between items-center'>
      <button className='btn btn-primary' onClick={() => open()}>连接钱包</button>
    </div>
  )
}