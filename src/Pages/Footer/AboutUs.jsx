import React, { use } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../context/ThemeProvider';
import Container from '../../components/container/Container';

const AboutUs = () => {
  const { theme } = use(ThemeContext);
  const isDark = theme === 'dark';

  const stats = [
    { label: 'Vehicles Found', value: '200+', sub: 'across categories' },
    { label: 'Host Rating', value: '4.8★', sub: 'average based on trips' },
    { label: 'Booking Speed', value: 'Minutes', sub: 'no long forms, no queues' },
  ];

  // Theme helpers
  const pageBg = isDark ? 'bg-transparent' : 'bg-white';
  const heroGlow = isDark
    ? 'from-(--accent-cyan)/10 via-(--accent-purple)/6 to-transparent rounded-xl'
    : 'from-(--accent-cyan)/12 via-(--accent-purple)/10 to-transparent rounded-xl';

  const pillBg = isDark ? 'bg-(--accent-cyan)/10' : 'bg-(--accent-cyan)/12';
  const pillBorder = isDark ? 'border-(--accent-cyan)/20' : 'border-(--accent-cyan)/25';

  const statsWrap = isDark
    ? 'border-white/10 bg-linear-to-r from-(--accent-cyan)/12 to-(--accent-purple)/12'
    : 'border-slate-200/70 bg-linear-to-r from-(--accent-cyan)/10 via-white to-(--accent-purple)/10';

  const statsDivider = isDark ? 'border-white/8' : 'border-slate-200/70';

  const statValue = isDark ? 'text-white' : 'text-slate-900';
  const statLabel = isDark ? 'text-(--accent-cyan)' : 'text-(--accent-cyan)';
  const statSub = isDark ? 'text-(--text-muted)' : 'text-slate-600';

  const featureCard = isDark
    ? 'bg-(--bg-secondary)/55 border-white/10 hover:border-(--accent-cyan)/30'
    : 'bg-slate-50 border-slate-200/70 hover:border-(--accent-cyan)/40 hover:bg-white';

  const featureShadow = isDark ? '' : 'shadow-[0_10px_30px_rgba(2,6,23,0.06)]';

  const howWrap = isDark
    ? 'bg-(--bg-secondary)/20 border-white/10 rounded-xl'
    : 'bg-slate-50 border-slate-200/70 rounded-xl';

  return (
    <div className={`transition-colors duration-500 overflow-hidden px-3 lg:px-0 ${pageBg}`}>
      {/* 1) Hero */}
      <section className="relative my-6 sm:my-8 md:my-10 lg:my-14 px-3 pt-5 md:px-0 ">
        <Container>
          <div className="text-center space-y-4 sm:space-y-6 relative z-10 ">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em]
              ${pillBg} text-(--accent-cyan) border ${pillBorder}`}
            >
              About Voyago
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-7xl font-black tracking-tighter text-(--text-primary) italic leading-[1.05]"
            >
              A SMARTER WAY <br />
              <span className="bg-linear-to-r from-(--accent-cyan) via-(--accent-purple) to-blue-500 bg-clip-text text-transparent">
                TO BOOK RIDES.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="max-w-[46ch] sm:max-w-2xl md:max-w-xl mx-auto text-(--text-muted)/70 text-xs md:text-base lg:text-lg leading-relaxed opacity-85"
            >
              Voyago connects travelers with trusted local hosts. Compare electric, SUVs, and city cars in one place, read real reviews,
              and book in a few clicks.
            </motion.p>
          </div>
        </Container>

        {/* Background glow (kept inside section) */}
        <div className={`pointer-events-none absolute inset-0 bg-linear-to-b ${heroGlow}`} />
      </section>

      {/* 2) Stats */}
      <Container>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className={`grid grid-cols-1 md:grid-cols-3 rounded-3xl overflow-hidden border backdrop-blur-xl shadow-2xl ${statsWrap}`}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`p-6 sm:p-8 md:p-10 text-center space-y-2 ${i !== 2 ? `border-b md:border-b-0 md:border-r ${statsDivider}` : ''}`}
            >
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter italic ${statValue}`}>{stat.value}</h2>

              <div>
                <p className={`text-xs font-black uppercase tracking-widest ${statLabel}`}>{stat.label}</p>
                <p className={`text-[10px] uppercase ${statSub} opacity-70`}>{stat.sub}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </Container>

      {/* 3) Why Voyago */}
      <section className="py-14 sm:py-16 md:py-20 lg:py-28">
        <Container>
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
            {/* sticky only on lg+ to avoid mobile awkwardness */}
            <div className="lg:w-1/3 space-y-4 lg:sticky lg:top-28">
              <h2 className="text-2xl md:text-3xl lg:text-5xl font-black text-(--text-primary) italic tracking-tighter">
                WHY <br /> VOYAGO?
              </h2>
              <div className="h-1.5 w-20 bg-linear-to-r from-(--accent-cyan) to-(--accent-purple) rounded-full" />
              <p className="text-xs md:text-sm text-(--text-muted) leading-relaxed opacity-90 max-w-[55ch]">
                We built Voyago for people who want comfort and flexibility—without the traditional rental desk hassle.
              </p>
            </div>

            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {[
                { icon: '🏎️', title: 'Vehicles that fit your trip', desc: 'From compact city rides to family-ready SUVs and electric models.' },
                { icon: '🛡️', title: 'Trusted local hosts', desc: 'Verified hosts with ratings, response time, and trip history.' },
                { icon: '⚡', title: 'Fast, clear booking flow', desc: 'See total price, key specs, and availability in seconds.' },
                { icon: '🌍', title: 'Built for real trips', desc: 'Weekend escapes, airport runs, or roadtrips—Voyago adapts.' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  className={`p-6 sm:p-7 md:p-8 rounded-3xl border backdrop-blur-md transition-all duration-300 ${featureCard} ${featureShadow}`}
                >
                  <span className="text-3xl mb-3 block">{item.icon}</span>
                  <h4 className="text-base sm:text-lg font-bold text-(--text-primary) mb-2 tracking-tight">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-(--text-muted) leading-relaxed opacity-80">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 4) How it works */}
      <section className={`py-14 sm:py-16 md:py-20 border-y px-3 lg:px-0 ${howWrap}`}>
        <Container>
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-black text-(--text-primary) italic tracking-tighter uppercase">
              How Voyago works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { step: '01', title: 'Browse vehicles', desc: 'Filter by category, location, and price to find a ride.' },
              { step: '02', title: 'Check the host', desc: 'Review host ratings and vehicle details before you request.' },
              { step: '03', title: 'Send a request', desc: 'Pick your pickup date & location, then submit in one click.' },
              { step: '04', title: 'Hit the road', desc: 'Meet your host, grab the keys, and start your trip.' },
            ].map((step, i) => (
              <div key={i} className="relative space-y-3">
                <span className="text-5xl font-black text-(--accent-cyan) opacity-20 italic">{step.step}</span>
                <h4 className="text-base sm:text-lg font-bold md:font-black text-(--text-primary) tracking-tight">{step.title}</h4>
                <p className="text-xs sm:text-sm text-(--text-muted) leading-relaxed opacity-80 max-w-[55ch]">{step.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
};

export default AboutUs;
