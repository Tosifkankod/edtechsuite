import { useState } from 'react'
import Header from '../components/common/Header'
import Sidebar from '../components/common/Sidebar'
import { Outlet } from 'react-router-dom';

function App() {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

    return (
        <>
            <div className="app-layout flex gap-2 h-screen border-2 p-2">
                <Sidebar sidebarOpen={sidebarOpen} />
                <main className='p-2 w-full overflow-y-auto'>
                    <Header setSidebarOpen={setSidebarOpen} />
                    <div className='h-[120vh]'>
                        <Outlet />
                    </div>
                </main>
            </div>
        </>
    )
}

export default App
