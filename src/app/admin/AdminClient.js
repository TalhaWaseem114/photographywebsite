"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Camera, 
  DollarSign, 
  BookOpen, 
  MessageSquare, 
  Award, 
  Search, 
  Plus, 
  Trash, 
  Check, 
  X, 
  RefreshCw, 
  Layers, 
  Settings, 
  Command, 
  Smartphone, 
  Laptop, 
  CornerDownLeft,
  MapPin,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Eye,
  Heart,
  Mail
} from "lucide-react";

// Static default imports for fallback seeding
import { PORTFOLIO_ITEMS } from "../../data/portfolioData";
import { SESSION_PACKAGES, PRICING_CONFIG } from "../../data/servicesData";
import { TESTIMONIAL_ITEMS } from "../../data/testimonialsData";
import { JOURNAL_POSTS } from "../../data/journalData";
import { FEATURED_COMMISSIONS, CLIENTS, EXHIBITIONS, AWARDS, SERVICES } from "../../data/experienceData";
import { db, auth } from "@/lib/firebase";
import { collection, onSnapshot, doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";

export default function AdminClient() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Firebase Auth states
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [authError, setAuthError] = useState("");
  
  // Data States
  const [portfolio, setPortfolio] = useState([]);
  const [packages, setPackages] = useState([]);
  const [pricingConfig, setPricingConfig] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [pendingTestimonials, setPendingTestimonials] = useState([]);
  const [journals, setJournals] = useState([]);
  const [commissions, setCommissions] = useState([]);
  const [clients, setClients] = useState([]);
  const [exhibitions, setExhibitions] = useState([]);
  const [awards, setAwards] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [newsletterSubs, setNewsletterSubs] = useState([]);

  // UI states for Inquiries
  const [inquirySubTab, setInquirySubTab] = useState("detailed"); // detailed | newsletter
  const [inquiryViewMode, setInquiryViewMode] = useState("cards"); // table | cards
  const [selectedInquiryModal, setSelectedInquiryModal] = useState(null);
  
  // UI states
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [cmdQuery, setCmdQuery] = useState("");
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedJournal, setSelectedJournal] = useState(null);

  // Journal creation states
  const [showAddJournal, setShowAddJournal] = useState(false);
  const [newJournalData, setNewJournalData] = useState({
    title: "",
    type: "essay",
    chapter: "CHAPTER I",
    readTime: "4 Min Read",
    subtitle: "",
    coverImage: "",
    excerpt: "",
    location: "",
    camera: "Sony A7R V",
    lens: "24-70mm f/2.8 GM II",
    chaptersText: "",
    reflection: "",
    exif: {
      aperture: "f/8.0",
      shutter: "1/125s",
      iso: "ISO 100",
      focal: "50mm"
    }
  });
  
  // Form add-state helpers
  const [newSlideUrl, setNewSlideUrl] = useState("");
  const [newComment, setNewComment] = useState({ name: "", text: "" });

  // Portfolio creation states
  const [showAddPortfolio, setShowAddPortfolio] = useState(false);
  const [newPortfolioData, setNewPortfolioData] = useState({
    title: "",
    category: "Portrait",
    location: "",
    camera: "",
    desc: "",
    slides: [""]
  });

  // Package creation states
  const [showAddPackage, setShowAddPackage] = useState(false);
  const [newPackageData, setNewPackageData] = useState({
    title: "",
    desc: "",
    basePrice: 10000,
    baseHours: 2,
    deliverables: "",
    timeline: "7-10 Days Turnaround"
  });
  
  // Alert logs
  const [saveAlert, setSaveAlert] = useState(null);

  // Command Menu references
  const cmdRef = useRef(null);

  // Real-time Firestore sync and initial seeding
  useEffect(() => {
    setMounted(true);

    const unsubscribers = [
      // 1. Portfolio items
      onSnapshot(collection(db, "portfolio_items"), (snapshot) => {
        if (snapshot.empty) {
          PORTFOLIO_ITEMS.forEach(async (item) => {
            const initial = {
              ...item,
              slides: item.slides || [item.src],
              likes: item.likes || Math.floor(Math.random() * 30) + 5,
              comments: item.comments || [
                { name: "Aisha Khan", text: "Stunning light gradients!", date: "2 days ago" }
              ]
            };
            await setDoc(doc(db, "portfolio_items", item.id), initial);
          });
        } else {
          setPortfolio(snapshot.docs.map(d => d.data()));
        }
      }),

      // 2. Session packages
      onSnapshot(collection(db, "session_packages"), (snapshot) => {
        if (snapshot.empty) {
          SESSION_PACKAGES.forEach(async (item) => {
            await setDoc(doc(db, "session_packages", item.id), item);
          });
        } else {
          setPackages(snapshot.docs.map(d => d.data()));
        }
      }),

      // 3. Pricing configuration
      onSnapshot(doc(db, "pricing_config", "current"), (docSnap) => {
        if (!docSnap.exists()) {
          setDoc(doc(db, "pricing_config", "current"), PRICING_CONFIG);
        } else {
          setPricingConfig(docSnap.data());
        }
      }),

      // 4. Testimonials approved
      onSnapshot(collection(db, "testimonials_items"), (snapshot) => {
        if (snapshot.empty) {
          TESTIMONIAL_ITEMS.forEach(async (item) => {
            await setDoc(doc(db, "testimonials_items", item.id), item);
          });
        } else {
          setTestimonials(snapshot.docs.map(d => d.data()));
        }
      }),

      // 5. Pending Testimonials
      onSnapshot(collection(db, "pending_testimonials_items"), (snapshot) => {
        setPendingTestimonials(snapshot.docs.map(d => d.data()));
      }),

      // 6. Journal posts
      onSnapshot(collection(db, "journal_posts"), (snapshot) => {
        if (snapshot.empty) {
          JOURNAL_POSTS.forEach(async (post) => {
            const initial = {
              ...post,
              likes: post.likes || Math.floor(Math.random() * 20) + 5,
              comments: post.comments || [
                { name: "Sikandar Shah", text: "Magnificent photographic details!", date: "Yesterday" }
              ]
            };
            await setDoc(doc(db, "journal_posts", post.id), initial);
          });
        } else {
          setJournals(snapshot.docs.map(d => d.data()));
        }
      }),

      // 7. Experience Commissions
      onSnapshot(collection(db, "experience_commissions"), (snapshot) => {
        if (snapshot.empty) {
          FEATURED_COMMISSIONS.forEach(async (item) => {
            await setDoc(doc(db, "experience_commissions", item.id), item);
          });
        } else {
          setCommissions(snapshot.docs.map(d => d.data()));
        }
      }),

      // 8. Experience Clients
      onSnapshot(collection(db, "experience_clients"), (snapshot) => {
        if (snapshot.empty) {
          CLIENTS.forEach(async (item) => {
            await setDoc(doc(db, "experience_clients", item.id), item);
          });
        } else {
          setClients(snapshot.docs.map(d => d.data()));
        }
      }),

      // 9. Experience Exhibitions
      onSnapshot(collection(db, "experience_exhibitions"), (snapshot) => {
        if (snapshot.empty) {
          EXHIBITIONS.forEach(async (item) => {
            await setDoc(doc(db, "experience_exhibitions", item.id), item);
          });
        } else {
          setExhibitions(snapshot.docs.map(d => d.data()));
        }
      }),

      // 10. Experience Awards
      onSnapshot(collection(db, "experience_awards"), (snapshot) => {
        if (snapshot.empty) {
          AWARDS.forEach(async (item) => {
            await setDoc(doc(db, "experience_awards", item.id), item);
          });
        } else {
          setAwards(snapshot.docs.map(d => d.data()));
        }
      }),

      // 11. Contact Inquiries
      onSnapshot(collection(db, "contact_submissions_items"), (snapshot) => {
        setInquiries(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      }),

      // 12. Newsletter Subscribers
      onSnapshot(collection(db, "email_subscriptions_items"), (snapshot) => {
        setNewsletterSubs(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      }),

      // 13. Auth listener
      onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setAuthLoading(false);
      })
    ];

    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setCmdOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      unsubscribers.forEach(unsub => unsub());
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch (err) {
      console.error(err);
      setAuthError("Authentication failed. Please verify your admin credentials.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  const resetToFactoryDefaults = async () => {
    if (confirm("Are you sure you want to reset all modifications to Hanzala's default database data?")) {
      // Overwrite Firestore collections with static defaults
      PORTFOLIO_ITEMS.forEach(async (item) => {
        await setDoc(doc(db, "portfolio_items", item.id), item);
      });
      SESSION_PACKAGES.forEach(async (item) => {
        await setDoc(doc(db, "session_packages", item.id), item);
      });
      await setDoc(doc(db, "pricing_config", "current"), PRICING_CONFIG);
      TESTIMONIAL_ITEMS.forEach(async (item) => {
        await setDoc(doc(db, "testimonials_items", item.id), item);
      });
      JOURNAL_POSTS.forEach(async (item) => {
        await setDoc(doc(db, "journal_posts", item.id), item);
      });
      triggerAlert("Database reset to factory default data!");
    }
  };

  // State Writers syncing directly to Firestore
  const savePortfolio = async (updatedList) => {
    setPortfolio(updatedList);
    updatedList.forEach(async (item) => {
      await setDoc(doc(db, "portfolio_items", item.id), item);
    });
    if (portfolio.length > updatedList.length) {
      const updatedIds = updatedList.map(i => i.id);
      portfolio.forEach(async (item) => {
        if (!updatedIds.includes(item.id)) {
          await deleteDoc(doc(db, "portfolio_items", item.id));
        }
      });
    }
  };

  const savePackages = async (updatedList) => {
    setPackages(updatedList);
    updatedList.forEach(async (item) => {
      await setDoc(doc(db, "session_packages", item.id), item);
    });
    if (packages.length > updatedList.length) {
      const updatedIds = updatedList.map(i => i.id);
      packages.forEach(async (item) => {
        if (!updatedIds.includes(item.id)) {
          await deleteDoc(doc(db, "session_packages", item.id));
        }
      });
    }
  };

  const savePricingConfig = async (updatedConfig) => {
    setPricingConfig(updatedConfig);
    await setDoc(doc(db, "pricing_config", "current"), updatedConfig);
  };

  const saveTestimonials = async (updatedList, pendingList) => {
    setTestimonials(updatedList);
    setPendingTestimonials(pendingList);
    
    // Save approved testimonials
    updatedList.forEach(async (item) => {
      await setDoc(doc(db, "testimonials_items", item.id), item);
    });
    // Handle deletion for approved
    if (testimonials.length > updatedList.length) {
      const updatedIds = updatedList.map(i => i.id);
      testimonials.forEach(async (item) => {
        if (!updatedIds.includes(item.id)) {
          await deleteDoc(doc(db, "testimonials_items", item.id));
        }
      });
    }

    // Save pending testimonials
    pendingList.forEach(async (item) => {
      await setDoc(doc(db, "pending_testimonials_items", item.id), item);
    });
    // Handle deletion for pending
    if (pendingTestimonials.length > pendingList.length) {
      const pendingIds = pendingList.map(i => i.id);
      pendingTestimonials.forEach(async (item) => {
        if (!pendingIds.includes(item.id)) {
          await deleteDoc(doc(db, "pending_testimonials_items", item.id));
        }
      });
    }
  };

  const saveJournals = async (updatedList) => {
    setJournals(updatedList);
    updatedList.forEach(async (item) => {
      await setDoc(doc(db, "journal_posts", item.id), item);
    });
    if (journals.length > updatedList.length) {
      const updatedIds = updatedList.map(i => i.id);
      journals.forEach(async (item) => {
        if (!updatedIds.includes(item.id)) {
          await deleteDoc(doc(db, "journal_posts", item.id));
        }
      });
    }
  };

  const saveExperience = async (key, updatedList) => {
    updatedList.forEach(async (item) => {
      await setDoc(doc(db, key, item.id || `exp-${Date.now()}`), item);
    });
    const currentList = key === "experience_commissions" ? commissions 
                      : key === "experience_clients" ? clients
                      : key === "experience_exhibitions" ? exhibitions
                      : awards;
    if (currentList.length > updatedList.length) {
      const updatedIds = updatedList.map(i => i.id);
      currentList.forEach(async (item) => {
        if (!updatedIds.includes(item.id)) {
          await deleteDoc(doc(db, key, item.id));
        }
      });
    }
  };

  if (!mounted) return null;

  // Render auth loading spinner
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center text-white font-sans">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="w-8 h-8 animate-spin text-[#c5a075]" />
          <span className="text-xs uppercase tracking-[0.25em] text-white/50 animate-pulse">Initializing Control Hub...</span>
        </div>
      </div>
    );
  }

  // Render cinematic login form
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center text-white font-sans selection:bg-[#c5a075]/40 relative overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#111115_1px,transparent_1px),linear-gradient(to_bottom,#111115_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 pointer-events-none"></div>
        
        <div className="w-full max-w-[420px] bg-[#0c0c0e] border border-white/5 p-8 rounded-lg shadow-2xl relative z-10 text-left">
          <span className="absolute top-6 left-6 w-3 h-3 border-t border-l border-[#c5a075]/30" />
          <span className="absolute top-6 right-6 w-3 h-3 border-t border-r border-[#c5a075]/30" />
          <span className="absolute bottom-6 left-6 w-3 h-3 border-b border-l border-[#c5a075]/30" />
          <span className="absolute bottom-6 right-6 w-3 h-3 border-b border-r border-[#c5a075]/30" />

          <div className="flex flex-col items-center text-center mb-8">
            <span className="font-condensed text-[10px] tracking-[0.3em] uppercase text-white/40 mb-2">HANZALA PORTFOLIO</span>
            <h1 className="font-display text-2xl tracking-[0.15em] text-[#c5a075] uppercase">CONTROL CENTER</h1>
            <p className="text-[10px] text-white/30 uppercase tracking-[0.1em] mt-1">Authorized Personnel Only</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-condensed text-[9px] tracking-[0.25em] text-white/40 uppercase">Email Address</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@hanzalaphotography.com"
                className="bg-transparent border-b border-white/20 focus:border-[#c5a075] outline-none text-[13px] font-light py-2 w-full text-white placeholder-white/10 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-condensed text-[9px] tracking-[0.25em] text-white/40 uppercase">Secure Key / Password</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-transparent border-b border-white/20 focus:border-[#c5a075] outline-none text-[13px] font-light py-2 w-full text-white placeholder-white/10 transition-colors"
              />
            </div>

            {authError && (
              <span className="text-[10px] font-mono text-red-400 mt-1 uppercase tracking-wider text-center">{authError}</span>
            )}

            <button
              type="submit"
              className="w-full bg-[#c5a075] hover:bg-white text-[#080808] py-3.5 transition-all duration-300 font-condensed text-[11px] font-semibold tracking-[0.25em] uppercase cursor-pointer text-center mt-3"
            >
              AUTHENTICATE
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Command Search Options Filter
  const commands = [
    { label: "Go to Overview Dashboard", action: () => { setActiveTab("overview"); setCmdOpen(false); } },
    { label: "Moderate Portfolio Images", action: () => { setActiveTab("portfolio"); setCmdOpen(false); } },
    { label: "Edit Package Pricing Rates", action: () => { setActiveTab("services"); setCmdOpen(false); } },
    { label: "Publish Journal Essays", action: () => { setActiveTab("journals"); setCmdOpen(false); } },
    { label: "Approve Client Testimonials", action: () => { setActiveTab("testimonials"); setCmdOpen(false); } },
    { label: "Review Client Inquiries", action: () => { setActiveTab("inquiries"); setCmdOpen(false); } },
    { label: "Update Awards & Exhibits", action: () => { setActiveTab("experience"); setCmdOpen(false); } },
    { label: "Reset Local DB to Default", action: () => { resetToFactoryDefaults(); setCmdOpen(false); } }
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(cmdQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans selection:bg-[#c5a075]/40 relative overflow-hidden">
      
      {/* Dynamic Saving Notification Toast */}
      {saveAlert && (
        <div className="fixed top-6 right-6 z-50 bg-[#0c0c0e] border border-[#c5a075] text-[#c5a075] px-5 py-3 shadow-xl backdrop-blur-md rounded-md flex items-center gap-3 animate-slide-in">
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span className="text-xs uppercase tracking-widest">{saveAlert}</span>
        </div>
      )}

      {/* Grid Pattern Ambient Watermark Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111115_1px,transparent_1px),linear-gradient(to_bottom,#111115_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-35 pointer-events-none"></div>

      {/* Floating command center trigger label */}
      <div className="absolute bottom-6 left-6 z-40 bg-white/5 border border-white/10 px-3 py-1.5 rounded-md backdrop-blur-md text-[10px] tracking-widest text-white/40 uppercase pointer-events-none hidden lg:block">
        Press <span className="text-[#c5a075] font-semibold">Ctrl + K</span> to launch Command HUD
      </div>

      {/* ─── Top Branding Header ─── */}
      <header className="border-b border-white/5 bg-[#0a0a0c]/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-2 border border-white/5 hover:border-[#c5a075] rounded-md bg-[#0f0f12] transition-all mr-1 flex items-center justify-center ${
              sidebarOpen ? "text-[#c5a075]" : "text-white/40"
            }`}
            title={sidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            <Layers className="w-4 h-4" />
          </button>
          <span className="font-display text-2xl tracking-widest text-[#c5a075]">
            HANZALA <span className="font-light text-white">ADMIN</span>
          </span>
          <div className="h-4 w-[1px] bg-white/10 hidden md:block"></div>
          <div className="bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-[9px] px-2 py-0.5 rounded-full tracking-widest uppercase hidden md:flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            LOCAL PERSISTENCE MODE
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCmdOpen(true)}
            className="p-2 border border-white/5 hover:border-[#c5a075] rounded-md bg-[#0f0f12] text-white/60 hover:text-white transition-all"
            title="Command Menu"
          >
            <Command className="w-4 h-4" />
          </button>
          
          <button 
            onClick={resetToFactoryDefaults}
            className="flex items-center gap-2 border border-[#c5a075]/30 hover:border-[#c5a075] hover:bg-[#c5a075]/5 text-xs text-[#c5a075] px-3.5 py-1.5 rounded-md transition-all uppercase tracking-widest cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>

          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 border border-red-500/30 hover:border-red-500 hover:bg-red-500/5 text-xs text-red-400 px-3.5 py-1.5 rounded-md transition-all uppercase tracking-widest cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* ─── Main Workspace Flex Layout (Enables smooth width transitions) ─── */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] w-full overflow-hidden relative">
        
        {/* Navigation Sidebar Column */}
        <aside 
          className={`relative border-r border-white/5 bg-[#09090b] p-4 flex flex-col gap-1.5 transition-all duration-350 ease-in-out shrink-0 overflow-hidden ${
            sidebarOpen ? "w-56" : "w-16 items-center"
          }`}
        >

          {sidebarOpen ? (
            <div className="mb-4 px-2.5">
              <span className="text-[10px] uppercase text-white/30 tracking-[0.2em] font-semibold whitespace-nowrap">
                Core Modules
              </span>
            </div>
          ) : (
            <div className="h-6 mb-4 flex items-center justify-center">
              <div className="w-5 h-[1px] bg-white/10"></div>
            </div>
          )}

          {[
            { id: "overview", label: "Dashboard HUD", icon: Layers },
            { id: "portfolio", label: "Portfolio (Slides)", icon: Camera },
            { id: "services", label: "Services & Rates", icon: DollarSign },
            { id: "journals", label: "Journal Editor", icon: BookOpen },
            { id: "testimonials", label: "Reviews Moderation", icon: MessageSquare },
            { id: "inquiries", label: "Client Inquiries", icon: Mail },
            { id: "experience", label: "CV & Credentials", icon: Award }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedPortfolioItem(null);
                  setSelectedPackage(null);
                  setSelectedJournal(null);
                }}
                className={`relative flex items-center rounded-md transition-all duration-300 uppercase tracking-widest cursor-pointer ${
                  sidebarOpen 
                    ? "w-full justify-between px-3.5 py-3 text-[9.5px]" 
                    : "justify-center p-3 text-[12px] w-10 h-10 mx-auto"
                } ${
                  isActive 
                    ? "bg-[#c5a075] text-[#080808] font-bold shadow-md shadow-[#c5a075]/15" 
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
                title={!sidebarOpen ? tab.label : undefined}
              >
                <div className="flex items-center gap-3 whitespace-nowrap">
                  <Icon className={`${sidebarOpen ? "w-3.5 h-3.5" : "w-4.5 h-4.5"} shrink-0`} />
                  {sidebarOpen && <span className="truncate text-left">{tab.label}</span>}
                </div>
                {sidebarOpen && tab.id === "testimonials" && pendingTestimonials.length > 0 && (
                  <span className={`text-[8px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-[#080808] text-[#c5a075]' : 'bg-[#c5a075] text-[#080808]'}`}>
                    {pendingTestimonials.length}
                  </span>
                )}
                {sidebarOpen && tab.id === "inquiries" && (inquiries.length + newsletterSubs.length) > 0 && (
                  <span className={`text-[8px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-[#080808] text-[#c5a075]' : 'bg-[#c5a075] text-[#080808]'}`}>
                    {inquiries.length + newsletterSubs.length}
                  </span>
                )}
                
                {/* Small notification dot if collapsed */}
                {!sidebarOpen && tab.id === "testimonials" && pendingTestimonials.length > 0 && (
                  <span className="absolute w-2 h-2 rounded-full bg-[#c5a075] border border-[#080808] top-1 right-1 animate-pulse"></span>
                )}
                {!sidebarOpen && tab.id === "inquiries" && (inquiries.length + newsletterSubs.length) > 0 && (
                  <span className="absolute w-2 h-2 rounded-full bg-[#c5a075] border border-[#080808] top-1 right-1 animate-pulse"></span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Collapsible Border Handle Button (Sibling to aside, positioned dynamically outside aside's overflow-hidden) */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{ left: sidebarOpen ? '212px' : '52px' }}
          className="absolute top-10 z-30 w-6 h-6 rounded-full bg-[#c5a075] text-[#080808] border border-[#080808] hover:bg-white hover:text-black transition-all duration-350 ease-in-out flex items-center justify-center cursor-pointer shadow-md"
          title={sidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          {sidebarOpen ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </button>

        {/* ─── Center Editor Dashboard Column ─── */}
        <main className="flex-1 p-6 overflow-y-auto max-h-[85vh] border-r border-white/5 transition-all duration-350 ease-in-out">
          
          {/* TAB 1: OVERVIEW HUD */}
          {activeTab === "overview" && (
            <div className="flex flex-col gap-6 animate-fade-in text-left">
              
              {/* Header */}
              <div className="border-b border-white/5 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="font-display text-4xl text-[#c5a075]">DASHBOARD HUD</h1>
                  <p className="text-white/40 text-xs mt-1">Live telemetry metrics, catalog distribution, and quick shortcut paths.</p>
                </div>
                <div className="text-[10px] font-mono bg-white/5 border border-white/10 px-3 py-1.5 rounded text-white/50">
                  Last Sync: {new Date().toLocaleTimeString()}
                </div>
              </div>

              {/* Stats Card Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#0c0c0e] border border-white/5 p-5 rounded-md hover:border-[#c5a075]/35 transition-all">
                  <span className="text-[10px] uppercase text-white/30 tracking-widest block">Portfolio Slides</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-3xl font-display text-white">{portfolio.length}</span>
                    <span className="text-xs text-white/30">items</span>
                  </div>
                </div>

                <div className="bg-[#0c0c0e] border border-white/5 p-5 rounded-md hover:border-[#c5a075]/35 transition-all">
                  <span className="text-[10px] uppercase text-white/30 tracking-widest block">Active Packages</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-3xl font-display text-[#c5a075]">{packages.length}</span>
                    <span className="text-xs text-white/30">tiers</span>
                  </div>
                </div>

                <div className="bg-[#0c0c0e] border border-white/5 p-5 rounded-md hover:border-[#c5a075]/35 transition-all">
                  <span className="text-[10px] uppercase text-white/30 tracking-widest block">Total Leads</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-3xl font-display text-white">{inquiries.length + newsletterSubs.length}</span>
                    <span className="text-xs text-white/30">inquiries</span>
                  </div>
                </div>

                <div className="bg-[#0c0c0e] border border-white/5 p-5 rounded-md hover:border-[#c5a075]/35 transition-all">
                  <span className="text-[10px] uppercase text-white/30 tracking-widest block">Pending Reviews</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-3xl font-display text-[#c5a075]">{pendingTestimonials.length}</span>
                    <span className="text-xs text-white/30">awaiting</span>
                  </div>
                </div>
              </div>

              {/* Central telemetry split grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-2">
                
                {/* COLUMN 1: Visual Data Distributions (7 cols) */}
                <div className="lg:col-span-7 bg-[#0c0c0e]/70 border border-white/5 p-5 rounded-md flex flex-col gap-5">
                  <span className="text-xs uppercase tracking-widest text-[#c5a075] font-semibold border-b border-white/5 pb-2 block">
                    Portfolio Slide Distribution
                  </span>

                  <div className="flex flex-col gap-4">
                    {Object.entries(
                      portfolio.reduce((acc, item) => {
                        acc[item.category] = (acc[item.category] || 0) + 1;
                        return acc;
                      }, {})
                    ).map(([category, count]) => {
                      const percentage = Math.round((count / (portfolio.length || 1)) * 100);
                      return (
                        <div key={category} className="flex flex-col gap-1.5">
                          <div className="flex justify-between text-[10px] font-mono">
                            <span className="uppercase text-white/80">{category}</span>
                            <span className="text-[#c5a075] font-bold">{count} slides ({percentage}%)</span>
                          </div>
                          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                            <div 
                              className="bg-[#c5a075] h-full rounded-full transition-all duration-500" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <span className="text-xs uppercase tracking-widest text-[#c5a075] font-semibold border-b border-white/5 pb-2 mt-2 block">
                    Client Shoot Type Demands
                  </span>

                  <div className="flex flex-col gap-4">
                    {inquiries.length === 0 ? (
                      <span className="text-[10px] uppercase text-white/30 italic">Awaiting inquiries data...</span>
                    ) : (
                      Object.entries(
                        inquiries.reduce((acc, inq) => {
                          acc[inq.shootType] = (acc[inq.shootType] || 0) + 1;
                          return acc;
                        }, {})
                      ).map(([type, count]) => {
                        const percentage = Math.round((count / (inquiries.length || 1)) * 100);
                        return (
                          <div key={type} className="flex flex-col gap-1.5">
                            <div className="flex justify-between text-[10px] font-mono">
                              <span className="uppercase text-white/80">{type}</span>
                              <span className="text-emerald-400 font-bold">{count} bookings ({percentage}%)</span>
                            </div>
                            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                              <div 
                                className="bg-emerald-500/80 h-full rounded-full transition-all duration-500" 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* COLUMN 2: Telemetry & Quick Action Shortcuts (5 cols) */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  
                  {/* System Telemetry diagnostics */}
                  <div className="bg-[#0f0f12]/50 border border-white/5 p-5 rounded-md flex flex-col gap-4">
                    <span className="text-xs uppercase tracking-widest text-[#c5a075] font-semibold border-b border-white/5 pb-2">
                      System Diagnostics
                    </span>
                    
                    <div className="grid grid-cols-2 gap-y-3 text-[11px] font-mono">
                      <span className="text-white/40">Sync State:</span>
                      <span className="text-right text-emerald-400 flex items-center justify-end gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        ONLINE (LOCAL)
                      </span>

                      <span className="text-white/40">Engine Baseline:</span>
                      <span className="text-right text-white/80">LocalStorage API</span>

                      <span className="text-white/40">Form Submissions:</span>
                      <span className="text-right text-white/80">{inquiries.length} submissions</span>

                      <span className="text-white/40">Email Leads:</span>
                      <span className="text-right text-white/80">{newsletterSubs.length} signups</span>

                      <span className="text-white/40">Factory State:</span>
                      <button 
                        onClick={() => { if(confirm("Reset entire app to factory defaults?")) resetToFactoryDefaults(); }}
                        className="text-right text-red-400 hover:text-red-300 underline cursor-pointer"
                      >
                        Click to Wipe Cache
                      </button>
                    </div>
                  </div>

                  {/* HUD Command Console Shortcuts */}
                  <div className="bg-[#0a0a0c]/60 border border-white/5 p-5 rounded-md flex flex-col gap-4">
                    <span className="text-xs uppercase tracking-widest text-[#c5a075] font-semibold border-b border-white/5 pb-2">
                      Quick HUD Shortcuts
                    </span>

                    <div className="grid grid-cols-1 gap-2.5">
                      <button 
                        onClick={() => setActiveTab("portfolio")} 
                        className="w-full border border-white/5 hover:border-[#c5a075] bg-black/40 text-[10px] text-white/70 hover:text-white py-2.5 rounded text-center uppercase tracking-widest transition-all cursor-pointer font-semibold"
                      >
                        📷 Configure Gallery Slides
                      </button>
                      <button 
                        onClick={() => setActiveTab("journals")} 
                        className="w-full border border-white/5 hover:border-[#c5a075] bg-black/40 text-[10px] text-white/70 hover:text-white py-2.5 rounded text-center uppercase tracking-widest transition-all cursor-pointer font-semibold"
                      >
                        ✍️ Draft Journal Chapters
                      </button>
                      <button 
                        onClick={() => setActiveTab("inquiries")} 
                        className="w-full border border-white/5 hover:border-[#c5a075] bg-black/40 text-[10px] text-white/70 hover:text-white py-2.5 rounded text-center uppercase tracking-widest transition-all cursor-pointer font-semibold"
                      >
                        ✉️ Review incoming Leads
                      </button>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* TAB 2: PORTFOLIO COORDINATOR */}
          {activeTab === "portfolio" && (
            <div className="flex flex-col gap-6 animate-fade-in text-left">
              <div className="border-b border-white/5 pb-4">
                <h1 className="font-display text-4xl text-[#c5a075]">PORTFOLIO COORDINATOR</h1>
                <p className="text-white/40 text-xs mt-1">Configure gallery categories, multi-image slides, narratives, and comments.</p>
              </div>

              {selectedPortfolioItem ? (
                // Edit Single Item Layout
                <div className="flex flex-col gap-5 border border-white/5 bg-[#0a0a0c] p-5 rounded-md">
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[#c5a075] uppercase tracking-widest font-semibold">
                        Editing: {selectedPortfolioItem.title}
                      </span>
                      <button
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this entire portfolio post? This cannot be undone.")) {
                            const updated = portfolio.filter(p => p.id !== selectedPortfolioItem.id);
                            savePortfolio(updated);
                            setSelectedPortfolioItem(null);
                            triggerAlert("Portfolio post deleted!");
                          }
                        }}
                        className="text-red-400 hover:text-red-300 text-[10px] uppercase font-bold tracking-wider cursor-pointer"
                      >
                        Delete Post
                      </button>
                    </div>
                    <button 
                      onClick={() => setSelectedPortfolioItem(null)} 
                      className="text-white/40 hover:text-white text-xs uppercase tracking-widest cursor-pointer"
                    >
                      ← Back to list
                    </button>
                  </div>

                  {/* Title & Category Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase text-white/40 tracking-wider">Item Title</label>
                      <input 
                        type="text" 
                        value={selectedPortfolioItem.title}
                        onChange={(e) => {
                          const updated = { ...selectedPortfolioItem, title: e.target.value };
                          setSelectedPortfolioItem(updated);
                          savePortfolio(portfolio.map(p => p.id === updated.id ? updated : p));
                        }}
                        className="bg-white/5 border border-white/10 px-3 py-2 text-xs rounded focus:border-[#c5a075] outline-none text-white font-sans"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase text-white/40 tracking-wider">Category</label>
                      <select 
                        value={selectedPortfolioItem.category}
                        onChange={(e) => {
                          const updated = { ...selectedPortfolioItem, category: e.target.value };
                          setSelectedPortfolioItem(updated);
                          savePortfolio(portfolio.map(p => p.id === updated.id ? updated : p));
                        }}
                        className="bg-[#0f0f12] border border-white/10 px-3 py-2 text-xs rounded focus:border-[#c5a075] outline-none text-white font-sans"
                      >
                        <option value="Portrait">Portrait</option>
                        <option value="Street">Street</option>
                        <option value="Landscape">Landscape</option>
                        <option value="Editorial">Editorial</option>
                      </select>
                    </div>
                  </div>

                  {/* Location & Camera Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase text-white/40 tracking-wider">Location / Coordinate</label>
                      <input 
                        type="text" 
                        value={selectedPortfolioItem.location || ""}
                        onChange={(e) => {
                          const updated = { ...selectedPortfolioItem, location: e.target.value };
                          setSelectedPortfolioItem(updated);
                          savePortfolio(portfolio.map(p => p.id === updated.id ? updated : p));
                        }}
                        className="bg-white/5 border border-white/10 px-3 py-2 text-xs rounded focus:border-[#c5a075] outline-none text-white font-sans"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase text-white/40 tracking-wider">Camera Gear</label>
                      <input 
                        type="text" 
                        value={selectedPortfolioItem.camera || ""}
                        onChange={(e) => {
                          const updated = { ...selectedPortfolioItem, camera: e.target.value };
                          setSelectedPortfolioItem(updated);
                          savePortfolio(portfolio.map(p => p.id === updated.id ? updated : p));
                        }}
                        className="bg-white/5 border border-white/10 px-3 py-2 text-xs rounded focus:border-[#c5a075] outline-none text-white font-sans"
                      />
                    </div>
                  </div>

                  {/* Description field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase text-white/40 tracking-wider">Description / Narrative Story</label>
                    <textarea 
                      placeholder="Write a brief story or technical detail about this frame..."
                      value={selectedPortfolioItem.desc || ""}
                      onChange={(e) => {
                        const updated = { ...selectedPortfolioItem, desc: e.target.value };
                        setSelectedPortfolioItem(updated);
                        savePortfolio(portfolio.map(p => p.id === updated.id ? updated : p));
                      }}
                      className="bg-white/5 border border-white/10 px-3 py-2 text-xs rounded focus:border-[#c5a075] outline-none h-20 resize-none text-white font-sans"
                    />
                  </div>

                  {/* Slides Manager */}
                  <div className="border border-white/5 p-4 rounded bg-black/40">
                    <span className="text-[10px] uppercase tracking-widest text-[#c5a075] block border-b border-white/5 pb-2 mb-3 font-semibold">
                      Instagram-style Multi-Slides
                    </span>

                    <div className="flex flex-col gap-2">
                      {(selectedPortfolioItem.slides || [selectedPortfolioItem.src]).map((slide, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[#0d0d10] p-3 border border-white/5 rounded">
                          <img src={slide} className="w-24 h-16 object-cover rounded border border-white/10 shrink-0 bg-black" alt="Slide Thumbnail" />
                          <div className="flex-grow w-full flex flex-col gap-2">
                            <input 
                              type="text" 
                              value={slide}
                              onChange={(e) => {
                                const slidesCopy = [...(selectedPortfolioItem.slides || [selectedPortfolioItem.src])];
                                slidesCopy[idx] = e.target.value;
                                const updated = { ...selectedPortfolioItem, slides: slidesCopy, src: idx === 0 ? e.target.value : selectedPortfolioItem.src };
                                setSelectedPortfolioItem(updated);
                                savePortfolio(portfolio.map(p => p.id === updated.id ? updated : p));
                              }}
                              className="w-full bg-white/5 border border-white/10 px-2 py-1.5 rounded text-[10px] font-mono text-white/70 focus:outline-none focus:border-[#c5a075] transition-colors"
                              placeholder="Image URL..."
                            />
                            
                            <div className="flex items-center gap-3">
                              {/* File uploader widget */}
                              <input 
                                type="file" 
                                accept="image/*" 
                                id={`upload-edit-${idx}`}
                                className="hidden" 
                                onChange={(e) => {
                                  const file = e.target.files[0];
                                  if (!file) return;
                                  triggerAlert("Uploading to Cloudinary...");
                                  uploadToCloudinary(file)
                                    .then((url) => {
                                      const slidesCopy = [...(selectedPortfolioItem.slides || [selectedPortfolioItem.src])];
                                      slidesCopy[idx] = url;
                                      const updated = { ...selectedPortfolioItem, slides: slidesCopy, src: idx === 0 ? url : selectedPortfolioItem.src };
                                      setSelectedPortfolioItem(updated);
                                      savePortfolio(portfolio.map(p => p.id === updated.id ? updated : p));
                                      triggerAlert("Image replaced!");
                                    })
                                    .catch((err) => {
                                      console.error(err);
                                      alert("Failed to upload: " + err.message);
                                    });
                                }}
                              />
                              <label 
                                htmlFor={`upload-edit-${idx}`} 
                                className="bg-[#c5a075]/10 border border-[#c5a075]/35 hover:bg-[#c5a075] hover:text-[#080808] text-[9px] px-2.5 py-1 rounded transition-all cursor-pointer uppercase font-bold tracking-wider"
                              >
                                Upload Image
                              </label>

                              <button 
                                onClick={() => {
                                  const slidesCopy = [...(selectedPortfolioItem.slides || [selectedPortfolioItem.src])];
                                  if (slidesCopy.length <= 1) return alert("Must have at least one slide");
                                  slidesCopy.splice(idx, 1);
                                  const updated = { ...selectedPortfolioItem, slides: slidesCopy, src: slidesCopy[0] };
                                  setSelectedPortfolioItem(updated);
                                  savePortfolio(portfolio.map(p => p.id === updated.id ? updated : p));
                                }}
                                className="text-red-400 hover:text-red-300 text-[9px] uppercase tracking-wider font-semibold cursor-pointer"
                              >
                                Remove Slide
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Add slide form */}
                      <div className="flex flex-col sm:flex-row gap-3 mt-4 pt-3 border-t border-white/5">
                        <input 
                          type="text" 
                          placeholder="Paste image URL to add slide..."
                          value={newSlideUrl}
                          onChange={(e) => setNewSlideUrl(e.target.value)}
                          className="bg-white/5 border border-white/10 px-3 py-2 text-xs rounded focus:border-[#c5a075] outline-none flex-grow text-white font-sans"
                        />
                        <div className="flex gap-2">
                          <button 
                            onClick={() => {
                              if (!newSlideUrl.trim()) return;
                              const slidesCopy = [...(selectedPortfolioItem.slides || [selectedPortfolioItem.src]), newSlideUrl];
                              const updated = { ...selectedPortfolioItem, slides: slidesCopy };
                              setSelectedPortfolioItem(updated);
                              savePortfolio(portfolio.map(p => p.id === updated.id ? updated : p));
                              setNewSlideUrl("");
                              triggerAlert("New slide added successfully!");
                            }}
                            className="bg-[#c5a075] text-[#080808] font-bold text-[10px] uppercase tracking-widest px-4 py-2 rounded hover:bg-white cursor-pointer"
                          >
                            Add URL
                          </button>

                          <input 
                            type="file" 
                            accept="image/*" 
                            id="upload-add-slide-edit"
                            className="hidden" 
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (!file) return;
                              triggerAlert("Uploading to Cloudinary...");
                              uploadToCloudinary(file)
                                .then((url) => {
                                  const slidesCopy = [...(selectedPortfolioItem.slides || [selectedPortfolioItem.src]), url];
                                  const updated = { ...selectedPortfolioItem, slides: slidesCopy };
                                  setSelectedPortfolioItem(updated);
                                  savePortfolio(portfolio.map(p => p.id === updated.id ? updated : p));
                                  triggerAlert("New image uploaded!");
                                })
                                .catch((err) => {
                                  console.error(err);
                                  alert("Failed to upload: " + err.message);
                                });
                            }}
                          />
                          <label 
                            htmlFor="upload-add-slide-edit" 
                            className="bg-white/5 border border-white/10 hover:border-[#c5a075] hover:text-[#c5a075] text-[10px] px-4 py-2 rounded transition-all cursor-pointer uppercase font-mono tracking-wider flex items-center justify-center"
                          >
                            Upload File
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comment Moderation */}
                  <div className="border border-white/5 p-4 rounded bg-black/40">
                    <span className="text-[10px] uppercase tracking-widest text-[#c5a075] block border-b border-white/5 pb-2 mb-3 font-semibold">
                      Comments & Likes Moderation ({selectedPortfolioItem.likes || 0} Likes)
                    </span>

                    <div className="flex flex-col gap-3">
                      {(selectedPortfolioItem.comments || []).length === 0 ? (
                        <p className="text-[10px] text-white/30 uppercase italic py-2">No comments posted yet.</p>
                      ) : (
                        (selectedPortfolioItem.comments || []).map((comm, idx) => (
                          <div key={idx} className="flex justify-between items-start bg-[#0d0d10] p-3 border border-white/5 rounded">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-[#c5a075]">{comm.name}</span>
                                <span className="text-[8px] text-white/30 uppercase">{comm.date}</span>
                              </div>
                              <p className="text-[11px] text-white/70 mt-1">{comm.text}</p>
                            </div>
                            <button
                              onClick={() => {
                                const commentsCopy = [...selectedPortfolioItem.comments];
                                commentsCopy.splice(idx, 1);
                                const updated = { ...selectedPortfolioItem, comments: commentsCopy };
                                setSelectedPortfolioItem(updated);
                                savePortfolio(portfolio.map(p => p.id === updated.id ? updated : p));
                                triggerAlert("Comment deleted!");
                              }}
                              className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))
                      )}

                      {/* Add comment input */}
                      <div className="border-t border-white/5 pt-3 mt-1 flex flex-col gap-2">
                        <span className="text-[9px] uppercase tracking-widest text-white/40 block">Inject Mock Comment</span>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="Author name..."
                            value={newComment.name}
                            onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                            className="bg-white/5 border border-white/10 px-3 py-1.5 text-xs rounded focus:border-[#c5a075] outline-none text-white font-sans w-1/3"
                          />
                          <input 
                            type="text" 
                            placeholder="Type comment message..."
                            value={newComment.text}
                            onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                            className="bg-white/5 border border-white/10 px-3 py-1.5 text-xs rounded focus:border-[#c5a075] outline-none text-white font-sans flex-grow"
                          />
                          <button 
                            onClick={() => {
                              if (!newComment.text.trim()) return;
                              const commentsCopy = [...(selectedPortfolioItem.comments || []), {
                                name: newComment.name.trim() || "Anonymous",
                                text: newComment.text.trim(),
                                date: "Just now"
                              }];
                              const updated = { ...selectedPortfolioItem, comments: commentsCopy };
                              setSelectedPortfolioItem(updated);
                              savePortfolio(portfolio.map(p => p.id === updated.id ? updated : p));
                              setNewComment({ name: "", text: "" });
                              triggerAlert("Comment injected!");
                            }}
                            className="bg-[#c5a075] text-[#080808] font-bold text-xs px-4 rounded hover:bg-white cursor-pointer"
                          >
                            Post
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Catalog Grid List
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-2">
                    <span className="text-[10px] uppercase text-white/30 tracking-[0.25em] font-semibold">
                      Published Photos Grid
                    </span>
                    <button
                      onClick={() => setShowAddPortfolio(!showAddPortfolio)}
                      className="flex items-center gap-1.5 border border-[#c5a075]/35 hover:border-[#c5a075] hover:bg-[#c5a075]/10 text-[9px] uppercase font-bold tracking-widest px-3 py-1.5 rounded transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      {showAddPortfolio ? "Cancel" : "Add New Post"}
                    </button>
                  </div>

                  {/* Add New Slide Form Panel */}
                  {showAddPortfolio && (
                    <div className="flex flex-col gap-5 border border-[#c5a075]/30 bg-[#0a0a0c] p-5 rounded-md mb-4 animate-fade-in">
                      <span className="text-xs text-[#c5a075] uppercase tracking-widest font-semibold border-b border-white/5 pb-2">
                        Create New Portfolio Post
                      </span>

                      {/* Title & Category */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] uppercase text-white/40 tracking-wider">Post Title *</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Whispers of Lahore"
                            value={newPortfolioData.title}
                            onChange={(e) => setNewPortfolioData({ ...newPortfolioData, title: e.target.value })}
                            className="bg-white/5 border border-white/10 px-3 py-2 text-xs rounded focus:border-[#c5a075] outline-none text-white font-sans"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] uppercase text-white/40 tracking-wider">Category *</label>
                          <select 
                            value={newPortfolioData.category}
                            onChange={(e) => setNewPortfolioData({ ...newPortfolioData, category: e.target.value })}
                            className="bg-[#0f0f12] border border-white/10 px-3 py-2 text-xs rounded focus:border-[#c5a075] outline-none text-white font-sans"
                          >
                            <option value="Portrait">Portrait</option>
                            <option value="Street">Street</option>
                            <option value="Landscape">Landscape</option>
                            <option value="Editorial">Editorial</option>
                          </select>
                        </div>
                      </div>

                      {/* Location & Camera */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] uppercase text-white/40 tracking-wider">Location / Coordinate</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Walled City, Lahore"
                            value={newPortfolioData.location}
                            onChange={(e) => setNewPortfolioData({ ...newPortfolioData, location: e.target.value })}
                            className="bg-white/5 border border-white/10 px-3 py-2 text-xs rounded focus:border-[#c5a075] outline-none text-white font-sans"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] uppercase text-white/40 tracking-wider">Camera Gear</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Sony A7R V · 50mm f/1.2 GM"
                            value={newPortfolioData.camera}
                            onChange={(e) => setNewPortfolioData({ ...newPortfolioData, camera: e.target.value })}
                            className="bg-white/5 border border-white/10 px-3 py-2 text-xs rounded focus:border-[#c5a075] outline-none text-white font-sans"
                          />
                        </div>
                      </div>

                      {/* Narrative description */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] uppercase text-white/40 tracking-wider">Description / Narrative Story</label>
                        <textarea 
                          placeholder="Write a brief story or technical detail about this frame..."
                          value={newPortfolioData.desc}
                          onChange={(e) => setNewPortfolioData({ ...newPortfolioData, desc: e.target.value })}
                          className="bg-white/5 border border-white/10 px-3 py-2 text-xs rounded focus:border-[#c5a075] outline-none h-20 resize-none text-white font-sans"
                        />
                      </div>

                      {/* Instagram style multi slides URLs list */}
                      <div className="border border-white/5 p-4 rounded bg-black/40">
                        <span className="text-[10px] uppercase tracking-widest text-[#c5a075] block border-b border-white/5 pb-2 mb-3 font-semibold">
                          Slide Carousel Images (Instagram style)
                        </span>

                        <div className="flex flex-col gap-2.5">
                          {newPortfolioData.slides.map((slide, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[#0d0d10] p-3 border border-white/5 rounded">
                              {slide ? (
                                <img src={slide} className="w-24 h-16 object-cover rounded border border-white/10 shrink-0 bg-black" alt="Slide Thumbnail" />
                              ) : (
                                <div className="w-24 h-16 rounded border border-dashed border-white/10 shrink-0 bg-black flex items-center justify-center text-[8px] text-white/30 uppercase tracking-widest text-center font-mono">
                                  No Image
                                </div>
                              )}
                              <div className="flex-grow w-full flex flex-col gap-2">
                                <input 
                                  type="text" 
                                  placeholder="Paste image URL here..."
                                  value={slide}
                                  onChange={(e) => {
                                    const copy = [...newPortfolioData.slides];
                                    copy[idx] = e.target.value;
                                    setNewPortfolioData({ ...newPortfolioData, slides: copy });
                                  }}
                                  className="w-full bg-white/5 border border-white/10 px-3 py-1.5 text-xs rounded focus:border-[#c5a075] outline-none text-white font-sans"
                                />
                                
                                <div className="flex items-center gap-3">
                                  {/* File uploader widget */}
                                  <input 
                                    type="file" 
                                    accept="image/*" 
                                    id={`upload-new-${idx}`}
                                    className="hidden" 
                                    onChange={(e) => {
                                      const file = e.target.files[0];
                                      if (!file) return;
                                      triggerAlert("Uploading to Cloudinary...");
                                      uploadToCloudinary(file)
                                        .then((url) => {
                                          const copy = [...newPortfolioData.slides];
                                          copy[idx] = url;
                                          setNewPortfolioData({ ...newPortfolioData, slides: copy });
                                          triggerAlert("Image uploaded!");
                                        })
                                        .catch((err) => {
                                          console.error(err);
                                          alert("Failed to upload: " + err.message);
                                        });
                                    }}
                                  />
                                  <label 
                                    htmlFor={`upload-new-${idx}`} 
                                    className="bg-[#c5a075]/10 border border-[#c5a075]/35 hover:bg-[#c5a075] hover:text-[#080808] text-[9px] px-2.5 py-1 rounded transition-all cursor-pointer uppercase font-bold tracking-wider"
                                  >
                                    Upload Image
                                  </label>

                                  {newPortfolioData.slides.length > 1 && (
                                    <button
                                      onClick={() => {
                                        const copy = [...newPortfolioData.slides];
                                        copy.splice(idx, 1);
                                        setNewPortfolioData({ ...newPortfolioData, slides: copy });
                                      }}
                                      className="text-red-400 hover:text-red-300 text-[9px] uppercase tracking-wider font-semibold cursor-pointer"
                                    >
                                      Remove Slide
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}

                          <button
                            onClick={() => {
                              setNewPortfolioData({ ...newPortfolioData, slides: [...newPortfolioData.slides, ""] });
                            }}
                            className="text-[9px] uppercase tracking-widest text-[#c5a075] hover:text-white mt-1 border border-dashed border-[#c5a075]/35 hover:border-white py-2.5 rounded text-center cursor-pointer bg-transparent w-full"
                          >
                            + Add another image to carousel (Multi-slide)
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (!newPortfolioData.title.trim()) return alert("Post title is required");
                          const activeSlides = newPortfolioData.slides.filter(s => s.trim() !== "");
                          if (activeSlides.length === 0) return alert("At least one slide image URL is required");

                          const newPost = {
                            id: `photo-${Date.now()}`,
                            title: newPortfolioData.title,
                            category: newPortfolioData.category,
                            location: newPortfolioData.location || "Not Specified",
                            camera: newPortfolioData.camera || "Sony Custom",
                            desc: newPortfolioData.desc || "",
                            src: activeSlides[0],
                            slides: activeSlides,
                            likes: 0,
                            comments: [],
                            likedByMe: false,
                            date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
                          };

                          const updated = [newPost, ...portfolio];
                          savePortfolio(updated);
                          setShowAddPortfolio(false);
                          setNewPortfolioData({
                            title: "",
                            category: "Portrait",
                            location: "",
                            camera: "",
                            desc: "",
                            slides: [""]
                          });
                          triggerAlert("New portfolio post created!");
                        }}
                        className="bg-[#c5a075] text-[#080808] font-bold text-xs uppercase tracking-widest py-3 rounded hover:bg-white transition-colors cursor-pointer"
                      >
                        Publish Portfolio Post
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {portfolio.map((item) => (
                      <div 
                        key={item.id}
                        onClick={() => setSelectedPortfolioItem(item)}
                        className="bg-[#0c0c0e] border border-white/5 hover:border-[#c5a075]/45 hover:-translate-y-1 rounded-md p-3 transition-all cursor-pointer flex flex-col gap-2 relative overflow-hidden group"
                      >
                        <img 
                          src={item.src} 
                          className="w-full aspect-[3/2] object-cover rounded bg-black" 
                          alt={item.title}
                        />
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] text-[#c5a075] font-semibold uppercase">{item.category}</span>
                            <h3 className="text-xs font-bold truncate tracking-wider mt-0.5">{item.title}</h3>
                          </div>
                          <span className="text-[9px] text-white/30 font-mono shrink-0">
                            {(item.slides || [item.src]).length} slides
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-3 text-[9px] text-white/40 border-t border-white/5 pt-2 mt-1">
                          <span className="flex items-center gap-1">
                            <Heart className="w-2.5 h-2.5 text-[#c5a075]" />
                            {item.likes || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-2.5 h-2.5" />
                            {(item.comments || []).length}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SERVICES AND PRICING MODIFIER */}
          {activeTab === "services" && (
            <div className="flex flex-col gap-6 animate-fade-in">
              <div className="border-b border-white/5 pb-4">
                <h1 className="font-display text-4xl text-[#c5a075]">SERVICES & RATES</h1>
                <p className="text-white/40 text-xs mt-1">Adjust session package pricing, base hours, and add-on rates.</p>
              </div>

              {/* Package Select Panel */}
              <div className="flex flex-col gap-4 text-left">
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <span className="text-[10px] uppercase text-white/30 tracking-[0.25em] font-semibold">
                    Session Packages List
                  </span>
                  <button
                    onClick={() => setShowAddPackage(!showAddPackage)}
                    className="flex items-center gap-1.5 border border-[#c5a075]/35 hover:border-[#c5a075] hover:bg-[#c5a075]/10 text-[9px] uppercase font-bold tracking-widest px-3 py-1.5 rounded transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    {showAddPackage ? "Cancel" : "Add New Package"}
                  </button>
                </div>

                {/* Create New Session Package Form */}
                {showAddPackage && (
                  <div className="flex flex-col items-center gap-4 mb-6 border-b border-white/5 pb-6">
                    <span className="text-[10px] uppercase text-white/30 tracking-wider">
                      Drafting New Card (Live Preview)
                    </span>
                    
                    <div
                      className="flex flex-col bg-[#0c0c0e] border border-[#c5a075]/40 rounded-md p-8 relative w-full max-w-[360px] text-left"
                      style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.5)' }}
                    >
                      {/* Gold card accent */}
                      <div className="absolute inset-0 z-20 border border-[var(--accent)]/10 rounded-md pointer-events-none" />

                      {/* Number and Timeline */}
                      <div className="flex justify-between items-center mb-6 relative z-10">
                        <span className="text-[10px] font-mono text-[#c5a075] font-medium tracking-widest">
                          0{packages.length + 1} //
                        </span>
                        <input 
                          type="text" 
                          placeholder="7-10 Days Turnaround"
                          value={newPackageData.timeline}
                          onChange={(e) => setNewPackageData({ ...newPackageData, timeline: e.target.value })}
                          className="bg-white/5 border border-white/10 text-white/70 text-[8px] font-mono tracking-widest px-2.5 py-0.5 rounded text-center w-28 focus:border-[#c5a075] outline-none"
                        />
                      </div>

                      {/* Title */}
                      <div className="mb-4 relative z-10">
                        <input 
                          type="text" 
                          placeholder="PACKAGE TITLE (e.g. PORTRAITS)"
                          value={newPackageData.title}
                          onChange={(e) => setNewPackageData({ ...newPackageData, title: e.target.value })}
                          className="bg-transparent border-b border-white/10 text-white font-display text-[15px] tracking-wider uppercase focus:border-[#c5a075] w-full outline-none py-1"
                        />
                      </div>

                      {/* Description */}
                      <div className="mb-4 relative z-10">
                        <textarea 
                          placeholder="Write package description here..."
                          value={newPackageData.desc}
                          onChange={(e) => setNewPackageData({ ...newPackageData, desc: e.target.value })}
                          className="bg-transparent border border-white/10 rounded p-2 text-[11px] leading-relaxed text-white/50 w-full h-16 resize-none focus:border-[#c5a075] outline-none font-sans"
                        />
                      </div>

                      {/* Hours */}
                      <div className="mb-4 relative z-10 flex items-center justify-between gap-2 border-t border-white/5 pt-4">
                        <span className="text-[9px] uppercase tracking-wider text-white/30">Hours Included</span>
                        <input 
                          type="number" 
                          value={newPackageData.baseHours}
                          onChange={(e) => setNewPackageData({ ...newPackageData, baseHours: parseInt(e.target.value) || 0 })}
                          className="bg-transparent border-b border-white/10 text-white text-right text-[11px] focus:border-[#c5a075] outline-none w-16"
                        />
                      </div>

                      {/* Deliverables */}
                      <div className="mb-5 relative z-10">
                        <span className="text-[8px] uppercase tracking-widest text-[#c5a075] block mb-1 font-semibold">
                          Deliverables (one per line)
                        </span>
                        <textarea 
                          placeholder="e.g.&#10;2 Hours Session Coverage&#10;25 Fully Graded Frames"
                          value={newPackageData.deliverables}
                          onChange={(e) => setNewPackageData({ ...newPackageData, deliverables: e.target.value })}
                          className="bg-transparent border border-white/10 rounded p-2 text-[11.5px] leading-relaxed text-white/50 w-full h-24 resize-none focus:border-[#c5a075] outline-none font-sans"
                        />
                      </div>

                      {/* Price Label */}
                      <div className="mt-auto border-t border-white/5 pt-4 w-full flex justify-between items-center relative z-10">
                        <span className="text-[7.5px] font-mono text-white/30 uppercase tracking-widest leading-none">Base Price (Rs.)</span>
                        <input 
                          type="number" 
                          value={newPackageData.basePrice}
                          onChange={(e) => setNewPackageData({ ...newPackageData, basePrice: parseInt(e.target.value) || 0 })}
                          className="bg-transparent border-b border-white/10 text-right text-[16px] font-display text-[#c5a075] outline-none focus:border-[#c5a075] w-28"
                        />
                      </div>

                      <button
                        onClick={() => {
                          if (!newPackageData.title.trim()) return alert("Package title is required");
                          if (!newPackageData.desc.trim()) return alert("Package description is required");
                          const dels = newPackageData.deliverables.split("\n").map(d => d.trim()).filter(d => d !== "");
                          if (dels.length === 0) return alert("At least one deliverable is required");

                          const newPkg = {
                            id: `pkg-${Date.now()}`,
                            num: `0${packages.length + 1}`.slice(-2),
                            title: newPackageData.title.toUpperCase(),
                            desc: newPackageData.desc,
                            basePrice: newPackageData.basePrice,
                            baseHours: newPackageData.baseHours,
                            deliverables: dels,
                            timeline: newPackageData.timeline || "7-10 Days Turnaround"
                          };

                          const updated = [...packages, newPkg];
                          savePackages(updated);
                          setShowAddPackage(false);
                          setNewPackageData({
                            title: "",
                            desc: "",
                            basePrice: 10000,
                            baseHours: 2,
                            deliverables: "",
                            timeline: "7-10 Days Turnaround"
                          });
                          triggerAlert("New session package created!");
                        }}
                        className="bg-[#c5a075] text-[#080808] font-bold text-xs uppercase tracking-widest py-3 rounded hover:bg-white transition-colors cursor-pointer w-full mt-6 relative z-10"
                      >
                        Publish Package
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {packages.map((pkg) => (
                    <div 
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className="flex flex-col bg-[#0c0c0e] border border-white/5 hover:border-[#c5a075]/40 rounded-md p-6 hover:bg-[#101013] transition-all duration-300 relative group cursor-pointer text-left"
                      style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.5)' }}
                    >
                      {/* Accent highlight */}
                      <div className="absolute inset-0 z-20 border border-[#c5a075]/0 group-hover:border-[#c5a075]/10 rounded-md pointer-events-none transition-all duration-300" />
                      
                      {/* Number and Timeline */}
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-mono text-[#c5a075] font-medium tracking-widest">{pkg.num} //</span>
                        <span className="bg-white/5 border border-white/10 text-white/60 text-[7px] font-mono tracking-widest px-2.5 py-0.5 rounded">
                          {pkg.timeline}
                        </span>
                      </div>

                      <h3 className="font-display text-[13px] tracking-wider uppercase text-white leading-tight mb-3 group-hover:text-[#c5a075] transition-colors">
                        {pkg.title}
                      </h3>

                      <p className="text-[10.5px] leading-relaxed text-white/40 font-light tracking-wide mb-6 min-h-[50px] line-clamp-3">
                        {pkg.desc}
                      </p>

                      {/* Deliverables Preview */}
                      <ul className="flex flex-col gap-2.5 mb-6 flex-grow border-t border-white/5 pt-4">
                        {(pkg.deliverables || []).slice(0, 3).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-[10px] font-light text-white/50 tracking-wide">
                            <Check size={8} className="text-[#c5a075] mt-1 shrink-0" />
                            <span className="truncate">{item}</span>
                          </li>
                        ))}
                        {(pkg.deliverables || []).length > 3 && (
                          <li className="text-[8.5px] text-white/30 italic uppercase tracking-wider pl-4">
                            + {(pkg.deliverables || []).length - 3} more deliverables
                          </li>
                        )}
                      </ul>

                      {/* Price Label */}
                      <div className="mt-auto border-t border-white/5 pt-4 w-full flex justify-between items-end">
                        <span className="text-[7px] font-mono text-white/30 uppercase tracking-widest leading-none mb-1">Base Investment</span>
                        <span className="text-[14px] font-display text-[#c5a075] font-light leading-none tracking-tight">
                          Rs. {(pkg.basePrice || 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Package edit popup modal */}
                {selectedPackage && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in p-4">
                    <div 
                      className="flex flex-col bg-[#0c0c0e] border border-[#c5a075]/40 rounded-md p-8 relative w-full max-w-[380px] shadow-2xl animate-scale-up text-left"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Header toolbar */}
                      <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-5">
                        <span className="text-[9px] uppercase tracking-widest text-[#c5a075] font-bold">
                          Edit Package Card
                        </span>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => {
                              if (confirm("Are you sure you want to delete this entire session package? This cannot be undone.")) {
                                const updated = packages.filter(p => p.id !== selectedPackage.id);
                                savePackages(updated);
                                setSelectedPackage(null);
                                triggerAlert("Session package deleted!");
                              }
                            }}
                            className="text-red-400 hover:text-red-300 text-[9px] uppercase font-bold tracking-wider cursor-pointer"
                          >
                            Delete
                          </button>
                          <button onClick={() => setSelectedPackage(null)} className="text-white/40 hover:text-white cursor-pointer">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Number and Timeline */}
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-[10px] font-mono text-[#c5a075] font-medium tracking-widest">
                          {selectedPackage.num} //
                        </span>
                        <input 
                          type="text"
                          value={selectedPackage.timeline || ""}
                          onChange={(e) => {
                            const updated = { ...selectedPackage, timeline: e.target.value };
                            setSelectedPackage(updated);
                            savePackages(packages.map(p => p.id === updated.id ? updated : p));
                          }}
                          className="bg-white/5 border border-white/10 text-white/70 text-[8px] font-mono tracking-widest px-2 py-0.5 rounded text-center w-28 focus:border-[#c5a075] outline-none"
                          placeholder="Timeline..."
                        />
                      </div>

                      {/* Title */}
                      <div className="mb-4">
                        <label className="text-[8px] uppercase text-white/30 block mb-1">Package Title</label>
                        <input 
                          type="text"
                          value={selectedPackage.title}
                          onChange={(e) => {
                            const updated = { ...selectedPackage, title: e.target.value.toUpperCase() };
                            setSelectedPackage(updated);
                            savePackages(packages.map(p => p.id === updated.id ? updated : p));
                          }}
                          className="bg-transparent border-b border-white/10 text-white font-display text-[16px] tracking-wider uppercase focus:border-[#c5a075] outline-none w-full"
                          placeholder="TITLE"
                        />
                      </div>

                      {/* Description */}
                      <div className="mb-4">
                        <label className="text-[8px] uppercase text-white/30 block mb-1">Description</label>
                        <textarea 
                          value={selectedPackage.desc}
                          onChange={(e) => {
                            const updated = { ...selectedPackage, desc: e.target.value };
                            setSelectedPackage(updated);
                            savePackages(packages.map(p => p.id === updated.id ? updated : p));
                          }}
                          className="bg-transparent border border-white/10 rounded p-2 text-[11px] leading-relaxed text-white/60 w-full h-16 resize-none focus:border-[#c5a075] outline-none font-sans"
                          placeholder="Description..."
                        />
                      </div>

                      {/* Hours */}
                      <div className="mb-4 flex items-center justify-between border-t border-white/5 pt-4">
                        <label className="text-[8px] uppercase text-white/30">Hours Included</label>
                        <input 
                          type="number"
                          value={selectedPackage.baseHours}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 0;
                            const updated = { ...selectedPackage, baseHours: val };
                            setSelectedPackage(updated);
                            savePackages(packages.map(p => p.id === updated.id ? updated : p));
                          }}
                          className="bg-transparent border-b border-white/10 text-white text-right text-[11px] focus:border-[#c5a075] outline-none w-16"
                        />
                      </div>

                      {/* Deliverables */}
                      <div className="mb-5">
                        <label className="text-[8px] uppercase text-white/30 block mb-1">Deliverables (one per line)</label>
                        <textarea 
                          value={(selectedPackage.deliverables || []).join("\n")}
                          onChange={(e) => {
                            const dels = e.target.value.split("\n").map(d => d.trim()).filter(d => d !== "");
                            const updated = { ...selectedPackage, deliverables: dels };
                            setSelectedPackage(updated);
                            savePackages(packages.map(p => p.id === updated.id ? updated : p));
                          }}
                          className="bg-transparent border border-white/10 rounded p-2 text-[11.5px] leading-relaxed text-white/60 w-full h-24 resize-none focus:border-[#c5a075] outline-none font-sans animate-fade-in"
                          placeholder="Deliverables..."
                        />
                      </div>

                      {/* Price Label */}
                      <div className="mt-auto border-t border-white/5 pt-4 flex justify-between items-center">
                        <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Base Price (Rs.)</span>
                        <input 
                          type="number"
                          value={selectedPackage.basePrice}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 0;
                            const updated = { ...selectedPackage, basePrice: val };
                            setSelectedPackage(updated);
                            savePackages(packages.map(p => p.id === updated.id ? updated : p));
                          }}
                          className="bg-transparent border-b border-white/10 text-right text-[16px] font-display text-[#c5a075] outline-none focus:border-[#c5a075] w-28"
                        />
                      </div>

                      <button
                        onClick={() => setSelectedPackage(null)}
                        className="mt-6 w-full bg-[#c5a075] text-[#080808] font-bold text-xs uppercase tracking-widest py-2.5 rounded hover:bg-white transition-colors cursor-pointer"
                      >
                        Close & Save
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Add-ons & Extra Rates Settings */}
              {pricingConfig && (
                <div className="border border-white/5 bg-[#0a0a0c] p-5 rounded-md flex flex-col gap-4 mt-2">
                  <span className="text-[10px] uppercase text-white/30 tracking-[0.25em] font-semibold border-b border-white/5 pb-2">
                    Calculator Variable Rates
                  </span>

                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center gap-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-wider">Extra Hour Rate</span>
                        <span className="text-[9px] text-white/40 mt-0.5">Applied per additional hour in pricing calculator</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-white/40 uppercase">Rs.</span>
                        <input 
                          type="number"
                          value={pricingConfig.hourlyRate}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 0;
                            const updated = { ...pricingConfig, hourlyRate: val };
                            setPricingConfig(updated);
                            savePricingConfig(updated);
                          }}
                          className="w-28 bg-white/5 border border-white/10 px-3 py-1.5 text-xs text-right rounded text-white focus:border-[#c5a075] outline-none"
                        />
                      </div>
                    </div>

                    {/* Add-ons Map */}
                    <div className="flex flex-col gap-3 border-t border-white/5 pt-4">
                      <span className="text-[10px] uppercase tracking-widest text-[#c5a075] font-semibold">Addon Service Items</span>
                      {Object.keys(pricingConfig.addons || {}).map((key) => {
                        const addon = pricingConfig.addons[key];
                        return (
                          <div key={key} className="flex justify-between items-center bg-[#0d0d10] p-3 border border-white/5 rounded">
                            <span className="text-xs text-white/80">{addon.label}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-white/30">Rs.</span>
                              <input 
                                type="number" 
                                value={addon.price}
                                onChange={(e) => {
                                  const val = parseInt(e.target.value) || 0;
                                  const configCopy = { ...pricingConfig };
                                  configCopy.addons[key].price = val;
                                  setPricingConfig(configCopy);
                                  savePricingConfig(configCopy);
                                }}
                                className="w-24 bg-white/5 border border-white/10 px-2 py-1 text-xs text-right rounded text-white focus:border-[#c5a075] outline-none"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "journals" && (
            <div className="flex flex-col gap-6 animate-fade-in text-left">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div>
                  <h1 className="font-display text-4xl text-[#c5a075]">JOURNAL EDITOR</h1>
                  <p className="text-white/40 text-xs mt-1">Publish essays, daily diary logs, EXIF configurations, and moderate reflections.</p>
                </div>
                {!selectedJournal && (
                  <button
                    onClick={() => setShowAddJournal(!showAddJournal)}
                    className="flex items-center gap-1.5 border border-[#c5a075]/35 hover:border-[#c5a075] hover:bg-[#c5a075]/10 text-[9px] uppercase font-bold tracking-widest px-3 py-1.5 rounded transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    {showAddJournal ? "Cancel" : "Add New Journal"}
                  </button>
                )}
              </div>

              {/* Create New Journal Post Collapsible Card */}
              {showAddJournal && !selectedJournal && (
                <div className="flex flex-col gap-5 border border-[#c5a075]/30 bg-[#0a0a0c] p-6 rounded-md mb-4 animate-fade-in text-left">
                  <span className="text-xs text-[#c5a075] uppercase tracking-widest font-bold border-b border-white/5 pb-2">
                    Create New Journal Post
                  </span>

                  {/* Title & Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <label className="text-[9px] uppercase tracking-wider text-white/40 font-semibold">Post Title *</label>
                      <input 
                        type="text" 
                        placeholder="e.g. THE RESTLESS LIGHT"
                        value={newJournalData.title}
                        onChange={(e) => setNewJournalData({ ...newJournalData, title: e.target.value })}
                        className="bg-white/5 border border-white/10 px-3 py-2 text-xs rounded focus:border-[#c5a075] outline-none text-white font-sans"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase tracking-wider text-white/40 font-semibold">Post Category *</label>
                      <select 
                        value={newJournalData.type}
                        onChange={(e) => setNewJournalData({ ...newJournalData, type: e.target.value })}
                        className="bg-[#0c0c0e] border border-white/10 px-3 py-2 text-xs rounded focus:border-[#c5a075] outline-none text-white cursor-pointer"
                      >
                        <option value="essay">Photo Essay</option>
                        <option value="log">Daily Field Log</option>
                      </select>
                    </div>
                  </div>

                  {/* Image cover upload */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase tracking-wider text-white/40 font-semibold">Cover Image *</label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[#0d0d10] p-3 border border-white/5 rounded">
                      {newJournalData.coverImage ? (
                        <img src={newJournalData.coverImage} className="w-28 h-18 object-cover rounded border border-white/10 shrink-0 bg-black" alt="Cover" />
                      ) : (
                        <div className="w-28 h-18 rounded border border-dashed border-white/10 shrink-0 bg-black flex items-center justify-center text-[8px] text-white/30 uppercase tracking-widest text-center">
                          No Cover
                        </div>
                      )}
                      <div className="flex-grow w-full flex flex-col gap-2">
                        <input 
                          type="text" 
                          placeholder="Paste cover image URL..."
                          value={newJournalData.coverImage}
                          onChange={(e) => setNewJournalData({ ...newJournalData, coverImage: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 px-3 py-1.5 text-xs rounded focus:border-[#c5a075] outline-none text-white font-sans"
                        />
                        <div className="flex items-center gap-2">
                          <input 
                            type="file" 
                            accept="image/*" 
                            id="new-journal-cover-upload"
                            className="hidden" 
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (!file) return;
                              triggerAlert("Uploading to Cloudinary...");
                              uploadToCloudinary(file)
                                .then((url) => {
                                  setNewJournalData({ ...newJournalData, coverImage: url });
                                  triggerAlert("Cover uploaded!");
                                })
                                .catch((err) => {
                                  console.error(err);
                                  alert("Failed to upload: " + err.message);
                                });
                            }}
                          />
                          <label 
                            htmlFor="new-journal-cover-upload" 
                            className="bg-[#c5a075]/10 border border-[#c5a075]/35 hover:bg-[#c5a075] hover:text-[#080808] text-[9px] px-2.5 py-1 rounded transition-all cursor-pointer uppercase font-bold tracking-wider"
                          >
                            Upload Local Cover Image
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* General Metadata */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase tracking-wider text-white/40">Location</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Lofoten, Norway"
                        value={newJournalData.location}
                        onChange={(e) => setNewJournalData({ ...newJournalData, location: e.target.value })}
                        className="bg-white/5 border border-white/10 px-3 py-2 text-xs rounded focus:border-[#c5a075] outline-none text-white font-sans"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase tracking-wider text-white/40">Date Stamp</label>
                      <input 
                        type="text" 
                        placeholder="e.g. JUNE 2026"
                        value={newJournalData.date}
                        onChange={(e) => setNewJournalData({ ...newJournalData, date: e.target.value.toUpperCase() })}
                        className="bg-white/5 border border-white/10 px-3 py-2 text-xs rounded focus:border-[#c5a075] outline-none text-white font-sans"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase tracking-wider text-white/40">Camera Body</label>
                      <input 
                        type="text" 
                        value={newJournalData.camera}
                        onChange={(e) => setNewJournalData({ ...newJournalData, camera: e.target.value })}
                        className="bg-white/5 border border-white/10 px-3 py-2 text-xs rounded focus:border-[#c5a075] outline-none text-white font-sans"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase tracking-wider text-white/40">Lens Model</label>
                      <input 
                        type="text" 
                        value={newJournalData.lens}
                        onChange={(e) => setNewJournalData({ ...newJournalData, lens: e.target.value })}
                        className="bg-white/5 border border-white/10 px-3 py-2 text-xs rounded focus:border-[#c5a075] outline-none text-white font-sans"
                      />
                    </div>
                  </div>

                  {/* Essay Fields */}
                  {newJournalData.type === "essay" && (
                    <div className="flex flex-col gap-4 border border-white/5 p-4 rounded bg-black/35">
                      <span className="text-[9px] uppercase tracking-widest text-[#c5a075] block font-bold">Photo Essay Configuration</span>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[9px] uppercase tracking-wider text-white/40">Chapter Index</label>
                          <input 
                            type="text" 
                            placeholder="e.g. CHAPTER I"
                            value={newJournalData.chapter}
                            onChange={(e) => setNewJournalData({ ...newJournalData, chapter: e.target.value.toUpperCase() })}
                            className="bg-white/5 border border-white/10 px-3 py-2 text-xs rounded focus:border-[#c5a075] outline-none text-white font-sans"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[9px] uppercase tracking-wider text-white/40">Read Time</label>
                          <input 
                            type="text" 
                            placeholder="e.g. 4 Min Read"
                            value={newJournalData.readTime}
                            onChange={(e) => setNewJournalData({ ...newJournalData, readTime: e.target.value })}
                            className="bg-white/5 border border-white/10 px-3 py-2 text-xs rounded focus:border-[#c5a075] outline-none text-white font-sans"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[9px] uppercase tracking-wider text-white/40">Subtitle</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Atmospheric density study..."
                            value={newJournalData.subtitle}
                            onChange={(e) => setNewJournalData({ ...newJournalData, subtitle: e.target.value })}
                            className="bg-white/5 border border-white/10 px-3 py-2 text-xs rounded focus:border-[#c5a075] outline-none text-white font-sans"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] uppercase tracking-wider text-white/40">Excerpt Summary *</label>
                        <textarea 
                          placeholder="Write a brief excerpt summary for grid listings..."
                          value={newJournalData.excerpt}
                          onChange={(e) => setNewJournalData({ ...newJournalData, excerpt: e.target.value })}
                          className="bg-white/5 border border-white/10 px-3 py-2 text-xs rounded focus:border-[#c5a075] outline-none h-14 resize-none text-white font-sans"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] uppercase tracking-wider text-white/40">Essay Content (Paragraphs) *</label>
                        <textarea 
                          placeholder="Write your photo essay content paragraphs..."
                          value={newJournalData.chaptersText}
                          onChange={(e) => setNewJournalData({ ...newJournalData, chaptersText: e.target.value })}
                          className="bg-white/5 border border-white/10 px-3 py-2 text-xs rounded focus:border-[#c5a075] outline-none h-44 text-white font-sans"
                        />
                      </div>
                    </div>
                  )}

                  {/* Daily Log Fields */}
                  {newJournalData.type === "log" && (
                    <div className="flex flex-col gap-4 border border-white/5 p-4 rounded bg-black/35">
                      <span className="text-[9px] uppercase tracking-widest text-[#c5a075] block font-bold">Daily Field Log Configuration</span>
                      
                      <div className="grid grid-cols-4 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[9px] uppercase tracking-wider text-white/40">Aperture</label>
                          <input 
                            type="text" 
                            placeholder="e.g. f/8.0"
                            value={newJournalData.exif.aperture}
                            onChange={(e) => setNewJournalData({ ...newJournalData, exif: { ...newJournalData.exif, aperture: e.target.value } })}
                            className="bg-white/5 border border-white/10 px-3 py-2 text-xs rounded focus:border-[#c5a075] outline-none text-white font-sans"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[9px] uppercase tracking-wider text-white/40">Shutter Speed</label>
                          <input 
                            type="text" 
                            placeholder="e.g. 1/125s"
                            value={newJournalData.exif.shutter}
                            onChange={(e) => setNewJournalData({ ...newJournalData, exif: { ...newJournalData.exif, shutter: e.target.value } })}
                            className="bg-white/5 border border-white/10 px-3 py-2 text-xs rounded focus:border-[#c5a075] outline-none text-white font-sans"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[9px] uppercase tracking-wider text-white/40">ISO Sensitivity</label>
                          <input 
                            type="text" 
                            placeholder="e.g. ISO 100"
                            value={newJournalData.exif.iso}
                            onChange={(e) => setNewJournalData({ ...newJournalData, exif: { ...newJournalData.exif, iso: e.target.value } })}
                            className="bg-white/5 border border-white/10 px-3 py-2 text-xs rounded focus:border-[#c5a075] outline-none text-white font-sans"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[9px] uppercase tracking-wider text-white/40">Focal Length</label>
                          <input 
                            type="text" 
                            placeholder="e.g. 50mm"
                            value={newJournalData.exif.focal}
                            onChange={(e) => setNewJournalData({ ...newJournalData, exif: { ...newJournalData.exif, focal: e.target.value } })}
                            className="bg-white/5 border border-white/10 px-3 py-2 text-xs rounded focus:border-[#c5a075] outline-none text-white font-sans"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] uppercase tracking-wider text-white/40">Log Reflection Notes *</label>
                        <textarea 
                          placeholder="Write your field diary reflection thoughts..."
                          value={newJournalData.reflection}
                          onChange={(e) => setNewJournalData({ ...newJournalData, reflection: e.target.value })}
                          className="bg-white/5 border border-white/10 px-3 py-2 text-xs rounded focus:border-[#c5a075] outline-none h-24 text-white font-sans"
                        />
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      if (!newJournalData.title.trim()) return alert("Post title is required");
                      if (!newJournalData.coverImage.trim()) return alert("Cover image is required");

                      const newId = `${newJournalData.type}-${Date.now()}`;
                      const postDate = newJournalData.date.trim() || new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
                      
                      const newPost = {
                        id: newId,
                        type: newJournalData.type,
                        title: newJournalData.title.toUpperCase(),
                        date: postDate,
                        location: newJournalData.location || "Not Specified",
                        camera: newJournalData.camera || "Sony A7R V",
                        lens: newJournalData.lens || "24-70mm f/2.8",
                        coverImage: newJournalData.coverImage,
                        likes: 0,
                        comments: [],
                        likedByMe: false,
                        ...(newJournalData.type === "essay" ? {
                          chapter: newJournalData.chapter || "CHAPTER I",
                          readTime: newJournalData.readTime || "4 Min Read",
                          subtitle: newJournalData.subtitle || "",
                          excerpt: newJournalData.excerpt || "",
                          chapters: [
                            { title: "I. INTRODUCTION", text: newJournalData.chaptersText }
                          ]
                        } : {
                          reflection: newJournalData.reflection || "",
                          exif: {
                            aperture: newJournalData.exif.aperture || "f/8.0",
                            shutter: newJournalData.exif.shutter || "1/125s",
                            iso: newJournalData.exif.iso || "ISO 100",
                            focal: newJournalData.exif.focal || "50mm"
                          }
                        })
                      };

                      const updated = [newPost, ...journals];
                      saveJournals(updated);
                      setShowAddJournal(false);
                      setNewJournalData({
                        title: "",
                        type: "essay",
                        chapter: "CHAPTER I",
                        readTime: "4 Min Read",
                        subtitle: "",
                        coverImage: "",
                        excerpt: "",
                        location: "",
                        camera: "Sony A7R V",
                        lens: "24-70mm f/2.8 GM II",
                        chaptersText: "",
                        reflection: "",
                        exif: {
                          aperture: "f/8.0",
                          shutter: "1/125s",
                          iso: "ISO 100",
                          focal: "50mm"
                        }
                      });
                      triggerAlert("New journal post published!");
                    }}
                    className="bg-[#c5a075] text-[#080808] font-bold text-xs uppercase tracking-widest py-3 rounded hover:bg-white transition-colors cursor-pointer w-full"
                  >
                    Publish Journal Article
                  </button>
                </div>
              )}

              {/* Dynamic Edit/Delete Modal Panel */}
              {selectedJournal ? (
                <div className="flex flex-col gap-6 border border-[#c5a075] bg-[#0c0c0e] p-6 rounded-md">
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[#c5a075] uppercase tracking-widest font-bold">
                        Configure: {selectedJournal.title}
                      </span>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete this journal post: "${selectedJournal.title}"?`)) {
                            const updated = journals.filter(j => j.id !== selectedJournal.id);
                            saveJournals(updated);
                            setSelectedJournal(null);
                            triggerAlert("Journal post deleted!");
                          }
                        }}
                        className="text-red-400 hover:text-red-300 text-[9px] uppercase font-bold tracking-wider cursor-pointer"
                      >
                        Delete Post
                      </button>
                    </div>
                    <button 
                      onClick={() => setSelectedJournal(null)} 
                      className="text-white/40 hover:text-white text-xs uppercase tracking-widest cursor-pointer"
                    >
                      ← Back to index
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Forms */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                      
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] uppercase tracking-wider text-white/40">Article Title</label>
                        <input 
                          type="text"
                          value={selectedJournal.title}
                          onChange={(e) => {
                            const updated = { ...selectedJournal, title: e.target.value.toUpperCase() };
                            setSelectedJournal(updated);
                            saveJournals(journals.map(j => j.id === updated.id ? updated : j));
                          }}
                          className="bg-white/5 border border-white/10 px-3 py-2 text-xs rounded text-white focus:border-[#c5a075] outline-none"
                        />
                      </div>

                      {/* Image cover upload */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] uppercase tracking-wider text-white/40">Cover Image URL</label>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-[#0d0d10] p-2 border border-white/5 rounded">
                          <img src={selectedJournal.coverImage} className="w-20 h-14 object-cover rounded shrink-0 bg-black" alt="Cover" />
                          <div className="flex-grow w-full flex flex-col gap-1.5">
                            <input 
                              type="text"
                              value={selectedJournal.coverImage}
                              onChange={(e) => {
                                const updated = { ...selectedJournal, coverImage: e.target.value };
                                setSelectedJournal(updated);
                                saveJournals(journals.map(j => j.id === updated.id ? updated : j));
                              }}
                              className="w-full bg-white/5 border border-white/10 px-3 py-1 text-xs rounded focus:border-[#c5a075] outline-none text-white font-sans"
                            />
                            <div>
                              <input 
                                type="file" 
                                accept="image/*" 
                                id={`edit-cover-${selectedJournal.id}`}
                                className="hidden" 
                                onChange={(e) => {
                                  const file = e.target.files[0];
                                  if (!file) return;
                                  triggerAlert("Uploading to Cloudinary...");
                                  uploadToCloudinary(file)
                                    .then((url) => {
                                      const updated = { ...selectedJournal, coverImage: url };
                                      setSelectedJournal(updated);
                                      saveJournals(journals.map(j => j.id === updated.id ? updated : j));
                                      triggerAlert("Cover uploaded & saved!");
                                    })
                                    .catch((err) => {
                                      console.error(err);
                                      alert("Failed to upload: " + err.message);
                                    });
                                }}
                              />
                              <label 
                                htmlFor={`edit-cover-${selectedJournal.id}`}
                                className="bg-[#c5a075]/10 border border-[#c5a075]/35 hover:bg-[#c5a075] hover:text-[#080808] text-[8px] px-2 py-0.5 rounded transition-all cursor-pointer uppercase font-bold tracking-wider"
                              >
                                Upload Image
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* General metadata */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] uppercase tracking-wider text-white/40">Location</label>
                          <input 
                            type="text"
                            value={selectedJournal.location || ""}
                            onChange={(e) => {
                              const updated = { ...selectedJournal, location: e.target.value };
                              setSelectedJournal(updated);
                              saveJournals(journals.map(j => j.id === updated.id ? updated : j));
                            }}
                            className="bg-white/5 border border-white/10 px-3 py-2 text-xs rounded text-white focus:border-[#c5a075] outline-none"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] uppercase tracking-wider text-white/40">Date</label>
                          <input 
                            type="text"
                            value={selectedJournal.date || ""}
                            onChange={(e) => {
                              const updated = { ...selectedJournal, date: e.target.value.toUpperCase() };
                              setSelectedJournal(updated);
                              saveJournals(journals.map(j => j.id === updated.id ? updated : j));
                            }}
                            className="bg-white/5 border border-white/10 px-3 py-2 text-xs rounded text-white focus:border-[#c5a075] outline-none"
                          />
                        </div>
                      </div>

                      {/* Camera body and lens body */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] uppercase tracking-wider text-white/40">Camera Body</label>
                          <input 
                            type="text"
                            value={selectedJournal.camera || ""}
                            onChange={(e) => {
                              const updated = { ...selectedJournal, camera: e.target.value };
                              setSelectedJournal(updated);
                              saveJournals(journals.map(j => j.id === updated.id ? updated : j));
                            }}
                            className="bg-white/5 border border-white/10 px-3 py-2 text-xs rounded text-white focus:border-[#c5a075] outline-none"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] uppercase tracking-wider text-white/40">Lens Model</label>
                          <input 
                            type="text"
                            value={selectedJournal.lens || ""}
                            onChange={(e) => {
                              const updated = { ...selectedJournal, lens: e.target.value };
                              setSelectedJournal(updated);
                              saveJournals(journals.map(j => j.id === updated.id ? updated : j));
                            }}
                            className="bg-white/5 border border-white/10 px-3 py-2 text-xs rounded text-white focus:border-[#c5a075] outline-none"
                          />
                        </div>
                      </div>

                      {/* Log Fields */}
                      {selectedJournal.type === "log" && (
                        <div className="flex flex-col gap-4 border border-white/5 p-4 rounded bg-black/40">
                          <span className="text-[9px] uppercase tracking-widest text-[#c5a075] block font-bold border-b border-white/5 pb-2">Log Parameters</span>
                          
                          <div className="grid grid-cols-4 gap-4">
                            <div className="flex flex-col gap-1">
                              <label className="text-[8px] uppercase tracking-wider text-white/40">Aperture</label>
                              <input 
                                type="text"
                                value={selectedJournal.exif?.aperture || ""}
                                onChange={(e) => {
                                  const updated = { ...selectedJournal, exif: { ...(selectedJournal.exif || {}), aperture: e.target.value } };
                                  setSelectedJournal(updated);
                                  saveJournals(journals.map(j => j.id === updated.id ? updated : j));
                                }}
                                className="bg-white/5 border border-white/10 px-2 py-1.5 text-xs rounded text-white focus:border-[#c5a075] outline-none"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-[8px] uppercase tracking-wider text-white/40">Shutter</label>
                              <input 
                                type="text"
                                value={selectedJournal.exif?.shutter || ""}
                                onChange={(e) => {
                                  const updated = { ...selectedJournal, exif: { ...(selectedJournal.exif || {}), shutter: e.target.value } };
                                  setSelectedJournal(updated);
                                  saveJournals(journals.map(j => j.id === updated.id ? updated : j));
                                }}
                                className="bg-white/5 border border-white/10 px-2 py-1.5 text-xs rounded text-white focus:border-[#c5a075] outline-none"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-[8px] uppercase tracking-wider text-white/40">ISO</label>
                              <input 
                                type="text"
                                value={selectedJournal.exif?.iso || ""}
                                onChange={(e) => {
                                  const updated = { ...selectedJournal, exif: { ...(selectedJournal.exif || {}), iso: e.target.value } };
                                  setSelectedJournal(updated);
                                  saveJournals(journals.map(j => j.id === updated.id ? updated : j));
                                }}
                                className="bg-white/5 border border-white/10 px-2 py-1.5 text-xs rounded text-white focus:border-[#c5a075] outline-none"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-[8px] uppercase tracking-wider text-white/40">Focal</label>
                              <input 
                                type="text"
                                value={selectedJournal.exif?.focal || ""}
                                onChange={(e) => {
                                  const updated = { ...selectedJournal, exif: { ...(selectedJournal.exif || {}), focal: e.target.value } };
                                  setSelectedJournal(updated);
                                  saveJournals(journals.map(j => j.id === updated.id ? updated : j));
                                }}
                                className="bg-white/5 border border-white/10 px-2 py-1.5 text-xs rounded text-white focus:border-[#c5a075] outline-none"
                              />
                            </div>
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] uppercase tracking-wider text-white/40">Reflection Note</label>
                            <textarea 
                              value={selectedJournal.reflection || ""}
                              onChange={(e) => {
                                const updated = { ...selectedJournal, reflection: e.target.value };
                                setSelectedJournal(updated);
                                saveJournals(journals.map(j => j.id === updated.id ? updated : j));
                              }}
                              className="bg-white/5 border border-white/10 px-3 py-2 text-xs rounded h-20 text-white focus:border-[#c5a075] outline-none"
                            />
                          </div>
                        </div>
                      )}

                      {/* Essay Fields */}
                      {selectedJournal.type === "essay" && (
                        <div className="flex flex-col gap-4 border border-white/5 p-4 rounded bg-black/40">
                          <span className="text-[9px] uppercase tracking-widest text-[#c5a075] block font-bold border-b border-white/5 pb-2 font-sans">Essay Parameters</span>
                          
                          <div className="grid grid-cols-3 gap-4">
                            <div className="flex flex-col gap-1">
                              <label className="text-[9px] uppercase tracking-wider text-white/40">Chapter Index</label>
                              <input 
                                type="text"
                                value={selectedJournal.chapter || ""}
                                onChange={(e) => {
                                  const updated = { ...selectedJournal, chapter: e.target.value.toUpperCase() };
                                  setSelectedJournal(updated);
                                  saveJournals(journals.map(j => j.id === updated.id ? updated : j));
                                }}
                                className="bg-white/5 border border-white/10 px-3 py-1.5 text-xs rounded text-white focus:border-[#c5a075] outline-none"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-[9px] uppercase tracking-wider text-white/40">Read Time</label>
                              <input 
                                type="text"
                                value={selectedJournal.readTime || ""}
                                onChange={(e) => {
                                  const updated = { ...selectedJournal, readTime: e.target.value };
                                  setSelectedJournal(updated);
                                  saveJournals(journals.map(j => j.id === updated.id ? updated : j));
                                }}
                                className="bg-white/5 border border-white/10 px-3 py-1.5 text-xs rounded text-white focus:border-[#c5a075] outline-none"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-[9px] uppercase tracking-wider text-white/40">Subtitle</label>
                              <input 
                                type="text"
                                value={selectedJournal.subtitle || ""}
                                onChange={(e) => {
                                  const updated = { ...selectedJournal, subtitle: e.target.value };
                                  setSelectedJournal(updated);
                                  saveJournals(journals.map(j => j.id === updated.id ? updated : j));
                                }}
                                className="bg-white/5 border border-white/10 px-3 py-1.5 text-xs rounded text-white focus:border-[#c5a075] outline-none"
                              />
                            </div>
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] uppercase tracking-wider text-white/40">Excerpt Summary</label>
                            <textarea 
                              value={selectedJournal.excerpt || ""}
                              onChange={(e) => {
                                const updated = { ...selectedJournal, excerpt: e.target.value };
                                setSelectedJournal(updated);
                                saveJournals(journals.map(j => j.id === updated.id ? updated : j));
                              }}
                              className="bg-white/5 border border-white/10 px-3 py-2 text-xs rounded h-16 text-white focus:border-[#c5a075] outline-none"
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] uppercase tracking-wider text-white/40">Essay Content (Paragraphs)</label>
                            <textarea 
                              value={selectedJournal.chapters?.[0]?.text || ""}
                              onChange={(e) => {
                                const chaptersCopy = [...(selectedJournal.chapters || [{ title: "I. INTRODUCTION", text: "" }])];
                                chaptersCopy[0] = { ...chaptersCopy[0], text: e.target.value };
                                const updated = { ...selectedJournal, chapters: chaptersCopy };
                                setSelectedJournal(updated);
                                saveJournals(journals.map(j => j.id === updated.id ? updated : j));
                              }}
                              className="bg-[#070709] border border-white/10 p-3 text-xs rounded h-44 text-white font-sans focus:border-[#c5a075] outline-none"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Comments Stream Moderation */}
                    <div className="flex flex-col gap-4 border-l border-white/5 pl-0 lg:pl-6">
                      <span className="text-[10px] uppercase text-white/30 tracking-widest font-semibold border-b border-white/5 pb-2 font-sans">
                        Moderation Comments ({(selectedJournal.comments || []).length})
                      </span>

                      <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-1">
                        {(selectedJournal.comments || []).length === 0 ? (
                          <p className="text-[9px] text-white/30 italic uppercase py-4 font-mono">No comments posted yet.</p>
                        ) : (
                          (selectedJournal.comments || []).map((comm, idx) => (
                            <div key={idx} className="bg-white/5 border border-white/10 rounded p-3 text-left">
                              <div className="flex justify-between items-center text-[8.5px] font-mono text-white/40 border-b border-white/5 pb-1 mb-2">
                                <span>{comm.name}</span>
                                <button
                                  onClick={() => {
                                    if (confirm("Delete this comment?")) {
                                      const commentsCopy = [...selectedJournal.comments];
                                      commentsCopy.splice(idx, 1);
                                      const updated = { ...selectedJournal, comments: commentsCopy };
                                      setSelectedJournal(updated);
                                      saveJournals(journals.map(j => j.id === updated.id ? updated : j));
                                      triggerAlert("Comment removed!");
                                    }
                                  }}
                                  className="text-red-400 hover:text-red-300 font-bold uppercase tracking-wider"
                                >
                                  Delete
                                </button>
                              </div>
                              <p className="text-[10.5px] leading-relaxed text-white/70 font-light font-sans">{comm.text}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Essays Card Grid Showcases */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {journals.map((post) => (
                    <div 
                      key={post.id}
                      onClick={() => setSelectedJournal(post)}
                      className="flex flex-col bg-[#0c0c0e] border border-white/5 hover:border-[#c5a075]/40 hover:bg-[#101013] rounded-md overflow-hidden cursor-pointer transition-all duration-300 relative group text-left"
                      style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.5)' }}
                    >
                      {/* Delete button indicator overlay */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Are you sure you want to delete this journal post: "${post.title}"?`)) {
                            const updated = journals.filter(j => j.id !== post.id);
                            saveJournals(updated);
                            triggerAlert("Journal post deleted!");
                          }
                        }}
                        className="absolute top-3 right-3 z-30 bg-red-950/80 border border-red-500/30 hover:bg-red-500 hover:text-[#080808] text-white rounded p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                        title="Delete Journal Post"
                      >
                        <Trash className="w-3.5 h-3.5" />
                      </button>

                      {/* Cover image */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-black/40 border-b border-white/5">
                        <img 
                          src={post.coverImage} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        />
                        <span className="absolute bottom-2 left-2 bg-black/75 text-[7px] text-[#c5a075] tracking-widest font-mono uppercase px-2 py-0.5 rounded border border-white/5">
                          {post.type === "essay" ? "Photo Essay" : "Field Log"}
                        </span>
                      </div>

                      {/* Detail Body */}
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex justify-between items-center text-[8px] font-mono text-white/30 tracking-wider mb-2 uppercase">
                          <span>{post.location}</span>
                          <span>{post.date}</span>
                        </div>
                        
                        <h4 className="font-display text-[14px] uppercase text-white tracking-wide truncate group-hover:text-[#c5a075] transition-colors leading-tight mb-2">
                          {post.title}
                        </h4>

                        <p className="text-[10px] text-white/40 leading-relaxed font-light line-clamp-3 mb-4">
                          {post.type === 'essay' ? post.excerpt : post.reflection}
                        </p>

                        <div className="mt-auto border-t border-white/5 pt-3.5 flex justify-between items-center text-[8.5px] font-mono text-white/30 uppercase">
                          <span>{(post.comments || []).length} Comments</span>
                          <span>{post.type === 'essay' ? post.readTime : post.camera}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: TESTIMONIALS QUEUE MODERATOR */}
          {activeTab === "testimonials" && (
            <div className="flex flex-col gap-6 animate-fade-in">
              <div className="border-b border-white/5 pb-4">
                <h1 className="font-display text-4xl text-[#c5a075]">REVIEWS MODERATOR</h1>
                <p className="text-white/40 text-xs mt-1">Approve pending client submissions or prune active ones.</p>
              </div>

              {/* Pending Queue Section */}
              <div className="flex flex-col gap-3">
                <span className="text-[10px] uppercase text-white/30 tracking-[0.25em] font-semibold flex items-center gap-2">
                  Pending Submissions Queue 
                  {pendingTestimonials.length > 0 && (
                    <span className="bg-[#c5a075] text-[#080808] text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                      {pendingTestimonials.length} NEW
                    </span>
                  )}
                </span>

                {pendingTestimonials.length === 0 ? (
                  <div className="bg-[#09090b]/50 border border-white/5 p-6 rounded-md text-center">
                    <p className="text-xs text-white/30 uppercase italic">No reviews currently awaiting approval.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {pendingTestimonials.map((review) => (
                      <div key={review.id} className="bg-[#0d0d10] border border-[#c5a075]/40 p-4 rounded-md flex flex-col gap-3">
                        <div className="flex justify-between items-start border-b border-white/5 pb-2">
                          <div>
                            <span className="text-xs font-bold text-white">{review.author}</span>
                            <span className="text-[9px] text-white/45 block uppercase">{review.role || "Client"}</span>
                          </div>
                          
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] text-[#c5a075] font-mono">{"★".repeat(review.rating)}</span>
                            <span className="text-[8px] bg-white/5 px-2 py-0.5 rounded-full uppercase tracking-wider text-white/50">{review.category}</span>
                          </div>
                        </div>

                        <p className="text-xs italic text-white/70">"{review.quote}"</p>

                        <div className="flex items-center justify-end gap-3 mt-1 pt-2 border-t border-white/5">
                          <button
                            onClick={() => {
                              // Deny / Delete
                              const pendingCopy = pendingTestimonials.filter(r => r.id !== review.id);
                              saveTestimonials(testimonials, pendingCopy);
                              triggerAlert("Submission deleted!");
                            }}
                            className="flex items-center gap-1 border border-red-500/30 hover:border-red-500 text-[10px] uppercase tracking-widest text-red-400 px-3 py-1 rounded transition-all"
                          >
                            <Trash className="w-3 h-3" />
                            Discard
                          </button>
                          
                          <button
                            onClick={() => {
                              // Approve -> Add to testimonials
                              const pendingCopy = pendingTestimonials.filter(r => r.id !== review.id);
                              const approvedCopy = [{ ...review, date: "JUST NOW" }, ...testimonials];
                              saveTestimonials(approvedCopy, pendingCopy);
                              triggerAlert("Review Approved & Published!");
                            }}
                            className="flex items-center gap-1 bg-[#c5a075] hover:bg-white text-[#080808] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded transition-all"
                          >
                            <Check className="w-3 h-3" />
                            Approve & Publish
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Published reviews management */}
              <div className="flex flex-col gap-3 border-t border-white/5 pt-6">
                <span className="text-[10px] uppercase text-white/30 tracking-[0.25em] font-semibold">
                  Published Reviews ({testimonials.length})
                </span>

                <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-1">
                  {testimonials.map((review) => (
                    <div key={review.id} className="bg-[#0a0a0c] p-3 border border-white/5 rounded-md flex justify-between items-center">
                      <div>
                        <h4 className="text-xs font-semibold text-white">{review.author}</h4>
                        <p className="text-[10px] text-white/40 truncate max-w-sm">"{review.quote}"</p>
                      </div>

                      <button
                        onClick={() => {
                          if (confirm("Are you sure you want to remove this published review?")) {
                            const updated = testimonials.filter(r => r.id !== review.id);
                            saveTestimonials(updated, pendingTestimonials);
                            triggerAlert("Review deleted!");
                          }
                        }}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <Trash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5.5: INQUIRIES FROM CONTACT FORM */}
          {activeTab === "inquiries" && (
            <div className="flex flex-col gap-6 animate-fade-in text-left">
              <div className="border-b border-white/5 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="font-display text-4xl text-[#c5a075]">LEADS & INQUIRIES</h1>
                  <p className="text-white/40 text-xs mt-1">Review contact form projects and email subscription signups.</p>
                </div>
                
                {/* Global inquiry action toolbar */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      const csvContent = inquirySubTab === "detailed"
                        ? "Timestamp,Name,Email,Shoot Type,Preferred Date,Budget,Message\r\n" + inquiries.map(i => `"${i.timestamp}","${i.name}","${i.email}","${i.shootType}","${i.date}","${i.budget}","${(i.message || "").replace(/"/g, '""')}"`).join("\r\n")
                        : "Timestamp,Email Address\r\n" + newsletterSubs.map(s => `"${s.timestamp}","${s.email}"`).join("\r\n");
                      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement("a");
                      link.setAttribute("href", url);
                      link.setAttribute("download", `${inquirySubTab}_leads_${Date.now()}.csv`);
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      triggerAlert("CSV Spreadsheet Exported!");
                    }}
                    className="flex items-center gap-1.5 border border-[#c5a075] hover:bg-[#c5a075] hover:text-[#080808] text-[10px] uppercase font-bold tracking-widest px-3.5 py-2 rounded-md transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Export CSV Excel
                  </button>

                  <div className="flex bg-[#0f0f12] border border-white/10 rounded-md p-1">
                    <button 
                      onClick={() => setInquiryViewMode("table")}
                      className={`text-[9px] uppercase tracking-wider px-2.5 py-1 rounded transition-all cursor-pointer ${inquiryViewMode === "table" ? "bg-[#c5a075] text-[#080808] font-bold" : "text-white/60 hover:text-white"}`}
                    >
                      Excel Table
                    </button>
                    <button 
                      onClick={() => setInquiryViewMode("cards")}
                      className={`text-[9px] uppercase tracking-wider px-2.5 py-1 rounded transition-all cursor-pointer ${inquiryViewMode === "cards" ? "bg-[#c5a075] text-[#080808] font-bold" : "text-white/60 hover:text-white"}`}
                    >
                      Cards
                    </button>
                  </div>
                </div>
              </div>

              {/* Sub-tabs toggling: Detailed Leads vs Newsletter Leads */}
              <div className="flex border-b border-white/5 pb-2.5 gap-4">
                <button
                  onClick={() => setInquirySubTab("detailed")}
                  className={`text-[10px] uppercase tracking-widest font-bold pb-2 transition-all cursor-pointer border-b-2 ${
                    inquirySubTab === "detailed" ? "border-[#c5a075] text-[#c5a075]" : "border-transparent text-white/50 hover:text-white"
                  }`}
                >
                  Detailed Inquiries ({inquiries.length})
                </button>
                <button
                  onClick={() => setInquirySubTab("newsletter")}
                  className={`text-[10px] uppercase tracking-widest font-bold pb-2 transition-all cursor-pointer border-b-2 ${
                    inquirySubTab === "newsletter" ? "border-[#c5a075] text-[#c5a075]" : "border-transparent text-white/50 hover:text-white"
                  }`}
                >
                  Email Newsletter Signups ({newsletterSubs.length})
                </button>
              </div>

              {/* Lead content view engine */}
              <div className="flex flex-col gap-4">
                {inquirySubTab === "detailed" ? (
                  inquiries.length === 0 ? (
                    <div className="bg-[#09090b]/50 border border-white/5 p-8 rounded-md text-center">
                      <p className="text-xs text-white/30 uppercase italic">No detailed inquiries received yet.</p>
                    </div>
                  ) : inquiryViewMode === "table" ? (
                    /* Excel sheet spreadsheet style */
                    <div className="overflow-x-auto border border-white/5 rounded-md bg-[#0a0a0c]">
                      <table className="w-full text-left border-collapse text-[11px] font-mono">
                        <thead>
                          <tr className="border-b border-white/10 bg-black/60 text-white/40 uppercase tracking-wider">
                            <th className="p-3.5">Received Date</th>
                            <th className="p-3.5">Name</th>
                            <th className="p-3.5">Email Address</th>
                            <th className="p-3.5">Shoot Type</th>
                            <th className="p-3.5">Est. Budget</th>
                            <th className="p-3.5 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {inquiries.map((inq) => (
                            <tr key={inq.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                              <td className="p-3 text-white/50">{inq.timestamp}</td>
                              <td className="p-3 text-white font-bold">{inq.name}</td>
                              <td className="p-3 text-[#c5a075]">{inq.email}</td>
                              <td className="p-3 uppercase">{inq.shootType}</td>
                              <td className="p-3 text-emerald-400 font-semibold">{inq.budget}</td>
                              <td className="p-3 flex justify-center items-center gap-3">
                                <button
                                  onClick={() => setSelectedInquiryModal(inq)}
                                  className="bg-[#c5a075]/10 border border-[#c5a075]/35 hover:bg-[#c5a075] hover:text-[#080808] text-[#c5a075] text-[9px] px-2.5 py-0.5 rounded transition-all cursor-pointer uppercase font-bold tracking-wider"
                                >
                                  Open Detail
                                </button>
                                <button
                                  onClick={async () => {
                                    if (confirm("Delete this detailed inquiry?")) {
                                      await deleteDoc(doc(db, "contact_submissions_items", inq.id));
                                      triggerAlert("Inquiry deleted!");
                                    }
                                  }}
                                  className="text-red-400 hover:text-red-300 p-0.5 transition-colors cursor-pointer"
                                  title="Delete Lead"
                                >
                                  <Trash className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    /* Detailed Cards view */
                    <div className="flex flex-col gap-4">
                      {inquiries.map((inq) => (
                        <div key={inq.id} className="bg-[#0c0c0e] border border-white/5 p-5 rounded-md flex flex-col gap-4 hover:border-[#c5a075]/30 transition-colors relative">
                          <div className="flex justify-between items-start border-b border-white/5 pb-3">
                            <div>
                              <h3 className="text-sm font-bold text-white">{inq.name}</h3>
                              <a 
                                href={`mailto:${inq.email}`} 
                                className="text-[10px] text-[#c5a075] hover:underline uppercase tracking-wide block mt-0.5"
                              >
                                {inq.email}
                              </a>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => setSelectedInquiryModal(inq)}
                                className="text-[9px] border border-white/10 hover:border-[#c5a075] text-white/55 hover:text-white px-2 py-0.5 rounded transition-all cursor-pointer uppercase tracking-wider"
                              >
                                View full detail
                              </button>
                              <button
                                onClick={async () => {
                                  if (confirm("Are you sure you want to delete this inquiry?")) {
                                    await deleteDoc(doc(db, "contact_submissions_items", inq.id));
                                    triggerAlert("Inquiry deleted!");
                                  }
                                }}
                                className="text-red-400 hover:text-red-300 p-1 flex items-center justify-center rounded bg-red-950/20 border border-red-500/10 hover:border-red-500/30 transition-all cursor-pointer"
                                title="Delete Inquiry"
                              >
                                <Trash className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4 text-[10px] bg-black/40 p-3 rounded">
                            <div>
                              <span className="text-white/35 block uppercase font-mono tracking-wider">Shoot Type</span>
                              <span className="text-[#c5a075] font-semibold mt-1 block uppercase">{inq.shootType}</span>
                            </div>
                            <div>
                              <span className="text-white/35 block uppercase font-mono tracking-wider">Preferred Date</span>
                              <span className="text-white/80 font-medium mt-1 block">{inq.date}</span>
                            </div>
                            <div>
                              <span className="text-white/35 block uppercase font-mono tracking-wider">Est. Budget</span>
                              <span className="text-emerald-400 font-semibold mt-1 block">{inq.budget}</span>
                            </div>
                          </div>

                          <div className="flex flex-col gap-1">
                            <span className="text-[9px] uppercase tracking-wider text-white/35 font-mono">Message Narrative</span>
                            <p className="text-xs text-white/85 leading-relaxed bg-black/20 p-3.5 rounded border border-white/5 whitespace-pre-line">
                              {inq.message || "(No message provided)"}
                            </p>
                          </div>

                          <div className="text-[8px] text-white/20 uppercase tracking-widest text-right font-mono mt-1">
                            Received: {inq.timestamp || "N/A"}
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                ) : (
                  newsletterSubs.length === 0 ? (
                    <div className="bg-[#09090b]/50 border border-white/5 p-8 rounded-md text-center">
                      <p className="text-xs text-white/30 uppercase italic">No email newsletter subscribers yet.</p>
                    </div>
                  ) : inquiryViewMode === "table" ? (
                    /* Excel sheet style newsletter list */
                    <div className="overflow-x-auto border border-white/5 rounded-md bg-[#0a0a0c]">
                      <table className="w-full text-left border-collapse text-[11px] font-mono">
                        <thead>
                          <tr className="border-b border-white/10 bg-black/60 text-white/40 uppercase tracking-wider">
                            <th className="p-3.5">Subscribed Date</th>
                            <th className="p-3.5">Email Address</th>
                            <th className="p-3.5 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {newsletterSubs.map((sub) => (
                            <tr key={sub.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                              <td className="p-3 text-white/50">{sub.timestamp}</td>
                              <td className="p-3 text-white font-bold">{sub.email}</td>
                              <td className="p-3 flex justify-center items-center gap-3">
                                <button
                                  onClick={() => setSelectedInquiryModal(sub)}
                                  className="bg-[#c5a075]/10 border border-[#c5a075]/35 hover:bg-[#c5a075] hover:text-[#080808] text-[#c5a075] text-[9px] px-2.5 py-0.5 rounded transition-all cursor-pointer uppercase font-bold tracking-wider"
                                >
                                  Open Detail
                                </button>
                                <a 
                                  href={`mailto:${sub.email}`} 
                                  className="border border-white/10 hover:border-[#c5a075] text-white/60 hover:text-white text-[9px] px-2.5 py-0.5 rounded transition-all uppercase tracking-wider font-semibold"
                                >
                                  Reply
                                </a>
                                <button
                                  onClick={async () => {
                                    if (confirm("Remove this email subscription?")) {
                                      await deleteDoc(doc(db, "email_subscriptions_items", sub.id));
                                      triggerAlert("Subscription deleted!");
                                    }
                                  }}
                                  className="text-red-400 hover:text-red-300 p-0.5 transition-colors cursor-pointer"
                                  title="Delete Lead"
                                >
                                  <Trash className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    /* Cards view newsletter list */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {newsletterSubs.map((sub) => (
                        <div key={sub.id} className="bg-[#0c0c0e] border border-white/5 p-4 rounded-md flex justify-between items-center hover:border-[#c5a075]/30 transition-all">
                          <div>
                            <span className="text-[8px] uppercase tracking-wider text-[#c5a075] font-mono block">Newsletter Lead</span>
                            <span className="text-sm font-bold text-white block mt-0.5">{sub.email}</span>
                            <span className="text-[9px] text-white/35 block mt-1 font-mono">Date: {sub.timestamp}</span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <button
                              onClick={() => setSelectedInquiryModal(sub)}
                              className="text-[9px] border border-white/10 hover:border-[#c5a075] text-white/55 hover:text-white px-2 py-0.5 rounded transition-all cursor-pointer uppercase tracking-wider"
                            >
                              Open
                            </button>
                            <button
                              onClick={async () => {
                                if (confirm("Remove subscriber?")) {
                                  await deleteDoc(doc(db, "email_subscriptions_items", sub.id));
                                  triggerAlert("Sub removed!");
                                }
                              }}
                              className="text-red-400 hover:text-red-300 p-1 flex items-center justify-center rounded bg-red-950/20 border border-red-500/10 hover:border-red-500/30 transition-all cursor-pointer"
                            >
                              <Trash className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                )}
              </div>

              {/* Inquiry Detail Modal Overlay */}
              {selectedInquiryModal && (
                <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
                  <div className="bg-[#0c0c0e] border border-[#c5a075]/40 p-6 rounded-lg max-w-lg w-full flex flex-col gap-4 text-left shadow-2xl animate-scale-up">
                    <div className="flex justify-between items-start border-b border-white/5 pb-3">
                      <div>
                        <h3 className="text-lg font-bold text-[#c5a075] tracking-wide uppercase">
                          {selectedInquiryModal.name || "Email Subscriber"}
                        </h3>
                        <a 
                          href={`mailto:${selectedInquiryModal.email}`}
                          className="text-xs text-white/50 hover:text-[#c5a075] hover:underline"
                        >
                          {selectedInquiryModal.email}
                        </a>
                      </div>
                      <button 
                        onClick={() => setSelectedInquiryModal(null)}
                        className="text-white/40 hover:text-white p-1 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {selectedInquiryModal.name ? (
                      <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-4 text-[10px] bg-black/50 p-4 rounded border border-white/5">
                          <div>
                            <span className="text-white/35 block uppercase tracking-wider font-mono">Shoot Category</span>
                            <span className="text-[#c5a075] font-semibold mt-1 block uppercase">{selectedInquiryModal.shootType}</span>
                          </div>
                          <div>
                            <span className="text-white/35 block uppercase tracking-wider font-mono">Preferred Date</span>
                            <span className="text-white/80 font-medium mt-1 block">{selectedInquiryModal.date}</span>
                          </div>
                          <div className="col-span-2 mt-2 pt-2 border-t border-white/5">
                            <span className="text-white/35 block uppercase tracking-wider font-mono">Estimated Budget</span>
                            <span className="text-emerald-400 font-semibold mt-1 block">{selectedInquiryModal.budget}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[9px] uppercase text-white/30 tracking-widest font-mono">Full Narrative Message</span>
                          <p className="text-xs text-white/80 leading-relaxed bg-black/30 p-4 rounded border border-white/5 whitespace-pre-line max-h-48 overflow-y-auto">
                            {selectedInquiryModal.message}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-black/50 p-4 rounded border border-white/5 text-xs text-white/60">
                        This user subscribed to the email newsletter updates from the footer section.
                      </div>
                    )}

                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-white/5 text-[9px] text-white/30 uppercase font-mono">
                      <span>Received: {selectedInquiryModal.timestamp}</span>
                      <a 
                        href={`mailto:${selectedInquiryModal.email}`}
                        className="bg-[#c5a075] text-[#080808] hover:bg-white hover:text-black font-bold font-sans tracking-widest text-[9px] px-3.5 py-2 rounded transition-all uppercase"
                      >
                        Reply Email
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: EXPERIENCE & CV */}
          {activeTab === "experience" && (
            <div className="flex flex-col gap-6 animate-fade-in">
              <div className="border-b border-white/5 pb-4">
                <h1 className="font-display text-4xl text-[#c5a075]">CV & CREDENTIALS</h1>
                <p className="text-white/40 text-xs mt-1">Manage brand placements, awards, and historical exhibitions.</p>
              </div>

              {/* Clients management */}
              <div className="border border-white/5 bg-[#0a0a0c] p-5 rounded-md">
                <span className="text-[10px] uppercase tracking-widest text-[#c5a075] font-semibold block border-b border-white/5 pb-2 mb-3">
                  Brand Placement Labels
                </span>

                <div className="flex flex-wrap gap-2">
                  {clients.map((clientName, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 bg-[#0d0d10] border border-white/5 px-2.5 py-1 rounded text-xs text-white/80">
                      <span>{clientName}</span>
                      <button 
                        onClick={() => {
                          const copy = [...clients];
                          copy.splice(idx, 1);
                          saveExperience("experience_clients", copy);
                          triggerAlert("Client removed!");
                        }}
                        className="text-white/40 hover:text-white text-[10px]"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add client */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    const input = e.target.clientName.value.trim();
                    if (!input) return;
                    const copy = [...clients, input];
                    saveExperience("experience_clients", copy);
                    e.target.clientName.value = "";
                    triggerAlert("Client added!");
                  }}
                  className="flex gap-2 mt-4"
                >
                  <input 
                    type="text" 
                    name="clientName"
                    placeholder="Enter brand name (e.g. Rolex)..."
                    className="bg-white/5 border border-white/10 px-3 py-1.5 text-xs rounded flex-grow outline-none focus:border-[#c5a075]"
                  />
                  <button 
                    type="submit" 
                    className="bg-white/10 hover:bg-[#c5a075] hover:text-[#080808] px-4 rounded text-xs transition-all uppercase tracking-widest"
                  >
                    Add Label
                  </button>
                </form>
              </div>

              {/* Exhibitions & Awards Lists */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Exhibitions */}
                <div className="border border-white/5 bg-[#0a0a0c] p-4 rounded-md">
                  <span className="text-[10px] uppercase tracking-widest text-white/50 font-semibold block border-b border-white/5 pb-2 mb-3">
                    Exhibitions ({exhibitions.length})
                  </span>

                  <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1">
                    {exhibitions.map((ex, idx) => (
                      <div key={idx} className="bg-black/30 p-2.5 border border-white/5 rounded text-[11px] flex justify-between items-start">
                        <div>
                          <span className="text-[#c5a075] font-mono">{ex.year}</span>
                          <h4 className="font-bold text-white/90 truncate max-w-[140px] uppercase mt-0.5">{ex.title}</h4>
                          <span className="text-white/40 block leading-tight">{ex.venue}</span>
                        </div>
                        <button 
                          onClick={() => {
                            const copy = [...exhibitions];
                            copy.splice(idx, 1);
                            saveExperience("experience_exhibitions", copy);
                            triggerAlert("Exhibition removed!");
                          }}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Awards */}
                <div className="border border-white/5 bg-[#0a0a0c] p-4 rounded-md">
                  <span className="text-[10px] uppercase tracking-widest text-white/50 font-semibold block border-b border-white/5 pb-2 mb-3">
                    Awards & Honors ({awards.length})
                  </span>

                  <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1">
                    {awards.map((aw, idx) => (
                      <div key={idx} className="bg-black/30 p-2.5 border border-white/5 rounded text-[11px] flex justify-between items-start">
                        <div>
                          <span className="text-[#c5a075] font-mono">{aw.year}</span>
                          <h4 className="font-bold text-white/90 truncate max-w-[140px] uppercase mt-0.5">{aw.title}</h4>
                          <span className="text-emerald-400/90 block">{aw.status}</span>
                        </div>
                        <button 
                          onClick={() => {
                            const copy = [...awards];
                            copy.splice(idx, 1);
                            saveExperience("experience_awards", copy);
                            triggerAlert("Award removed!");
                          }}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}
        </main>

      </div>

      {/* ─── Innovative Ctrl + K Command Panel Overlay ─── */}
      {cmdOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div 
            ref={cmdRef}
            className="w-full max-w-xl bg-[#0d0d10] border border-[#c5a075]/40 rounded-xl shadow-2xl overflow-hidden flex flex-col animate-scale-up"
          >
            {/* Search Input Area */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5">
              <Search className="w-5 h-5 text-[#c5a075]" />
              <input 
                type="text" 
                placeholder="Type a command to jump... (e.g. Portfolio, Services, Reset)"
                value={cmdQuery}
                onChange={(e) => setCmdQuery(e.target.value)}
                className="w-full bg-transparent border-none text-sm text-white focus:outline-none placeholder-white/30"
                autoFocus
              />
              <button onClick={() => setCmdOpen(false)} className="text-white/30 hover:text-white p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List Results Area */}
            <div className="p-2 max-h-[300px] overflow-y-auto flex flex-col gap-1">
              <span className="text-[8px] uppercase tracking-widest text-white/20 block px-3 py-1 font-semibold">Available Operations</span>
              
              {filteredCommands.length === 0 ? (
                <p className="text-xs text-white/30 px-3 py-3 uppercase italic">No command matched "{cmdQuery}"</p>
              ) : (
                filteredCommands.map((cmd, idx) => (
                  <button
                    key={idx}
                    onClick={cmd.action}
                    className="w-full text-left px-3 py-2.5 rounded-md hover:bg-white/5 hover:text-[#c5a075] transition-all text-xs flex items-center justify-between group"
                  >
                    <span>{cmd.label}</span>
                    <div className="flex items-center gap-1.5 text-white/20 group-hover:text-[#c5a075]/60">
                      <span className="text-[9px] uppercase tracking-wider">Execute</span>
                      <CornerDownLeft className="w-3.5 h-3.5" />
                    </div>
                  </button>
                ))
              )}
            </div>
            
            <div className="border-t border-white/5 p-3.5 bg-[#0a0a0c]/80 text-[10px] text-white/30 tracking-widest flex items-center justify-between uppercase">
              <span>ESC to cancel</span>
              <span>Hanzala Admin v1.0</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
