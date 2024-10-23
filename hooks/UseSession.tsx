'use client'

import { SessionType, useSession } from "@lens-protocol/react-web";

export  function UseSession() {
    const { data: sesssion } = useSession({ suspense: true });
    if (sesssion && sesssion.type === SessionType.Anonymous) {
        return (
            <div className="">
                <p>Profile</p>
                <div>暂未登录 Lens 账户</div>
            </div>
        );
    }
    if (sesssion && sesssion.type === SessionType.WithProfile) 
   return (
     <>
     UseSession
     </>
   )
}