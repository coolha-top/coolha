'use client'

import React, { ReactNode } from 'react'
import { config, projectId } from '@/config/Wagmi'

import { createWeb3Modal, useWeb3ModalTheme } from '@web3modal/wagmi/react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { State, WagmiProvider } from 'wagmi'
import { useTheme } from 'next-themes'


// Setup queryClient
const queryClient = new QueryClient()

if (!projectId) throw new Error('Project ID is not defined')
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  enableOnramp: true,
  featuredWalletIds: [
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
    '971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709',
    '8a0ee50d1f22f6651afcae7eb4253e52a3310b90af5daef78a8c4929a9bb99d4'
  ],
  themeVariables: ({
    //'--w3m-font-family': 'Roboto, sans-serif',//Base 字体系列
    '--w3m-accent': '#ea7411',//用于按钮、图标、标签等的颜色
    //'--w3m-color-mix': '#C0E218',//与默认颜色混合的颜色
    //'--w3m-color-mix-strength': 5,//“--w3m-color-mix”应该混合多少的百分比
    //'--w3m-font-size-master': '2px',// 的基本像素大小
    '--w3m-border-radius-master': '1px',//基本边框半径（以像素为单位）
    //'--w3m-z-index': 50


  }),
})


export function Web3ModalProvider({
  children,
  initialState
}: {
  children: ReactNode
  initialState?: State
}) {

  const { theme } = useTheme();
  const { themeMode, themeVariables, setThemeMode, setThemeVariables, } = useWeb3ModalTheme()
  setThemeMode(theme === 'light' ? 'light' : 'dark')

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {children}
        </QueryClientProvider>
    </WagmiProvider>
  )
}