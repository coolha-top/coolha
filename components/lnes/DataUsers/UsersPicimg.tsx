'use client'

export default function UsersPicimg({profile}) {
    return (
        <>
            <div className=' h-36 max-w-4xl mx-auto '>
                {profile?.metadata?.coverPicture?.raw?.uri ?
                    (<img
                        src={profile?.metadata?.coverPicture?.raw?.uri}
                        alt=""
                        className='h-36 w-full  object-cover'
                    />
                    ) : (
                        <div className=' bg-primary text-base-content'>
                            <img src="/logo.png" alt="logo.png" className='h-36 w-full object-cover' />
                            No cover picture available
                        </div>
                    )}
            </div>
        </>
    )
}