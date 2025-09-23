"use client"

import { Revo, Infinity, Linkedin, Github, Envelope, Instagram } from 'revoicons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AnimatedSlash from "./components/AnimatedSlash";
import TypeType from "./components/TypeType";
import StarGithubButton from './components/StarGithubButton';
import CommandBlock from './components/CommandBlock';
import { useEffect, useState, useRef } from 'react';
import Feature1 from './components/Feature1';
import { Tree, TreeViewElement } from './components/FileTree';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import FallingSquares from './components/FallingSquare';
import DotGrid from './components/DotGrid';

const formatStars = (num: number): string => {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  return num.toString();
};

const stepVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const nextTreeData: TreeViewElement[] = [
  {
    id: "n1",
    name: "public",
    children: [],
  },
  {
    id: "n2",
    name: "src",
    children: [
      {
        id: "n2-1",
        name: "app",
        children: [
          { id: "n2-1-1", name: "global.css" },
          { id: "n2-1-2", name: "page.tsx" },
          { id: "n2-1-3", name: "layout.tsx" },
        ],
      },
      {
        id: "n2-2",
        name: "components",
        children: [],
      },
    ],
  },
  { id: "n3", name: "README.md" },
];

const reactTreeData: TreeViewElement[] = [
  {
    id: "r1",
    name: "public",
    children: [],
  },
  {
    id: "r2",
    name: "src",
    children: [
      {
        id: "r2-1",
        name: "assets",
        children: [],
      },
      {
        id: "r2-2",
        name: "components",
        children: [],
      },
      { id: "r2-3", name: "App.tsx" },
      { id: "r2-5", name: "index.css" },
      { id: "r2-4", name: "main.tsx" },
    ],
  },
  { id: "r3", name: "README.md" },
  { id: "r4", name: "index.html" },
];

