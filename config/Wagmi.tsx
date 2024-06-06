
import { http, createConfig, cookieStorage, createStorage } from 'wagmi'
import { polygon } from 'wagmi/chains'
import { walletConnect, injected, coinbaseWallet } from 'wagmi/connectors'


export const projectId = process.env.WEB3MODAL_PROJECT_ID || '1234567890'
if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
  name: 'VimCord',
  description: 'VimCord Web Dapp',
  url: 'https://vimcord.coinipfs.com',
  icons: ['/favicon.ico']
}



// 1. Get projectId at https://cloud.walletconnect.com

export const config = createConfig({
  chains: [polygon],
  transports: {
    [polygon.id]: http('https://polygon-mainnet.g.alchemy.com/v2/r7uzJiYjqoCs7Gn0tSZT3U9BROceAZSJ'),
  },
  connectors: [
    injected({ shimDisconnect: true }),
    walletConnect({ projectId, metadata, showQrModal: false }),
    coinbaseWallet({
      appName: metadata.name,
      appLogoUrl: metadata.icons[0]
    })
  ],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
})


