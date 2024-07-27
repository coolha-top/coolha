'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { RiFileTextLine, RiImageLine, RiMusic2Line, RiShapesLine, RiVideoLine } from 'react-icons/ri'


export default function Home({ children }) {
  const pathname = usePathname();

  const linknav = [
    {
      href: "/home",
      name: "所有",
      logo: <RiShapesLine />
    },
    {
      href: "/home/article",
      name: "文章",
      logo: <RiFileTextLine />
    },
    {
      href: "/home/image",
      name: "图片",
      logo: <RiImageLine />
    },
    {
      href: "/home/music",
      name: "音乐",
      logo: <RiMusic2Line />
    },
    {
      href: "/home/video",
      name: "视频",
      logo: <RiVideoLine />
    }
  ]
  return (
    <div className="mx-auto lg:max-w-4xl  lg:justify-center pb-14  flex  flex-col">



      <div className="flex flex-row w-[100vw] lg:w-full z-20 h-16  items-center">
        {linknav.map((item) => (
          <div className='mx-auto flex-col sm:flex-row  justify-around w-[20%] flex border-b z-20  ' key={item.href}>

            <Link href={item.href} className={`z-20 flex items-center justify-center w-[100%] h-16 flex-col sm:flex-row  text-[#878787] border-b bg-base-100 hover:bg-[--link-hover-background] ${pathname === item.href ? 'text-info  border-b-info border-b-2' : ''}`}>
              <div className=' justify-center text-2xl sm:text-3xl z-20'> {item.logo} </div>
              <p className="text-sm text-inherit z-20 text-center md:text-base md:ml-1">{item.name}</p>
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


