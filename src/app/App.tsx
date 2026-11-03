import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import HomePage from '../pages/HomePage';
import { contentRoutes, demoRoutes } from '../data/routes';
import {
  ContentPage,
  ContactFoundationPage,
  FaqPage,
  NotFoundPage,
  PendingDemoPage,
} from '../pages/FoundationPages';

const ProgramsPage = lazy(() => import('../pages/ProgramsPage'));
const ProgramDetailPage = lazy(() => import('../pages/ProgramDetailPage'));
const NoticesPage = lazy(() => import('../pages/NoticesPage'));
const NoticeDetailPage = lazy(() =>
  import('../pages/NoticesPage').then((m) => ({ default: m.NoticeDetailPage })),
);
const AboutPages = lazy(() => import('../pages/AboutPages'));
const AdmissionsPages = lazy(() => import('../pages/AdmissionsPages'));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        {contentRoutes.map((p) => (
          <Route
            key={p.path}
            path={p.path}
            element={
              p.path.startsWith('/gioi-thieu') ? (
                <AboutPages />
              ) : p.path.startsWith('/tuyen-sinh') ? (
                <AdmissionsPages />
              ) : (
                <ContentPage />
              )
            }
          />
        ))}
        {demoRoutes.map((p) => (
          <Route key={p.path} path={p.path} element={<PendingDemoPage />} />
        ))}
        <Route path="nganh-dao-tao" element={<ProgramsPage />} />
        <Route path="nganh-dao-tao/:slug" element={<ProgramDetailPage />} />
        <Route path="thong-bao" element={<NoticesPage />} />
        <Route path="thong-bao/:slug" element={<NoticeDetailPage />} />
        <Route path="tin-tuc/:slug" element={<NotFoundPage />} />
        <Route path="lien-he" element={<ContactFoundationPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
