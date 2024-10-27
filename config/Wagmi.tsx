
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



export const metadata = {
  name: 'Coolha',
  description: 'Coolha Web Dapp',
  url: 'https://coolha.top',
  icons: ['/favicon.ico']
}
const MetaMaskOptions = {
  dappMetadata: {
    name: "Coolha Dapp",
  },
  infuraAPIKey: process.env.INFURA_API_KEY,
  extensionOnly: true
};



export const config = createConfig({
  chains: [polygon, polygonAmoy, bbtestnet],
  transports: {
    [polygon.id]: http(),
    [polygonAmoy.id]: http(),
    [bbtestnet.id]: http(),
  },


  connectors: [
    injected({ shimDisconnect: true }),
    metaMask(MetaMaskOptions),
    safe(),
    coinbaseWallet({
      appName: metadata.name,
      appLogoUrl: metadata.icons[0]
    }),
    /* walletConnect({ projectId, metadata, showQrModal: false }), */
  ],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
})


