'use client'

import Image from "next/image"
import Hayi应用流程 from '@/public//hayi/Hayi应用流程.png'
export default function Page() {
  return (
    <>
      关于应用
      <Image
        src={Hayi应用流程}
        alt="Hayi应用流程.png"
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }} /> 
    </>
  )
}