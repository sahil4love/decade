```react
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
  Maximize2,
  Volume2,
  VolumeX
} from 'lucide-react';

// ============================================================================
// 1. CENTRALIZED ANNIVERSARY STORY DATA
// ============================================================================
const ANNIVERSARY_DATA = {
  myName: "Yours Forever",
  herName: "My Love",
  anniversaryDate: "2016-11-03T00:00:00",
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
      photo: "https://media.giphy.com/media/l4pTdcifPZLpDjL1e/giphy.gif"
    },
    {
      id: "02",
      number: "02",
      title: "The First Memories",
      dateLabel: "Chapter II • Early Sparks",
      text: "Those little conversations, silly smiles, unexpected moments... I wish I could relive every one of them.",
      caption: "Late-night talks and butterflies that never truly left.",
      photo: "https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif"
    },
    {
      id: "03",
      number: "03",
      title: "Growing Together",
      dateLabel: "Chapter III • Side by Side",
      text: "We learned, we changed, we made mistakes, and we grew. But every experience made our story more meaningful.",
      caption: "Learning how to love each other better through every season.",
      photo: "https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif"
    },
    {
      id: "04",
      number: "04",
      title: "The Beautiful Chaos",
      dateLabel: "Chapter IV • Unfiltered Us",
      text: "From silly arguments to endless laughter, even our imperfect moments became memories I wouldn't trade for anything.",
      caption: "Dancing in the rain and laughing until our stomachs hurt.",
      photo: "https://media.giphy.com/media/10UeedrT5MIfPG/giphy.gif"
    },
    {
      id: "05",
      number: "05",
      title: "A Thousand Little Moments",
      dateLabel: "Chapter V • Quiet Magic",
      text: "It's never just about the big occasions. It's the random talks, little gestures, and simple moments that mean the most.",
      caption: "Ordinary days that turned into extraordinary treasures.",
      photo: "https://media.giphy.com/media/ZBQhoZC0nqknSviPqT/giphy.gif"
    },
    {
      id: "06",
      number: "06",
      title: "Ten Years Later",
      dateLabel: "Chapter VI • A Decade of Love",
      text: "Here we are, ten years later. And if I had to start everything again, I'd still want it to begin with you.",
      caption: "3,652+ sunrises and you are still my favourite view.",
      photo: "https://media.giphy.com/media/G3va31oEEnIkM/giphy.gif"
    },
    {
      id: "07",
      number: "07",
      title: "Forever",
      dateLabel: "Chapter VII • Our Horizon",
      text: "This isn't the end of our story. It's just another beautiful beginning.",
      caption: "To the next ten decades, hand in hand.",
      photo: "https://media.giphy.com/media/M90mJvfWfd5mbUuULX/giphy.gif"
    }
  ],
  galleryMemories: [
    { id: 1, title: "Our First Snapshot", caption: "That shy smile I fell in love with instantly.", date: "Year I", photo: "https://media.giphy.com/media/l4pTdcifPZLpDjL1e/giphy.gif" },
    { id: 2, title: "Coffee & Conversations", caption: "Two cups, three hours, and a whole world of dreams.", date: "Year II", photo: "https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif" },
    { id: 3, title: "Sunset Strolls", caption: "Walking nowhere in particular, as long as it was with you.", date: "Year III", photo: "https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif" },
    { id: 4, title: "Midnight Laughter", caption: "Our inside jokes that nobody else in the world understands.", date: "Year IV", photo: "https://media.giphy.com/media/10UeedrT5MIfPG/giphy.gif" },
    { id: 5, title: "Unplanned Roadtrip", caption: "Getting lost together was the best detour of my life.", date: "Year V", photo: "https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif" },
    { id: 6, title: "Rainy Afternoon", caption: "Wrapped in warmth while the world outside slowed down.", date: "Year VI", photo: "https://media.giphy.com/media/wnsgren9NtITS/giphy.gif" },
    { id: 7, title: "Celebration Lights", caption: "Looking at the lights while I was only looking at you.", date: "Year VII", photo: "https://media.giphy.com/media/l0HlOvJ7yaacpuSas/giphy.gif" },
    { id: 8, title: "Quiet Mornings", caption: "Sunlight on your face—my peace in a noisy world.", date: "Year VIII", photo: "https://media.giphy.com/media/ZBQhoZC0nqknSviPqT/giphy.gif" },
    { id: 9, title: "Through Every Storm", caption: "Holding on tighter when things weren't easy.", date: "Year VIII", photo: "https://media.giphy.com/media/3M4NpbLCTxBqU/giphy.gif" },
    { id: 10, title: "Your Favourite Smile", caption: "The exact look that melts every worry away.", date: "Year IX", photo: "https://media.giphy.com/media/G3va31oEEnIkM/giphy.gif" },
    { id: 11, title: "A Decade of Us", caption: "Ten years of building a home in each other's hearts.", date: "Year X", photo: "https://media.giphy.com/media/bGm9FuBCGg4SY/giphy.gif" },
    { id: 12, title: "Our Tomorrow", caption: "Every adventure still waiting for us to live it.", date: "Forever", photo: "https://media.giphy.com/media/M90mJvfWfd5mbUuULX/giphy.gif" }
  ],
  loveLetterGreeting: "My Love,",
  loveLetterParagraphs: [
    "I honestly don't know where to begin, because how do you put ten years of love into a few paragraphs?",
    "We've come so far. From the little moments that made us smile to the difficult days that taught us to hold on tighter, every part of this journey has become a beautiful piece of our story.",
    "You aren't just someone I love. You're the person whose happiness matters to me, whose smile can change my entire day, and whose presence makes even the simplest moments feel magical.",
    "I know we aren't perfect. We've had our disagreements, misunderstandings, and difficult moments. But through it all, there's one thing I never want you to doubt: you mean more to me than words could ever explain.",
    "Thank you for being you. Thank you for every laugh, every hug, every little effort, every memory, and every moment you've shared with me.",
    "If I could go back ten years and live everything again, I wouldn't change a thing if it meant finding my way back to you.",
    "And if life gave me a thousand lifetimes, I'd still look for you in every single one.",
    "I don't just want more years with you. I want more ordinary mornings, random conversations, silly arguments, unexpected adventures, and countless little moments that become our favourite memories.",
    "Ten years have passed, but my favourite love story is still ours.",
    "Forever yours."
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
// 2. ROMANTIC SYNTHESIZER
// ============================================================================
class RomanticPianoSynthesizer {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.isMuted = true;
    this.intervalId = null;
    this.stepIndex = 0;
    this.progression = [
      [349.23, 440.00, 523.25, 659.25, 783.99, 659.25, 523.25, 440.00],
      [329.63, 392.00, 523.25, 659.25, 880.00, 783.99, 659.25, 523.25],
      [293.66, 440.00, 523.25, 587.33, 659.25, 587.33, 523.25, 440.00],
      [233.08, 349.23, 440.00, 587.33, 698.46, 587.33, 440.00, 349.23]
    ];
  }
  init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) this.ctx = new AC();
    }
    if (this.ctx && this.ctx.state === "suspended") this.ctx.resume();
  }
  playNote(freq, duration = 2.5, volume = 0.04) {
    if (!this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(volume, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + duration + 0.05);
    } catch (e) {}
  }
  start() {
    this.init();
    this.isMuted = false;
    if (this.isPlaying) return;
    this.isPlaying = true;
    const tick = () => {
      if (!this.isPlaying) return;
      const bar = Math.floor(this.stepIndex / 8) % this.progression.length;
      const beat = this.stepIndex % 8;
      const freq = this.progression[bar][beat];
      this.playNote(freq, 2.5, 0.04);
      this.stepIndex++;
    };
    tick();
    this.intervalId = setInterval(tick, 750);
  }
  stop() {
    this.isPlaying = false;
    this.isMuted = true;
    if (this.intervalId) { clearInterval(this.intervalId); this.intervalId = null; }
  }
}
const romanticSynth = new RomanticPianoSynthesizer();

// ============================================================================
// 3. MEDIA FRAME
// ============================================================================
const RomanticMediaFrame = ({ src, alt, className = "" }) => {
  const [hasError, setHasError] = useState(false);
  if (!src || hasError) {
    return (
      <div className={`flex flex-col items-center justify-center bg-[#270915] text-[#D8B477] ${className}`}>
        <Heart className="w-12 h-12 mb-2 animate-pulse" />
        <span className="text-xs uppercase tracking-widest">{alt || "Our Memory"}</span>
      </div>
    );
  }
  return <img src={src} alt={alt || "Memory"} loading="lazy" onError={() => setHasError(true)} className={className} />;
};

