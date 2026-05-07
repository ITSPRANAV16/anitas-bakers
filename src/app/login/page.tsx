"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login
    setTimeout(() => {
      setLoading(false);
      alert("Admin dashboard is currently under development in Next.js version.");
    }, 1000);
  };

  return (
    <>
      <Header />
      
      <main className="pt-32 pb-24 px-5 max-w-[500px] mx-auto min-h-screen flex items-center justify-center">
        <div className="w-full bg-white/5 border border-gold-main/20 rounded-2xl p-8 shadow-xl backdrop-blur-md">
          <h1 className="font-display text-4xl text-gold-main text-center mb-8">Admin Portal</h1>
          
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div>
              <label className="block text-sm text-text-secondary uppercase tracking-wider mb-2">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:border-gold-main focus:bg-gold-main/5 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm text-text-secondary uppercase tracking-wider mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:border-gold-main focus:bg-gold-main/5 outline-none transition-all"
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-4 mt-4">
              {loading ? "Authenticating..." : "Secure Login"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}
