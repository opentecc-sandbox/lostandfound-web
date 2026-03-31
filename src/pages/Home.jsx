import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ItemCard from '../components/ItemCard'; 
import api from "../api/api"; 

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api.get("/items");
        setItems(res.data.slice(0, 9)); 
        setLoading(false);
      } catch (err) {
        console.error("Error fetching items:", err);
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, { stiffness: 100, damping: 30 });
  const heroOpacity = useTransform(smoothY, [0, 400], [1, 0]);
  const heroScale = useTransform(smoothY, [0, 400], [1, 0.9]);

  return (
    <div className="min-h-screen bg-[#010101] text-white">
      <Navbar />
      
      {/* Hero Section */}
      <motion.header
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[75%] bg-linear-to-b from-[#7848d6]/85 via-[#010101] to-transparent blur-[120px] pointer-events-none z-10" />
        <div className="w-full max-w-7xl relative z-20">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[6vw] font-black leading-none tracking-[-0.05em] uppercase"
          >
            Welcome to <span className="text-[#7848d6]">Lost & Found</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-8 text-[0.9vw] text-slate-400 font-bold uppercase tracking-[0.3em] opacity-80"
          >
            Your trusted platform for reuniting lost items with their owners.
          </motion.p>
        </div>
      </motion.header>

      {/* Stats Section */}
      <section className="px-8 py-2 relative z-10 mb-80">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { val: "2,400+", label: "Items Found", color: "text-[#7848d6]" },
            { val: "892", label: "Returned", color: "text-[#FFD280]" },
            { val: "15K+", label: "Users", color: "text-emerald-400" },
            { val: "24/7", label: "Support", color: "text-sky-400" }
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group">
              <div className={`text-5xl md:text-7xl font-black mb-2 transition-transform group-hover:scale-110 ${stat.color}`}>{stat.val}</div>
              <div className="text-slate-500 text-sm md:text-base uppercase tracking-widest font-bold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Items Section */}
      <section className="px-8 md:px-16 py-32 bg-[#111111] relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-5xl md:text-6xl font-black text-center mb-16 tracking-tighter uppercase">
            Recently Reported
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {items.length > 0 ? (
              items.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))
            ) : (
              <div className="col-span-full py-32 text-center border-2 border-dashed border-white/5 rounded-[40px]">
                <p className="text-[#9a87ba] text-2xl font-black tracking-widest">
                  {loading ? "Loading items..." : "No items reported yet."}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="px-8 md:px-16 py-32 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-5xl md:text-6xl font-black text-center mb-16 tracking-tighter uppercase">Why LostFound?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard icon="📱" title="Quick Reports" desc="Instant listing with location tags and photos." />
            <FeatureCard icon="🔍" title="Smart Search" desc="Advanced matching using visual search tech." />
            <FeatureCard icon="🛡️" title="Verified" desc="Trust-first handover between community members." />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div whileHover={{ y: -10 }} className="text-center p-12 rounded-[40px] border border-white/5 hover:border-[#7848d6]/50 bg-[#111] transition-all group">
    <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500">{icon}</div>
    <h4 className="text-3xl font-black mb-4 uppercase tracking-tighter italic">{title}</h4>
    <p className="text-slate-500 leading-relaxed">{desc}</p>
  </motion.div>
);

export default Home;