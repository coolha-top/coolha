'use client'

// 定义处理链接的函数
export function convertLinksToHTML(text) {
   const urlPattern = /(\bhttps?:\/\/[^\s/$.?#].[^\s]*)/gi;
   const modifiedText = text.replace(urlPattern, (url) => {
      return `<a href="${url}" class="text-success hover:underline" target="_blank" rel="noopener noreferrer">${url}</a>`;
   });

   // 处理其他情况的链接，比如@符号和#符号
   const mentionPattern = /(@lens\/\w+)/g;
   const finalText = modifiedText.replace(mentionPattern, (mention) => {
      const mentionLink = `/${mention.slice(1)}`; // Adjust this to your desired URL structure
      return `<a href="${mentionLink}" class="text-success hover:underline">${mention}</a>`;
   });

   return finalText;
}