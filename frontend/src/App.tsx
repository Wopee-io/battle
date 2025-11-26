import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LoginForm from "./components/LoginForm";
import ProtectedExample from "./components/ProtectedExample";

function Home() {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Welcome to Battle
      </h1>
      <p className="text-gray-600 mb-8">
        A full-stack web application skeleton
      </p>
      <div className="space-y-4 max-w-md mx-auto text-left bg-gray-50 p-6 rounded-lg">
        <h2 className="font-semibold text-lg">Quick Start</h2>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
          <li>Register a new account or login</li>
          <li>Access the dashboard to manage items</li>
          <li>API docs available at /docs</li>
        </ul>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="dashboard" element={<ProtectedExample />} />
      </Route>
    </Routes>
  );
}

export default App;
