import { Mail, Phone, MapPin, Send, User, MessageSquare } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  city: z.string().min(2, "City must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const ContactUs = () => {
  const [focused, setFocused] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    try {
      console.log("Form Data:", data);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitSuccess(true);
      reset();

      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="w-full bg-black text-white min-h-screen">
      {/* ANIMATED HERO SECTION */}
      <section className="relative overflow-hidden">
        {/* Background with Grid Pattern */}
        <div className="w-full bg-black text-white overflow-hidden">
          {/* ANIMATED BACKGROUND */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500" />
          </div>
          {/* Animated Gradient Orbs */}
          <motion.div
            className="absolute top-0 -left-4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl"
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -50, 20, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-0 -right-4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl"
            animate={{
              x: [0, -30, 20, 0],
              y: [0, 50, -20, 0],
              scale: [1, 0.9, 1.1, 1],
            }}
            transition={{
              duration: 7,
              delay: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl"
            animate={{
              x: [0, 20, -30, 0],
              y: [0, -30, 30, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 7,
              delay: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-7xl mx-auto px-6 pt-36 pb-32 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-6 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full"
          >
            <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              We'd Love to Hear From You
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Let's Start a
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
              Conversation
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 max-w-2xl mx-auto text-neutral-400 text-lg leading-relaxed"
          >
            Have a project in mind? Need support? Or just want to say hello?
            Drop us a message and we'll get back to you within 24 hours.
          </motion.p>
        </motion.div>
      </section>

      {/* MAIN CONTENT SECTION */}
      <section className="max-w-7xl mx-auto px-6 pb-20 -mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* CONTACT FORM */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r  rounded-xl blur opacity-20 group-hover:opacity-10 transition duration-1000" />

              <div className="relative bg-gradient-to-br from-neutral-900/95 to-neutral-950/95 backdrop-blur-xl border border-neutral-800/50 rounded-3xl p-8 md:p-12">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl">
                    <Send className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">Send us a message</h2>
                    <p className="text-sm text-neutral-400 mt-1">
                      Fill out the form and we'll be in touch soon
                    </p>
                  </div>
                </div>

                {/* Success Message */}
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3"
                  >
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-green-400 font-medium">
                      Message sent successfully! We'll get back to you soon.
                    </span>
                  </motion.div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      icon={<User className="w-5 h-5" />}
                      label="Full Name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      register={register}
                      error={errors.name}
                      focused={focused}
                      setFocused={setFocused}
                    />
                    <InputField
                      icon={<Mail className="w-5 h-5" />}
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      register={register}
                      error={errors.email}
                      focused={focused}
                      setFocused={setFocused}
                    />
                  </div>

                  {/* Phone & City Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      icon={<Phone className="w-5 h-5" />}
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      placeholder="+91 8085758575"
                      register={register}
                      error={errors.phone}
                      focused={focused}
                      setFocused={setFocused}
                    />
                    <InputField
                      icon={<MapPin className="w-5 h-5" />}
                      label="City"
                      name="city"
                      type="text"
                      placeholder="Hubballi"
                      register={register}
                      error={errors.city}
                      focused={focused}
                      setFocused={setFocused}
                    />
                  </div>

                  {/* Message Field */}
                  <TextAreaField
                    icon={<MessageSquare className="w-5 h-5" />}
                    label="Message"
                    name="message"
                    placeholder="Tell us about your project or inquiry..."
                    register={register}
                    error={errors.message}
                    focused={focused}
                    setFocused={setFocused}
                  />

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative w-full group/btn overflow-hidden disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 rounded-xl" />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 rounded-xl opacity-0 group-hover/btn:opacity-100 blur transition duration-500" />

                    <div className="relative px-8 py-4 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-xl group-hover/btn:bg-none transition-all duration-300 flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          <span className="font-semibold text-base">
                            Sending...
                          </span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                          <span className="font-semibold text-base">
                            Send Message
                          </span>
                        </>
                      )}
                    </div>
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>

          {/* CONTACT INFO SIDEBAR */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold mb-4 px-2">
              Reach Us Directly
            </h3>

            {/* Email Card */}
            <InfoCard
              icon={<Mail className="w-6 h-6" />}
              title="Email"
              value="contact@yourstartup.com"
              description="We'll respond within 24 hours"
              gradient="from-purple-500/20 to-purple-600/20"
              iconBg="from-purple-500/10 to-purple-600/10"
              iconColor="text-purple-400"
              delay={0.9}
            />

            {/* Phone Card */}
            <InfoCard
              icon={<Phone className="w-6 h-6" />}
              title="Phone"
              value="+91 8085758575"
              description="Mon-Sat from 9am to 6pm IST"
              gradient="from-blue-500/20 to-blue-600/20"
              iconBg="from-blue-500/10 to-blue-600/10"
              iconColor="text-blue-400"
              delay={1.0}
            />

            {/* Location Card */}
            <InfoCard
              icon={<MapPin className="w-6 h-6" />}
              title="Office"
              value="Hubballi, Karnataka"
              description="Visit us for a coffee"
              gradient="from-pink-500/20 to-pink-600/20"
              iconBg="from-pink-500/10 to-pink-600/10"
              iconColor="text-pink-400"
              delay={1.1}
            />

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mt-8 p-6 bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 border border-neutral-800/50 rounded-2xl"
            >
              <h4 className="font-semibold mb-4">Why Contact Us?</h4>
              <div className="space-y-3">
                <StatItem number="< 24h" label="Response Time" />
                <StatItem number="98%" label="Client Satisfaction" />
                <StatItem number="24/7" label="Support Available" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-3">Visit Our Office</h2>
            <p className="text-neutral-400">
              Located in the heart of Hubballi, Karnataka
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group/map"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-3xl blur opacity-20 group-hover/map:opacity-40 transition duration-500" />
            <div className="relative overflow-hidden rounded-3xl border border-neutral-800/50">
              <iframe
                title="Office Location"
                className="w-full h-[450px] grayscale hover:grayscale-0 transition-all duration-500"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61595.77414076641!2d75.08403107910156!3d15.364708000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb8d711c0bfffff%3A0x35f38faa3ba428e9!2sHubli%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1234567890"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// INPUT FIELD COMPONENT
const InputField = ({
  icon,
  label,
  name,
  type,
  placeholder,
  register,
  error,
  focused,
  setFocused,
}) => (
  <div className="relative">
    <label className="block text-sm font-medium text-neutral-300 mb-2">
      {label} <span className="text-red-400">*</span>
    </label>
    <div className="relative group">
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-xl blur-sm opacity-0 group-hover:opacity-30 transition duration-300 ${focused === name ? "opacity-50" : ""}`}
      />
      <div className="relative flex items-center">
        <div
          className={`absolute left-4 transition-colors duration-300 ${focused === name ? "text-purple-400" : error ? "text-red-400" : "text-neutral-500"}`}
        >
          {icon}
        </div>
        <input
          type={type}
          {...register(name)}
          onFocus={() => setFocused(name)}
          onBlur={() => setFocused("")}
          placeholder={placeholder}
          className={`relative w-full pl-12 pr-4 py-3.5 bg-neutral-950/50 border ${error ? "border-red-500/50" : "border-neutral-800/50"} rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500/50 transition-all duration-300`}
        />
      </div>
    </div>
    {error && (
      <motion.p
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-red-400 text-xs mt-1.5 ml-1"
      >
        {error.message}
      </motion.p>
    )}
  </div>
);

// TEXTAREA FIELD COMPONENT
const TextAreaField = ({
  icon,
  label,
  name,
  placeholder,
  register,
  error,
  focused,
  setFocused,
}) => (
  <div className="relative">
    <label className="block text-sm font-medium text-neutral-300 mb-2">
      {label} <span className="text-red-400">*</span>
    </label>
    <div className="relative group">
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-xl blur-sm opacity-0 group-hover:opacity-30 transition duration-300 ${focused === name ? "opacity-50" : ""}`}
      />
      <div className="relative">
        <div
          className={`absolute left-4 top-4 transition-colors duration-300 ${focused === name ? "text-purple-400" : error ? "text-red-400" : "text-neutral-500"}`}
        >
          {icon}
        </div>
        <textarea
          {...register(name)}
          onFocus={() => setFocused(name)}
          onBlur={() => setFocused("")}
          placeholder={placeholder}
          rows="5"
          className={`relative w-full pl-12 pr-4 py-4 bg-neutral-950/50 border ${error ? "border-red-500/50" : "border-neutral-800/50"} rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500/50 transition-all duration-300 resize-none`}
        />
      </div>
    </div>
    {error && (
      <motion.p
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-red-400 text-xs mt-1.5 ml-1"
      >
        {error.message}
      </motion.p>
    )}
  </div>
);

// INFO CARD COMPONENT
const InfoCard = ({
  icon,
  title,
  value,
  description,
  gradient,
  iconBg,
  iconColor,
  delay,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="relative group/card"
  >
    <div
      className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-2xl blur opacity-0 group-hover/card:opacity-60 transition duration-500`}
    />
    <div className="relative bg-gradient-to-br from-neutral-900/95 to-neutral-950/95 backdrop-blur-xl border border-neutral-800/50 rounded-2xl p-6 hover:border-neutral-700/50 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div
          className={`p-3 bg-gradient-to-br ${iconBg} rounded-xl flex-shrink-0 transition-transform duration-300 group-hover/card:rotate-6 group-hover/card:scale-110`}
        >
          <div className={iconColor}>{icon}</div>
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-neutral-200 mb-1">{title}</h4>
          <p className="text-white font-medium mb-1 break-words">{value}</p>
          <p className="text-xs text-neutral-500">{description}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

// STAT ITEM COMPONENT
const StatItem = ({ number, label }) => (
  <div className="flex items-center justify-between py-2 border-b border-neutral-800/50 last:border-0">
    <span className="text-sm text-neutral-400">{label}</span>
    <span className="font-bold text-purple-400">{number}</span>
  </div>
);

export default ContactUs;
