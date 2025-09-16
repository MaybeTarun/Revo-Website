"use client"

import { Revo } from 'revoicons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AnimatedSlash from "./components/AnimatedSlash";
import TypeType from "./components/TypeType";
import StarGithubButton from './components/StarGithubButton';

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
          <Link href="/">
            <div className='flex justify-center items-center gap-1 cursor-pointer'>
              <Revo size={24}/>
              <span className='-mt-1 text-2xl font-normal'>revo</span>
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

      <div className="h-[70vh] w-full md:w-[75vw] mx-auto border-x border-black/20 flex justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 -z-0 bg-[linear-gradient(to_right,theme(colors.gray.100)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.gray.100)_1px,transparent_1px)] bg-[length:16px_16px]" />
        <div className="flex flex-col items-center justify-center text-center relative z-10 space-y-4">
          <h1 className="text-black text-3xl md:text-6xl font-semibold leading-snug tracking-wide">
            Effortless Project Setup<br />for <span className='bg-[#F5F5F5] px-4 py-1 text-black/70'>[ <TypeType texts={["React.JS", "Next.JS"]} symbol="_" /> ]<AnimatedSlash /></span>
          </h1>
          <p className="text-black/60 text-sm md:text-base">
            helping developers become organized fast
          </p>
        </div>
      </div>

      <div className="h-[30vh] w-full border-t border-black/20">
        <div className="h-full w-full md:w-[75vw] mx-auto border-x border-black/20" />
      </div>
    </div>
  );
}
