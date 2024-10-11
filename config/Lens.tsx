'use client'
import type { ReactNode } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type State, WagmiProvider } from 'wagmi'

import { LensConfig, production, LensProvider, development } from '@lens-protocol/react-web';
import { bindings } from '@lens-protocol/wagmi';
import { config } from './Wagmi';

const queryClient = new QueryClient()

const lensConfig: LensConfig = {
  environment: production,
  bindings: bindings(config),
/*   params: {
    profile: {
      metadataSource: 'coolha'
    }
  } */
};


export function LensWagmiProviders({
  children,
  initialState
}: {
  children: ReactNode
  initialState?: State
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <LensProvider config={lensConfig}>
          {children}
        </LensProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}