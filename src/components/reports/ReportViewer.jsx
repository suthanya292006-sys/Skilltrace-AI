import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Stack,
  Button,
  IconButton,
  Grid,
  Paper,
  LinearProgress,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
} from '@mui/material';
import {
  FiX,
  FiDownload,
  FiPrinter,
  FiShare2,
  FiCheckCircle,
  FiAlertCircle,
  FiTrendingUp,
  FiClock,
  FiAward,
  FiZap,
} from 'react-icons/fi';
import ReportCharts from './ReportCharts';
import { tokens } from '../../styles/theme';

export default function ReportViewer({
  open,
  report,
  onClose,
  onDownloadPdf,
  onPrintReport,
  onShareReport,
}) {
  if (!report) return null;

  const accentColor =
    report.type === 'portfolio-analysis'
      ? '#0F9D8C'
      : report.type === 'skill-assessment'
      ? '#3B82F6'
      : report.type === 'career-recommendation'
      ? '#8B5CF6'
      : '#F5A623';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
      PaperProps={{
        sx: {
          borderRadius: 3,
          maxHeight: '90vh',
          bgcolor: 'background.paper',
        },
      }}
    >
      {/* Dialog Header */}
      <DialogTitle
        sx={{
          px: 3,
          py: 2.2,
          borderBottom: `1px solid ${tokens.line}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: 'background.default',
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              bgcolor: `${accentColor}18`,
              color: accentColor,
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <FiAward size={22} />
          </Box>
          <Box>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Chip label={report.scoreTag || 'Report Active'} size="small" sx={{ bgcolor: accentColor, color: '#fff', fontSize: 10, fontWeight: 700, height: 20 }} />
              <Typography variant="caption" sx={{ color: tokens.slate, fontWeight: 600 }}>
                Generated {report.lastGenerated}
              </Typography>
            </Stack>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 18, color: tokens.ink, lineHeight: 1.2 }}>
              {report.title}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<FiDownload size={14} />}
            onClick={() => onDownloadPdf(report)}
            sx={{ borderColor: tokens.line, color: tokens.ink }}
          >
            Download PDF
          </Button>
          <IconButton size="small" onClick={() => onPrintReport(report)} sx={{ border: `1px solid ${tokens.line}` }}>
            <FiPrinter size={16} />
          </IconButton>
          <IconButton size="small" onClick={() => onShareReport(report)} sx={{ border: `1px solid ${tokens.line}` }}>
            <FiShare2 size={16} />
          </IconButton>
          <IconButton onClick={onClose} size="small" sx={{ ml: 1 }}>
            <FiX size={20} />
          </IconButton>
        </Stack>
      </DialogTitle>

      {/* Dialog Body Content */}
      <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Stack spacing={3}>
          {/* Top Key Metrics Banner */}
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <Paper sx={{ p: 2, textAlign: 'center', bgcolor: `${accentColor}0A`, border: `1px solid ${accentColor}30`, borderRadius: 2.5 }}>
                <Typography variant="caption" sx={{ color: accentColor, fontWeight: 700, textTransform: 'uppercase' }}>
                  Overall Score
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color: accentColor, my: 0.5 }}>
                  {report.score}
                  {report.type === 'career-recommendation' || report.type === 'placement-prediction' ? '%' : ''}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  {report.scoreLabel || 'Evaluation Score'}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'background.default', border: `1px solid ${tokens.line}`, borderRadius: 2.5 }}>
                <Typography variant="caption" sx={{ color: tokens.slate, fontWeight: 700, textTransform: 'uppercase' }}>
                  AI Confidence
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color: tokens.ink, my: 0.5 }}>
                  {report.confidenceLevel || 95}%
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  Model Accuracy
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'background.default', border: `1px solid ${tokens.line}`, borderRadius: 2.5 }}>
                <Typography variant="caption" sx={{ color: tokens.slate, fontWeight: 700, textTransform: 'uppercase' }}>
                  Cohort Rank
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color: tokens.ink, my: 0.5 }}>
                  Top 8%
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  Batch Benchmark
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'background.default', border: `1px solid ${tokens.line}`, borderRadius: 2.5 }}>
                <Typography variant="caption" sx={{ color: tokens.slate, fontWeight: 700, textTransform: 'uppercase' }}>
                  Status
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color: tokens.teal, my: 0.5, fontSize: 20, mt: 1 }}>
                  Verified
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  SkillTrace Engine
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Sub-Metrics Progress Indicators */}
          {report.subMetrics && (
            <Paper sx={{ p: 2.5, border: `1px solid ${tokens.line}`, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 700, mb: 2, color: tokens.ink }}>
                Sub-Domain Performance Breakdown
              </Typography>
              <Grid container spacing={2}>
                {report.subMetrics.map((metric, idx) => (
                  <Grid item xs={12} sm={6} key={idx}>
                    <Box sx={{ mb: 1 }}>
                      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 0.5 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: tokens.ink }}>
                          {metric.name}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: metric.color || accentColor }}>
                          {metric.label}
                        </Typography>
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={metric.value}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          bgcolor: 'rgba(102,112,133,0.12)',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: metric.color || accentColor,
                            borderRadius: 4,
                          },
                        }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          )}

          {/* Professional Charts Section */}
          <Grid container spacing={2}>
            {report.chartData && (
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2.5, border: `1px solid ${tokens.line}`, borderRadius: 3, height: '100%' }}>
                  <ReportCharts
                    chartData={report.chartData}
                    title="Skill & Portfolio Radar Assessment"
                    accentColor={accentColor}
                    height={260}
                  />
                </Paper>
              </Grid>
            )}

            {report.secondaryChartData && (
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2.5, border: `1px solid ${tokens.line}`, borderRadius: 3, height: '100%' }}>
                  <ReportCharts
                    chartData={report.secondaryChartData}
                    title="Comparative Match & Trajectory Breakdown"
                    accentColor={accentColor}
                    height={260}
                  />
                </Paper>
              </Grid>
            )}
          </Grid>

          {/* Strengths & Weaknesses Detailed View */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 2.5, border: `1px solid ${tokens.line}`, borderRadius: 3, height: '100%' }}>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
                  <FiCheckCircle size={18} color={tokens.teal} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: tokens.ink }}>
                    Key Strengths
                  </Typography>
                </Stack>
                <Stack spacing={1}>
                  {report.strengths.map((str, idx) => (
                    <Box key={idx} sx={{ p: 1.2, borderRadius: 2, bgcolor: 'rgba(15,157,140,0.06)' }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: tokens.tealDark }}>
                        ✓ {str}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 2.5, border: `1px solid ${tokens.line}`, borderRadius: 3, height: '100%' }}>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
                  <FiAlertCircle size={18} color={tokens.amber} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: tokens.ink }}>
                    Identified Areas for Improvement
                  </Typography>
                </Stack>
                <Stack spacing={1}>
                  {report.weaknesses.map((weak, idx) => (
                    <Box key={idx} sx={{ p: 1.2, borderRadius: 2, bgcolor: 'rgba(245,166,35,0.08)' }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#B4690E' }}>
                        ⚠ {weak}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Paper>
            </Grid>
          </Grid>

          {/* Skill Gaps Matrix */}
          {report.skillGaps && report.skillGaps.length > 0 && (
            <Paper sx={{ p: 2.5, border: `1px solid ${tokens.line}`, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 700, mb: 1.5, color: tokens.ink }}>
                Target Skill Gaps & Estimated Duration
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'background.default' }}>
                      <TableCell sx={{ fontWeight: 700, color: tokens.slate }}>Skill Topic</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: tokens.slate }}>Impact Level</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: tokens.slate }}>Current Level</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: tokens.slate }}>Target Level</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: tokens.slate }} align="right">Est. Effort</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {report.skillGaps.map((gap, idx) => (
                      <TableRow key={idx} hover>
                        <TableCell sx={{ fontWeight: 600, color: tokens.ink }}>{gap.skill}</TableCell>
                        <TableCell>
                          <Chip
                            label={gap.impact}
                            size="small"
                            color={gap.impact === 'High' ? 'error' : gap.impact === 'Medium' ? 'warning' : 'default'}
                            sx={{ height: 20, fontSize: 10, fontWeight: 700 }}
                          />
                        </TableCell>
                        <TableCell sx={{ color: tokens.slate }}>{gap.currentLevel}</TableCell>
                        <TableCell sx={{ color: tokens.tealDark, fontWeight: 600 }}>{gap.requiredLevel}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>
                          <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={0.5}>
                            <FiClock size={12} color={tokens.slate} />
                            <Typography variant="caption" sx={{ fontWeight: 700 }}>
                              {gap.estHours} hrs
                            </Typography>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}

          {/* AI Personalized Recommendations */}
          <Paper sx={{ p: 2.5, border: `1px solid ${tokens.line}`, borderRadius: 3, bgcolor: tokens.paper }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <FiZap size={20} color={tokens.teal} />
              <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 700, color: tokens.ink }}>
                Actionable AI Action Items & Next Steps
              </Typography>
            </Stack>
            <Grid container spacing={2}>
              {report.recommendations.map((rec, idx) => (
                <Grid item xs={12} sm={4} key={idx}>
                  <Paper sx={{ p: 2, border: `1px solid ${tokens.line}`, borderRadius: 2, bgcolor: '#ffffff', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                      <Chip label={rec.category} size="small" sx={{ bgcolor: 'rgba(15,157,140,0.1)', color: tokens.tealDark, fontSize: 10, fontWeight: 700 }} />
                      <Chip label={rec.priority} size="small" color={rec.priority === 'High' ? 'error' : 'warning'} sx={{ height: 18, fontSize: 9.5, fontWeight: 700 }} />
                    </Stack>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: tokens.ink, mb: 1, lineHeight: 1.3 }}>
                      {rec.title}
                    </Typography>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 'auto', pt: 1, borderTop: `1px dashed ${tokens.line}` }}>
                      <Typography variant="caption" sx={{ color: tokens.teal, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 0.3 }}>
                        <FiTrendingUp size={12} /> {rec.impact}
                      </Typography>
                      <Button size="small" variant="text" sx={{ p: 0, minWidth: 'auto', fontSize: 11, fontWeight: 700, color: accentColor }}>
                        {rec.actionText || 'Take Action'} →
                      </Button>
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>

          <Divider />

          {/* Report Footer Notice */}
          <Box sx={{ textAlign: 'center', color: tokens.slate }}>
            <Typography variant="caption" sx={{ fontSize: 11 }}>
              Report generated by SkillTrace AI Engine v3.4 · Model Accuracy Confidence {report.confidenceLevel || 95}%
            </Typography>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
