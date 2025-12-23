import { useState } from "react";
import ParticleBackground from "../components/ParticleBackground";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import Astra from "../assets/Astra.png";

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    idea: "",
  });

  const [error, setError] = useState({});
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "budget" && value && !/^\d+$/.test(value)) return;

    setForm((p) => ({
      ...p,
      [name]: value,
    }));
    if (error[name]) setError((p) => ({ ...p, [name]: "" }));
  };

  const validateForm = () => {
    const required = ["name", "email", "service", "budget", "idea"];
    const newErrors = {};

    required.forEach(
      (field) =>
        !form[field].trim() && (newErrors[field] = "This field is required")
    );

    if (form.service !== "other" && !form.budget.trim())
      newErrors.budget = "This field is required";

    setError(newErrors);
    return !Object.keys(newErrors).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStatus("sending");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          ...form,
          form_name: form.name,
          reply_to: form.email,
        },
        PUBLIC_KEY
      );
      setStatus("success");
      setForm({
        name: "",
        email: "",
        service: "",
        budget: "",
        idea: "",
      });
    } catch (err) {
      console.log("Emailjs Error:", err);
      setStatus("error");
    }
  };
  return (
    <section
      id="contact"
      className="w-full min-h-screen relative bg-black overflow-hidden text-white px-6 py-20 md:px-20 flex flex-col md:flex-row items-centergap-10"
    >
      <ParticleBackground />
      <div className="relative z-10 w-full flex flex-col md:flex-row items-center gap-10">
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.img
            src={Astra}
            alt="Astra"
            className="w-72 md:w-140 rounded-2xl shadow-lg object-cover"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6">Let's Work Together</h2>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
              <label className="mb-1">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className={`p-3 rounded-md bg-white/10 border ${
                  error.name ? "border-red-500" : "border-gray-500"
                } text-white focus:outline-none focus:border-blue-500`}
              />
              {error.name && <p className="text-red-500">{error.name}</p>}
            </div>

            <div className="flex flex-col">
              <label className="mb-1">
                Your Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className={`p-3 rounded-md bg-white/10 border ${
                  error.email ? "border-red-500" : "border-gray-500"
                } text-white focus:outline-none focus:border-blue-500`}
              />
              {error.email && <p className="text-red-500">{error.email}</p>}
            </div>

            <div className="flex flex-col">
              <label className="mb-1">
                Service Needed <span className="text-red-500">*</span>
              </label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className={`p-3 rounded-md bg-white/10 border ${
                  error.service ? "border-red-500" : "border-gray-500"
                } text-white`}
              >
                <option value="" disabled>
                  Select a service
                </option>
                <option className="text-black" value="web">
                  Web Development
                </option>
                <option className="text-black" value="mobile">
                  Mobile App
                </option>
                <option className="text-black" value="other">
                  Other
                </option>
              </select>
              {error.service && (
                <p className="text-red-500 text-sm">{error.service}</p>
              )}
            </div>

            {form.service && form.service !== "other" && (
              <div className="flex flex-col">
                <label className="mb-1">
                  Budget <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="budget"
                  placeholder="Project Budget"
                  value={form.budget}
                  onChange={handleChange}
                  className={`p-3 rounded-md bg-white/10 border ${
                    error.budget ? "border-red-500" : "border-gray-500"
                  } text-white focus:outline-none focus:border-blue-500`}
                />
                {error.budget && <p className="text-red-500">{error.budget}</p>}
              </div>
            )}

            <div className="flex flex-col gap-5">
              <label className="mb-1">
                Enter Your idea <span className="text-red-500">*</span>
              </label>
              <textarea
                name="idea"
                rows={5}
                placeholder="Your Message"
                value={form.idea}
                onChange={handleChange}
                className={`p-3 rounded-md bg-white/10 border ${
                  error.idea ? "border-red-500" : "border-gray-500"
                } text-white focus:outline-none focus:border-blue-500`}
              />
              {error.idea && <p className="text-red-500">{error.idea}</p>}
            </div>

            {status && (
              <p
                className={`text-sm ${
                  status === "success"
                    ? "text-green-400"
                    : status === "error"
                    ? "text-red-500"
                    : "text-yellow-400"
                }`}
              >
                {status === "sending"
                  ? "Sending..."
                  : status === "success"
                  ? "Message sent successfully ✅"
                  : "Something went wrong.❌"}
              </p>
            )}

            <motion.button className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3 rounded-md font-semibold transition"
            whileHover={{scale:1.05}}
            whileTap={{scale:0.95}}
            disabled={status === "sending"}
            type="submit"
            >
              {status === "sending" ? "Sending..." : "Submit"}

            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
