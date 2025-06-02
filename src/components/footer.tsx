'use client';

import { FaGithub } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-gray-800 text-white pt-4 pb-2">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p className="mb-2 text-sm text-xs">
        &copy; {new Date().getFullYear()} Smart Cooking Recipe. <br />
        Developed by Willy Jonathan Arsyad & Agil Mughni.
      </p>
      <p className="text-sm text-xs text-gray-400">
        A PPL Project for Universitas Syiah Kuala.
      </p>

      {/* Centered Icon */}
      <div className="mt-4 flex gap-4 justify-center items-center">
        <div className="flex flex-col items-center">
          <a
            href="https://www.github.com/giant77/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white text-2xl"
        >        <FaGithub />
        <p className="text-[10px]">Willy</p>  </a>
        </div>
        <div className="flex flex-col items-center">
        <a
          href="https://www.github.com/findney/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white text-2xl"
        >
          <FaGithub />
          <p className="text-[10px]">Agil</p> 
        </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
