'use client'

import { useState } from "react";
import ReactMarkdown from "react-markdown";


const MAX_LINES = 10;

const PosText = ({ content }) => {
  const [expanded, setExpanded] = useState(false);

  // 将文本按行分割
  const lines = content.split('\n');

  // 取前 MAX_LINES 行，或全部行，根据 expanded 状态决定
  const displayedLines = expanded ? lines : lines.slice(0, MAX_LINES);

  return (
    <div className=''>
      <ReactMarkdown className=" break-words h-auto text-wrap">
        {displayedLines.join('\n')}
      </ReactMarkdown>
      {lines.length > MAX_LINES && (
        <button
          className=" text-orange-600 cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? '收起' : '更多'}
        </button>
      )}
    </div>
  );
};
export default PosText;