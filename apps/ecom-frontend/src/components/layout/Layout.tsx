import { Outlet } from 'react-router'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { ToastContainer } from '@/components/ui/Toast'

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer />
      <Navbar />
      <div className="container mx-auto py-7 grow h-full">
        <div className="mx-5">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  )
}