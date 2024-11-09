
import { http, createConfig, cookieStorage, createStorage } from 'wagmi'
import { mainnet, polygon } from 'wagmi/chains'
import { connectors } from './Rainbowkit'



/* export const bbtestnet = defineChain({
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
}) */



/* export const metadata = {
  name: 'Coolha',
  description: 'Coolha Web Dapp',
  url: 'https://coolha.top',
  icons: ['/favicon.ico']
} */


export const config = createConfig({
  chains: [polygon, mainnet,  /* bbtestnet */],
  transports: {
        [polygon.id]: http(`https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`),
        [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`),
    /* [bbtestnet.id]: http(), */
  },
  connectors,
  /*   connectors: [
      injected({ shimDisconnect: true }),
      metaMask(),
      safe(),
      coinbaseWallet({
        appName: metadata.name,
        appLogoUrl: metadata.icons[0]
      }),
      walletConnect({ projectId, metadata, showQrModal: false }),
    ], */
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
})


