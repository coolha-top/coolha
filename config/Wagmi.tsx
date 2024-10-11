
import { http, createConfig, cookieStorage, createStorage } from 'wagmi'
import { polygon, polygonAmoy } from 'wagmi/chains'
import { walletConnect, injected, metaMask, safe, coinbaseWallet, } from 'wagmi/connectors'
import { defineChain, type Chain } from 'viem'


export const bbtestnet = defineChain({
  id: 20651,
  name: "bbtestnet",
  nativeCurrency: {
    decimals: 18,
    name: "Native Token",
    symbol: "Native Token",
  },
  rpcUrls: {
    public: { http: ["https://rpc.buildbear.io/classical-kingpin-385d0670"] },
    default: { http: ["https://rpc.buildbear.io/classical-kingpin-385d0670"] },
  },
  blockExplorers: {
    default: {
      name: "BBExplorer",
      url: "https://explorer.buildbear.io/classical-kingpin-385d0670",
    },
  }
})


/* export const projectId = process.env.WEB3MODAL_PROJECT_ID || '1234567890'
if (!projectId) throw new Error('Project ID is not defined') */

export const metadata = {
  name: 'CoolHa.Top',
  description: 'CoolHa.Top Web Dapp',
  url: 'https://coolha.top',
  icons: ['/favicon.ico']
}
const MetaMaskOptions = {
  dappMetadata: {
    name: "CoolHa.Top Dapp",
  },
  infuraAPIKey: process.env.INFURA_API_KEY,
  extensionOnly: true
};



export const config = createConfig({
  chains: [polygon, polygonAmoy,bbtestnet],
  transports: {
    [polygon.id]: http(),
    [polygonAmoy.id]: http(),
    [bbtestnet.id]: http(),
  },


  connectors: [
    metaMask(MetaMaskOptions),
    /*   walletConnect({ projectId, metadata, showQrModal: false }), */
    safe(),
    coinbaseWallet({
      appName: metadata.name,
      appLogoUrl: metadata.icons[0]
    }),
    injected({ shimDisconnect: true }),
  ],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
})


