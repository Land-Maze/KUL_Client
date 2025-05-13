"use client";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-2 items-center justify-center p-2 bg-accent text-accent-foreground">
      <div className="text-xs flex flex-row gap-2 invert">
        <span className="invert">
        {new Date().getFullYear()} E Schedule. Made with ♥ by {"Timur Dzhesur"}
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

      <span className="text-xs text-gray-400">
        This tool is developed independently and <pre className="text-red-500 inline">IS NOT</pre> affiliated with <pre className="text-primary inline">E KUL</pre> or <pre className="text-primary inline">John Paul II Catholic University of Lublin</pre>.
        Your credentials are used only to access your data from the university’s official system. We do not store or share any personal information.

        <br />
        <br />

        By using this website, you authorize us to temporarily use your credentials for logging into the official university API. We do not store any personal information or credentials, and they are used only for the purpose of accessing and displaying your data.
      </span>
    </footer>
  );
}