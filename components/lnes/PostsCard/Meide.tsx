'use client'

import PosImage from "./PosImage"
import PosMusic from "./PosMusic"
import PosVideo from "./PosVideo"

export default function Meide({ pub }) {
    return (
        <div className="pt-2">
            {pub ? (
                <>
                    {pub.image && !pub.audio && <img
                        className={`max-w-[200px] md:max-w-[300px]] h-auto    sm:h-auto mb-3   rounded-2xl object-cover`}
                        alt='pub.image && !pub.audio img'
                        src={pub?.image?.optimized?.uri || pub?.image?.optimized?.raw?.uri || ''} />}

                    {pub.audio && (
                        <>
                            <img
                                className={`max-w-[200px] md:max-w-[300px] h-auto    sm:h-auto mb-3  rounded-2xl object-cover`}
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

                    {pub.video && <PosVideo src={pub.video?.optimized?.uri} />}
                </>
            ) : (``)}
        </div>
    )
}
