"use client";


import Link from "next/link";
import { useEffect, useState } from "react";


export default function Home() {
  const [background, setBackground] = useState("bg-gradient-to-r from-purple-500 to-pink-500");


  useEffect(() => {
    
    const interval = setInterval(() => {
      setBackground((prev) => {
        switch (prev) {
          case "bg-gradient-to-r from-purple-500 to-pink-500":
            return "bg-gradient-to-r from-green-400 to-blue-500";
          case "bg-gradient-to-r from-green-400 to-blue-500":
            return "bg-gradient-to-r from-yellow-400 to-red-500";
          default:
            return "bg-gradient-to-r from-purple-500 to-pink-500";
        }
      });
    }, 1000); // Change background every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <main className={`min-h-screen ${background} flex items-center justify-center p-4`}>
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-3xl text-center">
        <h1 className="text-5xl font-bold mb-4 text-gray-800">Welcome to Our Restaurant</h1>
        <p className="text-lg text-gray-700 mb-8">
          Experience the best dishes from around the world. Enjoy a delightful dining experience with us.
        </p>
        <Link href="/dashboard" legacyBehavior>
          <a className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition transform hover:scale-105 duration-300">
            Go to Dashboard
          </a>
        </Link>
      </div>
    </main>
  );
}
