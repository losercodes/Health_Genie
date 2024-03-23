"use client"
import React from 'react'
import './connect.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi'
import { permanentRedirect } from 'next/navigation'
import { useSignMessage } from 'wagmi'
import { useVerifyMessage } from 'wagmi'

export default function Connect() {

const {isConnected}=useAccount();
  const { isSuccess:tx,signMessage } = useSignMessage();
  console.log(tx);
if(isConnected){
  permanentRedirect('/Dashboard');
}

  return (
 <ConnectButton.Custom 
    accountStatus={{
      smallScreen: 'avatar',
      largeScreen: 'full',
    }}
    >
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        
        const connected =
          account &&
          chain;

        return (
          <div
          >
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} type="button" className='wallet'>
                    Connect Wallet
                  </button>
                );
              }
              if(isConnected){
                <button onClick={openConnectModal} type="button" className='wallet'>
                Disconnect
              </button>
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button" className='sign-with'>
                    Wrong network
                  </button>
                );
              }

              return (
                <div style={{ display: 'flex', gap: 12 }}>
           

                  <button onClick={openAccountModal} type="button" className='wallet'>
                    {account.displayName}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
    


  )
}
