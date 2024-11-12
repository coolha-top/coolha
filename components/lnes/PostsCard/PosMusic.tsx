'use client'

export default function PosMusic({type,src}) {
    return (
        <div className="pt-2 ">
            <audio controls className={`max-w-[200px] md:max-w-[300px] `}>
                <source
                    type={type}
                    src={src}
                />
            </audio>

        </div>
    )
}