
import React from 'react';
import { ConnectButton, WalletProvider } from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';

const ConnectWallet: React.FC = () => {
  return (
    <WalletProvider>
      <ConnectButton 
        className="bg-cringe-purple text-white px-4 py-2 rounded hover:bg-cringe-purple/90 transition-colors"
      />
    </WalletProvider>
  );
};

export default ConnectWallet;
