"use client"

import { Envelope, Instagram, Github, Linkedin, Revo } from 'revoicons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import StarGithubButton from '@/components/StarGithubButton';
import DotGrid from '@/components/DotGrid';
import { motion } from 'framer-motion';
import CommandBlock from '@/components/CommandBlock';

export default function Home() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Revo", href: "/" },
    { name: "RevoIcons", href: "/revoicons" },
    { name: "RevoUI", href: "/revoui" },
  ];

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      <div className="h-[8vh] w-full border-b border-black/20">
        <div className="h-full w-full md:w-[75vw] mx-auto border-x border-black/20 flex justify-between items-center px-4 md:px-6">
          <Link href="/revoicons">
            <div className='flex justify-center items-center gap-1 cursor-pointer'>
              <Revo size={24}/>
              <span className='text-2xl font-medium satoshi md:-mt-1'>revoicons</span>
            </div>
          </Link>          

          <div className='flex justify-center items-center gap-4 satoshi -mb-1'>
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
            <div className='hidden md:block ml-4'><StarGithubButton repo="MaybeTarun/revoicons" /></div>
          </div>
        </div>
      </div>

      <div className="h-[50vh] md:h-[70vh] w-full md:w-[75vw] mx-auto border-x border-black/20 flex justify-center items-center relative overflow-hidden">
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
            className="text-black text-3xl md:text-6xl font-medium leading-snug satoshi"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Simple <span className='bg-[#D9E9CF] text-2xl md:text-6xl rounded-md shadow px-4 py-1 text-black/80'>icons</span> for your <br className='hidden md:block'/> not so simple projects
          </motion.h1>

          <motion.div
            className=" px-6 w-full md:w-1/2 satoshi md:-mr-[80%]"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <CommandBlock commands={["npm i revoicons"]} />
          </motion.div>

          <motion.div
            className="md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <StarGithubButton repo="MaybeTarun/revoicons" />
          </motion.div>
        </div>
      </div>

      <div className="h-[30vh] w-full border-t border-black/30">
        <div className="h-full w-full md:w-[75vw] mx-auto border-x border-black/30" />
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
          
          <Link href="/revoicons" className="flex justify-center items-center gap-1 cursor-pointer text-black/70 hover:scale-105 transition-transform duration-300">
            <Revo size={24} color='#000000b3'/>
            <span className="text-2xl font-medium satoshi md:-mt-1">revoicons</span>
          </Link>

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

          <div className="text-base text-black/70 font-normal satoshi">
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
