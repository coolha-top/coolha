'use client'

//import PUBcollects from "@/components/lnes/DataUsers/list/PUBcollects"
import { useProfile } from "@lens-protocol/react-web";

export default function page({params: { users },}) {
  let { data: profile } = useProfile({
    forHandle: `lens/${users}`
  });
  return (
    <div className="lg:min-w-4xl mx-auto h-dvh">
      {/* <PUBcollects profile={profile} /> */}
    </div>
  )
}