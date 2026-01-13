
import React from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Symptoms from './pages/Symptoms';
import HealthRecords from './pages/HealthRecords';
import Timeline from './pages/Timeline';
import Community from './pages/Community';
import DailyCheckIn from './pages/DailyCheckIn';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import ChatBot from './pages/ChatBot';
import Login from './pages/Login';
import Register from './pages/Register';
import TopicDetail from './pages/TopicDetail';
import ArticleDetail from './pages/ArticleDetail';
import PostComment from './pages/PostComment';
import SearchContent from './pages/SearchContent';
import PostInsight from './pages/PostInsight';
import DataAuthorization from './pages/DataAuthorization';
import PrivacySecurity from './pages/PrivacySecurity';
import FamilyManagement from './pages/FamilyManagement';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: '首页', icon: 'grid_view', path: '/' },
    { label: '档案', icon: 'personal_injury', path: '/records' },
    { label: '分析', icon: 'biotech', path: '/symptoms' },
    { label: '社区', icon: 'diversity_3', path: '/community' },
    { label: '我', icon: 'person', path: '/profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto bg-surface-light dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800 pb-6 pt-3 px-2 flex justify-around items-center shadow-lg transition-colors">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path || (item.path === '/profile' && location.pathname === '/edit-profile');
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center gap-1 transition-colors flex-1 ${
              isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <span className={`material-symbols-outlined text-[24px] ${isActive ? 'fill-current' : ''}`}>
              {item.icon}
            </span>
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  // Hide bottom nav and FAB on detail/search/posting pages for a cleaner mobile experience
  const isDetailPage = 
    location.pathname.startsWith('/topic/') || 
    location.pathname.startsWith('/article/') || 
    location.pathname === '/comment' ||
    location.pathname === '/search' ||
    location.pathname === '/post-insight' ||
    location.pathname === '/data-auth' ||
    location.pathname === '/privacy-security' ||
    location.pathname === '/family-management';

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col max-w-md mx-auto bg-background-light dark:bg-background-dark shadow-2xl overflow-hidden">
      <div className={`flex-1 overflow-y-auto ${(!isAuthPage && !isDetailPage) ? 'pb-24' : ''}`}>
        {children}
      </div>
      {!isAuthPage && !isDetailPage && <BottomNav />}
      {/* AI Chat FAB */}
      {!isAuthPage && !isDetailPage && location.pathname !== '/chat' && (
        <button 
          onClick={() => window.location.hash = '#/chat'}
          className="fixed bottom-28 right-6 z-40 bg-primary text-white size-14 rounded-full shadow-xl shadow-primary/40 flex items-center justify-center hover:scale-105 transition-transform"
        >
          <span className="material-symbols-outlined text-3xl">smart_toy</span>
        </button>
      )}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/symptoms" element={<Symptoms />} />
          <Route path="/records" element={<HealthRecords />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/community" element={<Community />} />
          <Route path="/search" element={<SearchContent />} />
          <Route path="/topic/:id" element={<TopicDetail />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="/comment" element={<PostComment />} />
          <Route path="/post-insight" element={<PostInsight />} />
          <Route path="/data-auth" element={<DataAuthorization />} />
          <Route path="/privacy-security" element={<PrivacySecurity />} />
          <Route path="/family-management" element={<FamilyManagement />} />
          <Route path="/daily" element={<DailyCheckIn />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/chat" element={<ChatBot />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
