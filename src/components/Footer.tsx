"use client";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex items-center justify-center p-2 bg-accent text-accent-foreground">
      <div className="text-xs flex flex-row gap-2 invert">
        <span className="invert">
        &copy; {new Date().getFullYear()} E KUL Alternative. Made with ♥ by {"Timur Dzhesur"}
        </span>
        
        <a
          href="https://t.me/Land_Maze"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white hover:opacity-20 hover:scale-110 transition-transform duration-200"
        >
          <Image
            src="/telegram.svg"
            alt="Telegram"
            width={18}
            height={18}
          />
        </a>
        <a
          href="https://github.com/land-maze/kul-client-web"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white hover:opacity-20 hover:scale-110 transition-transform duration-200"
        >
          <Image
            src="/github.svg"
            alt="GitHub"
            width={18}
            height={18}
          />
        </a>
        <a
          href="https://www.linkedin.com/in/land-maze/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white hover:opacity-20 hover:scale-110 transition-transform duration-200"
        >
          <Image
            src="/linkedin.svg"
            alt="LinkedIn"
            width={18}
            height={18}
          />
        </a>
      </div>
    </footer>
  );
}