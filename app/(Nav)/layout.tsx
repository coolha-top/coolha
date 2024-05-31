
import Nav from '@/components/nav/Navbar'


export default function layout({children}) {
   return (
     <>
     {children}
     <Nav />
     </>
   )
}