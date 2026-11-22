'use client';

import { Check } from 'lucide-react';
import FloatingProducts, { type CutoutName } from './FloatingProducts';

/** Brand side panel shared by the login / signup / register screens. */
export default function AuthVisual({
  title,
  subtitle,
  points,
  products = ['peanut', 'jerky', 'pre', 'hemp'],
  className = '',
}: {
  title: string;
  subtitle: string;
  points: string[];
  products?: CutoutName[];
  className?: string;
}) {
  return (
    <div className={`relative hidden w-1/2 overflow-hidden bg-[#F4623B] text-white lg:block ${className}`}>
      <div aria-hidden className="absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full border-[70px] border-white/10" />
      <div aria-hidden className="absolute -bottom-32 -left-24 h-[420px] w-[420px] rounded-full bg-[#E3A438]/40 blur-3xl" />
      <FloatingProducts
        items={[
          { name: products[0], className: 'right-[8%] top-[10%] w-[11vw] max-w-[170px]', rotate: 10, depth: 0.2 },
          { name: products[1], className: 'right-[30%] bottom-[6%] w-[10vw] max-w-[150px]', rotate: -8, depth: 0.4 },
          { name: products[2], className: 'right-[4%] bottom-[24%] w-[7vw] max-w-[110px]', rotate: 14, depth: 0.3 },
          { name: products[3], className: 'right-[34%] top-[6%] w-[5vw] max-w-[80px]', rotate: -14, depth: 0.5 },
        ]}
      />
      <div className="relative flex h-full min-h-[640px] flex-col justify-center p-12 xl:p-16">
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-white/75">Beggin For A Bite</p>
        <h2 className="max-w-sm font-fredoka text-[clamp(2.4rem,3.6vw,3.6rem)] font-bold leading-[0.98] tracking-[-0.03em]">{title}</h2>
        <p className="mt-5 max-w-sm text-lg leading-relaxed text-white/85">{subtitle}</p>
        <ul className="mt-8 space-y-3">
          {points.map((p) => (
            <li key={p} className="flex items-center gap-3 text-[15px] font-medium">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-[#F4623B]">
                <Check size={15} strokeWidth={3} />
              </span>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