// ============================================================================
// 4. AMBIENT PARTICLES
// ============================================================================
const AmbientParticles = ({ intensity = "normal" }) => {
  const petals = useMemo(() => {
    const count = intensity === "high" ? 20 : 12;
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
            opacity: [0, p.isGold ? 0.65 : 0.45, 0],
            rotate: [0, p.id % 2 === 0 ? 220 : -220]
          }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
          style={{ left: p.left, width: p.size, height: p.size }}
          className="absolute top-0"
        >
          {p.isGold ? (
            <div className="w-1.5 h-1.5 rounded-full bg-[#D8B477] shadow-[0_0_10px_#D8B477]" />
          ) : (
            <div className="w-full h-full bg-[#8B1E3F]/80 rounded-full" />
          )}
        </motion.div>
      ))}
    </div>
  );
};

// ============================================================================
// 5. INTRO SCREEN (ENVELOPE OPENING ANIMATION)
// ============================================================================
const IntroScreen = ({ onComplete, herName }) => {
  const [stage, setStage] = useState("sealed");

  const handleOpenEnvelope = () => {
    if (stage !== "sealed") return;
    setStage("opening");
    setTimeout(() => setStage("revealed"), 900);
  };

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.03, filter: "blur(8px)" }}
      transition={{ duration: 1.1, ease: "easeInOut" }}
      className="fixed inset-0 z-50 min-h-[100dvh] w-full bg-[#10070B] flex flex-col items-center justify-between px-4 py-8 select-none overflow-y-auto"
    >
      <div className="relative z-10 text-center max-w-md mx-auto pt-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D8B477]/30 bg-[#350B1B]/60 text-[#D8B477] text-[11px] tracking-[0.28em] uppercase mb-4">
          <Sparkles className="w-3 h-3" /> Our 10th Anniversary
        </div>
        <p className="font-serif italic text-xl sm:text-2xl text-[#F5D6DC] tracking-wide">
          “Some stories are too beautiful to end...”
        </p>
      </div>

      <div className="relative z-10 w-full max-w-[360px] my-6 flex flex-col items-center">
        <div className="relative w-full h-[280px] rounded-2xl shadow-2xl border border-[#D8B477]/50 bg-gradient-to-b from-[#4B0E25] to-[#2B0715] overflow-visible">
          
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={
              stage === "revealed"
                ? { y: -75, opacity: 1, scale: 1 }
                : stage === "opening"
                ? { y: -20, opacity: 0.9, scale: 0.98 }
                : { y: 20, opacity: 0, scale: 0.95 }
            }
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-4 top-2 bottom-4 z-20 rounded-xl bg-[#FAF4EC] text-[#2A121B] p-5 shadow-2xl border border-[#D8B477] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between border-b border-[#D8B477]/40 pb-2">
              <span className="text-[10px] tracking-[0.22em] uppercase text-[#68152E] font-semibold">For {herName}</span>
              <Heart className="w-3.5 h-3.5 text-[#68152E] fill-[#68152E]" />
            </div>
            <p className="font-serif text-sm sm:text-base leading-relaxed text-[#2A121B] italic text-center py-2">
              “Ten years ago, our story began. Little did I know that you would become my favourite part of life.”
            </p>
            <div className="text-right font-handwriting text-lg text-[#68152E]">10 Years of Us ♥</div>
          </motion.div>

          <div
            className="absolute inset-0 z-30 pointer-events-none rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(83,16,39,0.98) 0%, rgba(36,6,18,1) 100%)",
              clipPath: "polygon(0 35%, 50% 55%, 100% 35%, 100% 100%, 0 100%)"
            }}
          />

          <motion.div
            initial={{ rotateX: 0 }}
            animate={stage === "sealed" ? { rotateX: 0 } : { rotateX: 180 }}
            transition={{ duration: 0.85, ease: "easeInOut" }}
            style={{
              transformOrigin: "top",
              clipPath: "polygon(0 0, 100% 0, 50% 55%)",
              background: "linear-gradient(180deg, #68152E 0%, #3E0B1D 100%)"
            }}
            className={`absolute inset-x-0 top-0 h-full rounded-t-2xl border-t border-[#D8B477]/60 ${stage === "revealed" ? "z-10" : "z-40"}`}
          />

          {stage === "sealed" && (
            <div className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 z-50 flex items-center justify-center">
              <motion.button
                type="button"
                onClick={handleOpenEnvelope}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: [1, 1.06, 1], opacity: 1 }}
                exit={{ scale: 1.4, opacity: 0 }}
                transition={{ scale: { duration: 2.4, repeat: Infinity, ease: "easeInOut" } }}
                aria-label="Open Wax Seal"
                className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F0D59C] via-[#D8B477] to-[#9E7638] shadow-2xl border-2 border-[#FFF3D6] flex items-center justify-center cursor-pointer active:scale-95"
              >
                <div className="w-11 h-11 rounded-full border border-[#5E4114]/50 flex items-center justify-center bg-[#D8B477]/30">
                  <Heart className="w-5 h-5 text-[#4B0E25] fill-[#4B0E25]" />
                </div>
              </motion.button>
            </div>
          )}
        </div>
      </div>

      <div className="relative z-20 w-full max-w-xs mx-auto pb-4">
        {stage !== "revealed" ? (
          <button
            type="button"
            onClick={handleOpenEnvelope}
            className="w-full min-h-[52px] rounded-full bg-gradient-to-r from-[#D8B477] to-[#C89D58] text-[#1A070E] font-semibold text-sm uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" /> Open Your Surprise
          </button>
        ) : (
          <button
            type="button"
            onClick={onComplete}
            className="w-full min-h-[52px] rounded-full bg-gradient-to-r from-[#D8B477] to-[#C89D58] text-[#1A070E] font-semibold text-sm uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Enter Our Story</span> <Heart className="w-4 h-4 fill-[#1A070E]" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

// ============================================================================
// 6. MAIN APPLICATION COMPONENT
// ============================================================================
export default function App() {
  const data = ANNIVERSARY_DATA;
  const [showIntro, setShowIntro] = useState(true);
  const [revealedReasons, setRevealedReasons] = useState({});
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);
  const [showFinalSurpriseModal, setShowFinalSurpriseModal] = useState(false);
  const [yearCounter, setYearCounter] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const [duration, setDuration] = useState({ years: 10, months: 0, days: 0, hours: 0, minutes: 0, seconds:
