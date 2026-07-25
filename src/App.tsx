import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/frontend/Home';
import Hizmetler from './pages/frontend/Hizmetler';
import HizmetDetay from './pages/frontend/HizmetDetay';
import Iletisim from './pages/frontend/Iletisim';
import Portfolyo from './pages/frontend/Portfolyo';
import PortfolyoDetay from './pages/frontend/PortfolyoDetay';
import Takimimiz from './pages/frontend/Takimimiz';
import Sss from './pages/frontend/Sss';
import Hakkimizda from './pages/frontend/Hakkimizda';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './layouts/AdminLayout';
import AdminSettings from './pages/admin/AdminSettings';
import AdminHome from './pages/admin/AdminHome';
import AdminAbout from './pages/admin/AdminAbout';
import AdminServices from './pages/admin/AdminServices';
import AdminTeam from './pages/admin/AdminTeam';
import AdminFaq from './pages/admin/AdminFaq';
import AdminPortfolio from './pages/admin/AdminPortfolio';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hizmetler" element={<Hizmetler />} />
        <Route path="/hizmetler/:slug" element={<HizmetDetay />} />
        <Route path="/iletisim" element={<Iletisim />} />
        <Route path="/portfolyo" element={<Portfolyo />} />
        <Route path="/portfolyo/:slug" element={<PortfolyoDetay />} />
        <Route path="/takimimiz" element={<Takimimiz />} />
        <Route path="/sss" element={<Sss />} />
        <Route path="/hakkimizda" element={<Hakkimizda />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminSettings />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="home" element={<AdminHome />} />
          <Route path="about" element={<AdminAbout />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="team" element={<AdminTeam />} />
          <Route path="faq" element={<AdminFaq />} />
          <Route path="portfolio" element={<AdminPortfolio />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
