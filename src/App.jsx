import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Sparkles,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Lock,
  BookOpen,
  Maximize2
} from 'lucide-react';

// ============================================================================
// 1. CENTRALIZED ANNIVERSARY STORY DATA (Clean & Distraction-Free)
// ============================================================================
const ANNIVERSARY_DATA = {
  myName: "Yours Forever",
  herName: "My Love",
  anniversaryDate: "2016-11-03T00:00:00", // Updated to 3rd Nov 2026 anchor
  heroQuote: "Ten years. A million memories. Countless reasons to smile. And one person I'd choose in every lifetime.",
  heroPhoto: "https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif", // Kissing cat GIF
  heroPhotoCaption: "Ten years of holding your hand through every season.",
  timelineChapters: [
    {
      id: "01",
      number: "01",
      title: "The Beginning",
      dateLabel: "Chapter I • Where It Started",
      text: "Somehow, among billions of people, our paths crossed. And everything became a little more beautiful.",
      caption: "The moment my world quietly changed forever.",
      artType: "stars",
      photo: "https://media.giphy.com/media/l4pTdcifPZLpDjL1e/giphy.gif"
    },
    {
      id: "02",
      number: "02",
      title: "The First Memories",
      dateLabel: "Chapter II • Early Sparks",
      text: "Those little conversations, silly smiles, unexpected moments... I wish I could relive every one of them.",
      caption: "Late-night talks and butterflies that never truly left.",
      artType: "coffee",
      photo: "https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif"
    },
    {
      id: "03",
      number: "03",
      title: "Growing Together",
      dateLabel: "Chapter III • Side by Side",
      text: "We learned, we changed, we made mistakes, and we grew. But every experience made our story more meaningful.",
      caption: "Learning how to love each other better through every season.",
      artType: "compass",
      photo: "https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif"
    },
    {
      id: "04",
      number: "04",
      title: "The Beautiful Chaos",
      dateLabel: "Chapter IV • Unfiltered Us",
      text: "From silly arguments to endless laughter, even our imperfect moments became memories I wouldn't trade for anything.",
      caption: "Dancing in the rain and laughing until our stomachs hurt.",
      artType: "vinyl",
      photo: "https://media.giphy.com/media/10UeedrT5MIfPG/giphy.gif"
    },
    {
      id: "05",
      number: "05",
      title: "A Thousand Little Moments",
      dateLabel: "Chapter V • Quiet Magic",
      text: "It's never just about the big occasions. It's the random talks, little gestures, and simple moments that mean the most.",
      caption: "Ordinary days that turned into extraordinary treasures.",
      artType: "lantern",
      photo: "https://media.giphy.com/media/ZBQhoZC0nqknSviPqT/giphy.gif"
    },
    {
      id: "06",
      number: "06",
      title: "Ten Years Later",
      dateLabel: "Chapter VI • A Decade of Love",
      text: "Here we are, ten years later. And if I had to start everything again, I'd still want it to begin with you.",
      caption: "3,652+ sunrises and you are still my favourite view.",
      artType: "hourglass",
      photo: "https://media.giphy.com/media/G3va31oEEnIkM/giphy.gif"
    },
    {
      id: "07",
      number: "07",
      title: "Forever",
      dateLabel: "Chapter VII • Our Horizon",
      text: "This isn't the end of our story. It's just another beautiful beginning.",
      caption: "To the next ten decades, hand in hand.",
      artType: "infinity",
      photo: "https://media.giphy.com/media/M90mJvfWfd5mbUuULX/giphy.gif"
    }
  ],
  galleryMemories: [
    {
      id: 1,
      title: "Our First Snapshot",
      caption: "That shy smile I fell in love with instantly.",
      date: "Year I",
      photo: "https://media.giphy.com/media/l4pTdcifPZLpDjL1e/giphy.gif"
    },
    {
      id: 2,
      title: "Coffee & Conversations",
      caption: "Two cups, three hours, and a whole world of dreams.",
      date: "Year II",
      photo: "https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif"
    },
    {
      id: 3,
      title: "Sunset Strolls",
      caption: "Walking nowhere in particular, as long as it was with you.",
      date: "Year III",
      photo: "https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif"
    },
    {
      id: 4,
      title: "Midnight Laughter",
      caption: "Our inside jokes that nobody else in the world understands.",
      date: "Year IV",
      photo: "https://media.giphy.com/media/10UeedrT5MIfPG/giphy.gif"
    },
    {
      id: 5,
      title: "Unplanned Roadtrip",
      caption: "Getting lost together was the best detour of my life.",
      date: "Year V",
      photo: "https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif"
    },
    {
      id: 6,
      title: "Rainy Afternoon",
      caption: "Wrapped in warmth while the world outside slowed down.",
      date: "Year VI",
      photo: "https://media.giphy.com/media/wnsgren9NtITS/giphy.gif"
    },
    {
      id: 7,
      title: "Celebration Lights",
      caption: "Looking at the lights while I was only looking at you.",
      date: "Year VII",
      photo: "https://media.giphy.com/media/l0HlOvJ7yaacpuSas/giphy.gif"
    },
    {
      id: 8,
      title: "Quiet Mornings",
      caption: "Sunlight on your face—my peace in a noisy world.",
      date: "Year VIII",
      photo: "https://media.giphy.com/media/ZBQhoZC0nqknSviPqT/giphy.gif"
    },
    {
      id: 9,
      title: "Through Every Storm",
      caption: "Holding on tighter when things weren't easy.",
      date: "Year VIII",
      photo: "https://media.giphy.com/media/3M4NpbLCTxBqU/giphy.gif"
    },
    {
      id: 10,
      title: "Your Favourite Smile",
      caption: "The exact look that melts every worry away.",
      date: "Year IX",
      photo: "https://media.giphy.com/media/G3va31oEEnIkM/giphy.gif"
    },
    {
      id: 11,
      title: "A Decade of Us",
      caption: "Ten years of building a home in each other's hearts.",
      date: "Year X",
      photo: "https://media.giphy.com/media/bGm9FuBCGg4SY/giphy.gif"
    },
    {
      id: 12,
      title: "Our Tomorrow",
      caption: "Every adventure still waiting for us to live it.",
      date: "Forever",
      photo: "https://media.giphy.com/media/M90mJvfWfd5mbUuULX/giphy.gif"
    }
  ],
  loveLetterGreeting: "My Love,",
  loveLetterParagraphs: [
    "Main sach mein nahi jaanta kahan se shuru karu, kyunki das saal ke pyaar ko kuch paragraphs mein kaise sametoon?",
    "Hum kitni door aa chuke hain. Un choti-choti baaton se jo humein muskurana sikhaya, un mushkil dino tak jo humein aur kas kar pakadna sikhate hain, is safar ka har ek hissa hamari kahani ka ek khoobsurat tukda ban chuka hai.",
    "Tum sirf koi aisi nahi ho jisse main pyaar karta hoon. Tum woh insaan ho jiski khushi mere liye mayne rakhti hai, jiski ek muskan mera poora din badal sakti hai, aur jiski maujoodgi sabse aam lamhon ko bhi jadui bana deti hai.",
    "Main jaanta hoon hum perfect nahi hain. Humari behes bhi hui hai, galatfehmiyan bhi aayi hain, aur mushkil waqt bhi aaye hain. Par in sab ke beech, ek baat hai jo main chahta hoon tum kabhi shaq na karo: tum mere liye shabdon se kahin zyada mayne rakhti ho.",
    "Tumhare jaisi hone ke liye shukriya. Har hassi, har gale lagane, har choti koshish, har yaad, aur har lamhe ke liye shukriya jo tumne mere sath share kiya hai.",
    "Agar main wapas das saal peeche jaakar sab kuch dobara jee sakoon, toh main ek bhi cheez nahi badlunga agar iska matlab wapas tum tak pahunchna ho.",
    "Aur agar zindagi mujhe hazaar janam de, toh main phir bhi har ek janam mein tumhe hi doondhunga.",
    "Main sirf tumhare sath aur saal nahi chahta. Main aur aam subhein, aisi hi random baatein, silli behes, anjaane adventures, aur woh anginat chote lamhe chahta hoon jo hamari sabse pyaari yaadein ban jaate hain.",
    "Das saal beet chuke hain, par meri sabse pasandeeda love story abhi bhi humari hi hai.",
    "Hamesha tumhara."
  ],
  loveLetterSignature: "With all my love, Forever Yours ❤️",
  tenReasons: [
    { id: 1, roman: "I", text: "Your smile makes my worst days better." },
    { id: 2, roman: "II", text: "The way you understand me without needing too many words." },
    { id: 3, roman: "III", text: "Your beautiful heart." },
    { id: 4, roman: "IV", text: "The comfort I find in you." },
    { id: 5, roman: "V", text: "Your little habits that I secretly adore." },
    { id: 6, roman: "VI", text: "The happiness you bring into my life." },
    { id: 7, roman: "VII", text: "The way we laugh together." },
    { id: 8, roman: "VIII", text: "Your patience and support." },
    { id: 9, roman: "IX", text: "Every beautiful memory we've created." },
    { id: 10, roman: "X", text: "Simply because you're YOU." }
  ],
  littleThings: [
    "Your smile.",
    "Your random talks.",
    "The way you laugh.",
    "Our silly arguments.",
    "The little moments when time feels slower.",
    "The way everything feels better when you're around.",
    "The memories that only we understand."
  ],
  promises: [
    "I cannot promise that every day will be perfect.",
    "But I promise to keep choosing you.",
    "To listen when you need someone.",
    "To celebrate your happiness.",
    "To stand beside you through difficult days.",
    "To keep making memories with you.",
    "To never stop finding new reasons to make you smile.",
    "And most importantly, to keep loving you in all the little ways that matter."
  ]
};

