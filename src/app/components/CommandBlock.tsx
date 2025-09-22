"use client";

import { useState } from "react";
import { Copy } from "revoicons";

interface CommandBlockProps {
  commands: string[];
}

const CommandBlock: React.FC<CommandBlockProps> = ({ commands }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(commands.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-md mt-2">

      <div className="absolute inset-0 bg-[#D9E9CF] border border-[#D9E9CF] rounded-md z-0 mt-[5px] mr-[5px] -mb-[5px] -ml-[5px]" />

      <div className="relative bg-transparent border border-black text-black font-mono text-sm rounded-md p-4 z-10">

        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 text-gray-600 hover:text-black cursor-pointer hover:scale-105 transition-transform"
          aria-label="Copy commands"
        >
          <Copy size={18} />
        </button>


        <div>
          {commands.map((cmd, i) => (
            <div key={i} className="leading-relaxed">
              {cmd}
            </div>
          ))}
        </div>

        {/* Copied Toast */}
        {copied && (
          <span className="absolute bottom-2 right-3 text-xs text-green-600 font-medium">
            Copied!
          </span>
        )}
      </div>
    </div>
  );
};

export default CommandBlock;
