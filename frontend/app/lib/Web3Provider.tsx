"use client"

import { WagmiProvider, createConfig } from "wagmi";
import { getClient, getConnectorClient } from '@wagmi/core' 
import { mainnet, confluxESpace, hardhat } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { type ReactNode } from 'react'
import { NextUIProvider } from '@nextui-org/react'
import  CustomAvatar from "../components/customAvatar"
// import { injected, metaMask, walletConnect } from 'wagmi/connectors' 

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [mainnet, confluxESpace, hardhat],
    // connectors: [], 
    ssr: true,
    // Required API Keys
    walletConnectProjectId: "", //process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,

    // Required App Info
    appName: "CryptoQuest",

    // Optional App Info
    appDescription: "Blockchain powered gamebook",
    // appUrl: "https://family.co", // your app's url
    // appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);

const queryClient = new QueryClient();

export const Web3Provider = (props: { children: ReactNode }) => {
  return (
    <NextUIProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ConnectKitProvider options={{hideNoWalletCTA: true, customAvatar: CustomAvatar}}>
            {props.children}
          </ConnectKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </NextUIProvider>
  );
};
