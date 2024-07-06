'use client'

export default function UsersPicimg({ profile }) {
    return (
        <>
            <div className=' h-36 max-w-4xl mx-auto bg-base-100'>
                {profile?.metadata?.coverPicture?.raw?.uri ?
                    (
                        <div className=' bg-primary text-base-content'>
                            <img
                                src={profile?.metadata?.coverPicture?.raw?.uri}
                                alt=""
                                className='h-36 w-full  object-cover'
                            />
                        </div>
                    ) : (
                        <div className=' bg-primary text-base-content'>
                            <img src="/logo.png" alt="logo.png" className='h-36 w-full object-cover' />
                        </div>
                    )}
            </div>
        </>
    )
}