'use client'
import { mainnet, polygon } from 'wagmi/chains'

import { getDefaultConfig, RainbowKitProvider, connectorsForWallets, darkTheme, lightTheme, midnightTheme } from '@rainbow-me/rainbowkit';
import { coinbaseWallet, injectedWallet, metaMaskWallet, okxWallet, rainbowWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';
import { useTheme } from 'next-themes';
import { cookieStorage, createStorage, http } from 'wagmi';
export const projectId = process.env.REOWN_ID || '123'

export const rainbowmetadata = {
    appName: 'Coolha',
    projectId: projectId,
    appDescription: 'Coolha Web Dapp',
    appUrl: 'https://coolha.top',
    appIcon: '/favicon.ico'
}

export const connectors = connectorsForWallets(
    [
        {
            groupName: 'Recommended',
            wallets: [injectedWallet, walletConnectWallet, metaMaskWallet, coinbaseWallet, okxWallet,],
        },
        {
            groupName: 'Others',
            wallets: [rainbowWallet],
        },
    ],
    {
        appName: 'Coolha',
        projectId: projectId,
    }
);

export const rainbowconfig = getDefaultConfig({
    appName: 'Coolha',
    projectId: projectId,
    appDescription: 'Coolha Web Dapp',
    appUrl: 'https://coolha.top',
    appIcon: 'https://coolha.top/favicon.ico',
    chains: [polygon, mainnet],
    transports: {
        [polygon.id]: http(`https://polygon-mainnet.g.alchemy.com/v2/${process.env.REOWN_ID}`),
        [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${process.env.REOWN_ID}`),

    },
    ssr: true,
    storage: createStorage({
        storage: cookieStorage
    }),
});


export function Rainbowkit({ children }) {
    const getRainbowKitTheme = () => {
        const { theme } = useTheme();
        switch (theme) {
            case 'dark':
                return darkTheme({
                    accentColor: '#C0E218',
                });
            case 'midnight':
                return midnightTheme({
                    accentColor: '#C0E218',
                });
            default:
                return lightTheme({
                    accentColor: '#b5d419',
                });
        }
    };
    return (
        <RainbowKitProvider
            initialChain={polygon}
            theme={getRainbowKitTheme()}
            appInfo={{
                appName: 'Coolha',
                learnMoreUrl: 'https://coolha.top',
            }}>
            {children}
        </RainbowKitProvider>
    )
}
