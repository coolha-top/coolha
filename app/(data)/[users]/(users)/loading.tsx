'use client'

export default function Loading() {
    return (
        <>
            <div className="flex flex-col gap-4 w-full">

                <div className="skeleton h-36 w-full"></div>

                <div className="flex gap-4 items-center w-full px-6">
                    <div className="skeleton w-24 h-24 rounded-full shrink-0"></div>
                    <div className="flex flex-col gap-0.5">
                        <div className="skeleton h-8 w-28"></div>
                        <div className="skeleton h-5 w-28"></div>
                        <div className="skeleton h-5 w-28"></div>
                        <div className="skeleton h-5 w-28"></div>
                    </div>
                    <div className='flex-1'></div>
                    <div className="skeleton w-20 h-12 rounded-xl shrink-0"></div>
                </div>

                <div className="skeleton h-14 w-full px-6"></div>
                <div className="skeleton h-2 w-full px-6"></div>
                <div className="skeleton h-2 w-full px-6"></div>
                <div className="skeleton h-2 w-full px-6"></div>


                <div className="flex gap-0.5 items-center">
                    <div className="skeleton w-1/4 h-12 rounded-sm shrink-0"></div>
                    <div className="skeleton w-1/4 h-12 rounded-sm shrink-0"></div>
                    <div className="skeleton w-1/4 h-12 rounded-sm shrink-0"></div>
                    <div className="skeleton w-1/4 h-12 rounded-sm shrink-0"></div>
                </div>

            </div>
        </>
    )
}