export default function Home() {
  const [stars, setStars] = useState<number | null>(null);
  const [allInView, setAllInView] = useState(false);
  const pathname = usePathname();
  
  const div1Ref = useRef(null);
  const div2Ref = useRef(null);
  const div3Ref = useRef(null);
  const div4Ref = useRef(null);
  
  const div1InView = useInView(div1Ref, { once: true, margin: "-100px" });
  const div2InView = useInView(div2Ref, { once: true, margin: "-100px" });
  const div3InView = useInView(div3Ref, { once: true, margin: "-100px" });
  const div4InView = useInView(div4Ref, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (div1InView && div2InView && div3InView && div4InView) {
      setAllInView(true);
    }
  }, [div1InView, div2InView, div3InView, div4InView]);

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const res = await fetch(`https://api.github.com/repos/MaybeTarun/Revo`);
        if (!res.ok) throw new Error("Failed to fetch repo data");
        const data = await res.json();
        setStars(data.stargazers_count);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStars();
  }, []);

  const menuItems = [
    { name: "Revo", href: "/" },
    { name: "RevoIcons", href: "/revoicons" },
    { name: "RevoUI", href: "/revoui" },
  ];

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      <div className="h-[8vh] w-full border-b border-black/20">
        <div className="h-full w-full md:w-[75vw] mx-auto border-x border-black/20 flex justify-between items-center px-4 md:px-6">
          <Link href="/">
            <div className='flex justify-center items-center gap-1 cursor-pointer'>
              <Revo size={24}/>
              <span className='text-2xl font-medium'>revo</span>
            </div>
          </Link>          

          <div className='flex justify-center items-center gap-4'>
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  className={`${
                    pathname === item.href
                      ? "text-black font-semibold"
                      : "text-black/60 hover:text-black"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
            <div className='hidden md:block ml-4'><StarGithubButton repo="MaybeTarun/revo" /></div>
          </div>
        </div>
      </div>

      <div className="h-[50vh] md:h-[70vh] w-full md:w-[75vw] mx-auto border-x border-black/20 flex justify-center items-center relative overflow-hidden">

      {/* <motion.div
        className="absolute inset-0 -z-0 bg-[linear-gradient(to_right,theme(colors.gray.100)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.gray.100)_1px,transparent_1px)] bg-[length:16px_16px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      /> */}
      <div className='w-full h-full relative'>
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#f5f5f5"
          activeColor="#96A78D"
          proximity={150}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={2}
        />
      </div>

      <div className="absolute flex flex-col items-center justify-center text-center z-10 space-y-4">
        <motion.h1
          className="text-black text-2xl md:text-6xl font-semibold leading-snug tracking-tighter"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Effortless Project Setup
          <br />
          for{" "}
          <span className="bg-[#D9E9CF] text-2xl md:text-6xl rounded-md shadow px-4 py-1 text-black/80">
            [<TypeType texts={["React.Js", "Next.Js"]} symbol="_" />]
            <AnimatedSlash />
          </span>
        </motion.h1>

        <motion.h3
          className="text-black/60 text-sm md:text-base"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          helping developers become organized fast
        </motion.h3>

        <motion.div
          className="md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <StarGithubButton repo="MaybeTarun/revo" />
        </motion.div>
      </div>
    </div>

      <div className="h-[8vh] w-full border-y border-black/20">
        <div className="h-full w-full md:w-[75vw] mx-auto border-x border-black/20 flex justify-start items-end md:items-start px-4 py-2">
          <h1 className='md:hidden font-medium text-lg'>Features:</h1>
        </div>
      </div>

      <div className="h-fit w-full md:w-[75vw] mx-auto border-x border-black/20 relative">
        <h1 className="absolute hidden md:block left-0 -translate-x-full py-1 px-6 text-sm border-b border-l border-black/20 font-medium">
          Features
        </h1>
        <div>
          <div className="flex flex-col md:flex-row h-auto md:h-[45vh] border-b border-black/20 border-dashed divide-dashed">

            <motion.div 
              ref={div1Ref}
              className="w-full md:w-2/5 border-b md:border-b-0 md:border-r border-black/20 p-4 relative h-[40vh] md:h-auto"
              initial={{ x: -100, y: -100, opacity: 0 }}
              animate={allInView ? { x: 0, y: 0, opacity: 1 } : { x: -100, y: -100, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="absolute right-0 top-[10vh] md:top-[5vh] w-[80%] h-[25vh] border border-black/20 border-r-0 rounded-l-md bg-[#353839]">
                <Feature1 />
              </div>
              <div className="absolute top-4 left-4 md:top-auto md:bottom-4 md:left-8">
                <h4 className="text-base md:text-lg font-medium text-black">
                  Kickstart your<br />project instantly
                </h4>
              </div>
            </motion.div>

            <motion.div 
              ref={div2Ref}
              className="w-full md:w-3/5 p-4 flex flex-col-reverse md:flex-row gap-4 group"
              initial={{ x: 100, y: -100, opacity: 0 }}
              animate={allInView ? { x: 0, y: 0, opacity: 1 } : { x: 100, y: -100, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              <div className="flex flex-row gap-4 w-full md:w-2/3 h-full">
                <div className="flex-1 border border-black/20 rounded-md overflow-hidden bg-[#e5ebe2] -rotate-4 -translate-y-1 group-hover:rotate-0 group-hover:translate-y-0 duration-300">
                  <h4 className="px-4 py-1 bg-black text-white border-b border-black/20">
                    React.js
                  </h4>
                  <Tree elements={reactTreeData} />
                </div>

                <div className="flex-1 border border-black/20 rounded-md overflow-hidden bg-[#F3F8F0] translate-y-1 -translate-x-2 rotate-6 group-hover:rotate-0 group-hover:translate-y-0 group-hover:translate-x-0 duration-300">
                  <h4 className="px-4 py-1 bg-black text-white border-b border-black/20">
                    Next.js
                  </h4>
                  <Tree elements={nextTreeData} />
                </div>
              </div>

              <div className="flex-1 flex items-center md:justify-center">
                <h4 className="text-base md:text-lg font-medium md:text-right">
                  Easy to navigate file structure.
                </h4>
              </div>
            </motion.div>
            
          </div>

          <div className="flex flex-col md:flex-row h-auto md:h-[45vh] divide-dashed">

            <motion.div 
              ref={div3Ref}
              className="w-full md:w-2/3 border-b md:border-b-0 md:border-r border-black/20 px-4 flex flex-col justify-between group"
              initial={{ x: -100, y: 100, opacity: 0 }}
              animate={allInView ? { x: 0, y: 0, opacity: 1 } : { x: -100, y: 100, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <h4 className="md:text-center text-base md:text-lg font-medium w-full md:w-1/2 py-4 md:mx-auto md:mt-6">
               TypeScript, TailwindCSS, Framer, Lenis, RevoIcons — all set up for you!
              </h4>
              <div className="mx-auto w-full md:w-[80%] border border-b-0 border-black/20 h-[20vh] md:h-[25vh] flex flex-col">
                <div className="flex h-1/2">
                  <div className="w-2/5 bg-[#030712] group-hover:border border-black/20 flex items-center justify-center group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                    <Image src="/tcss.png" alt="TCSS" width={48} height={48} className="object-contain" />
                  </div>
                  <div className="w-3/5 bg-[#3178C6] group-hover:border border-black/20 flex items-end justify-end p-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                    <Image src="/ts.png" alt="TypeScript" width={64} height={64} className="object-contain" />
                  </div>
                </div>
                <div className="flex h-1/2">
                  <div className="w-1/5 bg-[#FF98A2] group-hover:border border-black/20 flex items-center justify-center group-hover:-translate-x-2 group-hover:translate-y-1 transition-all duration-300">
                    <Image src="/lenis.png" alt="Lenis" width={86} height={86} className="object-contain" />
                  </div>
                  <div className="w-3/5 bg-[#f5f5f5] group-hover:border border-black/20 flex items-center justify-center group-hover:translate-y-1 transition-all duration-300">
                    <Image src="/revo.svg" alt="RevoIcons" width={48} height={48} className="object-contain" />
                  </div>
                  <div className="w-2/5 bg-[#FFF32C] group-hover:border border-black/20 flex items-center justify-center group-hover:translate-x-2 group-hover:translate-y-1 transition-all duration-300">
                    <Image src="/motion.png" alt="Motion" width={64} height={64} className="object-contain" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              ref={div4Ref}
              className="w-full md:w-1/3 h-[35vh] md:h-auto p-4 relative overflow-hidden"
              initial="hidden"
              animate={allInView ? "visible" : "hidden"}
              whileHover="hover"
              variants={{
                hidden: { x: 100, y: 100, opacity: 0 },
                visible: {
                  x: 0,
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.6, ease: "easeOut", delay: 0.3 },
                },
                hover: {},
              }}
            >
              <h4 className="hidden md:block absolute left-4 top-18 text-center text-base md:text-lg font-medium -rotate-90">
                Free
              </h4>
              <h4 className="hidden md:block absolute left-8 top-8 text-center text-base md:text-lg font-medium">
                & Open-Source
              </h4>
              <h4 className="absolute top-4 text-center text-base md:text-lg font-medium md:hidden">
                Free and Open-Source
              </h4>

              <Image
                src="/os1.png"
                alt="OS 1"
                width={200}
                height={200}
                className="absolute bottom-0 right-4 w-2/3 h-auto object-cover"
              />

              <motion.div
                variants={{
                  hidden: { y: "25%", rotate: 0, x: 0 },
                  visible: { y: "25%", rotate: 0, x: 0 },
                  hover: { y: 0, rotate: -6, x: -2 },
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute bottom-0 right-4 w-2/3 h-auto"
              >
                <Image
                  src="/os2.png"
                  alt="OS 2"
                  width={200}
                  height={200}
                  className="w-full h-auto object-cover"
                />
              </motion.div>

              <Image
                src="/os3.png"
                alt="OS 3"
                width={200}
                height={200}
                className="absolute bottom-0 right-4 w-2/3 h-auto object-cover"
              />
            </motion.div>

          </div>
          
        </div>
      </div>

    <div className="h-[8vh] w-full border-y border-black/20">
      <div className="h-full w-full md:w-[75vw] mx-auto border-x border-black/20 flex justify-start items-center md:items-start px-4"/>
    </div>

    <div className="h-fit w-full md:w-[75vw] mx-auto border-x border-black/20 relative">
      <div className="flex divide-x divide-dashed divide-black/20">

        <div className="w-1/3 flex flex-col items-center justify-center py-8 md:py-16 hover:bg-[#B6CEB4] transition-colors duration-500 hover:duration-500 delay-300 hover:delay-0">
          <span className="text-2xl md:text-4xl font-bold">800+</span>
          <span className="mt-2 text-xs md:text-sm text-center">Weekly Downloads</span>
        </div>

        <div className="w-1/3 flex flex-col items-center justify-center py-8 md:py-16 hover:bg-[#B6CEB4] transition-colors duration-500 hover:duration-500 delay-300 hover:delay-0">
          <span className="text-2xl md:text-4xl font-bold">{stars !== null ? formatStars(stars) : "…"}</span>
          <span className="mt-2 text-xs md:text-sm text-center">Github Stars</span>
        </div>

        <div className="w-1/3 flex flex-col items-center justify-center py-8 md:py-16 hover:bg-[#B6CEB4] transition-colors duration-500 hover:duration-500 delay-300 hover:delay-0">
          <span className="text-2xl md:text-4xl font-bold"><Infinity/></span>
          <span className="mt-2 text-xs md:text-sm text-center">Happy users</span>
        </div>
      </div>
    </div>

    <div className="h-[8vh] w-full border-y border-black/20">
      <div className="h-full w-full md:w-[75vw] mx-auto border-x border-black/20 flex justify-start items-end md:items-start px-4 py-2">
        <h1 className='md:hidden font-medium text-lg'>Guide:</h1>
      </div>
    </div>

    <div className="h-fit w-full md:w-[75vw] mx-auto border-x border-black/20 relative">
      <h1 className="absolute hidden md:block left-0 -translate-x-full py-1 px-6 text-sm border-b border-l border-black/20 font-medium">
        Guide
      </h1>

      <div className="flex">
        <div className="divide-y divide-dashed divide-black/20 w-full md:w-2/3">

          <motion.div
            className="px-4 py-8 md:py-12 border-r border-dashed border-black/20"
            variants={stepVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h3 className="font-medium text-base mb-2">
              Setting up your first revo project
            </h3>
            <CommandBlock commands={["npx create-revo project"]} />
          </motion.div>

          <motion.div
            className="px-4 py-8 md:py-12 border-r border-dashed border-black/20"
            variants={stepVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <h3 className="font-medium text-base mb-2">Choose your template</h3>
            <CommandBlock
              commands={["Select a template", "▶  react.js", "▶  next.js"]}
            />
          </motion.div>

          <motion.div
            className="px-4 py-8 md:py-12 border-r border-dashed border-black/20"
            variants={stepVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <h3 className="font-medium text-base mb-2">Navigate to project</h3>
            <CommandBlock commands={["cd project"]} />
          </motion.div>

          <motion.div
            className="px-4 py-8 md:py-12 border-r border-dashed border-black/20"
            variants={stepVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          >
            <h3 className="font-medium text-base mb-2">Install Dependencies</h3>
            <CommandBlock commands={["npm install"]} />
          </motion.div>

          <motion.div
            className="px-4 py-8 md:py-12 border-r border-dashed border-black/20"
            variants={stepVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          >
            <h3 className="font-medium text-base mb-2">
              Start Localhost at 5173
            </h3>
            <CommandBlock commands={["npm run dev"]} />
          </motion.div>
        </div>
        <div className='w-1/3 hidden md:block '><FallingSquares/></div>
      </div>
    </div>

    <div className="h-[8vh] w-full border-y border-black/20">
      <div className="h-full w-full md:w-[75vw] mx-auto border-x border-black/20 flex justify-center items-center md:items-start px-4">
      <div className="flex items-center gap-4 md:hidden">
          <Link href="https://maybetarun.in/github" target="_blank" rel="noopener noreferrer" className='hover:scale-105 transition-transform duration-300'>
            <Github size={24} color='#000000b3'/>
          </Link>
          <Link href="https://maybetarun.in/linkedin" target="_blank" rel="noopener noreferrer" className='hover:scale-105 transition-transform duration-300'>
            <Linkedin size={24} color='#000000b3' />
          </Link>
          <Link href="https://maybetarun.in/twitter" target="_blank" rel="noopener noreferrer" className='hover:scale-105 transition-transform duration-300'>
            <Instagram size={24} color='#000000b3' />
          </Link>
          <Link href="mailto:tarun234.tg@gmail.com" target="_blank" rel="noopener noreferrer" className='hover:scale-105 transition-transform duration-300'>
            <Envelope size={24} color='#000000b3' />
          </Link>
        </div>
      </div>
    </div>

    <div className="h-[8vh] w-full border-b border-black/20">
      <div className="h-full w-full md:w-[75vw] mx-auto border-x border-black/20 flex justify-between items-center px-4">
        
        <div className="flex justify-center items-center gap-1 cursor-pointer text-black/70 hover:scale-105 transition-transform duration-300">
          <Revo size={24} color='#000000b3'/>
          <span className="text-2xl font-medium">revo</span>
        </div>

        <div className="md:flex items-center gap-4 hidden">
          {[
            { href: "https://maybetarun.in/github", Icon: Github },
            { href: "https://maybetarun.in/linkedin", Icon: Linkedin },
            { href: "https://maybetarun.in/twitter", Icon: Instagram },
            { href: "mailto:tarun234.tg@gmail.com", Icon: Envelope },
          ].map(({ href, Icon }, idx) => (
            <Link
              key={idx}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group flex items-center justify-center"
            >
              <span className="absolute w-10 h-10 rounded-full bg-[#D9E9CF] scale-0 group-hover:scale-100 transition-transform duration-300" />
              
              <Icon
                size={24}
                color="#000000b3"
                className="relative z-10 group-hover:scale-110 transition-transform duration-300"
              />
            </Link>
          ))}
        </div>

        <div className="text-base text-black/70 font-normal">
          built by{" "}
          <Link
            href="https://maybetarun.in"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-black"
          >
            this guy
          </Link>
        </div>
      </div>
    </div>

    </div>
  );
}
