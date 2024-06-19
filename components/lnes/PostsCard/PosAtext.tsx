'use client'

import Link from "next/link";
import { useState } from "react";
import ReactMarkdown from "react-markdown";


// 定义最多显示的行数
const MAX_LINES = 10;

// 自定义链接渲染器
const LinkRenderer = ({ href, children }:any) => (
  <Link href={href} className=" text-info  hover:underline" target='_blank'>
    {children}
  </Link>
);
export const PosAtext = ({ content }) => {
  const [expanded, setExpanded] = useState(false);

  // 将文本按行分割
  const lines = content.split('\n');

  // 取前 MAX_LINES 行，或全部行，根据 expanded 状态决定
  const displayedLines = expanded ? lines : lines.slice(0, MAX_LINES);

  return (
    <div className='pt-2'>
      <ReactMarkdown
        className="break-words h-auto text-wrap"
        components={{
          a: LinkRenderer,
        }}
      >
        {displayedLines.join('\n')}
      </ReactMarkdown>

      {lines.length > MAX_LINES && (
        <button
          className=" text-info cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? '收起' : '更多'}
        </button>
      )}

    </div>
  );
};
export function UsersPosAtext({ content }) {
  return (
    <>
      <ReactMarkdown className="h-auto"
        components={{
          a: LinkRenderer,
        }}>
        {content /* && (
          content.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '[LINK]($1)')
        ) */}
      </ReactMarkdown>
    </>
  )
}

