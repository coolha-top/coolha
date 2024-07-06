
import Header from '@/components/header/header'
import Navbar from '@/components/header/Navbar'
import NavHeader from '@/components/header/NavHeader'


export default function layout({ children }) {
  return (
    <div className='bg-base-200'>
      <Header />
      <div className="h-0 md:h-16" />
      <NavHeader />
      {children}
      <Navbar />
    </div>
  )
}