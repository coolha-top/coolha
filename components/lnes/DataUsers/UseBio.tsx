import { convertLinksToHTML } from '@/utils/convertLinksToHTML';
import Link from 'next/link';
import React from 'react';
import { RiGlobalLine, RiMapPin2Line, RiSpotifyLine, RiTwitterXFill, RiYoutubeLine } from 'react-icons/ri';

export default function UseBio({ profile }) {
  const bioText = profile?.metadata?.bio || '';
  const formattedBio = convertLinksToHTML(bioText);

  let website = null;
  let x = null;
  let youtube = null;
  let spotify = null;
  let location = null;
  if (profile?.metadata?.attributes) {
    for (const attribute of profile.metadata.attributes) {
      if (attribute.key === 'website') {
        website = attribute.value;
      }
      if (attribute.key === 'x') {
        x = attribute.value;
      }
      if (attribute.key === 'youtube') {
        youtube = attribute.value;
      }
      if (attribute.key === 'spotify') {
        spotify = attribute.value;
      }
      if (attribute.key === 'location') {
        location = attribute.value;
      }
    }
  }
  return (
    <div className='bg-base-100'>


      <div className='py-2 px-4'><p className="text-base" dangerouslySetInnerHTML={{ __html: formattedBio }}>{/* {profile?.metadata?.bio} */}</p></div>



      <div className=' py-1 flex  flex-row px-4 gap-2'>

        {website &&
          <Link
            href={`${website}`}
            className=' hover:text-primary hover:underline text-base flex flex-row justify-center items-center' target='_blank'>
            <RiGlobalLine size={14} />{website}
          </Link>
        }
        {x &&
          <Link
            href={`https://x.com/${x}`}
            className=' hover:text-primary hover:underline text-base flex flex-row justify-center items-center' target='_blank'>
            <RiTwitterXFill size={14} />{x}
          </Link>
        }
        {youtube &&
          <Link
            href={`${youtube}`}
            className=' hover:text-primary hover:underline text-base flex flex-row justify-center items-center' target='_blank'>
            <RiYoutubeLine size={14} />{youtube}
          </Link>
        }
        {spotify &&
          <Link
            href={`${spotify}`}
            className=' hover:text-primary hover:underline text-base flex flex-row justify-center items-center' target='_blank'>
            <RiSpotifyLine  size={14} />{spotify}
          </Link>
        }
        {location &&
          <Link
            href={`https://www.google.com/maps/search/?api=1&query=${location}`}
            className=' hover:text-primary hover:underline text-base flex flex-row justify-center items-center' target='_blank'>
            <RiMapPin2Line  size={14} />{location}
          </Link>
        }


      </div>



    </div>
  );
}