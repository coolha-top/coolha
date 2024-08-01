
'use client'

import Link from "next/link"

export default function Page() {
  return (
    <div className=' '>
    <Link href={`/find/creator`} className="btn btn-outline">关注更多用户</Link>
    </div>
  )
}