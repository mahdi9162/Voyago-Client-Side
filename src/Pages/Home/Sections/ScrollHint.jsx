import { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';

export default function ScrollHint({ to = 'top-arrivals', duration = 650, offset = -70, showAtTopUntil = 80 }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY <= showAtTopUntil);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial
    return () => window.removeEventListener('scroll', onScroll);
  }, [showAtTopUntil]);

  if (!visible) return null;

  return (
    <Link
      to={to}
      smooth
      duration={duration}
      offset={offset}
      onClick={() => setVisible(false)}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 cursor-pointer hidden md:block"
    >
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-3 group">
        {/* Text color */}
        <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-white">EXPLORE MORE</span>

        {/* Capsule UI  */}
        <div className="relative w-7 h-12 rounded-full border-2 border-(--text-muted)/30 flex justify-center p-1 backdrop-blur-md bg-(--bg-secondary)/10 shadow-sm">
          {/* Scrolling Dot  */}
          <motion.div
            animate={{
              y: [0, 20, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-1.5 h-1.5 bg-(--accent) rounded-full shadow-[0_0_10px_var(--shadow)]"
          />

          {/* Subtle Glow behind the capsule */}
          <div className="absolute inset-0 rounded-full bg-(--accent)/5 blur-md group-hover:bg-(--accent)/15 transition-all duration-500"></div>
        </div>

        {/* Dynamic Line Indicator */}
        <motion.div
          animate={{
            height: [15, 35, 15],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="w-[1.5px] bg-linear-to-b from-(--accent) to-transparent"
        />
      </motion.div>
    </Link>
  );
}
