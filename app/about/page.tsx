import Link from "next/link";
import { FaDiscord, FaGithub, FaSquareXTwitter, FaTelegram, FaTiktok } from 'react-icons/fa6';
import Image from "next/image"
import coolhatop应用流程 from '@/public//coolha.top/coolha.top应用流程.png'
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#C0E218] shadow-md">
        <div className=" mx-auto px-4 py-4 flex justify-between items-center">
          <img src="/favicon.ico" alt="favicon" className="w-16 font-bold text-gray-800" />
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="https://x.com" className="text-gray-800 hover:text-gray-600" target='_blank'>
                <FaSquareXTwitter className="w-8 h-8" />
              </Link></li>
              <li><Link href="https://discord.com" className="text-gray-800 hover:text-gray-600" target='_blank'>
                <FaDiscord className="w-8 h-8" />
              </Link></li>
              <li><Link href="https://telegram.org" className="text-gray-800 hover:text-gray-600" target='_blank'>
                <FaTelegram className="w-8 h-8" />
              </Link></li>
              <li><Link href="https://github.com" className="text-gray-800 hover:text-gray-600" target='_blank'>
                <FaGithub className="w-8 h-8" />
              </Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#C0E218] py-20">
        <div className=" mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">欢迎来到 coolha.top</h2>
          <p className="text-xl text-gray-700 mb-8">在 Web3 时代赋能去中心化连接</p>
          <Link href="/" className="inline-flex items-center bg-gray-800 text-white  text-2xl px-8 py-4 rounded-full hover:bg-gray-700 transition duration-300">
            开始使用 →
          </Link>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-20">
        <div className=" mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">为什么选择 coolha.top？</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">


            <div className="bg-gray-100 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">去中心化身份</h4>
              <p className="text-gray-600">使用区块链技术拥有和控制您的数字身份</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">安全消息传递</h4>
              <p className="text-gray-600">使用 XMTP 构建安全、私密和可移植的消息传递</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">去中心化治理</h4>
              <p className="text-gray-600">用户参与共同治理,不要因为中心组织过度控制而丧失活力</p>
            </div>
            <div className="bg-gray-100 m-3 p-6 rounded-lg ">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">应用架构</h4>
              <Image
                src={coolhatop应用流程}
                alt="coolha.top应用流程.png"
                sizes="100%"
                style={{
                  width: '100%',
                  height: 'auto',
                }} />
            </div>


          </div>
        </div>
      </section>




      {/* Team Section (Placeholder) */}
      <section className="py-20 bg-gray-100">
        <div className=" mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-8">认识我们的团队</h3>
          <Link href={`https://callha.com`} target='_blank' className="inline-flex items-center text-black text-xl px-8 py-4 rounded-full hover:bg-primary transition duration-300 border-2 gap-2">
            <img src="https://callha.com/favicon.ico" alt="callha" className="w-16 mask mask-circle" />
            酷哈网络科技工作室 ↗
          </Link>
        </div>
      </section>

      <p className="text-xl bg-zinc-700 py-5 text-center text-slate-200"> © 2024 coolha.top All Rights Reserved.</p>
    </div>
  )
}