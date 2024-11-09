
import { http, createConfig, cookieStorage, createStorage } from 'wagmi'
import { mainnet, polygon } from 'wagmi/chains'
import { ConnectKitProvider, getDefaultConfig } from "connectkit";



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


export const config = createConfig(
  getDefaultConfig({
    chains: [polygon, mainnet,],
    transports: {
      [polygon.id]: http(`https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`),
      [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`),
    },
    walletConnectProjectId: process.env.REOWN_ID||'12345678',

    // Required App Info
    appName: "Coolha",

    // Optional App Info
    appDescription: "Coolha Web Dapp",
    appUrl: "https://coolha.top", // your app's url
    appIcon: "https://coolha.top/favicon.ico", // your app's icon, no bigger than 1024x1024px (max. 1MB)
    ssr: true,
    storage: createStorage({
      storage: cookieStorage
    }),
  }))


