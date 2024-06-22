'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { RiFileTextLine, RiImageLine, RiMusic2Line, RiShapesLine, RiVideoLine } from 'react-icons/ri'


export default function Home({ children }) {
  const pathname = usePathname();

  const linknav = [
    {
      href: "/",
      name: "推荐",
      logo: <RiShapesLine />
    },
    {
      href: "/article",
      name: "文章",
      logo: <RiFileTextLine />
    },
    {
      href: "/image",
      name: "图片",
      logo: <RiImageLine />
    },
    {
      href: "/music",
      name: "音乐",
      logo: <RiMusic2Line />
    },
    {
      href: "/video",
      name: "视频",
      logo: <RiVideoLine />
    }
  ]
  return (
    <div className="mx-auto lg:max-w-4xl  lg:justify-center pb-14  flex  flex-col ">



      <div className="flex flex-row border-x-0 md:border-x w-[100vw] lg:w-full z-20 h-16  items-center ">
        {linknav.map((item) => (
          <div className='mx-auto flex-col sm:flex-row  justify-around w-[20%] flex hover:bg-[--link-hover-background]  z-20' key={item.href}>

            <Link href={item.href} className={`z-20 flex items-center justify-center w-[100%] h-16 flex-col sm:flex-row  text-[#878787]  border-b ${pathname === item.href ? 'text-info border-b-2 border-b-info' : ''}`}>
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


