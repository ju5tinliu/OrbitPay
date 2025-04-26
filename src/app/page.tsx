import { ArrowTrendingUpIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'

const gameAccounts = [
  {
    id: 1,
    game: 'Roblox',
    balance: '5000 Robux',
    usdValue: '$50.00',
    convertibleValue: '$35.00',
    icon: '/roblox-icon.png'
  },
  {
    id: 2,
    game: 'Fortnite',
    balance: '2000 V-Bucks',
    usdValue: '$20.00',
    convertibleValue: '$14.00',
    icon: '/fortnite-icon.png'
  },
]

const stats = [
  { name: 'Total Balance (USD)', value: '$70.00', icon: CurrencyDollarIcon },
  { name: 'Convertible Value', value: '$49.00', icon: ArrowTrendingUpIcon },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Dashboard
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-500">
          Manage your game currencies and see your total balance across all games.
        </p>
      </div>

      <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </dd>
          </div>
        ))}
      </dl>

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
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">Value: {account.usdValue}</p>
                    <p className="text-sm text-gray-500">Convertible: {account.convertibleValue}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
