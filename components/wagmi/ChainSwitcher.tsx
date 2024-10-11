'use client'
import { useChainId, useChains, useSwitchChain } from 'wagmi'
import { config } from '@/config/Wagmi'

const ChainSwitcher: React.FC = () => {
    const currentChainId = useChainId({ config });
    const { chains, switchChain } = useSwitchChain()


    return (
        <div>
            <div className="dropdown dropdown-hover">
                <div tabIndex={0} role="button" className="btn m-1">
                    当前链 ID: {currentChainId}
                </div>
            </div>
            {chains.map((chain) => (
                <div className="">
                    <button key={chain.id} onClick={() => switchChain({ chainId: chain.id })} className='btn btn-outline'>
                        {chain.name}
                    </button>
                </div>
            ))}

        </div>
    );
};


export default ChainSwitcher

