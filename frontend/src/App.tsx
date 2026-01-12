import { ActivitiesPage } from './pages/ActivitiesPage'

function App() {
  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white shadow-md flex flex-col p-6">
          <h1 className="text-2xl font-semibold mb-8">🎡</h1>
          <nav className="flex flex-col gap-4">
              <button className="text-gray-700 hover:text-black font-medium transition-colors duration-200 text-left">
                  Team Buildings
              </button>
              <button className="text-gray-700 hover:text-black font-medium transition-colors duration-200 text-left">
                  Account
              </button>
          </nav>
      </aside>
      
      <ActivitiesPage />
    </div>
  )
}

export default App
