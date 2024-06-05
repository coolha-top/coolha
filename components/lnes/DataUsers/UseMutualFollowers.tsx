'use client'
import { useMutualFollowers } from '@lens-protocol/react-web';

export default function UseMutualFollowers({profile}) {
    // 在组件中调用 useMutualFollowers 函数
const { data, loading, error } = useMutualFollowers({
    observer: profile?.id, // 观察者的 ProfileId
    viewing:  profile?.id,  // 查看的 ProfileId
   // limit: 10,          // 可选，要返回的物料数，默认值由 API 设置
    //orderBy: 'NAME_ASC' // 可选，配置文件排序的顺序，默认值由 API 设置
  });
  
   return (
     <>
     UseMutualFollowers
     </>
   )
}


