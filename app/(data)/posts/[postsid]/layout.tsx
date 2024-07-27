'use client'
import { useRouter } from "next/navigation";
import { RiArrowLeftLine, RiMore2Fill } from "react-icons/ri";

export default function layout({ children }) {
  // 获取路由器实例
  const router = useRouter();

  // 处理返回上一页功能
  const handleBack = () => {
    router.back(); // 调用路由器的 back 方法返回上一页
  };
  return (
    <div className="max-w-4xl lg:min-w-4xl mx-auto   w-full h-full bg-base-100">

      <div className="navbar py-0 ">
        <div className=" navbar-start">
          <button className="btn btn-square btn-ghost" onClick={handleBack} >
            <RiArrowLeftLine size={24} />
          </button>
        </div>
        <div className=" navbar-center">帖子详情</div>
        <div className=" navbar-end">
          {/*           <button className="btn btn-square btn-ghost">
            <RiMore2Fill size={24} />
          </button> */}
        </div>
      </div>


      {children}
    </div>
  )
}