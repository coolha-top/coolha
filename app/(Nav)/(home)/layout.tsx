'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { RiFileTextLine, RiImageLine, RiMusic2Line, RiShapesLine, RiVideoLine } from 'react-icons/ri'


export default function Home({ children }) {
  const pathname = usePathname();

  const linknav = [
    {
      href: "/",
      name: "All",
      logo: <RiShapesLine  />
    },
    {
      href: "/article",
      name: "article",
      logo: <RiFileTextLine  />
    },
    {
      href: "/image",
      name: "image",
      logo: <RiImageLine  />
    },
    {
      href: "/music",
      name: "music",
      logo: <RiMusic2Line  />
    },
    {
      href: "/video",
      name: "video",
      logo: <RiVideoLine  />
    }
  ]
  return (
    <div className="mx-auto lg:max-w-4xl  lg:justify-center pb-14  flex  flex-col ">



      <div className="flex flex-row border-x-0 md:border-x w-[100vw] lg:w-full z-20 h-16 md:mt-16 items-center ">
        {linknav.map((item) => (
          <div className='mx-auto flex-col sm:flex-row  justify-around w-[20%] flex hover:bg-[--link-hover-background]  z-20' key={item.href}>

          <Link  href={item.href} className={`z-20 flex items-center justify-center w-[100%] h-16 flex-col sm:flex-row  text-[#878787]  border-b ${pathname === item.href ? 'text-info border-b-2 border-b-info' : ''}`}>
              <div className=' justify-center text-2xl sm:text-3xl z-20'> {item.logo} </div>
              <p className="text-sm text-inherit z-20 text-center">{item.name}</p>
          </Link>

          </div>
        ))}
      </div>



      <div className=''>

        {children}

      </div>




    </div>
  )
}


