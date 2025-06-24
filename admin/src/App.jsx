import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './views/auth/Login';
import MainLayout from './views/MainLayout';
import Dashboard from './views/Dashboard';
import Success from './views/auth/Success';
import CodeVerification from './views/auth/CodeVerification';
import PhoneVerification from './views/auth/PhoneVerification';
import EmailVerification from './views/auth/EmailVerification';
import TwoFactorAuth from './views/auth/TwoFactorAuth';
import Pending from './views/pending/Pending';
import ViewPending from './views/pending/ViewPending';
import UserManagement from './views/user-management/UserManagement';
import ClubCards from './views/cards/ClubCards';
import CMS from './views/cms/CMS';
import Events from './views/events/Events';
import News from './views/news/News';
import Ask from './views/ask/Ask';
import Help from './views/help/Help';
import Support from './views/support/Support';
import Finance from './views/finance/Finance';
import Admins from './views/admins/Admins';
import Settings from './views/settings/Settings';
import AdminProfile from './views/profile/AdminProfile';
import ForgotPassword from './views/auth/ForgotPassword/ForgotPassword';
import ResetSuccess from './views/auth/ForgotPassword/ResetSuccess';
import ResetPassword from './views/auth/ForgotPassword/ResetPassword';
import PagePreview from './views/cms/PreviewPage';
import PageSystemPreview from './views/cms/PreviewSystemPage';
import AffiliatePartners from './views/affiliate/AffiliatePartners';
import axios from 'axios';
import Layout from './views/Layout';

axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: 'two-factor-auth',
        element: <TwoFactorAuth />,
      },
      {
        path: 'email-verification',
        element: <EmailVerification />,
      },
      {
        path: 'phone-verification',
        element: <PhoneVerification />,
      },
      {
        path: 'code-verification',
        element: <CodeVerification />,
      },
      {
        path: 'success',
        element: <Success />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      { path: 'reset-password', element: <ResetPassword /> },
      { path: 'reset-success', element: <ResetSuccess /> },
    ],
  },
  {
    path: '/admin',
    element: <MainLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'pending', element: <Pending /> },
      { path: 'view-pending', element: <ViewPending /> },
      { path: 'users', element: <UserManagement /> },
      { path: 'cards', element: <ClubCards /> },
      { path: 'cms', element: <CMS /> },
      { path: 'cms/preview', element: <PagePreview /> },
      { path: 'cms/preview-system', element: <PageSystemPreview /> },
      { path: 'affiliate-partners', element: <AffiliatePartners /> },
      { path: 'events', element: <Events /> },
      { path: 'news', element: <News /> },
      { path: 'asks', element: <Ask /> },
      { path: 'help', element: <Help /> },
      { path: 'support', element: <Support /> },
      { path: 'finance', element: <Finance /> },
      { path: 'admins', element: <Admins /> },
      { path: 'settings', element: <Settings /> },
      { path: 'profile', element: <AdminProfile /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
