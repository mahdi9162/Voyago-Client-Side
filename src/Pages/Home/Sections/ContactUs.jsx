import React, { use } from 'react';
import { motion } from 'framer-motion';
import Container from '../../../components/container/Container';
import { ThemeContext } from '../../../context/ThemeProvider';
import { notifyError, notifySuccess } from '../../../utils/toastService';

const ContactUs = () => {
  const { theme } = use(ThemeContext);
  const isDark = theme === 'dark';

  const cardBg = isDark
    ? 'bg-slate-900/60 backdrop-blur-xl border-white/10'
    : 'bg-white border-(--accent-cyan)/15 shadow-xl shadow-cyan-500/5';

  const inputBg = isDark ? 'bg-slate-800/50 border-white/10' : 'bg-(--accent-cyan)/5 border-(--accent-cyan)/10';
  const labelColor = isDark ? 'text-slate-400' : 'text-(--accent-cyan) font-black';

  const iconBoxBase = 'shrink-0 grid place-items-center rounded-2xl transition-all duration-300';
  const iconBox = isDark
    ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400'
    : 'bg-(--accent-cyan) shadow-lg shadow-cyan-500/30 text-white';

  const iconBoxPurple = isDark
    ? 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-400'
    : 'bg-(--accent-purple) shadow-lg shadow-indigo-500/30 text-white';

  const fieldBase =
    'w-full rounded-2xl px-5 sm:px-6 py-3.5 sm:py-4 text-(--text-primary) font-medium focus:outline-none focus:ring-2 focus:ring-(--accent-cyan)/50 border transition-all';

  const handleSendMsgBtn = (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const subject = form.subject.value;
    const message = form.message.value;

    if (!name || !email || !subject || !message) {
      notifyError('Please fill in all fields.');
      return;
    }

    notifySuccess('Message sent successfully!');
  };

  return (
    <Container>
      <section className="my-6 sm:my-8 md:my-10 lg:my-14 px-3 md:px-0 transition-colors duration-500 overflow-hidden">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-14">
          <motion.h4
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-(--accent-cyan) font-bold uppercase tracking-[0.35em] text-[10px] sm:text-xs mb-3 sm:mb-4"
          >
            Get In Touch
          </motion.h4>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-(--text-primary) tracking-tight italic leading-tight"
          >
            CONTACT <span className="bg-linear-to-r from-(--accent-cyan) to-(--accent-purple) bg-clip-text text-transparent">VOYAGO</span>
          </motion.h2>

          <p className="mt-3 sm:mt-4 text-(--text-muted)/70 max-w-[42ch] sm:max-w-xl md:max-w-2xl mx-auto opacity-90 font-medium text-xs md:text-base leading-relaxed">
            Booking or listing questions? We’re here 24/7.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-start">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5 sm:space-y-6"
          >
            <div
              className={`border transition-all duration-500 rounded-2xl sm:rounded-3xl md:rounded-[2.25rem] p-5 sm:p-7 md:p-9 ${cardBg}`}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-(--text-primary) mb-6 sm:mb-8 tracking-tight">Contact Information</h3>

              <div className="space-y-6 sm:space-y-8">
                {/* Email */}
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className={`${iconBoxBase} ${iconBox} h-11 w-11 sm:h-14 sm:w-14`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 sm:h-7 sm:w-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>

                  <div className="min-w-0">
                    <p className={`text-[10px] uppercase tracking-[0.2em] mb-1 ${labelColor}`}>Email Us</p>
                    <p className="text-(--text-primary) text-xs md:text-base font-bold break-all">support@voyago.com</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className={`${iconBoxBase} ${iconBoxPurple} h-11 w-11 sm:h-14 sm:w-14`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 sm:h-7 sm:w-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>

                  <div className="min-w-0">
                    <p className={`text-[10px] uppercase tracking-[0.2em] mb-1 ${labelColor}`}>Call Us</p>
                    <p className="text-(--text-primary) text-xs md:text-base font-bold">+880 1880230924</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className={`${iconBoxBase} ${iconBox} h-11 w-11 sm:h-14 sm:w-14`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 sm:h-7 sm:w-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>

                  <div className="min-w-0">
                    <p className={`text-[10px] uppercase tracking-[0.2em] mb-1 ${labelColor}`}>Location</p>
                    <p className="text-(--text-primary) text-xs md:text-base font-bold">Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`border transition-all duration-500 rounded-2xl sm:rounded-3xl md:rounded-[2.25rem] p-5 sm:p-7 md:p-9 ${cardBg}`}
          >
            <form onSubmit={handleSendMsgBtn} className="space-y-5 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2.5">
                  <label className={`text-[11px] uppercase tracking-widest ml-1 ${labelColor}`}>Full Name</label>
                  <input type="text" name="name" placeholder="John Doe" className={`${fieldBase} ${inputBg} text-xs`} />
                </div>

                <div className="space-y-2.5">
                  <label className={`text-[11px] uppercase tracking-widest ml-1 ${labelColor}`}>Email Address</label>
                  <input type="email" name="email" placeholder="john@example.com" className={`${fieldBase} ${inputBg} text-xs`} />
                </div>
              </div>

              <div className="space-y-2.5">
                <label className={`text-[11px] uppercase tracking-widest ml-1 ${labelColor}`}>Subject</label>
                <div className="relative">
                  <select name="subject" className={`${fieldBase} ${inputBg} cursor-pointer appearance-none text-xs`}>
                    <option className={isDark ? 'bg-slate-900' : 'bg-white'}>General Inquiry</option>
                    <option className={isDark ? 'bg-slate-900' : 'bg-white'}>Booking Support</option>
                    <option className={isDark ? 'bg-slate-900' : 'bg-white'}>Technical Issue</option>
                  </select>

                  <div className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 pointer-events-none text-(--accent-cyan) text-sm">
                    ▼
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                <label className={`text-[11px] uppercase tracking-widest ml-1 ${labelColor}`}>Message</label>
                <textarea
                  rows={5}
                  name="message"
                  placeholder="How can we help you?"
                  className={`${fieldBase} ${inputBg} resize-none text-xs md:text-sm`}
                />
              </div>

              <button type="submit" className="auth-signup-btn w-full cursor-pointer">
                Send Message
              </button>

              <p className="text-[11px] sm:text-xs text-(--text-muted) opacity-80 leading-relaxed">
                By submitting, you agree we can contact you about your request.
              </p>
            </form>
          </motion.div>
        </div>
      </section>
    </Container>
  );
};

export default ContactUs;
