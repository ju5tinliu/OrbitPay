import { ArrowLongRightIcon } from '@heroicons/react/24/outline'

const games = [
  { id: 1, name: 'Roblox', currency: 'Robux', balance: 5000 },
  { id: 2, name: 'Fortnite', currency: 'V-Bucks', balance: 2000 },
]

export default function ConvertPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Convert Currency
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-500">
          Convert your game currency to UGCC stablecoin. Note: Conversion takes 1 week to process.
        </p>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="mt-5">
            <form className="space-y-6">
              <div>
                <label htmlFor="game" className="block text-sm font-medium leading-6 text-gray-900">
                  Select Game
                </label>
                <select
                  id="game"
                  name="game"
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">Select a game</option>
                  {games.map((game) => (
                    <option key={game.id} value={game.id}>
                      {game.name} ({game.currency}: {game.balance})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                  Amount to Convert
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    className="block w-full rounded-md border-0 py-1.5 pl-3 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="rounded-md bg-blue-50 p-4">
                <div className="flex">
                  <div className="ml-3 flex-1 md:flex md:justify-between">
                    <p className="text-sm text-blue-700">
                      Estimated return: <span className="font-semibold">70-80%</span> of value
                    </p>
                    <p className="mt-3 text-sm md:mt-0 md:ml-6 text-blue-700">
                      Processing time: <span className="font-semibold">1 week</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Start Conversion
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg mt-6">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Active Conversions</h3>
          <div className="mt-4">
            <div className="rounded-md bg-yellow-50 p-4">
              <div className="flex">
                <div className="ml-3 flex-1 md:flex md:justify-between">
                  <p className="text-sm text-yellow-700">
                    No active conversions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 