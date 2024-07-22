'use client'

export default function Loading() {
    return (
        <>
        <div className=" flex flex-1 justify-center items-center max-w-4xl lg:min-w-4xl h-96 bg-base-100">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
        </>
    )
}