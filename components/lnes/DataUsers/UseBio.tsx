'use client'
import { convertLinksToHTML } from '@/utils/convertLinksToHTML';
import React from 'react';
export default function UseBio({profile}) {
  const bioText = profile?.metadata?.bio || '';
  const formattedBio = convertLinksToHTML(bioText);
  return (
    <>
      <div className='py-2 px-6'><p className="text-base"  dangerouslySetInnerHTML={{ __html: formattedBio }}>{/* {profile?.metadata?.bio} */}</p></div>
      <div className='py-2 px-6'><p className="text-base">{profile?.metadata?.appId}</p></div>
    </>
  )
}

