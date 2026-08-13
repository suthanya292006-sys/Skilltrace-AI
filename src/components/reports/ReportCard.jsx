import {
  Card,
  CardContent,
  Box,
  Typography,
  Stack,
  Button,
  Chip,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  FiFileText,
  FiFolder,
  FiCheckSquare,
  FiCompass,
  FiTarget,
  FiDownload,
  FiPrinter,
  FiShare2,
  FiEye,
  FiCheckCircle,
  FiAlertCircle,
  FiTrendingUp,
} from 'react-icons/fi';
import { tokens } from '../../styles/theme';

const typeIcons = {
  'portfolio-analysis': FiFolder,
  'skill-assessment': FiCheckSquare,
  'career-recommendation': FiCompass,
  'placement-prediction': FiTarget,
};

const typeColors = {
  'portfolio-analysis': '#0F9D8C',
  'skill-assessment': '#3B82F6',
  'career-recommendation': '#8B5CF6',
  'placement-prediction': '#F5A623',
};

export default function ReportCard({
  report,
  onViewReport,
  onDownloadPdf,
  onPrintReport,
  onShareReport,
}) {
  const IconComponent = typeIcons[report.type] || FiFileText;
  const brandColor = typeColors[report.type] || tokens.teal;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        borderColor: tokens.line,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: '0 12px 24px -8px rgba(16,24,40,0.08)',
        },
      }}
    >
      <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header: Icon, Type Badge & Score Indicator */}
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={2} sx={{ mb: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 2.5,
                bgcolor: `${brandColor}15`,
                color: brandColor,
                display: 'grid',
                placeItems: 'center',
                flexShrink: 0,
              }}
            >
              <IconComponent size={22} />
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: brandColor, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                {report.scoreLabel || 'Score Rating'}
              </Typography>
              <Typography variant="h6" sx={{ fontSize: 17, fontWeight: 700, lineHeight: 1.2, color: tokens.ink }}>
                {report.title}
              </Typography>
            </Box>
          </Stack>

          <Box
            sx={{
              textAlign: 'center',
              bgcolor: 'background.default',
              border: `1.5px solid ${brandColor}`,
              borderRadius: 3,
              px: 1.8,
              py: 0.8,
              minWidth: 70,
              flexShrink: 0,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 800, color: brandColor, lineHeight: 1 }}>
              {report.score}
              {report.type === 'career-recommendation' || report.type === 'placement-prediction' ? '%' : ''}
            </Typography>
            <Typography variant="caption" sx={{ fontSize: 10, fontWeight: 700, color: 'text.secondary', display: 'block', mt: 0.3 }}>
              {report.maxScore ? `/ ${report.maxScore}` : 'PROB'}
            </Typography>
          </Box>
        </Stack>

        <Typography variant="body2" sx={{ color: tokens.slate, mb: 2, fontSize: 13.5, lineHeight: 1.4 }}>
          {report.subtitle}
        </Typography>

        <Divider sx={{ my: 1.5, borderColor: tokens.line }} />

        {/* Key Insights Section */}
        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 0.5, mb: 1, display: 'block' }}>
          Key AI Insights
        </Typography>
        <Stack spacing={0.8} sx={{ mb: 2 }}>
          {report.keyInsights.slice(0, 3).map((insight, idx) => (
            <Stack key={idx} direction="row" alignItems="flex-start" spacing={1}>
              <Box component="span" sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: brandColor, mt: 0.9, flexShrink: 0 }} />
              <Typography variant="body2" sx={{ fontSize: 12.5, color: tokens.ink, lineHeight: 1.4 }}>
                {insight}
              </Typography>
            </Stack>
          ))}
        </Stack>

        {/* Strengths & Weaknesses Badges Preview */}
        <Box sx={{ mb: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.8 }}>
            <FiCheckCircle size={14} color={tokens.teal} />
            <Typography variant="caption" sx={{ fontWeight: 700, color: tokens.ink }}>
              Top Strengths:
            </Typography>
          </Stack>
          <Stack direction="row" flexWrap="wrap" gap={0.6}>
            {report.strengths.slice(0, 3).map((strength, idx) => (
              <Chip
                key={idx}
                label={strength}
                size="small"
                sx={{
                  bgcolor: 'rgba(15,157,140,0.08)',
                  color: tokens.tealDark,
                  fontSize: 11,
                  fontWeight: 600,
                  height: 22,
                }}
              />
            ))}
          </Stack>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.8 }}>
            <FiAlertCircle size={14} color={tokens.amber} />
            <Typography variant="caption" sx={{ fontWeight: 700, color: tokens.ink }}>
              Areas to Improve:
            </Typography>
          </Stack>
          <Stack direction="row" flexWrap="wrap" gap={0.6}>
            {report.weaknesses.slice(0, 2).map((weakness, idx) => (
              <Chip
                key={idx}
                label={weakness}
                size="small"
                sx={{
                  bgcolor: 'rgba(245,166,35,0.12)',
                  color: '#B4690E',
                  fontSize: 11,
                  fontWeight: 600,
                  height: 22,
                }}
              />
            ))}
          </Stack>
        </Box>

        {/* Top Recommendation Preview */}
        {report.recommendations && report.recommendations.length > 0 && (
          <Box
            sx={{
              bgcolor: 'background.default',
              border: `1px solid ${tokens.line}`,
              borderRadius: 2,
              p: 1.5,
              mt: 'auto',
              mb: 2,
            }}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 0.5 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: brandColor, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <FiTrendingUp size={12} /> Top AI Action Item
              </Typography>
              <Chip label={report.recommendations[0].priority} size="small" color="primary" sx={{ height: 18, fontSize: 9.5, fontWeight: 700 }} />
            </Stack>
            <Typography variant="body2" sx={{ fontSize: 12, fontWeight: 600, color: tokens.ink }}>
              {report.recommendations[0].title}
            </Typography>
          </Box>
        )}

        {/* Footer: Date & Actions */}
        <Box sx={{ mt: 'auto', pt: 1.5, borderTop: `1px dashed ${tokens.line}` }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.5 }}>
            <Typography variant="caption" sx={{ color: tokens.slate, fontSize: 11 }}>
              Generated: <strong>{report.lastGenerated}</strong>
            </Typography>
            <Chip
              label={report.scoreTag || 'Verified'}
              size="small"
              variant="outlined"
              sx={{ height: 20, fontSize: 10, borderColor: tokens.line }}
            />
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<FiEye size={15} />}
              onClick={() => onViewReport(report)}
              sx={{
                bgcolor: brandColor,
                '&:hover': { bgcolor: brandColor, opacity: 0.9 },
                py: 0.9,
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              View Report
            </Button>

            <Tooltip title="Download PDF Report">
              <IconButton
                onClick={() => onDownloadPdf(report)}
                sx={{
                  border: `1px solid ${tokens.line}`,
                  borderRadius: 2,
                  p: 0.9,
                  color: tokens.ink,
                  '&:hover': { bgcolor: 'background.default', borderColor: brandColor },
                }}
              >
                <FiDownload size={16} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Print Formatted Report">
              <IconButton
                onClick={() => onPrintReport(report)}
                sx={{
                  border: `1px solid ${tokens.line}`,
                  borderRadius: 2,
                  p: 0.9,
                  color: tokens.ink,
                  '&:hover': { bgcolor: 'background.default', borderColor: brandColor },
                }}
              >
                <FiPrinter size={16} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Share Report">
              <IconButton
                onClick={() => onShareReport(report)}
                sx={{
                  border: `1px solid ${tokens.line}`,
                  borderRadius: 2,
                  p: 0.9,
                  color: tokens.ink,
                  '&:hover': { bgcolor: 'background.default', borderColor: brandColor },
                }}
              >
                <FiShare2 size={16} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
