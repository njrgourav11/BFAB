'use client';

import CountUp from '@/components/reactbits/CountUp';
import Reveal from '@/components/motion/Reveal';

const STATS = [
  { to: 1000, suffix: '+', label: 'Happy pet parents', decimals: 0 },
  { to: 100, suffix: '%', label: 'Natural ingredients', decimals: 0 },
  { to: 25, suffix: '', label: 'Preservatives or fillers', decimals: 0, down: true },
  { to: 90, suffix: '-day', label: 'Happiness guarantee', decimals: 0 },
];

export default function StatsBand() {
  return (
    <section className="bg-[#FAF7F2] py-20 text-[#241F1B] sm:py-24 dark:bg-[#0F0C0A] dark:text-[#FAF7F2]">
      <Reveal
        stagger={0.12}
        className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-12 px-5 sm:px-8 lg:grid-cols-4 lg:px-10"
      >
        {STATS.map((s) => (
          <div key={s.label} className="border-l-2 border-[#F4623B] pl-5">
            <p className="font-fredoka text-[clamp(2.6rem,6vw,4.5rem)] font-bold leading-none tracking-[-0.03em]">
              <CountUp
                from={0}
                to={s.to}
                direction={'down' in s && s.down ? 'down' : 'up'}
                decimals={s.decimals}
                separator=","
                duration={2}
              />
              <span className="text-[#F4623B]">{s.suffix}</span>
            </p>
            <p className="mt-3 text-sm font-medium text-[#241F1B]/60 sm:text-base dark:text-white/55">{s.label}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
