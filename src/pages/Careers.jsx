import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  X,
  Upload,
  CheckCircle,
  Users,
  Rocket,
  Heart,
  Zap,
} from "lucide-react";

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    portfolio: "",
    coverLetter: "",
    resume: null,
  });

  const roles = [
    {
      id: 1,
      title: "Frontend Developer",
      department: "Engineering",
      location: "Remote / Bangalore",
      type: "Full-Time",
      salary: "₹6-12 LPA",
      description:
        "Build beautiful, responsive web applications using React, Tailwind CSS, and modern web technologies.",
      requirements: [
        "2+ years experience with React.js",
        "Strong knowledge of HTML, CSS, JavaScript",
        "Experience with Tailwind CSS or similar frameworks",
        "Understanding of REST APIs and state management",
      ],
    },
    {
      id: 2,
      title: "Backend Developer",
      department: "Engineering",
      location: "Bangalore / Hybrid",
      type: "Full-Time",
      salary: "₹8-15 LPA",
      description:
        "Design and develop scalable backend systems, APIs, and database architectures.",
      requirements: [
        "3+ years experience with Node.js or Python",
        "Strong knowledge of databases (MongoDB, PostgreSQL)",
        "Experience with REST APIs and microservices",
        "Understanding of cloud platforms (AWS, GCP)",
      ],
    },
    {
      id: 3,
      title: "UI/UX Designer",
      department: "Design",
      location: "Remote",
      type: "Full-Time",
      salary: "₹5-10 LPA",
      description:
        "Create stunning user interfaces and seamless user experiences for web and mobile applications.",
      requirements: [
        "2+ years experience in UI/UX design",
        "Proficiency in Figma, Adobe XD, or Sketch",
        "Strong portfolio showcasing web/mobile designs",
        "Understanding of design systems and accessibility",
      ],
    },
    {
      id: 4,
      title: "Product Manager",
      department: "Product",
      location: "Bangalore",
      type: "Full-Time",
      salary: "₹10-18 LPA",
      description:
        "Lead product strategy, roadmap, and execution for our core platform and marketplace.",
      requirements: [
        "3+ years experience in product management",
        "Strong understanding of SaaS and marketplace business models",
        "Experience with user research and data-driven decision making",
        "Excellent communication and stakeholder management skills",
      ],
    },
    {
      id: 5,
      title: "Marketing Manager",
      department: "Marketing",
      location: "Remote / Bangalore",
      type: "Full-Time",
      salary: "₹7-14 LPA",
      description:
        "Drive growth through digital marketing, content strategy, and brand building initiatives.",
      requirements: [
        "3+ years experience in digital marketing",
        "Expertise in SEO, SEM, social media, and content marketing",
        "Experience with marketing automation tools",
        "Strong analytical and creative skills",
      ],
    },
    {
      id: 6,
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Bangalore",
      type: "Full-Time",
      salary: "₹5-9 LPA",
      description:
        "Ensure customer satisfaction, drive adoption, and build long-term relationships with our clients.",
      requirements: [
        "2+ years experience in customer success or account management",
        "Excellent communication and problem-solving skills",
        "Experience with CRM tools (HubSpot, Salesforce)",
        "Passion for helping customers succeed",
      ],
    },
  ];

  const benefits = [
    {
      icon: Rocket,
      title: "Fast Growth",
      description: "Rapid career progression in a growing startup",
    },
    {
      icon: Users,
      title: "Great Team",
      description: "Work with passionate, talented people",
    },
    {
      icon: Heart,
      title: "Work-Life Balance",
      description: "Flexible hours and remote-friendly culture",
    },
    {
      icon: Zap,
      title: "Impact",
      description: "See your work make a real difference",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setShowSuccessMessage(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        portfolio: "",
        coverLetter: "",
        resume: null,
      });
      setTimeout(() => {
        setShowSuccessMessage(false);
        setSelectedJob(null);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black pt-24 md:pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Join{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 font-medium hover:from-purple-500 bg-clip-text text-transparent">
              CoBrother
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
            Build the future of business collaboration. We're looking for
            talented, passionate people to join our team.
          </p>
        </motion.div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300" />
              <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center">
                <benefit.icon className="w-10 h-10 text-purple-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-white/70">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            Open Positions
          </h2>

          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="relative group cursor-pointer"
              onClick={() => setSelectedJob(role)}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300" />
              <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="w-5 h-5 text-purple-400" />
                      <span className="text-xs text-purple-400 font-semibold">
                        {role.department}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                      {role.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm text-white/60">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {role.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {role.type}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {role.salary}
                      </div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 font-medium hover:from-purple-500 rounded-full text-white font-semibold text-sm"
                  >
                    Apply Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Application Modal */}
      <AnimatePresence>
        {selectedJob && !showSuccessMessage && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedJob(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-2xl max-h-[90vh] bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl z-50 overflow-y-auto"
            >
              <div className="sticky top-0 bg-black/95 border-b border-white/10 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  Apply for {selectedJob.title}
                </h2>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 transition-all"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Portfolio / LinkedIn
                  </label>
                  <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 transition-all"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Cover Letter
                  </label>
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 transition-all resize-none"
                    placeholder="Tell us why you're a great fit..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Upload Resume *
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      required
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      id="resume-upload"
                    />
                    <label
                      htmlFor="resume-upload"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/70 hover:bg-white/10 hover:border-purple-500/50 cursor-pointer transition-all"
                    >
                      <Upload className="w-5 h-5" />
                      {formData.resume
                        ? formData.resume.name
                        : "Choose file (PDF, DOC, DOCX)"}
                    </label>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 font-medium hover:from-purple-500 rounded-xl text-white font-semibold text-lg"
                >
                  Submit Application
                </motion.button>
              </form>
            </motion.div>
          </>
        )}

        {/* Success Message */}
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50 p-4"
          >
            <div className="bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl p-8 sm:p-12 text-center max-w-md">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-green-500 mx-auto mb-6" />
              </motion.div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Application Submitted!
              </h3>
              <p className="text-white/70 mb-2">
                Thank you for applying. We'll review your application and get
                back to you soon.
              </p>
              <p className="text-sm text-white/50">
                Check your email for confirmation.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Careers;
