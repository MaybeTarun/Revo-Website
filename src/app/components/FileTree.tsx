"use client";

import React, { useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Folder, FolderOpen, File } from "revoicons";

export type TreeViewElement = {
  id: string;
  name: string;
  children?: TreeViewElement[];
};

interface TreeProps {
  elements: TreeViewElement[];
  className?: string;
}

const Tree = forwardRef<HTMLDivElement, TreeProps>(({ elements, className }, ref) => {
  return (
    <div
      ref={ref}
      className={`h-fit p-2 bg-transparent text-black overflow-auto ${className ?? ""}`}
    >
      <div className="inline-block">
        {elements.map((el) => (
          <TreeNode key={el.id} element={el} level={0} />
        ))}
      </div>
    </div>
  );
});

Tree.displayName = "Tree";

interface TreeNodeProps {
  element: TreeViewElement;
  level: number;
}

const INDENT = 4;

const TreeNode: React.FC<TreeNodeProps> = ({ element, level }) => {
  const isFolder = Array.isArray(element.children); // folder if children is defined
  const hasChildren = isFolder && element.children!.length > 0;
  const [isExpanded, setIsExpanded] = useState(isFolder ? true : false);

  return (
    <div className="flex flex-col" style={{ marginLeft: level * INDENT }}>
      <div
        className={`flex items-center gap-1 px-1 rounded-md transition-colors duration-200 hover:bg-[#f5f5f5] ${
          isFolder ? "cursor-pointer" : "cursor-default"
        }`}
        onClick={() => isFolder && setIsExpanded(!isExpanded)}
      >
        {isFolder ? (
          isExpanded ? (
            <FolderOpen className="h-4 w-4" />
          ) : (
            <Folder className="h-4 w-4" />
          )
        ) : (
          <File className="h-4 w-4" />
        )}
        <span>{element.name}</span>
      </div>

      {isFolder && hasChildren && (
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0, y: -5 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -5 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="ml-2 border-l border-black/20 pl-2 mt-1 space-y-1 overflow-hidden"
            >
              {element.children!.map((child) => (
                <TreeNode key={child.id} element={child} level={level + 1} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export { Tree };
