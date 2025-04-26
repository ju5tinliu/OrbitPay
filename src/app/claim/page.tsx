const pendingClaims = [
  {
    id: 1,
    game: 'Roblox',
    originalAmount: '5000 Robux',
    convertedAmount: '$35.00',
    readyDate: '2024-03-20',
    status: 'pending'
  },
]

export default function ClaimPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Claim Stablecoins
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-500">
          View and claim your converted stablecoins after the cooldown period.
        </p>
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
    </div>
  )
} 