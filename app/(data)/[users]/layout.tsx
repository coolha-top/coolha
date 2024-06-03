'use client'



export default function layout({ children,params:{users}}) {
    return (
        <div className="flex flex-wrap flex-col justify-normal lg:justify-center lg:w-full w-dvw ">

            {children}
        </div>
    )
}