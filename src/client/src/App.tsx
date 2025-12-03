import { useState } from 'react'
import './App.css'
import Header from './components/common/Header'
import Sidebar from './components/common/Sidebar'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <>
      <div className="app-layout flex gap-2 h-screen border-2 p-2">
        <Sidebar sidebarOpen={sidebarOpen} />
        <main className='p-2 w-full overflow-y-auto'>
          <Header setSidebarOpen={setSidebarOpen} />
          <div className='h-[120vh]'>
            <h1 className='text-2xl font-bold mt-2'>Analytics</h1>
            <p className='text-gray-400' >Check the sales, value and bounce rate by country.</p>
          </div>
        </main>
      </div>
    </>
  )
}

export default App
