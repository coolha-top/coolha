'use client'

import Avatar from "@/gui/flowbite/Avatar";
import { usePublications, Profile, PublicationType } from "@lens-protocol/react-web";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import PosImage from "../../PostsCard/PosImage";
import AvatarName from "../../PostsCard/AvatarName";
import InteractCard from "../../PostsCard/InteractCard";

export default function PUBcomments({ profile }) {
  const { data, loading, error } = usePublications({
    where: {
      commentOn: {
        id: profile?.id,
      },
    
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {data?.map((comment: any, index: number) => (
        <div key={index} className="border-b hover:bg-[--link-hover-background] lg:max-w-4xl w-dvw py-6 pb-8">
          {/* users */}
          <div className="flex px-6">
            <div className="flex">
              <Avatar src={comment.by?.metadata?.picture?.optimized?.uri} alt={comment.by.handle.localName} />
              <AvatarName localName={comment.by.handle.localName} displayName={comment.by.metadata?.displayName} namespace={comment.by.handle.namespace} />
            </div>
          </div>

          {/* users posts data */}
          <div className='px-6'>
            <Link href={`/${comment.by.handle.localName}/posts/${comment.id}`}>
              <ReactMarkdown className="h-auto">
                {comment.metadata?.content && comment.metadata.content.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '[LINK]($1)')}
              </ReactMarkdown>
              {comment.metadata?.asset?.image?.optimized?.uri && (
                <PosImage src={comment.metadata.asset.image.optimized.uri} />
              )}
            </Link>
          </div>

          <InteractCard dataname={comment} />
        </div>
      ))}
    </>
  );
}
