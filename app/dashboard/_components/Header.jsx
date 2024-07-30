"use client"
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

function Header() {
  const [displayText, setDisplayText] = useState('');
  const words = ['AI-BOT', 'SMART-BOT', 'HELPER-BOT'];
  const typingSpeed = 150;
  const deletingSpeed = 100;
  const delayBetweenWords = 1500;

  useEffect(() => {
    let currentWordIndex = 0;
    let isDeleting = false;
    let charIndex = 0;

    const type = () => {
      const currentWord = words[currentWordIndex];

      if (isDeleting) {
        if (charIndex > 0) {
          setDisplayText(currentWord.substring(0, charIndex - 1));
          charIndex--;
          setTimeout(type, deletingSpeed);
        } else {
          isDeleting = false;
          currentWordIndex = (currentWordIndex + 1) % words.length;
          setTimeout(type, typingSpeed);
        }
      } else {
        if (charIndex < currentWord.length) {
          setDisplayText(currentWord.substring(0, charIndex + 1));
          charIndex++;
          setTimeout(type, typingSpeed);
        } else {
          isDeleting = true;
          setTimeout(type, delayBetweenWords);
        }
      }
    };

    setTimeout(type, typingSpeed);

    return () => clearTimeout(type);
  }, []);

  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="flex items-center flex-1">
        <Link href="/">
          <Image src="/logo.svg" width={160} height={100} alt="logo" />
        </Link>
      </div>
      <div className="flex-1 text-center font-semibold text-lg mx-auto p-2">
        Welcome to the <span className='text-green-500 inline-block min-w-[120px]'> {displayText}</span>
      </div>
      <div className="flex items-center flex-1 justify-end">
        <UserButton />
      </div>
    </header>
  );
}

export default Header;
