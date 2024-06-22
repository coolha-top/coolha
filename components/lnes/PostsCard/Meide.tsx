'use client'

import PosImage from "./PosImage"
import PosMusic from "./PosMusic"
import PosVideo from "./PosVideo"

export default function Meide({ pub }) {
    return (
        <>
            {pub ? (
                <>
                    {pub.image && !pub.audio && <PosImage src={
                        pub ?
                            pub.cover?.optimized?.uri ?
                                pub.cover?.optimized?.uri :
                                pub.cover?.optimized?.raw?.uri : ''} />}
                    {pub.audio && (
                        <>
                            <img
                                className={`sm:max-w-[400px] h-auto max-w-[100%]   sm:h-auto mb-3  sm:rounded-none  rounded-2xl object-cover`}
                                alt='audio img'
                                src={
                                    pub ?
                                        pub.cover?.optimized?.uri ?
                                            pub.cover?.optimized?.uri :
                                            pub.cover?.optimized?.raw?.uri : ''}
                            />
                            <PosMusic
                                type={pub.asset?.audio?.optimized?.mimeType}
                                src={pub.audio?.optimized?.uri}
                            />

                        </>
                    )}
                    {pub.video && <PosVideo src={pub.video.optimized.uri} />}
                </>
            ) : (``)}
        </>
    )
}