// ============================================================================
// 2. BESPOKE ROMANTIC ARTWORK PLACEHOLDERS
// ============================================================================
const RomanticArtwork = ({ type = "stars", label = "Our Memory", className = "" }) => {
  const renderArt = () => {
    switch (type) {
      case "coffee":
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <radialGradient id="glowCoffee" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#D8B477" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#10070B" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="85" fill="url(#glowCoffee)" />
            <path d="M60 118 C60 138, 92 138, 92 118 L92 98 L60 98 Z" fill="none" stroke="#D8B477" strokeWidth="2" />
            <path d="M92 103 C102 103, 102 115, 92 115" fill="none" stroke="#D8B477" strokeWidth="2" />
            <path d="M106 118 C106 138, 138 138, 138 118 L138 98 L106 98 Z" fill="none" stroke="#F5D6DC" strokeWidth="2" />
            <path d="M138 103 C148 103, 148 115, 138 115" fill="none" stroke="#F5D6DC" strokeWidth="2" />
            <path d="M99 78 C99 71, 89 67, 89 75 C89 81, 99 86, 99 91 C99 86, 109 81, 109 75 C109 67, 99 71, 99 78 Z" fill="#D8B477" fillOpacity="0.85" />
            <line x1="50" y1="140" x2="150" y2="140" stroke="#D8B477" strokeWidth="1.2" strokeOpacity="0.5" />
          </svg>
        );
      case "compass":
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle cx="100" cy="100" r="64" fill="none" stroke="#D8B477" strokeWidth="1.5" strokeDasharray="4 4" />
            <circle cx="100" cy="100" r="52" fill="none" stroke="#F5D6DC" strokeWidth="1" strokeOpacity="0.4" />
            <polygon points="100,45 108,94 100,86 92,94" fill="#D8B477" />
            <polygon points="100,155 108,106 100,114 92,106" fill="#F5D6DC" fillOpacity="0.5" />
            <circle cx="100" cy="100" r="5" fill="#D8B477" />
          </svg>
        );
      case "vinyl":
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle cx="100" cy="100" r="64" fill="#1b0912" stroke="#D8B477" strokeWidth="1.8" />
            <circle cx="100" cy="100" r="50" fill="none" stroke="#D8B477" strokeWidth="0.7" strokeOpacity="0.4" />
            <circle cx="100" cy="100" r="36" fill="none" stroke="#D8B477" strokeWidth="0.7" strokeOpacity="0.4" />
            <circle cx="100" cy="100" r="20" fill="#68152E" stroke="#D8B477" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="4" fill="#10070B" />
          </svg>
        );
      case "lantern":
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <radialGradient id="lanternGlow" cx="50%" cy="50%" r="45%">
              <stop offset="0%" stopColor="#D8B477" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#10070B" stopOpacity="0" />
            </radialGradient>
            <circle cx="100" cy="100" r="75" fill="url(#lanternGlow)" />
            <rect x="76" y="66" width="48" height="68" rx="12" fill="none" stroke="#D8B477" strokeWidth="2" />
            <path d="M86 66 C86 50, 114 50, 114 66" fill="none" stroke="#D8B477" strokeWidth="1.8" />
            <path d="M100 92 C100 84, 90 80, 90 88 C90 95, 100 101, 100 107 C100 101, 110 95, 110 88 C110 80, 100 84, 100 92 Z" fill="#F5D6DC" />
          </svg>
        );
      case "hourglass":
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <line x1="68" y1="54" x2="132" y2="54" stroke="#D8B477" strokeWidth="2.5" />
            <line x1="68" y1="146" x2="132" y2="146" stroke="#D8B477" strokeWidth="2.5" />
            <path d="M74 54 C74 90, 100 95, 100 100 C100 105, 74 110, 74 146 L126 146 C126 110, 100 105, 100 100 C100 95, 126 90, 126 54 Z" fill="none" stroke="#D8B477" strokeWidth="1.8" />
            <circle cx="100" cy="100" r="2.5" fill="#F5D6DC" />
            <polygon points="82,144 118,144 100,124" fill="#D8B477" fillOpacity="0.65" />
          </svg>
        );
      case "infinity":
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path
              d="M65 100 C42 75, 42 125, 65 100 C88 75, 112 125, 135 100 C158 75, 158 125, 135 100 C112 75, 88 125, 65 100 Z"
              fill="none"
              stroke="#D8B477"
              strokeWidth="2.8"
            />
            <circle cx="100" cy="70" r="3" fill="#F5D6DC" />
            <circle cx="100" cy="130" r="3" fill="#F5D6DC" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle cx="100" cy="100" r="68" fill="none" stroke="#D8B477" strokeWidth="1" strokeOpacity="0.4" />
            <path d="M100 45 L106 86 L146 92 L106 98 L100 139 L94 98 L54 92 L94 86 Z" fill="#D8B477" fillOpacity="0.8" />
            <circle cx="62" cy="64" r="2.5" fill="#F5D6DC" />
            <circle cx="138" cy="128" r="3" fill="#F5D6DC" />
            <circle cx="135" cy="62" r="2" fill="#D8B477" />
          </svg>
        );
    }
  };

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-[#270915] via-[#16060D] to-[#0D0408] flex flex-col items-center justify-center ${className}`}>
      <div className="absolute inset-2 border border-[#D8B477]/20 rounded-xl pointer-events-none" />
      <div className="w-36 h-36 sm:w-44 sm:h-44 opacity-90 transition-transform duration-700 group-hover:scale-105">
        {renderArt()}
      </div>
      {label && (
        <span className="mt-1 text-[11px] uppercase tracking-[0.25em] text-[#D8B477]/75 font-medium px-3 text-center">
          {label}
        </span>
      )}
    </div>
  );
};

