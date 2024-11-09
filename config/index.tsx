'use client'
import { LensProvider } from "@lens-protocol/react-web"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { config } from './Wagmi';
import { ReactNode } from "react"
import { State, WagmiProvider } from 'wagmi'
import { lensConfig } from "./Lens"
import ConnectKit from "./ConnectKit";

export const queryClient = new QueryClient()

export function ContextProvider({ children, initialState }: { children: ReactNode; initialState: State | undefined; }) {
    return (
        <WagmiProvider config={config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>
                <ConnectKit>
                    <LensProvider config={lensConfig}>
                        {children}
                    </LensProvider>
                </ConnectKit>
            </QueryClientProvider>
        </WagmiProvider>
    )
}