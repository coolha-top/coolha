'use client'
import ThemeSwap from "@/components/ThemeSwap";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { RiChat3Line, RiFileTextLine, RiImageLine, RiMusic2Line, RiNotification3Line, RiQuestionAnswerLine, RiShapesLine, RiTeamLine, RiVideoLine } from 'react-icons/ri'
export default function Message({ children }) {
  const pathname = usePathname();
  return (
    <div className='mx-auto max-w-4xl justify-center border-x-0 md:border-x'>



      <div className="flex flex-row  w-full lg:w-full z-20 h-16  items-center ">

        {linknav.map((item) => (
          <div className='mx-auto flex-col sm:flex-row w-1/3 justify-around flex hover:bg-[--link-hover-background]  z-20' key={item.href}>

            <Link href={item.href} className={`z-20 flex items-center justify-center w-[100%] h-16 flex-col sm:flex-row  text-[#878787]  border-b ${pathname === item.href ? 'text-info  border-b-2 border-b-info' : ''}`}>
              <div className=' justify-center text-2xl sm:text-2xl z-20'> {item.logo} </div>
              <p className="text-sm text-inherit z-20 text-center">{item.name}</p>
            </Link>

          </div>
        ))}
        
      </div>



      {children}
    </div>
  );
}

const linknav = [
  {
    href: "/message/chat",
    name: "聊天",
    logo: <RiQuestionAnswerLine />
  },
  {
    href: "/message/community",
    name: "社区",
    logo: <RiTeamLine />
  },
  {
    href: "/message/notice",
    name: "通知",
    logo: <RiNotification3Line />
  },

]