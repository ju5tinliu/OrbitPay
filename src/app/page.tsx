"use client"

import { ArrowTrendingUpIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'

interface GameAccount {
  id: number
  game: string
  balance: string
  usdValue: string
  convertibleValue: string
  icon: string
  status: 'shutdown' | 'running'
}

interface ConversionModalProps {
  isOpen: boolean
  account: GameAccount | null
  onClose: () => void
  onConfirm: (playerId: string, walletId: string) => void
}

function ConversionModal({ isOpen, account, onClose, onConfirm }: ConversionModalProps) {
  const [playerId, setPlayerId] = useState('')
  const [walletId, setWalletId] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!playerId.trim() || !walletId.trim()) {
      setError('Both Player ID and Wallet ID are required')
      return
    }
    onConfirm(playerId, walletId)
    setPlayerId('')
    setWalletId('')
    setError('')
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded-lg bg-white p-6 shadow-xl">
          <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Confirm Conversion
          </Dialog.Title>

          {account && (
            <div className="mb-4">
              <p className="text-sm text-gray-500">
                You are about to convert:
              </p>
              <p className="font-medium text-gray-900">
                {account.balance} ({account.game})
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Estimated value: {account.convertibleValue}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="playerId" className="block text-sm font-medium text-gray-700">
                  Player ID
                </label>
                <input
                  type="text"
                  id="playerId"
                  value={playerId}
                  onChange={(e) => setPlayerId(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter your player ID"
                />
              </div>

              <div>
                <label htmlFor="walletId" className="block text-sm font-medium text-gray-700">
                  Wallet ID
                </label>
                <input
                  type="text"
                  id="walletId"
                  value={walletId}
                  onChange={(e) => setWalletId(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter your wallet ID"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600">
                  {error}
                </p>
              )}

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Confirm Conversion
                </button>
              </div>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

const initialGameAccounts: GameAccount[] = [
  {
    id: 1,
    game: 'CatBlaster',
    balance: '5000 MeowBucks',
    usdValue: '$50.00',
    convertibleValue: '$35.00',
    icon: '/catblaster-icon.png',
    status: 'shutdown'
  },
  {
    id: 2,
    game: 'Fortnite',
    balance: '2000 V-Bucks',
    usdValue: '$20.00',
    convertibleValue: '$14.00',
    icon: '/fortnite-icon.png',
    status: 'running'
  },
]

const stats = [
  { name: 'Total Balance (USD)', value: '$70.00', icon: CurrencyDollarIcon },
  { name: 'Convertible Value', value: '$49.00', icon: ArrowTrendingUpIcon },
]

const initialPendingClaims = [
  {
    id: 1,
    game: 'Roblox',
    originalAmount: '5000 Robux',
    convertedAmount: '$35.00',
    readyDate: '2025-04-26',
    status: 'pending'
  }
]

export default function Dashboard() {
  const [gameAccounts, setGameAccounts] = useState(initialGameAccounts)
  const [pendingClaims, setPendingClaims] = useState(initialPendingClaims)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState<GameAccount | null>(null)

  const handleConvertClick = (account: GameAccount) => {
    if (account.status !== 'shutdown') return
    setSelectedAccount(account)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedAccount(null)
  }

  const handleConversionConfirm = (playerId: string, walletId: string) => {
    if (!selectedAccount) return

    // Remove from game accounts
    setGameAccounts(gameAccounts.filter(ga => ga.id !== selectedAccount.id))

    // Add to pending claims
    const newClaim = {
      id: Date.now(),
      game: selectedAccount.game,
      originalAmount: selectedAccount.balance,
      convertedAmount: selectedAccount.convertibleValue,
      readyDate: '2025-04-26',
      status: 'pending'
    }
    setPendingClaims([...pendingClaims, newClaim])
    
    // Close modal
    handleModalClose()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Dashboard
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-500">
          Manage your game currencies, convert to stablecoins, and claim your converted funds.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 max-w-5xl mx-auto">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white px-8 py-12 shadow text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="rounded-md bg-indigo-500 p-5">
                <stat.icon className="h-10 w-10 text-white" aria-hidden="true" />
              </div>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-3">{stat.name}</h3>
            <p className="text-4xl font-semibold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-base font-semibold leading-6 text-gray-900">Linked Game Accounts</h3>
        <div className="mt-4 overflow-hidden bg-white shadow sm:rounded-lg">
          <ul role="list" className="divide-y divide-gray-200">
            {gameAccounts.map((account) => (
              <li key={account.id} className="px-4 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-12 w-12 flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-gray-200" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">{account.game}</h4>
                      <p className="text-sm text-gray-500">{account.balance}</p>
                      <p className="text-sm text-gray-500">
                        Status: <span className={account.status === 'shutdown' ? 'text-red-600 font-medium' : 'text-green-600 font-medium'}>
                          {account.status === 'shutdown' ? 'Shutdown' : 'Running'}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">Value: {account.usdValue}</p>
                    <p className="text-sm text-gray-500">Convertible: {account.convertibleValue}</p>
                    <button
                      type="button"
                      onClick={() => handleConvertClick(account)}
                      disabled={account.status !== 'shutdown'}
                      className={`mt-2 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                        account.status === 'shutdown'
                          ? 'bg-indigo-600 hover:bg-indigo-500'
                          : 'bg-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Convert Now
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Pending Claims</h3>
          
          <div className="mt-4">
            {pendingClaims.length > 0 ? (
              <ul role="list" className="divide-y divide-gray-200">
                {pendingClaims.map((claim) => (
                  <li key={claim.id} className="py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">{claim.game}</h4>
                        <p className="mt-1 text-sm text-gray-500">
                          Original Amount: {claim.originalAmount}
                        </p>
                        <p className="text-sm text-gray-500">
                          Converted Amount: {claim.convertedAmount}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Ready on: {claim.readyDate}</p>
                        <button
                          type="button"
                          disabled={claim.status === 'pending'}
                          className="mt-2 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                          {claim.status === 'pending' ? 'Pending' : 'Claim Now'}
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-md bg-yellow-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      No pending claims available
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Claim History</h3>
          <div className="mt-4">
            <div className="rounded-md bg-gray-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-gray-700">
                    No previous claims found
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConversionModal
        isOpen={isModalOpen}
        account={selectedAccount}
        onClose={handleModalClose}
        onConfirm={handleConversionConfirm}
      />
    </div>
  )
}
