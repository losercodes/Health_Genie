"use client"
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
  createAuthenticationAdapter,
  RainbowKitAuthenticationProvider,
  Chain
} from '@rainbow-me/rainbowkit';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { WagmiProvider } from 'wagmi';
import { SiweMessage } from 'siwe';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
  polygonMumbai,
  sepolia
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
const queryClient = new QueryClient();

const projectId = process.env.NEXT_PUBLIC_ID;
const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: projectId,
  chains: [sepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

export default function Wagmi ({children})  {


  
    return (
      <>
        <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>

        <RainbowKitProvider modalSize="compact">
        <ThirdwebProvider clientId='aaa3991aa7457b41856c2b336a3ad746'>
        {children}
        </ThirdwebProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
      </>
    );
  };