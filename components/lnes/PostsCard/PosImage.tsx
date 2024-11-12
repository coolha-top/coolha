'use client'

import Image from "next/image"

export default function PosImage({ src }) {
 

    return (
        <div className="pt-2 ">
                {src && (
                  <img
                    alt="user posts img"
                    className='max-w-[200px] md:max-w-[300px] h-auto  rounded-2xl object-cover border-[0.5px]'
                    src={src}
                  />
                )}
     



        </div>
    )
}