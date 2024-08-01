'use client'

export default function UsersPicimg({ profile }) {
    // 从profile中提取封面图片
    const coverPicture = profile?.metadata?.coverPicture;

    // 获取图片的uri
    const coverImageUri = coverPicture?.raw?.uri
        || coverPicture?.optimized?.uri
        || coverPicture?.transformed?.uri;

    return (
        <>
            <div className=' h-36 max-w-4xl mx-auto bg-base-100'>
                {coverImageUri  ?
                    (
                        <div className=' bg-primary text-black'>
                            <img
                                src={coverImageUri}
                                alt={coverImageUri}
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