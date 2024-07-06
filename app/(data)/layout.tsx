
import Header from '@/components/header/header'



export default function layout({ children }) {
  return (
    <div className='bg-base-200'>
      <Header />
      <div className="h-0 md:h-16" />
      {children}
    </div>
  )
}