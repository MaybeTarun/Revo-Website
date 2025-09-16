import { useEffect, useState } from "react";

export default function AnimatedSlash({
  className = "text-3xl md:text-6xl font-bold",
}) {
  const symbols = ["\\", "|", "/", "-"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % symbols.length);
    }, 200);

    return () => clearInterval(interval);
  }, [symbols.length]);

  return (
    <span
      className={`inline-block w-[1ch] font-mono ${className}`}
    >
      {symbols[index]}
    </span>
  );
}
