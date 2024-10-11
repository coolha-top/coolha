'use client'

import { convertLinksToHTML } from "@/utils/convertLinksToHTML";
import Link from "next/link";
import { useState } from "react";
import ReactMarkdown from "react-markdown";


// 定义最多显示的行数
const MAX_LINES = 10;

// 自定义链接渲染器
const LinkRenderer = ({ href, children }: any) => (
  <Link href={href} className=" text-[#667c0f]  hover:underline link  link-success" target='_blank'>
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
    <div className='pt-2 break-words text-wrap h-auto '>

      <p dangerouslySetInnerHTML={{ __html: expanded ? convertLinksToHTML(content).split('\n') : convertLinksToHTML(content).split('\n').slice(0, MAX_LINES) }}>

      </p>

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
    <div className='pt-2 break-words text-wrap h-auto' >
      <p dangerouslySetInnerHTML={{ __html: convertLinksToHTML(content) }}>
      </p>

    </div>
  )
}

