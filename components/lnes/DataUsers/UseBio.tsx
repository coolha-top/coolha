'use client'

export default function UseBio({profile}) {
  return (
    <>
      <div className='py-2 px-6'><p className="text-base">{profile?.metadata?.bio}</p></div>
      <div className='py-2 px-6'><p className="text-base">{profile?.metadata?.appId}</p></div>
    </>
  )
}