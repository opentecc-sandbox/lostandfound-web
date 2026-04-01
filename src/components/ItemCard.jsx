import React from 'react';
import { motion } from 'framer-motion';

const ItemCard = ({ item }) => {
  const placeholder = 'https://media.istockphoto.com/id/1471425948/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?s=170667a&w=0&k=20&c=Tq41AqeDgGeaYRfRrD4yc6AqGPrVfdscVU3--1ZNiHg=';
  
  const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : 'https://lostandfound-api.onrender.com';

  // Hna kan-checkiw wach link jay mn bra (https) wala jayi mn l-backend dyalna
  const getImageUrl = () => {
    if (!item.photoUrl || item.photoUrl.trim() === "") {
      return placeholder;
    }
    if (item.photoUrl.startsWith('http')) {
      return item.photoUrl;
    }
    return `${API_URL}/${item.photoUrl}`;
  };
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-[#111]  m-2 p-6 rounded-3xl border border-white/5 overflow-hidden group transition-all hover:border-[#A180FF]/30"
    >
      <div className="h-80 bg-slate-900 relative rounded-2xl overflow-hidden">
        <img
          src={getImageUrl()}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
          alt={item.title}
          onError={(e) => { e.target.src = placeholder; }} 
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#111] via-transparent to-transparent"></div>
      </div>

      {/* Content Section */}
      <div className="mt-6 text-white px-2">
        <h4 className="text-4xl font-bold uppercase tracking-tight mb-4 text-[#9a87ba]">
          [{item.type}]  <span className="text-[#ffffff] mr-2">{item.title}</span> 
        </h4>

        {/* Info List - Hna dert koll haja f ster bohdha */}
        <div className="flex flex-col gap-3  text-gray-300  tracking-wide">
          <div className="flex items-center text-xl gap-2">
            <span className="text-[#9a87ba] font-bold">Category:</span> {item.category}
          </div>
          
          <div className="flex flex-col  text-2xl border-l-2 border-lavender/20 pl-3 my-2">
            <span className="text-xl text-gray-500 mb-1">Description:</span>
            <p className="normal-case italic text-gray-400 leading-relaxed">
              {item.description || "No description provided."}
            </p>
          </div>

          <div className="flex items-center text-2xl gap-2">
            <span className="text-[#9a87ba]">📍</span> {item.location}
          </div>

          <div className="flex items-center text-xl gap-2">
            <span className="text-[#9a87ba]">📅</span> {new Date(item.createdAt).toLocaleDateString()}
          </div>

          <div className="mt-4 p-3 bg-white/5 rounded-lg text-xl border border-white/10">
            <span className="   text-gray-500 font-black mb-1">CONTACT INFO:   </span>
            <span className="text-white lowercase">  {item.contactInfo}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ItemCard;