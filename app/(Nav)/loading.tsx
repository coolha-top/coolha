'use client'

export default function Loading() {
  return (
    <>
      <div className=" flex flex-1 flex-col justify-center items-center h-dvh w-dvw">
        <img src="/favicon.ico" alt="favicon.ico" className="w-16 h-16 m-12" />
        <span className="loading loading-spinner loading-lg"></span>

      </div>
    </>
  )
}