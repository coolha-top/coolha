'use client'
import Header from '@/components/header/Header'
import { useRouter } from "next/navigation";
import { RiArrowLeftLine } from 'react-icons/ri'



export default function layout({ children }) {
  // 获取路由器实例
  const router = useRouter();

  // 处理返回上一页功能
  const handleBack = () => {
    router.back(); // 调用路由器的 back 方法返回上一页
  };
  return (
    <div className='bg-base-200'>

      <div className=" lg:min-w-4xl mx-auto   w-full h-full bg-base-100">
        <div className="navbar py-0 ">
          <div className=" navbar-start">
            <button className="btn btn-square btn-ghost" onClick={handleBack} >
              <RiArrowLeftLine size={24} />
            </button>
          </div>
          <div className=" navbar-center"></div>
          <div className=" navbar-end"></div>
        </div>
      </div>

      <Header />

      <div className='mx-auto  min-h-[calc(100dvh-4rem)] flex-1 justify-center'>
        {children}
      </div>


    </div>
  )
}