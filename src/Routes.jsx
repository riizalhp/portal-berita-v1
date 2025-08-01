import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AdminDashboard from './pages/admin-dashboard';
import ArticleDetailPage from './pages/article-detail-page';
import ArticleEditor from './pages/article-editor';
import SearchResultsPage from './pages/search-results-page';
import CategoryListingPage from './pages/category-listing-page';
import Homepage from './pages/homepage';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/article-detail-page" element={<ArticleDetailPage />} />
        <Route path="/article-editor" element={<ArticleEditor />} />
        <Route path="/search-results-page" element={<SearchResultsPage />} />
        <Route path="/category-listing-page" element={<CategoryListingPage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
