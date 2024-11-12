'use client'

export default function PosVideo({ src }) {
  return (
    <div className="pt-2 ">
      <video className={`max-w-[200px] md:max-w-[300px] rounded-2xl`}  controls>
        <source src={src} type="video/mp4" />
      </video>
    </div>
  )
}