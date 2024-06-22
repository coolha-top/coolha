'use client'

import Posts from "@/components/lnes/DataPostid/Posts";


export default function Page({ params: { postsid } }) {

    
    return (
        <div className="flex-1 w-full">


            <Posts postsid={postsid} />
        </div>
    );
}
