
'use client'
import { useRouter } from "next/navigation";
import { RiArrowLeftLine, RiMore2Fill } from "react-icons/ri";
export default function PostHeader() {
        // 获取路由器实例
        const router = useRouter();

        // 处理返回上一页功能
        const handleBack = () => {
            router.back(); // 调用路由器的 back 方法返回上一页
        };
    return (
        <div>
            {/* header */}
            <div className="navbar py-0 ">
                <div className=" navbar-start">
                    <button className="btn btn-square btn-ghost" onClick={handleBack} /* onClick={() => router.back()} */>
                        <RiArrowLeftLine size={24} />
                    </button>
                </div>
                <div className=" navbar-center">帖子详情</div>
                <div className=" navbar-end">
                    <button className="btn btn-square btn-ghost">
                        <RiMore2Fill size={24} />
                    </button>
                </div>
            </div>
        </div>
    )
}