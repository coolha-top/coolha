'use client'
import { useChainId, useChains } from 'wagmi'
import { useEffect, useState } from 'react'
import { config } from '@/config/Wagmi'

const ChainSwitcher: React.FC = () => {
    const chains = useChains({ config });
    const currentChainId = useChainId({ config });
    const [selectedChainId, setSelectedChainId] = useState<number | undefined>(currentChainId);

    useEffect(() => {
        if (selectedChainId !== undefined && selectedChainId !== currentChainId) {
            handleSwitch(selectedChainId);
        }
    }, [selectedChainId, currentChainId]);

    const handleSwitch = async (newChainId: number) => {
        // Logic to switch the chain (e.g., connect to a new provider or update state)
        console.log(`Switching to chain with ID: ${newChainId}`);
        // Here you might want to update your application's state or connect to a new provider
        try {
            await switchChain(newChainId); // This function should handle the actual chain switching logic
            console.log(`Successfully switched to chain with ID: ${newChainId}`);
        } catch (error) {
            console.error(`Failed to switch to chain with ID: ${newChainId}`, error);
        }
    };

    return (
        <div>
            <div className="dropdown dropdown-hover">
                <div tabIndex={0} role="button" className="btn m-1">
                    当前链 ID: {currentChainId}
                </div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    {chains.map(chain => (
                        <li key={chain.id}>
                            <a
                                className="flex w-full items-center p-2 cursor-pointer"
                                onClick={() => setSelectedChainId(chain.id)}
                            >
                                <img src={`/path/to/${chain.name.toLowerCase()}.png`} alt={chain.name} className="w-8 h-8 mx-2" />
                                <span className="flex-1 text-left">{chain.name}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

// Example implementation of switchChain function
const switchChain = async (newChainId: number) => {
    // Here should be the logic to actually switch the chain, such as updating the provider or other relevant state
    console.log(`Switching chain to ID: ${newChainId}`);
    // Simulating an asynchronous operation
    return new Promise((resolve) => setTimeout(resolve, 1000));
};
export default ChainSwitcher

