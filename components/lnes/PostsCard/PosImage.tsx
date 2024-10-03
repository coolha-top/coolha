'use client'

import Image from "next/image"

export default function PosImage({ src }) {
 

    return (
        <div className="pt-2 ">
                {src && (
                  <img
                    alt="user posts img"
                    className='sm:max-w-[400px] max-w-[100%] h-auto  rounded-2xl object-cover border-[0.5px]'
                    src={src}
                  />
                )}
     



        </div>
    )
}