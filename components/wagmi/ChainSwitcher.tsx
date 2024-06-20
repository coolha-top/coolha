'use client'
import { useChainId, useChains } from 'wagmi'
import { config } from '@/config/Wagmi'

const ChainSwitcher: React.FC = () => {
    const currentChainId = useChainId({ config });


    return (
        <div>
            <div className="dropdown dropdown-hover">
                <div tabIndex={0} role="button" className="btn m-1">
                    当前链 ID: {currentChainId}
                </div>

            </div>
        </div>
    );
};


export default ChainSwitcher

