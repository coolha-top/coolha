'use client'
import { publicationId, usePublications } from "@lens-protocol/react-web";

export default function Page({ params: { postsid } }) {
  const { data, loading, error } = usePublications({
    where: {
      commentOn: {
        id: publicationId(postsid),
      },
    }
  });
  return (
    <div className={`flex-1 w-full`}>

      postsid {postsid}

    </div>
  )
}