'use client'

export default function LoadingDotsLogo() {
    return (
        <div className=' bg-base-200 w-full h-dvh'>
            <div className=" flex flex-col justify-center items-center w-full h-dvh">

                <img src="/favicon.ico" alt="favicon.ico" className="w-24 h-24 m-12" />
                <span className="loading loading-dots loading-lg"></span>

            </div>
        </div>
    )
}
export function LoadingDots() {
    return (
        <>
                <span className="loading loading-dots loading-lg"></span>
        </>
    )

}
