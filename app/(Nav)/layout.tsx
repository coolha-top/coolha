
import Navbar from '@/components/nav/Navbar'
import NavHeader from '@/components/nav/NavHeader'


export default function layout({children}) {
   return (
     <>
     <NavHeader />
     {children}
     <Navbar />
     </>
   )
}