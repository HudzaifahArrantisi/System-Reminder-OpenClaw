import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";

import CoursesPage from "./pages/CoursesPage";
import CourseDetail from "./pages/CourseDetail";
import PertemuanDetail from "./pages/PertemuanDetail";
import DosenDashboard from "./pages/DosenDashboard";
import MahasiswaDashboard from "./pages/MahasiswaDashboard";
import SubmissionFormPage from "./pages/SubmissionFormPage";
import { useAuth } from "./context/AuthContext";

function RoleRoute({ role, children }: { role: "dosen" | "mahasiswa"; children: JSX.Element }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role) return <Navigate to={`/${user.role}`} replace />;
  return children;
}

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="app-loading">
        <span className="app-loading__mark">⬡</span>
        <span className="app-loading__text">OpenClaw</span>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={user ? <Navigate to={`/${user.role}`} replace /> : <Login />}
        />
        {/* Legacy /auth redirect */}
        <Route path="/auth" element={<Navigate to="/login" replace />} />

        {/* Protected */}
        <Route element={<Layout />}>
          <Route path="/dosen" element={<RoleRoute role="dosen"><DosenDashboard /></RoleRoute>} />
          <Route path="/dosen/courses" element={<RoleRoute role="dosen"><CoursesPage /></RoleRoute>} />
          <Route path="/dosen/courses/:courseId" element={<RoleRoute role="dosen"><CourseDetail /></RoleRoute>} />
          <Route path="/dosen/pertemuan/:pertemuanId" element={<RoleRoute role="dosen"><PertemuanDetail /></RoleRoute>} />

          <Route path="/mahasiswa" element={<RoleRoute role="mahasiswa"><MahasiswaDashboard /></RoleRoute>} />
          <Route path="/mahasiswa/courses" element={<RoleRoute role="mahasiswa"><CoursesPage /></RoleRoute>} />
          <Route path="/mahasiswa/courses/:courseId" element={<RoleRoute role="mahasiswa"><CourseDetail /></RoleRoute>} />
          <Route path="/mahasiswa/pertemuan/:pertemuanId" element={<RoleRoute role="mahasiswa"><PertemuanDetail /></RoleRoute>} />
          <Route path="/mahasiswa/pengumpulan/:tugasId" element={<RoleRoute role="mahasiswa"><SubmissionFormPage /></RoleRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}