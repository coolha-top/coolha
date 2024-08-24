'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { RiFileTextLine, RiImageLine, RiMusic2Line, RiShapesLine, RiVideoLine } from 'react-icons/ri'


export default function Home({ children }) {
  const pathname = usePathname();
  const index = [
    {
      title: '推荐',// lens算法
      key: 'LensCurated',
    },
    {
      title: '最新',// 最近
      key: 'Latest',
    },
    {
      title: '热门',// 反应最频繁
      key: 'TopReacted',
    },
    {
      title: '趋势',// 最多收集
      key: 'TopCollectedOpenAction',
    },
    {
      title: '热议',// 热门评论
      key: 'TopCommented',
    },
    {
      title: '有趣',// 最多镜像 转发
      key: 'TopMirrored',
    },
    {
      title: '分享',// 最多引用
      key: 'TopQuoted',
    }
  ]
  const linknav = [
    {
      href: "/home",
      name: "全部",
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
    <div className="mx-auto lg:max-w-4xl  lg:justify-center pb-14 flex flex-col">

      <div className="flex flex-row w-full z-20 h-12  items-center bg-base-100 overflow-x-auto">
        <div className='m-1' >

          <Link href={`guanzhu`} className={`btn btn-sm  ${pathname === `guanzhu` ? 'text-info ' : ''}`}>
            <span className="text-center md:text-lg md:ml-1">关注</span>
          </Link>

        </div>
        {index.map((item) => (
          <div className='m-1' key={item.key}>

            <Link href={item.key} className={`btn btn-sm  ${pathname === item.key ? 'text-info ' : ''}`}>
              <span className="text-center md:text-lg md:ml-1">{item.title}</span>
            </Link>

          </div>
        ))}
      </div>

      <div className="flex flex-row w-full z-20 h-16  items-center">
        {linknav.map((item) => (
          <div className='mx-auto flex-col sm:flex-row  justify-around w-[20%] flex  z-20  ' key={item.href}>

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


