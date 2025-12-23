import { useState } from "react";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
// import ParticleBackground from "./components/ParticleBackground";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Experience from "./sections/Experience";
import Footer from "./sections/Footer";
import Home from "./sections/Home";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Testimonials from "./sections/Testimonials";
import IntroAnimation from "./components/IntroAnimation";

export default function App() {
  const [intoDone, setIntoDone] = useState(false);
  return (
    <>
      {!intoDone && <IntroAnimation onFinish={() => setIntoDone(true)} />}
      {intoDone && (
        <div className="relative text-white gradient">
          <CustomCursor />
          <Navbar />
          <Home />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Testimonials />
          <Contact />
          <Footer />
        </div>
      )}
    </>
  );
}
