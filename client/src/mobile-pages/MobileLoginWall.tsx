import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const MobileLoginWall: React.FC = () => {
  const handleGoogleLogin = () => {
    localStorage.setItem('sage_wall_login', 'true');
    window.location.href = '/api/auth/google?redirect=/app';
  };
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-6">
      <img src="/SageDo_logo.png" alt="SAGE DO" className="w-24 h-24 mb-6" />
      <h1 className="text-white text-2xl font-bold mb-2">Welcome to SAGE DO</h1>
      <p className="text-gray-400 text-sm text-center mb-10">India's First AI + Human Hybrid Team</p>
      <button onClick={handleGoogleLogin} className="w-full bg-white text-gray-900 font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-3 mb-4 active:scale-95 transition-all">
        <img src="https://www.google.com/favicon.ico" className="w-5 h-5" />
        Continue with Google
      </button>
      <p className="text-gray-600 text-xs text-center mt-6">By continuing, you agree to our Terms and Privacy Policy</p>
    </div>
  );
};

export default MobileLoginWall;

