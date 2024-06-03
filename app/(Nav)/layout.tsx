
import Navbar from '@/components/header/Navbar'
import NavHeader from '@/components/header/NavHeader'


export default function layout({children}) {
   return (
     <>
     <NavHeader />
     {children}
     <Navbar />
     </>
   )
}