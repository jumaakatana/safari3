import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Star, Calendar, Users, ArrowRight, Compass, Wind, Thermometer, CloudRain, X, Loader2, CheckCircle2 } from 'lucide-react';
import { generateSafariItinerary } from '../services/gemini';
import { cn } from '../lib/utils';

interface SafariHomeProps {
  searchQuery?: string;
}

export const SafariHome: React.FC<SafariHomeProps> = ({ searchQuery = '' }) => {
  const [selectedDest, setSelectedDest] = useState<any>(null);
  const [itinerary, setItinerary] = useState<any>(null);
  const [loadingItinerary, setLoadingItinerary] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const destinations = [
    {
      id: 1,
      title: 'The Great Migration',
      location: 'Serengeti, Tanzania',
      rating: 4.9,
      price: '$4,200',
      tag: 'Limited Availability',
      category: 'Migration',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1200',
    },
    {
      id: 2,
      title: 'Elephant Sanctuary',
      location: 'Amboseli, Kenya',
      rating: 4.8,
      price: '$3,150',
      tag: 'Family Favorite',
      category: 'Wildlife',
      image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&q=80&w=1200',
    },
    {
      id: 3,
      title: 'Okavango Delta Float',
      location: 'Moremi, Botswana',
      rating: 5.0,
      price: '$5,800',
      tag: 'Ultra Luxury',
      category: 'Luxury',
      image: 'https://images.unsplash.com/photo-1534171472159-edb6d1e0b63c?auto=format&fit=crop&q=80&w=1200',
    },
    {
      id: 4,
      title: 'Kruger Night Drive',
      location: 'Kruger, South Africa',
      rating: 4.7,
      price: '$2,800',
      tag: 'Adventure',
      category: 'Adventure',
      image: 'https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?auto=format&fit=crop&q=80&w=1200',
    },
  ];

  const filteredDestinations = destinations.filter(dest => {
    const matchesFilter = activeFilter === 'All' || dest.category === activeFilter;
    const matchesSearch = dest.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         dest.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleViewItinerary = async (dest: any) => {
    setSelectedDest(dest);
    setLoadingItinerary(true);
    setItinerary(null);
    try {
      const data = await generateSafariItinerary(dest.title, "5 days");
      setItinerary(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingItinerary(false);
    }
  };

  const [showLiveCam, setShowLiveCam] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBooking = () => {
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedDest(null);
      setItinerary(null);
    }, 3000);
  };

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] rounded-[3rem] overflow-hidden group">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=2400" 
          alt="Safari Hero" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
        
        <div className="absolute inset-0 p-12 lg:p-20 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-brand-accent" />
              <span className="text-brand-accent text-xs font-bold tracking-[0.4em] uppercase">Private Reserve Collection</span>
            </div>
            <h1 className="text-7xl lg:text-9xl font-serif text-white leading-[0.9] mb-8">
              The Art of <br /> <span className="italic text-brand-accent">Wilderness</span>
            </h1>
            <p className="text-slate-300 text-lg lg:text-xl max-w-lg leading-relaxed mb-12">
              Bespoke expeditions curated for the discerning traveler. Experience the untamed beauty of Africa in unparalleled luxury.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <button 
                onClick={() => document.getElementById('destinations-grid')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-black px-10 py-5 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-brand-accent hover:text-white transition-all duration-500 shadow-2xl shadow-white/10"
              >
                Explore Collection
              </button>
              <button 
                onClick={() => setShowLiveCam(true)}
                className="glass-pill px-10 py-5 flex items-center gap-3 hover:bg-white/10 transition-all group"
              >
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="group-hover:text-emerald-400 transition-colors">Live Wildlife Cam</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Weather Widget */}
        <div className="absolute top-12 right-12 hidden xl:block">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-black/40 backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] w-80 cursor-default"
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-slate-400 text-[10px] font-bold tracking-widest uppercase mb-1">Current Conditions</p>
                <h3 className="text-2xl font-bold">Maasai Mara</h3>
              </div>
              <CloudRain className="w-8 h-8 text-brand-accent animate-float" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-500">
                  <Thermometer className="w-3 h-3" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Temp</span>
                </div>
                <p className="text-xl font-bold">28°C</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-500">
                  <Wind className="w-3 h-3" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Wind</span>
                </div>
                <p className="text-xl font-bold">12 km/h</p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-[10px] text-slate-400 leading-relaxed italic">
                "Excellent visibility today. Large herd of elephants spotted near the Mara River crossing."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section id="destinations-grid" className="px-4">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-brand-accent" />
              <span className="text-brand-accent text-[10px] font-bold tracking-[0.3em] uppercase">Seasonal Highlights</span>
            </div>
            <h2 className="text-5xl font-serif">Curated Expeditions</h2>
          </div>
          
          {/* Interactive Filters */}
          <div className="flex flex-wrap gap-3">
            {['All', 'Migration', 'Wildlife', 'Luxury', 'Adventure'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-300 border",
                  activeFilter === filter 
                    ? "bg-white text-black border-white" 
                    : "bg-transparent text-slate-500 border-white/10 hover:border-white/30 hover:text-white"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredDestinations.map((dest, i) => (
              <motion.div 
                key={dest.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group cursor-pointer"
                onClick={() => handleViewItinerary(dest)}
              >
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-8">
                  <img 
                    src={dest.image} 
                    alt={dest.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase">
                      {dest.tag}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                    <button className="w-full py-4 bg-white text-black rounded-full font-bold text-xs tracking-widest uppercase hover:bg-brand-accent hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500">
                      View Itinerary
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-3 h-3 text-brand-accent" />
                      <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">{dest.location}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-1 group-hover:text-brand-accent transition-colors">{dest.title}</h3>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star key={star} className={cn("w-3 h-3", star <= Math.floor(dest.rating) ? "text-brand-accent fill-current" : "text-slate-700")} />
                      ))}
                      <span className="text-[10px] font-bold text-slate-500 ml-2">{dest.rating} (120 Reviews)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-1">Starting From</p>
                    <p className="text-2xl font-bold text-white">{dest.price}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Itinerary Modal */}
      <AnimatePresence>
        {selectedDest && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDest(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-brand-surface rounded-[3rem] overflow-hidden border border-white/10 max-h-[90vh] flex flex-col"
            >
              <button 
                onClick={() => setSelectedDest(null)}
                className="absolute top-8 right-8 z-10 p-3 bg-black/50 hover:bg-white hover:text-black rounded-full transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 h-full overflow-y-auto lg:overflow-hidden">
                <div className="relative h-64 lg:h-full">
                  <img 
                    src={selectedDest.image} 
                    alt={selectedDest.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-transparent lg:bg-gradient-to-r" />
                  <div className="absolute bottom-8 left-8 lg:bottom-12 lg:left-12">
                    <h2 className="text-4xl lg:text-6xl font-serif text-white mb-2">{selectedDest.title}</h2>
                    <p className="text-brand-accent font-bold tracking-widest uppercase text-sm">{selectedDest.location}</p>
                  </div>
                </div>

                <div className="p-8 lg:p-16 overflow-y-auto bg-brand-surface">
                  {loadingItinerary ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-20">
                      <Loader2 className="w-12 h-12 text-brand-accent animate-spin mb-6" />
                      <h3 className="text-2xl font-serif mb-2">Curating Your Expedition</h3>
                      <p className="text-slate-500 max-w-xs">Savanna AI is analyzing migration patterns and reserve availability...</p>
                    </div>
                  ) : itinerary ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-10"
                    >
                      <div>
                        <h3 className="text-brand-accent text-xs font-bold tracking-[0.3em] uppercase mb-4">The Experience</h3>
                        <h4 className="text-3xl font-serif mb-6">{itinerary.tripName}</h4>
                        
                        <div className="space-y-8">
                          {itinerary?.days?.map((day: any) => (
                            <div key={day.day} className="flex gap-6 group">
                              <div className="flex flex-col items-center">
                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold group-hover:bg-brand-accent group-hover:text-white transition-all">
                                  0{day.day}
                                </div>
                                <div className="flex-1 w-[1px] bg-white/10 my-2" />
                              </div>
                              <div className="pb-8">
                                <p className="text-slate-500 text-[10px] font-bold tracking-widest uppercase mb-1">{day.location}</p>
                                <h5 className="text-lg font-bold mb-3">{day.activity}</h5>
                                <div className="flex flex-wrap gap-2">
                                  {day?.highlights?.map((h: string, i: number) => (
                                    <span key={i} className="text-[10px] bg-white/5 px-3 py-1 rounded-full text-slate-400">
                                      {h}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-8 border-t border-white/10">
                        <h3 className="text-brand-accent text-xs font-bold tracking-[0.3em] uppercase mb-6">Essential Packing</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {itinerary?.packingList?.map((item: string, i: number) => (
                            <div key={i} className="flex items-center gap-3 text-sm text-slate-400">
                              <CheckCircle2 className="w-4 h-4 text-brand-accent" />
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>

                      <button 
                        onClick={handleBooking}
                        disabled={bookingSuccess}
                        className={cn(
                          "w-full py-5 rounded-full font-bold text-sm tracking-widest uppercase transition-all shadow-2xl",
                          bookingSuccess 
                            ? "bg-emerald-500 text-white shadow-emerald-500/20" 
                            : "bg-white text-black hover:bg-brand-accent hover:text-white shadow-white/10"
                        )}
                      >
                        {bookingSuccess ? (
                          <div className="flex items-center justify-center gap-3">
                            <CheckCircle2 className="w-5 h-5" />
                            Reservation Confirmed
                          </div>
                        ) : "Confirm Private Booking"}
                      </button>
                    </motion.div>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Live Cam Modal */}
      <AnimatePresence>
        {showLiveCam && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLiveCam(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-6xl aspect-video bg-black rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl"
            >
              <button 
                onClick={() => setShowLiveCam(false)}
                className="absolute top-8 right-8 z-10 p-3 bg-black/50 hover:bg-white hover:text-black rounded-full transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="absolute top-8 left-8 z-10 flex items-center gap-4">
                <div className="bg-red-600 px-4 py-1.5 rounded-md flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold tracking-widest uppercase">Live</span>
                </div>
                <div className="glass-pill px-4 py-1.5 text-[10px] font-bold tracking-widest uppercase">
                  Maasai Mara • Satellite Link 04
                </div>
              </div>

              <img 
                src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=2400" 
                alt="Live Cam" 
                className="w-full h-full object-cover opacity-80"
              />
              
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full border-[40px] border-black/20" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-white/20 rounded-full flex items-center justify-center">
                  <div className="w-1 h-1 bg-white rounded-full" />
                </div>
              </div>

              <div className="absolute bottom-8 left-8 right-8 z-10 flex justify-between items-end">
                <div className="space-y-2">
                  <p className="text-white font-bold text-xl">Waterhole Observation Point</p>
                  <p className="text-slate-400 text-sm">Visibility: High • Activity: Moderate</p>
                </div>
                <div className="flex gap-4">
                  <div className="text-right">
                    <p className="text-slate-500 text-[10px] font-bold tracking-widest uppercase">Signal Strength</p>
                    <div className="flex gap-1 mt-1">
                      {[1, 2, 3, 4].map(i => <div key={i} className="w-1 h-3 bg-emerald-500 rounded-full" />)}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Experience Stats */}
      <section className="bg-brand-surface rounded-[4rem] p-16 lg:p-24 border border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {[
            { label: 'Private Reserves', value: '42', suffix: '+' },
            { label: 'Species Protected', value: '150', suffix: '+' },
            { label: 'Expert Guides', value: '85', suffix: '' },
            { label: 'Guest Satisfaction', value: '99', suffix: '%' },
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center space-y-4"
            >
              <p className="text-slate-500 text-[10px] font-bold tracking-[0.3em] uppercase">{stat.label}</p>
              <h4 className="text-6xl font-serif text-white">
                {stat.value}<span className="text-brand-accent">{stat.suffix}</span>
              </h4>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