const RomanticMediaFrame = ({ src, alt, fallbackType = "stars", fallbackLabel = "Our Memory", className = "" }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (!src || hasError) {
    return <RomanticArtwork type={fallbackType} label={fallbackLabel} className={className} />;
  }

  return (
    <img
      src={src}
      alt={alt || fallbackLabel}
      loading="lazy"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};

// ============================================================================
// 3. FLOATING ROSE PETALS & GOLDEN DUST AMBIENCE
// ============================================================================
const AmbientParticles = ({ intensity = "normal" }) => {
  const petals = useMemo(() => {
    const count = intensity === "high" ? 18 : 11;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${(i * 93 + 7) % 94}%`,
      size: 10 + (i % 4) * 4,
      duration: 13 + (i % 6) * 3,
      delay: (i * 1.4) % 10,
      isGold: i % 3 === 0
    }));
  }, [intensity]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10" aria-hidden="true">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -40, opacity: 0, rotate: 0 }}
          animate={{
            y: ["0vh", "105vh"],
            x: [0, p.id % 2 === 0 ? 22 : -22, 0],
            opacity: [0, p.isGold ? 0.65 : 0.45, p.isGold ? 0.65 : 0.45, 0],
            rotate: [0, p.id % 2 === 0 ? 220 : -220]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
          style={{ left: p.left, width: p.size, height: p.size }}
          className="absolute top-0"
        >
          {p.isGold ? (
            <div className="w-1.5 h-1.5 rounded-full bg-[#D8B477] shadow-[0_0_10px_#D8B477]" />
          ) : (
            <svg viewBox="0 0 24 24" className="w-full h-full fill-[#8B1E3F]/80 drop-shadow-[0_2px_6px_rgba(104,21,46,0.5)]">
              <path d="M12 2C7 6 4 11 6 16C8 20 12 22 12 22C12 22 16 20 18 16C20 11 17 6 12 2Z" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
};

// ============================================================================
// 4. OPENING SCREEN — ENVELOPE OPENING ANIMATION
// ============================================================================
const IntroScreen = ({ onComplete, herName }) => {
  const [stage, setStage] = useState("sealed"); // "sealed" | "opening" | "revealed"

  const handleOpenEnvelope = () => {
    if (stage !== "sealed") return;
    setStage("opening");
    setTimeout(() => {
      setStage("revealed");
    }, 900);
  };

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.03, filter: "blur(8px)" }}
      transition={{ duration: 1.1, ease: "easeInOut" }}
      className="fixed inset-0 z-50 min-h-[100dvh] w-full overflow-y-auto overflow-x-hidden bg-[#10070B] flex flex-col items-center justify-between px-4 py-8 sm:py-12 select-none"
    >
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 38%, rgba(104, 21, 46, 0.48) 0%, rgba(53, 11, 27, 0.28) 45%, rgba(16, 7, 11, 0.98) 100%)"
        }}
      />

      <div className="relative z-10 text-center max-w-md mx-auto pt-2 sm:pt-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D8B477]/30 bg-[#350B1B]/60 text-[#D8B477] text-[11px] tracking-[0.28em] uppercase mb-4"
        >
          <Sparkles className="w-3 h-3" /> Our 10th Anniversary
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.6 }}
          className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#F5D6DC] tracking-wide leading-relaxed px-2"
        >
          “Some stories are too beautiful to end...”
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.4 }}
          className="mt-2.5 text-sm sm:text-base text-[#D8B477]/90 tracking-[0.14em] uppercase font-light"
        >
          A little something for my favourite person.
        </motion.p>
      </div>

      <div className="relative z-10 w-full max-w-[340px] sm:max-w-[390px] my-4 flex flex-col items-center justify-center">
        <div className="relative w-full pt-10 pb-2 flex flex-col items-center">
          <div className="relative w-full h-[220px] sm:h-[245px] rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] border border-[#D8B477]/40 bg-gradient-to-b from-[#4B0E25] to-[#2B0715]">
            <div className="absolute inset-2 rounded-xl border border-[#D8B477]/20 pointer-events-none" />

            {/* Rising Letter Card */}
            <motion.div
              initial={{ y: 25, opacity: 0, scale: 0.94 }}
              animate={
                stage === "revealed"
                  ? { y: -35, opacity: 1, scale: 1 }
                  : stage === "opening"
                  ? { y: -5, opacity: 0.9, scale: 0.97 }
                  : { y: 25, opacity: 0, scale: 0.94 }
              }
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-4 top-2 bottom-4 z-20 rounded-xl bg-[#FAF4EC] text-[#2A121B] p-4 sm:p-5 shadow-2xl border border-[#D8B477] flex flex-col justify-between overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-[#D8B477]/40 pb-2">
                <span className="text-[10px] tracking-[0.22em] uppercase text-[#68152E] font-semibold">
                  For {herName}
                </span>
                <Heart className="w-3.5 h-3.5 text-[#68152E] fill-[#68152E]" />
              </div>

              <p className="font-serif text-sm sm:text-base leading-relaxed text-[#2A121B] italic my-auto py-1 text-center">
                “Ten years ago, our story began. Little did I know that you would become my favourite part of life.”
              </p>

              <div className="text-right font-handwriting text-lg text-[#68152E]">
                10 Years of Us ♥
              </div>
            </motion.div>

            {/* Envelope Pocket */}
            <div
              className="absolute inset-0 z-30 pointer-events-none rounded-2xl overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(83,16,39,0.96) 0%, rgba(53,11,27,0.98) 50%, rgba(36,6,18,1) 100%)",
                clipPath: "polygon(0 38%, 50% 55%, 100% 38%, 100% 100%, 0 100%)"
              }}
            />
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full z-30 pointer-events-none">
              <polyline
                points="0,38 50,55 100,38"
                fill="none"
                stroke="#D8B477"
                strokeWidth="0.75"
                strokeOpacity="0.65"
              />
            </svg>

            {/* Top Flap */}
            <motion.div
              initial={{ rotateX: 0 }}
              animate={stage === "sealed" ? { rotateX: 0 } : { rotateX: 180 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{
                transformOrigin: "top",
                clipPath: "polygon(0 0, 100% 0, 50% 55%)",
                background: "linear-gradient(180deg, #68152E 0%, #3E0B1D 100%)"
              }}
              className={`absolute inset-x-0 top-0 h-full rounded-t-2xl border-t border-[#D8B477]/50 ${
                stage === "revealed" ? "z-10" : "z-40"
              }`}
            />

            {/* Wax Seal */}
            <div className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 z-50 flex items-center justify-center pointer-events-none">
              <AnimatePresence>
                {stage === "sealed" && (
                  <motion.button
                    type="button"
                    onClick={handleOpenEnvelope}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: [1, 1.06, 1], opacity: 1 }}
                    exit={{ scale: 1.4, opacity: 0 }}
                    transition={{
                      scale: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
                      opacity: { duration: 0.3 }
                    }}
                    aria-label="Open Wax Seal"
                    className="pointer-events-auto w-15 h-15 rounded-full bg-gradient-to-br from-[#F0D59C] via-[#D8B477] to-[#9E7638] shadow-[0_0_30px_rgba(216,180,119,0.65)] border-2 border-[#FFF3D6] flex items-center justify-center p-0 leading-none cursor-pointer active:scale-95"
                  >
                    <div className="w-11 h-11 rounded-full border border-[#5E4114]/40 flex items-center justify-center bg-[#D8B477]/30 m-auto">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-5 h-5 text-[#4B0E25] fill-current block m-auto"
                        aria-hidden="true"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </div>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 w-full max-w-xs mx-auto flex flex-col items-center gap-2.5 pb-2">
        {stage !== "revealed" ? (
          <motion.button
            type="button"
            onClick={handleOpenEnvelope}
            whileTap={{ scale: 0.97 }}
            className="w-full min-h-[50px] px-6 py-3 rounded-full bg-gradient-to-r from-[#D8B477] via-[#EED29E] to-[#C89D58] text-[#1A070E] font-semibold text-sm sm:text-base tracking-[0.14em] uppercase shadow-[0_10px_35px_rgba(216,180,119,0.4)] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Open Your Surprise</span>
          </motion.button>
        ) : (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onComplete}
            whileTap={{ scale: 0.97 }}
            className="w-full min-h-[50px] px-6 py-3 rounded-full bg-gradient-to-r from-[#D8B477] via-[#F2D9AA] to-[#C89D58] text-[#1A070E] font-semibold text-sm sm:text-base tracking-[0.14em] uppercase shadow-[0_10px_35px_rgba(216,180,119,0.5)] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Enter Our Story</span>
            <Heart className="w-4 h-4 fill-[#1A070E]" />
          </motion.button>
        )}

        <p className="text-[11px] text-[#F5D6DC]/55 tracking-widest uppercase text-center">
          {stage === "sealed" ? "Tap the golden seal or button above" : "Made with all my love for you"}
        </p>
      </div>
    </motion.div>
  );
};

// ============================================================================
// 5. MAIN APPLICATION COMPONENT
// ============================================================================
export default function App() {
  const data = ANNIVERSARY_DATA;

  const [showIntro, setShowIntro] = useState(true);
  const [revealedReasons, setRevealedReasons] = useState({});
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);
  const [isLetterOpen, setIsLetterOpen] = useState(true);
  const [showFinalSurpriseModal, setShowFinalSurpriseModal] = useState(false);
  const [yearCounter, setYearCounter] = useState(0);

  const [duration, setDuration] = useState({
    years: 10,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    document.title = `Our Forever — Happy 10th Anniversary, ${data.herName} ❤️`;
  }, [data.herName]);

  useEffect(() => {
    if (showIntro) return;
    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      if (current >= 10) {
        setYearCounter(10);
        clearInterval(timer);
      } else {
        setYearCounter(current);
      }
    }, 110);
    return () => clearInterval(timer);
  }, [showIntro]);

  useEffect(() => {
    const updateClock = () => {
      const start = new Date(data.anniversaryDate);
      if (isNaN(start.getTime())) return;
      const now = new Date();

      let years = now.getFullYear() - start.getFullYear();
      let months = now.getMonth() - start.getMonth();
      let days = now.getDate() - start.getDate();
      let hours = now.getHours() - start.getHours();
      let minutes = now.getMinutes() - start.getMinutes();
      let seconds = now.getSeconds() - start.getSeconds();

      if (seconds < 0) {
        seconds += 60;
        minutes -= 1;
      }
      if (minutes < 0) {
        minutes += 60;
        hours -= 1;
      }
      if (hours < 0) {
        hours += 24;
        days -= 1;
      }
      if (days < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months -= 1;
      }
      if (months < 0) {
        months += 12;
        years -= 1;
      }

      setDuration({
        years: Math.max(0, years),
        months: Math.max(0, months),
        days: Math.max(0, days),
        hours: Math.max(0, hours),
        minutes: Math.max(0, minutes),
        seconds: Math.max(0, seconds)
      });
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [data.anniversaryDate]);

  const toggleReasonCard = (id) => {
    setRevealedReasons((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const revealAllReasons = () => {
    const all = {};
    data.tenReasons.forEach((r) => {
      all[r.id] = true;
    });
    setRevealedReasons(all);
  };

  return (
    <div className="min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden bg-[#10070B] text-[#F5D6DC] font-sans selection:bg-[#D8B477] selection:text-[#10070B] relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Great+Vibes&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');

        .font-serif {
          font-family: 'Cormorant Garamond', Georgia, serif;
        }
        .font-handwriting {
          font-family: 'Great Vibes', cursive;
        }
        .font-sans {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        html {
          scroll-behavior: smooth;
        }
        .paper-texture {
          background-color: #FAF4EC;
          background-image: 
            radial-gradient(rgba(216, 180, 119, 0.12) 1px, transparent 0),
            linear-gradient(to bottom, rgba(216, 180, 119, 0.14) 1px, transparent 1px);
          background-size: 24px 24px, 100% 34px;
        }
      `}</style>

      <AmbientParticles intensity={showFinalSurpriseModal ? "high" : "normal"} />

      <AnimatePresence>
        {showIntro && (
          <IntroScreen
            herName={data.herName}
            onComplete={() => setShowIntro(false)}
          />
        )}
      </AnimatePresence>

      <header className="fixed top-3 inset-x-0 z-40 px-4 pointer-events-none flex items-center justify-center">
        <div className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1C0911]/85 backdrop-blur-md border border-[#D8B477]/35 shadow-lg">
          <Heart className="w-3.5 h-3.5 text-[#D8B477] fill-[#D8B477] animate-pulse" />
          <span className="font-serif text-xs sm:text-sm tracking-[0.22em] uppercase text-[#F5D6DC]">
            10 Years • {data.herName}
          </span>
        </div>
      </header>

      {/* =====================================================================
          SECTION 2: HERO — TEN YEARS OF US
      ===================================================================== */}
      <section
        id="hero"
        className="relative min-h-[100dvh] w-full pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center overflow-hidden"
      >
        <div
          className="absolute top-12 left-1/2 -translate-x-1/2 w-[340px] sm:w-[580px] h-[340px] sm:h-[580px] rounded-full pointer-events-none blur-3xl opacity-35"
          style={{
            background: "radial-gradient(circle, #68152E 0%, #350B1B 50%, transparent 75%)"
          }}
        />

        <div className="relative z-20 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#350B1B]/80 border border-[#D8B477]/45 shadow-[0_0_25px_rgba(216,180,119,0.2)] mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#D8B477]" />
            <span className="text-xs sm:text-sm font-semibold tracking-[0.28em] uppercase text-[#D8B477]">
              {yearCounter} YEARS OF LOVE
            </span>
            <Sparkles className="w-4 h-4 text-[#D8B477]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-white tracking-tight leading-[1.12] max-w-3xl"
          >
            Happy 10th Anniversary,{" "}
            <span className="italic text-[#D8B477] font-normal block sm:inline mt-1 sm:mt-0">
              {data.herName}.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-5 text-base sm:text-lg md:text-xl text-[#F5D6DC]/90 max-w-2xl leading-relaxed font-light px-2"
          >
            “{data.heroQuote}”
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="mt-9 w-full max-w-[330px] sm:max-w-[390px] mx-auto"
          >
            <div className="relative p-2.5 rounded-t-[180px] rounded-b-3xl bg-gradient-to-b from-[#D8B477]/60 via-[#D8B477]/25 to-[#350B1B]/60 shadow-[0_25px_70px_rgba(0,0,0,0.85)]">
              <div className="relative aspect-[4/5] w-full rounded-t-[170px] rounded-b-2xl overflow-hidden bg-[#1D0811] border border-[#D8B477]/40">
                <RomanticMediaFrame
                  src={data.heroPhoto}
                  alt="Our 10th Anniversary Portrait"
                  fallbackType="infinity"
                  fallbackLabel="Our 10th Anniversary"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="pt-3 pb-1 px-3 text-center">
                <p className="font-serif italic text-sm sm:text-base text-[#F5D6DC]/90">
                  “{data.heroPhotoCaption}”
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-10 w-full max-w-3xl mx-auto"
          >
            <div className="text-center mb-3">
              <span className="text-[11px] uppercase tracking-[0.28em] text-[#D8B477]/85">
                Every Second With You Counts
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-3">
              {[
                { label: "Years", value: duration.years },
                { label: "Months", value: duration.months },
                { label: "Days", value: duration.days },
                { label: "Hours", value: duration.hours },
                { label: "Minutes", value: duration.minutes },
                { label: "Seconds", value: duration.seconds }
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl bg-gradient-to-b from-[#350B1B]/75 to-[#1B0710]/90 border border-[#D8B477]/30 py-3.5 px-2 shadow-lg backdrop-blur-md flex flex-col items-center justify-center"
                >
                  <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-white tabular-nums">
                    {String(item.value).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#D8B477] mt-1">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10"
          >
            <a
              href="#journey"
              className="inline-flex items-center justify-center gap-3 min-h-[52px] px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D8B477] via-[#EED29E] to-[#C89D58] text-[#1A070E] font-semibold text-sm sm:text-base tracking-[0.15em] uppercase shadow-[0_10px_35px_rgba(216,180,119,0.35)] hover:brightness-105 active:scale-95 transition"
            >
              <span>Relive Our Story</span>
              <ChevronDown className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: OUR JOURNEY
      ===================================================================== */}
      <section
        id="journey"
        className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
      >
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D8B477] block mb-3">
            Our Journey • Ten Years, One Story
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white leading-tight">
            “Every Love Story Is Special, But Ours Is My Favourite.”
          </h2>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#D8B477] to-transparent mx-auto mt-5" />
        </div>

        <div className="relative">
          <div className="absolute left-4 sm:left-1/2 top-2 bottom-2 w-[1.5px] sm:-translate-x-1/2 bg-gradient-to-b from-[#D8B477]/20 via-[#D8B477]/70 to-[#D8B477]/20" />

          <div className="space-y-12 sm:space-y-16">
            {data.timelineChapters.map((chapter, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={chapter.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7 }}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-6 z-20 w-8 h-8 rounded-full bg-[#10070B] border-2 border-[#D8B477] shadow-[0_0_15px_rgba(216,180,119,0.6)] flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#D8B477]" />
                  </div>

                  <div className={`w-full pl-11 sm:pl-0 sm:w-1/2 ${isEven ? "sm:pr-10" : "sm:pl-10"}`}>
                    <div className="rounded-3xl bg-gradient-to-b from-[#350B1B]/75 via-[#220813]/90 to-[#15060C]/95 border border-[#D8B477]/30 p-5 sm:p-6 shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:border-[#D8B477]/60 transition group">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] uppercase tracking-[0.22em] text-[#D8B477]/90 font-medium">
                          {chapter.dateLabel}
                        </span>
                        <span className="font-serif text-2xl sm:text-3xl text-[#D8B477]/45 italic">
                          {chapter.number}
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl sm:text-3xl text-white mb-2.5">
                        {chapter.number} — {chapter.title}
                      </h3>

                      <p className="text-sm sm:text-base text-[#F5D6DC]/90 leading-relaxed mb-5">
                        “{chapter.text}”
                      </p>

                      <div className="relative rounded-2xl overflow-hidden border border-[#D8B477]/25 aspect-[16/10] bg-[#14060B]">
                        <RomanticMediaFrame
                          src={chapter.photo}
                          alt={chapter.title}
                          fallbackType={chapter.artType}
                          fallbackLabel={`Chapter ${chapter.number} Memory`}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="mt-3 pt-2 border-t border-[#D8B477]/15">
                        <p className="font-serif italic text-xs sm:text-sm text-[#D8B477]/90">
                          {chapter.caption}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: OUR MEMORIES — GALLERY
      ===================================================================== */}
      <section
        id="memories"
        className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D8B477] block mb-3">
            Our Memories • A Gallery of Us
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white leading-tight">
            “These aren't just photographs. They're little pieces of my favourite memories.”
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#F5D6DC]/75">
            Tap any memory to view full-screen ❤️
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {data.galleryMemories.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (idx % 4) * 0.08 }}
              className="group relative rounded-2xl overflow-hidden border border-[#D8B477]/30 bg-[#220813] shadow-xl flex flex-col justify-between aspect-[4/5]"
            >
              <div
                onClick={() => setActiveLightboxIndex(idx)}
                className="relative w-full h-full cursor-pointer overflow-hidden"
              >
                <RomanticMediaFrame
                  src={item.photo}
                  alt={item.title}
                  fallbackType={["stars", "coffee", "compass", "lantern", "hourglass", "infinity"][idx % 6]}
                  fallbackLabel={item.date}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#10070B] via-[#10070B]/25 to-transparent opacity-90" />

                <div className="absolute top-2.5 right-2.5 z-20">
                  <div className="w-8 h-8 rounded-full bg-[#10070B]/70 border border-[#D8B477]/30 flex items-center justify-center text-[#D8B477]">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#D8B477] block">
                    {item.date}
                  </span>
                  <h3 className="font-serif text-base sm:text-lg text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#F5D6DC]/80 line-clamp-2 mt-0.5">
                    {item.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {activeLightboxIndex !== null && data.galleryMemories[activeLightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#10070B]/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-6 overflow-y-auto"
          >
            <div className="w-full max-w-3xl flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.25em] text-[#D8B477]">
                Memory {activeLightboxIndex + 1} of {data.galleryMemories.length}
              </span>
              <button
                type="button"
                onClick={() => setActiveLightboxIndex(null)}
                aria-label="Close Lightbox"
                className="min-w-[44px] min-h-[44px] rounded-full bg-[#350B1B] border border-[#D8B477]/40 flex items-center justify-center text-[#F5D6DC]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-auto w-full max-w-2xl flex flex-col items-center">
              <div className="relative w-full max-h-[60vh] aspect-[4/3] rounded-2xl overflow-hidden border border-[#D8B477]/40 bg-[#0D0408] shadow-2xl">
                <RomanticMediaFrame
                  src={data.galleryMemories[activeLightboxIndex].photo}
                  alt={data.galleryMemories[activeLightboxIndex].title}
                  fallbackType={["stars", "coffee", "compass", "lantern", "hourglass", "infinity"][activeLightboxIndex % 6]}
                  fallbackLabel={data.galleryMemories[activeLightboxIndex].title}
                  className="w-full h-full object-contain bg-[#0D0408]"
                />
              </div>

              <div className="mt-5 w-full text-center space-y-2 px-2">
                <span className="text-[11px] uppercase tracking-[0.24em] text-[#D8B477] block">
                  {data.galleryMemories[activeLightboxIndex].date}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white">
                  {data.galleryMemories[activeLightboxIndex].title}
                </h3>
                <p className="text-sm sm:text-base text-[#F5D6DC]/90 max-w-lg mx-auto">
                  “{data.galleryMemories[activeLightboxIndex].caption}”
                </p>
              </div>
            </div>

            <div className="w-full max-w-xs flex items-center justify-between gap-4 pt-4">
              <button
                type="button"
                onClick={() =>
                  setActiveLightboxIndex((prev) =>
                    prev === 0 ? data.galleryMemories.length - 1 : prev - 1
                  )
                }
                className="min-h-[48px] flex-1 rounded-full bg-[#350B1B] border border-[#D8B477]/40 flex items-center justify-center gap-1 text-xs uppercase tracking-widest text-[#D8B477]"
              >
                <ChevronLeft className="w-4 h-4" /> Prev
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveLightboxIndex((prev) =>
                    prev === data.galleryMemories.length - 1 ? 0 : prev + 1
                  )
                }
                className="min-h-[48px] flex-1 rounded-full bg-[#350B1B] border border-[#D8B477]/40 flex items-center justify-center gap-1 text-xs uppercase tracking-widest text-[#D8B477]"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          SECTION 5: A LETTER FROM MY HEART
      ===================================================================== */}
      <section
        id="letter"
        className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
      >
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D8B477] block mb-3">
            A Letter From My Heart
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white leading-tight">
            “To The Girl Who Owns My Heart.”
          </h2>
        </div>

        <div className="flex items-center justify-center mb-5 px-1">
          <button
            type="button"
            onClick={() => setIsLetterOpen((prev) => !prev)}
            className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#350B1B] border border-[#D8B477]/40 text-xs uppercase tracking-widest text-[#D8B477]"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isLetterOpen ? "Fold Love Letter" : "Open Love Letter"}</span>
          </button>
        </div>

        <AnimatePresence initial={false}>
          {isLetterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.65, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="relative rounded-3xl paper-texture text-[#2A121B] p-6 sm:p-10 md:p-14 shadow-[0_25px_80px_rgba(0,0,0,0.85)] border-2 border-[#D8B477]">
                <div className="w-6 h-6 border-t-2 border-l-2 border-[#9C7332] absolute top-4 left-4 pointer-events-none" />
                <div className="w-6 h-6 border-t-2 border-r-2 border-[#9C7332] absolute top-4 right-4 pointer-events-none" />
                <div className="w-6 h-6 border-b-2 border-l-2 border-[#9C7332] absolute bottom-4 left-4 pointer-events-none" />
                <div className="w-6 h-6 border-b-2 border-r-2 border-[#9C7332] absolute bottom-4 right-4 pointer-events-none" />

                <div className="flex items-center justify-between border-b border-[#8C6229]/25 pb-4 mb-6">
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.25em] text-[#68152E] font-semibold block">
                      Ten Years of Us
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#350B1B] mt-1">
                      {data.loveLetterGreeting}
                    </h3>
                  </div>

                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F0D59C] via-[#D8B477] to-[#9E7638] border-2 border-[#FFF3D6] shadow-md flex items-center justify-center shrink-0 p-0 leading-none">
                    <div className="w-9 h-9 rounded-full border border-[#5E4114]/40 flex items-center justify-center bg-[#D8B477]/30 m-auto">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4 text-[#4B0E25] fill-current block m-auto"
                        aria-hidden="true"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-5 font-serif text-lg sm:text-xl leading-[1.85] text-[#2A121B]">
                  {data.loveLetterParagraphs.map((para, i) => (
                    <p
                      key={i}
                      className={
                        i === data.loveLetterParagraphs.length - 1
                          ? "font-semibold italic text-[#68152E]"
                          : ""
                      }
                    >
                      {para}
                    </p>
                  ))}
                </div>

                <div className="mt-10 pt-6 border-t border-[#8C6229]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-[#68152E]/80">
                    Written from the heart • 10th Anniversary
                  </div>
                  <div className="font-handwriting text-3xl sm:text-4xl text-[#68152E]">
                    {data.loveLetterSignature}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* =====================================================================
          SECTION 6: TEN REASONS WHY I LOVE YOU
      ===================================================================== */}
      <section
        id="reasons"
        className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D8B477] block mb-3">
            Ten Reasons Why I Love You
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white leading-tight">
            “If I had to fall in love with you all over again, I'd have ten thousand reasons.”
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#F5D6DC]/75">
            Tap each card to reveal a reason ❤️
          </p>

          <button
            type="button"
            onClick={revealAllReasons}
            className="mt-4 min-h-[44px] px-5 py-2 rounded-full bg-[#350B1B] border border-[#D8B477]/40 text-xs uppercase tracking-[0.2em] text-[#D8B477] hover:bg-[#4B0E25] transition"
          >
            Reveal All 10 Reasons
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {data.tenReasons.map((reason) => {
            const isRevealed = !!revealedReasons[reason.id];
            return (
              <motion.button
                key={reason.id}
                type="button"
                onClick={() => toggleReasonCard(reason.id)}
                whileTap={{ scale: 0.98 }}
                className={`w-full min-h-[165px] sm:min-h-[195px] rounded-2xl p-5 text-left transition-all duration-500 flex flex-col justify-between border cursor-pointer relative overflow-hidden ${
                  isRevealed
                    ? "bg-gradient-to-br from-[#68152E] via-[#350B1B] to-[#1D0710] border-[#D8B477] shadow-[0_10px_30px_rgba(216,180,119,0.2)]"
                    : "bg-gradient-to-b from-[#250915] to-[#16060D] border-[#D8B477]/30 hover:border-[#D8B477]/60"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-serif italic text-2xl text-[#D8B477]">
                    {reason.roman}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                      isRevealed
                        ? "bg-[#D8B477] text-[#10070B] border-[#D8B477]"
                        : "border-[#D8B477]/40 text-[#D8B477]"
                    }`}
                  >
                    {isRevealed ? <Heart className="w-4 h-4 fill-[#10070B]" /> : <Lock className="w-3.5 h-3.5" />}
                  </div>
                </div>

                {isRevealed ? (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-serif text-lg sm:text-xl text-white leading-snug my-auto pt-3"
                  >
                    “{reason.text}”
                  </motion.p>
                ) : (
                  <div className="my-auto pt-3">
                    <p className="text-xs uppercase tracking-[0.22em] text-[#D8B477]/80">
                      Reason #{reason.id}
                    </p>
                    <p className="font-serif italic text-base text-[#F5D6DC]/60 mt-1">
                      Tap to unlock...
                    </p>
                  </div>
                )}

                <div className="w-full h-[1px] bg-gradient-to-r from-[#D8B477]/40 to-transparent mt-3" />
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          SECTION 7: THE LITTLE THINGS
      ===================================================================== */}
      <section
        id="little-things"
        className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
      >
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D8B477] block mb-3">
            Intimate Details
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white leading-tight">
            The Little Things I Never Want To Forget
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-5">
          {data.littleThings.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="w-full sm:w-auto rounded-2xl sm:rounded-full bg-gradient-to-r from-[#350B1B]/90 via-[#240813]/90 to-[#350B1B]/90 border border-[#D8B477]/35 px-6 py-4 sm:px-8 sm:py-5 shadow-lg flex items-center gap-3.5"
            >
              <Sparkles className="w-4 h-4 text-[#D8B477] shrink-0" />
              <span className="font-serif italic text-xl sm:text-2xl text-[#F5D6DC]">
                “{item}”
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          SECTION 8: A PROMISE FOR OUR FUTURE
      ===================================================================== */}
      <section
        id="promises"
        className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="max-w-3xl mx-auto rounded-3xl bg-gradient-to-b from-[#2A0815] via-[#17060D] to-[#10070B] border border-[#D8B477]/40 p-7 sm:p-12 md:p-16 shadow-[0_25px_90px_rgba(0,0,0,0.9)] text-center relative">
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#D8B477]/30 to-[#350B1B] border border-[#D8B477] shadow-[0_0_40px_rgba(216,180,119,0.5)] flex items-center justify-center mx-auto mb-6"
          >
            <Heart className="w-8 h-8 sm:w-9 sm:h-9 text-[#D8B477] fill-[#D8B477]" />
          </motion.div>

          <span className="text-xs uppercase tracking-[0.3em] text-[#D8B477] block mb-2">
            A Promise For Our Future
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white mb-8 sm:mb-10">
            My Promise To You.
          </h2>

          <div className="space-y-4 sm:space-y-5 max-w-xl mx-auto">
            {data.promises.map((vow, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`font-serif text-xl sm:text-2xl leading-relaxed ${
                  idx === 1 || idx === data.promises.length - 1
                    ? "text-[#D8B477] italic font-semibold"
                    : "text-[#F5D6DC]/95"
                }`}
              >
                {vow}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 9: THE FINAL SURPRISE TRIGGER
      ===================================================================== */}
      <section
        id="finale"
        className="relative py-24 sm:py-32 px-4 sm:px-6 text-center max-w-xl mx-auto flex flex-col items-center"
      >
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            boxShadow: [
              "0 0 25px rgba(216,180,119,0.3)",
              "0 0 55px rgba(216,180,119,0.7)",
              "0 0 25px rgba(216,180,119,0.3)"
            ]
          }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-[#68152E] to-[#350B1B] border-2 border-[#D8B477] flex items-center justify-center mb-6"
        >
          <Heart className="w-9 h-9 text-[#D8B477] fill-[#D8B477]" />
        </motion.div>

        <p className="font-serif italic text-2xl sm:text-3xl text-[#F5D6DC] mb-8">
          “Before you go, there's one last thing...”
        </p>

        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          onClick={() => setShowFinalSurpriseModal(true)}
          className="w-full sm:w-auto min-h-[54px] px-9 py-4 rounded-full bg-gradient-to-r from-[#D8B477] via-[#F3DCAD] to-[#C89D58] text-[#1A070E] font-semibold text-sm sm:text-base tracking-[0.16em] uppercase shadow-[0_12px_45px_rgba(216,180,119,0.45)] flex items-center justify-center gap-2.5 cursor-pointer"
        >
          <span>One Last Surprise ❤️</span>
        </motion.button>
      </section>

      {/* =====================================================================
          SECTION 10: CINEMATIC FINALE OVERLAY
      ===================================================================== */}
      <AnimatePresence>
        {showFinalSurpriseModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            className="fixed inset-0 z-50 bg-[#0D0408] overflow-y-auto overflow-x-hidden flex flex-col items-center justify-between px-4 py-10 sm:py-14 text-center"
          >
            <div
              className="fixed inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 30%, rgba(104,21,46,0.55) 0%, rgba(16,7,11,0.96) 70%)"
              }}
            />

            <div className="relative z-10 w-full max-w-2xl mx-auto my-auto flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative flex items-center justify-center mb-6"
              >
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-2 border-[#D8B477]/60 bg-gradient-to-b from-[#350B1B] to-[#12050A] shadow-[0_0_60px_rgba(216,180,119,0.45)] flex flex-col items-center justify-center">
                  <span className="font-serif text-5xl sm:text-6xl text-[#D8B477] leading-none">
                    10
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#F5D6DC] mt-1">
                    Years
                  </span>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-[#D8B477] text-[#10070B] flex items-center justify-center shadow-lg"
                >
                  <Heart className="w-5 h-5 fill-[#10070B]" />
                </motion.div>
              </motion.div>

              <div className="space-y-4 sm:space-y-5 px-2">
                {[
                  "Ten years ago, it was you.",
                  "Today, it's still you.",
                  "And in every tomorrow I dream of, it's going to be you.",
                  "I don't know what tomorrow holds, how many challenges we'll face, or how many years we'll get together.",
                  "But I know this...",
                  "I want to hold your hand through all of it.",
                  "You will never be just a chapter in my life. You are the story I want to keep writing.",
                  "10 Years Down. Forever To Go.",
                  `Happy 10th Anniversary, My Forever Person.`,
                  "I LOVE YOU. ❤️"
                ].map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 + i * 0.28 }}
                    className={
                      i === 9
                        ? "font-serif text-3xl sm:text-5xl text-[#D8B477] font-semibold pt-3"
                        : i === 7 || i === 8
                        ? "font-serif italic text-2xl sm:text-3xl text-white pt-1"
                        : "font-serif text-lg sm:text-2xl text-[#F5D6DC]/90 leading-relaxed"
                    }
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.6 }}
                className="mt-10 flex flex-wrap items-center justify-center gap-3"
              >
                <button
                  type="button"
                  onClick={() => setShowFinalSurpriseModal(false)}
                  className="min-h-[48px] px-7 py-3 rounded-full bg-[#350B1B] border border-[#D8B477]/50 text-xs uppercase tracking-[0.2em] text-[#D8B477] hover:bg-[#4B0E25] transition"
                >
                  Return to Our Story
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="relative z-20 border-t border-[#D8B477]/20 py-10 px-4 text-center text-xs text-[#F5D6DC]/60 space-y-3">
        <div className="flex items-center justify-center gap-2 text-[#D8B477]">
          <Heart className="w-3.5 h-3.5 fill-[#D8B477]" />
          <span className="font-serif italic text-base text-[#F5D6DC]">
            Our Forever — 10 Years of Love
          </span>
          <Heart className="w-3.5 h-3.5 fill-[#D8B477]" />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={() => setShowIntro(true)}
            className="underline hover:text-[#D8B477] transition"
          >
            Replay Opening Envelope
          </button>
        </div>
      </footer>
    </div>
  );
}

