'use client'

import Image from "next/image"

export default function Posimg({ src }) {
    return (
        <>
            {src && (

                <img
                    className={`sm:max-w-[400px] h-auto max-w-[100%]   mb-3  sm:rounded-none  rounded-2xl object-cover`}
                    src={src}
                    alt={src}
                />
            )}



        </>
    )
}