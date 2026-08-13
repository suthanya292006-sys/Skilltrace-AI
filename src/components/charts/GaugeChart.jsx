import { Box, Typography } from '@mui/material';
import { tokens } from '../../styles/theme';

function polarToCartesian(cx, cy, r, angleDeg) {
  const angleRad = ((angleDeg - 180) * Math.PI) / 180;
  return { x: cx + r * Math.cos(angleRad), y: cy + r * Math.sin(angleRad) };
}

function arcPath(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}

function gaugeColor(v) {
  if (v >= 70) return tokens.teal;
  if (v >= 45) return tokens.amber;
  return tokens.danger;
}

export default function GaugeChart({ value = 0, max = 100, label, size = 200, stroke = 16 }) {
  const safeValue = Math.max(0, Math.min(max, value));
  const pct = safeValue / max;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - stroke;
  const color = gaugeColor((safeValue / max) * 100);

  return (
    <Box sx={{ width: size, mx: 'auto', textAlign: 'center' }}>
      <svg width={size} height={size / 2 + stroke} viewBox={`0 0 ${size} ${size / 2 + stroke}`}>
        <path
          d={arcPath(cx, cy, r, 0, 180)}
          fill="none"
          stroke={tokens.line}
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        <path
          d={arcPath(cx, cy, r, 0, pct * 180)}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          style={{ transition: 'all 0.8s ease' }}
        />
      </svg>
      <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, fontSize: 32, mt: -1 }}>
        {safeValue}
        <Box component="span" sx={{ fontSize: 16, color: 'text.secondary', fontWeight: 500 }}>
          /{max}
        </Box>
      </Typography>
      {label && (
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {label}
        </Typography>
      )}
    </Box>
  );
}
