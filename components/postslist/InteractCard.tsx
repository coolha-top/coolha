'use client'
import { useRouter } from "next/navigation";
import { RiChat1Line, RiHeart3Line, RiRepeat2Line, RiShieldCheckLine } from "react-icons/ri";
export default function interactCard({ dataname }) {
  const router = useRouter();
  return (
      <div className='sm:max-w-[50%] w-dvw justify-around flex items-center mt-1'>
          <button className=" grid justify-items-center pt-1 rounded-full size-7  hover:bg-primary/30" onClick={() => router.push(`/${dataname.by.handle.localName}.lens/posts/${dataname.id}`)} >
            <RiChat1Line className="size-5 " />
            <p>{dataname.stats.comments}</p>

          </button>

          <button className=" grid justify-items-center pt-1 rounded-full size-7  hover:bg-rose-600/30"  >
            <RiHeart3Line className="size-5 " />{/* RiHeart3Fill  */}
            <p>{dataname.stats.upvotes}</p>
          </button>

          <button className=" grid justify-items-center pt-1 rounded-full size-7  hover:bg-sky-400/30"  >
            <RiRepeat2Line className="size-5 " />
            <p>{dataname.stats.mirrors}</p>
          </button>

          <button className=" grid justify-items-center pt-1 rounded-full size-7  hover:bg-emerald-600/30"  >
            <RiShieldCheckLine className="size-5 " />
            <p>{dataname.stats.collects}</p>
          </button>

      </div>
  )
}

