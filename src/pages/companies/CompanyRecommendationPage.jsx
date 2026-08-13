import { useState, useEffect, useMemo, useCallback } from 'react';
import { Box, Typography, Stack, Grid, Snackbar, Alert, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getCompanyRecommendations,
  getSavedCompanyIds,
  saveCompanyIdsToStorage,
} from '../../services/companyService';

import AIRecommendationSummary from '../../components/company/AIRecommendationSummary';
import CompanySearch from '../../components/company/CompanySearch';
import CompanyFilters from '../../components/company/CompanyFilters';
import CompanySortControl from '../../components/company/CompanySortControl';
import CompanyCard from '../../components/company/CompanyCard';
import CompanyDetailsModal from '../../components/company/CompanyDetailsModal';
import CompanySkeleton from '../../components/company/CompanySkeleton';
import EmptyState from '../../components/company/EmptyState';

export default function CompanyRecommendationPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('recommended');
  const [savedOnly, setSavedOnly] = useState(false);
  const [savedCompanyIds, setSavedCompanyIds] = useState(() => getSavedCompanyIds());

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ companies: [], totalCount: 0, matchedCount: 0, studentProfile: null });
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [toast, setToast] = useState({ open: false, message: '', severity: 'info' });

  // Sync saved IDs to localStorage whenever they change
  useEffect(() => {
    saveCompanyIdsToStorage(savedCompanyIds);
  }, [savedCompanyIds]);

  // Fetch recommendations with simulated backend delay
  const loadRecommendations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getCompanyRecommendations({
        search: searchQuery,
        typeFilter: activeFilter,
        sortBy,
        savedOnly,
        savedIds: savedCompanyIds,
      });
      setData(res);
    } catch (err) {
      console.error('Failed to load company recommendations', err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, activeFilter, sortBy, savedOnly, savedCompanyIds]);

  useEffect(() => {
    loadRecommendations();
  }, [loadRecommendations]);

  const handleToggleSave = (companyId) => {
    setSavedCompanyIds((prev) => {
      const isAlreadySaved = prev.includes(companyId);
      const updated = isAlreadySaved ? prev.filter((id) => id !== companyId) : [...prev, companyId];

      const comp = data.companies.find((c) => c.id === companyId);
      const compName = comp ? comp.name : 'Company';

      setToast({
        open: true,
        message: isAlreadySaved ? `${compName} removed from saved shortlist.` : `${compName} saved to shortlist!`,
        severity: isAlreadySaved ? 'info' : 'success',
      });

      return updated;
    });
  };

  const handleViewDetails = (company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCompany(null);
  };

  const handleApplyCompany = (company) => {
    setToast({
      open: true,
      message: `Application dispatched to ${company.name} engineering team!`,
      severity: 'success',
    });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveFilter('All');
    setSortBy('recommended');
    setSavedOnly(false);
  };

  const isFiltered = useMemo(() => {
    return Boolean(searchQuery || activeFilter !== 'All' || savedOnly || sortBy !== 'recommended');
  }, [searchQuery, activeFilter, savedOnly, sortBy]);

  return (
    <Box sx={{ pb: 6 }}>
      {/* Page Title & Subtitle Header */}
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { sm: 'flex-end' },
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.4 }}>
            Company Recommendations
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            AI-driven company matching based on your skill matrix, portfolio tier, and placement readiness.
          </Typography>
        </Box>

        <CompanySortControl value={sortBy} onChange={setSortBy} />
      </Box>

      {/* Module 10 AI Recommendation Summary Widget */}
      {data.studentProfile && (
        <AIRecommendationSummary
          profile={data.studentProfile}
          matchedCount={data.matchedCount}
        />
      )}

      {/* Interactive Search Bar */}
      <CompanySearch
        value={searchQuery}
        onChange={setSearchQuery}
        onSelectSuggestion={(tag) => setSearchQuery(tag)}
      />

      {/* Category Pills & Saved Toggle Bar */}
      <CompanyFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        savedOnly={savedOnly}
        onToggleSavedOnly={setSavedOnly}
        savedCount={savedCompanyIds.length}
        onResetFilters={handleResetFilters}
        isFiltered={isFiltered}
      />

      {/* Results Header Count */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary' }}>
          Showing {data.companies.length} {data.companies.length === 1 ? 'Company' : 'Companies'}{' '}
          {savedOnly && '(Saved Shortlist)'}
        </Typography>
      </Stack>

      {/* Main Companies Grid / Skeletons / Empty State */}
      {loading ? (
        <CompanySkeleton count={6} />
      ) : data.companies.length === 0 ? (
        <EmptyState
          onReset={handleResetFilters}
          search={searchQuery}
          typeFilter={activeFilter}
          savedOnly={savedOnly}
        />
      ) : (
        <Grid container spacing={2.5}>
          <AnimatePresence mode="popLayout">
            {data.companies.map((company) => {
              const isSaved = savedCompanyIds.includes(company.id);
              return (
                <Grid key={company.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                  <CompanyCard
                    company={company}
                    isSaved={isSaved}
                    onToggleSave={handleToggleSave}
                    onViewDetails={handleViewDetails}
                  />
                </Grid>
              );
            })}
          </AnimatePresence>
        </Grid>
      )}

      {/* Company Details Modal */}
      {selectedCompany && (
        <CompanyDetailsModal
          company={selectedCompany}
          open={isModalOpen}
          onClose={handleCloseModal}
          isSaved={savedCompanyIds.includes(selectedCompany.id)}
          onToggleSave={handleToggleSave}
          onApply={handleApplyCompany}
        />
      )}

      {/* Notification Toast */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3500}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setToast((prev) => ({ ...prev, open: false }))}
          severity={toast.severity}
          variant="filled"
          sx={{ borderRadius: 2.5, fontWeight: 600 }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
