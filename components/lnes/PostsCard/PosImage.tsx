'use client'

import Image from "next/image"

export default function PosImage({ src }) {
 

    return (
        <>
                {src && (
                  <img
                    alt="user posts img"
                    className='sm:max-w-[400px] max-w-[100%] h-auto  mb-3 rounded-2xl object-cover'
                    src={src}
                  />
                )}
     



        </>
    )
}