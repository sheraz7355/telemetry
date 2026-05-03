import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Safety from './pages/Safety';
import History from './pages/History';
import Logs from './pages/Logs';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="admin" element={<Admin />} />
          <Route path="safety" element={<Safety />} />
          <Route path="history" element={<History />} />
          <Route path="logs" element={<Logs />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;