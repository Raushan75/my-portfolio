import { useMemo, useState, useEffect } from "react";
import ParticleBackground from "../components/ParticleBackground";
import { motion } from "framer-motion";
import { FaXTwitter, FaGithub, FaLinkedin } from "react-icons/fa6";
import avatar from "../assets/avator.png";

const socials = [
  {
    Icons: FaLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kraushan75",
  },
  {
    Icons: FaGithub,
    label: "GitHub",
    href: "https://github.com/Raushan75",
  },
];

const glowVariants = {
  initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" },
  hover: {
    scale: 1.2,
    y: -3,
    filter:
      "drop-shadow(0 0 8px rgba(13,88,204,0.9)) drop-shadow(0 0 18px rgba(16,185,129,0.8))",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: { scale: 0.95, transition: { duration: 0.08 } },
};

export default function Home() {
  const roles = useMemo(
    () => ["Frontend Developer", "Web Developer", "Fullstack Developer"],
    []
  );

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index];

    if (!deleting && subIndex === current.length) {
      const pause = setTimeout(() => setDeleting(true), 1200);
      return () => clearTimeout(pause);
    }

    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setSubIndex((v) => v + 1);
        } else if (subIndex > 0) {
          setSubIndex((v) => v - 1);
        } else {
          setDeleting(false);
          setIndex((v) => (v + 1) % roles.length);
        }
      },
      deleting ? 40 : 60
    );

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, roles]);

  return (
    <section
      id="home"
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      <ParticleBackground />

      {/* Background gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[70vw] md:w-[40vw] max-w-[500px] h-[70vw] md:h-[40vw] max-h-[500px] bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[140px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[70vw] md:w-[40vw] max-w-[500px] h-[70vw] md:h-[40vw] max-h-[500px] bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[140px] animate-pulse delay-500" />
      </div>

      <div className="relative z-10 mx-auto grid h-full max-w-7xl grid-cols-1 lg:grid-cols-2 px-4">
        {/* Left content */}
        <div className="flex flex-col justify-center text-center lg:text-left">
          <div className="mx-auto w-full max-w-3xl lg:pr-24">
            {/* Typewriter */}
            <motion.div
              className="mb-3 min-h-[1.6rem] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-wide"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span>{roles[index].slice(0, subIndex)}</span>
              <span
                aria-hidden
                className="ml-1 inline-block w-0.5 animate-pulse bg-white align-middle"
                style={{ height: "1em" }}
              />
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight bg-linear-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] bg-clip-text text-transparent drop-shadow-lg"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Hello, I&apos;m
              <br />
              <span className="block text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
                Raushan Kumar
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-gray-300 mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              I turn complex ideas into seamless, high-impact web experiences —
              building modern, scalable, and lightning-fast applications.
            </motion.p>

            {/* CTA */}
            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <a
                href="#projects"
                className="rounded-full bg-linear-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] px-6 py-3 text-lg font-medium text-white shadow-lg transition-transform hover:scale-105"
              >
                View My Work
              </a>
              <a
                href="/Resume.pdf"
                download
                className="rounded-full bg-white px-6 py-3 text-lg font-medium text-black shadow-lg transition-transform hover:scale-105 hover:bg-gray-200"
              >
                My Resume
              </a>
            </motion.div>

            {/* Socials */}
            <div className="mt-10 flex justify-center lg:justify-start gap-5 text-2xl md:text-3xl">
              {socials.map(({ Icons, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  variants={glowVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="text-white"
                >
                  <Icons />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Right visual */}
        <div className="relative hidden lg:block">
          <div
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded-full blur-[38px]"
            style={{
              width: "min(22vw, 410px)",
              height: "min(40vw, 760px)",
              opacity: 0.32,
              background:
                "conic-gradient(from 0deg,#1cd8d2,#00bf8f,#302b63,#1cd8d2)",
            }}
          />

          <motion.img
            src={avatar}
            alt="Raushan Kumar"
            className="pointer-events-none absolute right-[-30px] top-1/2 -translate-y-1/2 max-h-[90vh] object-contain select-none"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          />
        </div>
      </div>
    </section>
  );
}
