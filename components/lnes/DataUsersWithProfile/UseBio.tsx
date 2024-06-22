'use client'
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

// 定义处理链接的函数
function convertLinksToHTML(text) {
  const urlPattern = /(\bhttps?:\/\/[^\s/$.?#].[^\s]*)/gi;
  const modifiedText = text.replace(urlPattern, (url) => {
    return `<a href="${url}" class="text-primary" target="_blank" rel="noopener noreferrer">${url}</a>`;
  });
  
  // 处理其他情况的链接，比如@符号和#符号
  const mentionPattern = /(@\w+)/g;
  const finalText = modifiedText.replace(mentionPattern, (mention) => {
    const mentionLink = `/${mention.slice(1)}`; // Adjust this to your desired URL structure
    return `<a href="${mentionLink}" class="text-info hover:underline">${mention}</a>`;
  });

  return finalText;
}