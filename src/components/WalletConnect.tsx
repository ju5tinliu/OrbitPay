"use client"

import { useState } from 'react'
import { WalletIcon } from '@heroicons/react/24/outline'

type WalletType = 'MetaMask' | 'Polkadot.js' | null

export default function WalletConnect() {
  const [connectedWallet, setConnectedWallet] = useState<WalletType>(null)
  const [isOpen, setIsOpen] = useState(false)

  const connectWallet = async (type: WalletType) => {
    // This is a placeholder for actual wallet connection logic
    console.log(`Connecting to ${type}...`)
    setConnectedWallet(type)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <WalletIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
        {connectedWallet ? `Connected: ${connectedWallet}` : 'Connect Wallet'}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <button
              onClick={() => connectWallet('MetaMask')}
              className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
            >
              Connect MetaMask
            </button>
            <button
              onClick={() => connectWallet('Polkadot.js')}
              className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
            >
              Connect Polkadot.js
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 