import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import SplashScreen from "./components/Splashscreen";
import ClassPage from "./pages/ClassPage";
import LandingPage from "./pages/LandingPage";
import ModulePage from "./pages/ModulePage";

const NotFound = () => (
  <div className="page-shell">
    <div className="page-panel flex items-center justify-center px-6 text-center fade-in">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-700">404</p>
        <h1 className="mt-3 text-4xl font-extrabold text-slate-900">Page not found</h1>
        <p className="mt-2 text-slate-600">The lesson you are looking for does not exist.</p>
      </div>
    </div>
  </div>
);

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <SplashScreen onFinish={() => setLoading(false)} />}
      {!loading && (
        <>
          <Navbar />
          <main className="pt-[72px] min-h-screen">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/class/:id" element={<ClassPage />} />
              <Route path="/class/:id/module/:moduleId" element={<ModulePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </>
      )}
    </>
  );
}
