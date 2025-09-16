import { useEffect, useState, useMemo } from "react";

export default function TypingEffect({
  texts = ["React.JS", "Next.JS"],
  symbol = "_",
  typingSpeed = 100, 
  pauseTime = 2000,   
  deletingSpeed = 60, 
  className = "text-3xl md:text-6xl font-semibold"
}) {
  const [index, setIndex] = useState(0); 
  const [subIndex, setSubIndex] = useState(0); 
  const [deleting, setDeleting] = useState(false);

  const maxLength = useMemo(
    () => Math.max(...texts.map((t) => t.length)),
    [texts]
  );

  useEffect(() => {
    if (texts.length === 0) return;

    const currentWord = texts[index];

    if (!deleting && subIndex < currentWord.length) {
      const timeout = setTimeout(() => setSubIndex(subIndex + 1), typingSpeed);
      return () => clearTimeout(timeout);
    }

    if (!deleting && subIndex === currentWord.length) {
      const timeout = setTimeout(() => setDeleting(true), pauseTime);
      return () => clearTimeout(timeout);
    }

    if (deleting && subIndex > 0) {
      const timeout = setTimeout(() => setSubIndex(subIndex - 1), deletingSpeed);
      return () => clearTimeout(timeout);
    }

    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % texts.length);
    }
  }, [subIndex, deleting, index, texts, typingSpeed, pauseTime, deletingSpeed]);

  const currentWord = texts[index];
  const typed = currentWord.substring(0, subIndex);

  let display = typed;
  if (deleting) {
    display = typed + symbol.repeat(maxLength - typed.length);
  } else {
    display = typed + symbol.repeat(maxLength - typed.length);
  }

  return (
    <span className={`text-black/70 ${className}`}>
      {display}
    </span>
  );
}
