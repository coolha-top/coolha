'use client'

export default function PosVideo({ src }) {
  return (
    <div className="pt-2 ">
      <video className={`w-90vw sm:w-[400px] `}  controls>
        <source src={src} type="video/mp4" />
        <source src={src} type="video/ogg" />
      </video>
    </div>
  )
}