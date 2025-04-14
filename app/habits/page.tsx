

        
"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {HabitsHeader}
 from "@/components/habits/habits-header";

// Mock data for categories
const categories = [
  {
    name: "Productivity",
    imageUrl: "/images/productivity.jpg",
    link: "/habits/productivity",
    progress: 75,
    description: "Boost your productivity with daily habits and routines.",
  },
  {
    name: "Wellness",
    imageUrl: "/images/wellness.jpg",
    link: "/wellness",
    progress: 60,
    description: "Focus on your physical and mental well-being.",
  },
  {
    name: "Creativity",
    imageUrl: "/images/creativity.jpg",
    link: "/creativity",
    progress: 50,
    description: "Unlock your creative potential with inspiring habits.",
  },
  {
    name: "Business",
    imageUrl: "/images/business.jpg",
    link: "/business",
    progress: 65,
    description: "Develop habits to grow your business and career.",
  },
  {
    name: "Mindfulness",
    imageUrl: "/images/mindfulness.jpg",
    link: "/mindfulness",
    progress: 80,
    description: "Cultivate mindfulness and inner peace.",
  },
  {
    name: "Learning",
    imageUrl: "/images/learning.jpg",
    link: "/habits/learning",
    progress: 90,
    description: "Learn new skills and expand your knowledge.",
  },
];

export default function HomePage() {
  const ref = useRef(null);
  const progressRef = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });
  const isProgressInView = useInView(progressRef, { margin: "-100px" });
  const controls = useAnimation();
  const progressControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  useEffect(() => {
    if (isProgressInView) {
      progressControls.start("visible");
    } else {
      progressControls.start("hidden");
    }
  }, [isProgressInView, progressControls]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header Component */}
      <HabitsHeader />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Image Grid Section */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" ref={ref}>
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 1.5, delay: index * 0.5 }}
            >
              <Link href={category.link}>
                <div className="relative h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    layout="fill"
                    objectFit="cover"
                    className="hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <h2 className="text-2xl font-bold text-white">
                      {category.name}
                    </h2>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Progress Section */}
      <motion.div
          ref={progressRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isProgressInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1.5 }}
          className="mt-12"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Your Progress</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isProgressInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="h-12 w-12 rounded-full flex items-center justify-center bg-indigo-500 text-white">
                      <span className="text-lg font-bold">{category.progress}%</span>
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-indigo-500"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {category.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      
    </div>
  );
}
    