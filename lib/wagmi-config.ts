import { createConfig, http } from "wagmi"
import { mainnet, polygon, celo } from "wagmi/chains"
import { metaMask, walletConnect, coinbaseWallet } from "wagmi/connectors"

// WalletConnect project ID - in production, this should be from environment variables
const projectId = "demo-project-id"

export const wagmiConfig = createConfig({
  chains: [mainnet, polygon, celo],
  connectors: [
    metaMask(),
    walletConnect({ 
      projectId,
      metadata: {
        name: "PropChain",
        description: "Web3 Real Estate Platform",
        url: "https://propchain.app",
        icons: ["https://propchain.app/icon.png"]
      },
      showQrModal: true
    }),
    coinbaseWallet({ 
      appName: "PropChain",
      appLogoUrl: "https://propchain.app/icon.png"
    })
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [celo.id]: http(),
  },
  ssr: true,
  syncConnectedChain: true,
})
