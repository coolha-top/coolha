'use client'

export default function PosMusic({type,src}) {
    return (
        <div className="pt-2 ">
            <audio controls className={`sm:w-[400px] `}>
                <source
                    type={type}
                    src={src}
                />
            </audio>

        </div>
    )
}