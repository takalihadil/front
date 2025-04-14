"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

export default function HomePage() {
  const router = useRouter();

  const testimonials = [
    {
      id: 1,
      name: "Alice Dupont",
      comment: "Cette application a révolutionné ma productivité ! Je la recommande à tous.",
    },
    {
      id: 2,
      name: "Jean Martin",
      comment: "Simple, intuitive et efficace. Parfait pour suivre mes projets au quotidien.",
    },
    {
      id: 3,
      name: "Sophie Leroy",
      comment: "Les animations et l'interface sont superbes. J'adore utiliser cette app !",
    },
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-6xl font-bold text-white mb-8 text-center"
      >
        Bienvenue sur <span className="text-purple-500">IndieTracker</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-xl text-gray-300 mb-12 text-center"
      >
        L'outil ultime pour gérer vos projets et booster votre productivité.
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => router.push("/auth")}
        className="px-8 py-4 bg-purple-600 text-white font-bold rounded-lg shadow-lg hover:bg-purple-700 transition duration-300"
      >
        Commencer Maintenant
      </motion.button>

      <div className="mt-16 w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Ce que nos utilisateurs disent
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: testimonial.id * 0.2 }}
              className="bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <FaQuoteLeft className="text-purple-500 mb-4" />
              <p className="text-gray-300 italic">{testimonial.comment}</p>
              <FaQuoteRight className="text-purple-500 mt-4 ml-auto" />
              <p className="text-right text-purple-500 font-semibold mt-2">
                - {testimonial.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}