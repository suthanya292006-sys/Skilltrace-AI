import { motion } from 'framer-motion';
import { tokens } from '../../styles/theme';

/**
 * TrajectoryMark — the SkillTrace signature element.
 * A rising, slightly irregular path (like a skill-growth curve) with a
 * traveling dot, used across the brand (splash, auth side-panel, dashboard
 * accents) to visually encode "trace" + upward progress.
 */
export default function TrajectoryMark({
  width = 360,
  height = 220,
  stroke = tokens.teal,
  glow = tokens.amber,
  animate = true,
  strokeWidth = 3,
}) {
  const path =
    'M4 190 C 40 188, 60 160, 92 150 S 150 120, 170 100 S 220 40, 250 46 S 300 20, 340 8';

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* baseline grid ticks */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1={0}
          x2={width}
          y1={200 - i * 44}
          y2={200 - i * 44}
          stroke={tokens.line}
          strokeWidth={1}
          opacity={0.5}
        />
      ))}
      <motion.path
        d={path}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={animate ? { pathLength: 0, opacity: 0 } : undefined}
        animate={animate ? { pathLength: 1, opacity: 1 } : undefined}
        transition={{ duration: 1.6, ease: 'easeInOut' }}
      />
      {animate && (
        <motion.circle
          r={6}
          fill={glow}
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{ offsetDistance: '100%', opacity: 1 }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
          style={{ offsetPath: `path('${path}')` }}
        />
      )}
      {!animate && <circle cx={340} cy={8} r={6} fill={glow} />}
    </svg>
  );
}
