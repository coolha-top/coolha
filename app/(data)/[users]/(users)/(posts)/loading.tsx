'use client'

export default function Loading() {
    return (
        <>
            <div className="flex flex-col gap-4 w-full p-6">

                <div className="flex gap-4 items-center w-full">
                    <div className="skeleton w-12 h-12 rounded-full shrink-0"></div>
                    <div className="flex flex-col gap-0.5">
                        <div className="skeleton h-6 w-32"></div>
                        <div className="skeleton h-5 w-32"></div>
                    </div>
                    <div className='flex-1'></div>
                    <div className="skeleton w-6 h-6 rounded-full shrink-0"></div>
                </div>

                <div className="skeleton h-2 w-full px-6"></div>
                <div className="skeleton h-2 w-full px-6"></div>
                <div className="skeleton h-2 w-full px-6"></div>

                <div className="skeleton h-96 w-full lg:w-1/2 px-6"></div>

                <div className=" justify-around flex items-center">
                    <div className="skeleton w-8 h-8 rounded-lg shrink-0"></div>
                    <div className="skeleton w-8 h-8 rounded-lg shrink-0"></div>
                    <div className="skeleton w-8 h-8 rounded-lg shrink-0"></div>
                    <div className="skeleton w-8 h-8 rounded-lg shrink-0"></div>
                </div>

            </div>
        </>
    )
}