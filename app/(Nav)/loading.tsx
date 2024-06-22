'use client'

export default function Loading() {
  return (
    <>
      <div className=" flex flex-col justify-center items-center h-[90vh] w-full">
        <img src="/favicon.ico" alt="favicon.ico" className="w-24 h-24 m-12" />
        <span className="loading loading-spinner loading-lg"></span>

      </div>
    </>
  )
}