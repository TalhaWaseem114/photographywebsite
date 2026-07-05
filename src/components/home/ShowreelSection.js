'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export default function ShowreelSection() {
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showreelUrl, setShowreelUrl] = useState("/videos/showreel.mp4");

  // Sync video source from settings
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "site_config", "settings"), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        if (data.general?.showreelUrl) {
          setShowreelUrl(data.general.showreelUrl);
        }
      }
    });
    return () => unsubscribe();
  }, []);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');
  const [showControls, setShowControls] = useState(true);
  const controlsTimeout = useRef(null);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  const handleProgressClick = useCallback((e) => {
    const video = videoRef.current;
    const bar = progressRef.current;
    if (!video || !bar) return;
    const rect = bar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
  }, []);

  const handleFullscreen = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.requestFullscreen) video.requestFullscreen();
    else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
  }, []);

  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    controlsTimeout.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  }, [isPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      setProgress((video.currentTime / video.duration) * 100 || 0);
      setCurrentTime(formatTime(video.currentTime));
    };
    const onLoadedMetadata = () => {
      setDuration(formatTime(video.duration));
    };
    const onEnded = () => {
      setIsPlaying(false);
      setShowControls(true);
    };

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('ended', onEnded);

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('ended', onEnded);
    };
  }, []);

  return (
    <section id="showreel-section" className="relative py-20 md:py-24 bg-background border-t border-divider flex items-center min-h-[460px]">


      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(197,160,117,0.03)_0%,transparent_70%)] pointer-events-none"></div>

      {/* ─── Main Content Grid ─── */}
      <div className="relative z-10 w-full mx-auto px-8 py-4 pl-8 md:pl-28 lg:pl-32 lg:pr-16 xl:pr-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-y-16 lg:gap-x-0 items-center w-full">

          {/* COLUMN 1: Editorial Text Block */}
          <div className="lg:col-span-1 flex flex-col items-start w-full pr-0 lg:pr-12">
            <span className="font-condensed text-[12px] tracking-[0.4em] uppercase text-muted mb-3 block select-none">
              VISUAL JOURNAL
            </span>

            <h2 className="font-display text-[36px] md:text-[48px] lg:text-[64px] font-light tracking-[0.1em] uppercase text-foreground/95 leading-[1.1] mb-6 max-w-[400px]">
              EXPERIENCE MY WORK
            </h2>

            <p className="text-muted text-[13px] font-light leading-[2] tracking-wide mb-10 max-w-[320px]">
              Watch the story behind the shots. A short film that captures my cinematic vision, process, and passion for storytelling.
            </p>

            <button
              onClick={togglePlay}
              className="font-condensed text-[11px] font-medium tracking-[0.25em] uppercase text-[#c5a075] border-b border-[#c5a075]/40 hover:border-[#c5a075] hover:text-white pb-2 transition-all duration-300 group select-none"
            >
              WATCH SHOWREEL
            </button>
          </div>

          {/* COLUMNS 2 TO 4: Camera with Video */}
          <div className="w-full lg:col-span-3 flex justify-end lg:pl-8 xl:pl-20">
            <div className="relative w-full max-w-[860px]">
              <img
                src="/images/camera.png"
                alt="Showreel Camera"
                className="w-full h-auto block"
              />

              {/* Camera Screen Video Overlay — pure % so it scales with camera at all sizes */}
              <div
                className="absolute bg-background overflow-hidden group/screen"
                style={{
                  left: '10.7%',
                  top: '27.7%',
                  width: '61.2%',
                  height: '67.4%',
                  borderRadius: '1.2%'
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => { if (isPlaying) setShowControls(false); }}
              >
                {/* Video Element */}
                <video
                  ref={videoRef}
                  key={showreelUrl}
                  className="w-full h-full object-cover"
                  poster="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop"
                  muted={isMuted}
                  preload="metadata"
                  playsInline
                  onClick={togglePlay}
                >
                  <source src={showreelUrl} type="video/mp4" />
                </video>

                {/* ─── Play Button Overlay (when paused) ─── */}
                <div
                  className="absolute inset-0 flex items-center justify-center cursor-pointer transition-all duration-500"
                  style={{
                    background: isPlaying ? 'transparent' : 'rgba(0,0,0,0.35)',
                    opacity: (!isPlaying || showControls) ? 1 : 0,
                    pointerEvents: isPlaying && !showControls ? 'none' : 'auto'
                  }}
                  onClick={togglePlay}
                >
                  {!isPlaying && (
                    <div className="relative flex items-center justify-center">
                      {/* Pulse ring */}
                      <div className="absolute w-16 h-16 rounded-full border border-[#c5a075]/30 animate-ping" style={{ animationDuration: '2s' }}></div>
                      {/* Button */}
                      <div className="w-14 h-14 rounded-full flex items-center justify-center border border-divider bg-background/50 backdrop-blur-md shadow-[0_0_30px_rgba(197,160,117,0.15)] hover:bg-[#c5a075]/20 hover:border-[#c5a075]/50 hover:scale-110 transition-all duration-300">
                        <Play className="w-5 h-5 text-[#c5a075] ml-0.5" fill="currentColor" />
                      </div>
                    </div>
                  )}
                </div>

                {/* ─── HUD Top Bar ─── */}
                <div
                  className="absolute top-0 left-0 right-0 flex justify-between items-center px-3 py-2 font-mono text-[8px] tracking-[0.2em] uppercase select-none pointer-events-none transition-opacity duration-500"
                  style={{ opacity: showControls ? 1 : 0 }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[#c5a075] font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c5a075] inline-block" style={{ animation: isPlaying ? 'pulse 1.5s ease-in-out infinite' : 'none' }}></span>
                      {isPlaying ? 'REC' : 'STANDBY'}
                    </span>
                    <span className="text-white/30">LOG-C 10BIT</span>
                  </div>
                  <span className="text-white/30">ISO 800 · ƒ/2.8</span>
                </div>

                {/* ─── Custom Controller Bar ─── */}
                <div
                  className="absolute bottom-0 left-0 right-0 transition-all duration-500"
                  style={{
                    opacity: showControls ? 1 : 0,
                    transform: showControls ? 'translateY(0)' : 'translateY(6px)'
                  }}
                >
                  {/* Gradient fade background */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent pointer-events-none"></div>

                  <div className="relative px-3 pb-2.5 pt-5">
                    {/* Progress Bar */}
                    <div
                      ref={progressRef}
                      className="w-full h-[3px] bg-foreground/10 rounded-full cursor-pointer mb-2.5 group/progress relative"
                      onClick={handleProgressClick}
                    >
                      {/* Buffered track */}
                      <div className="absolute inset-0 bg-white/[0.06] rounded-full"></div>
                      {/* Active track */}
                      <div
                        className="absolute left-0 top-0 bottom-0 rounded-full bg-gradient-to-r from-[#c5a075] to-[#d4b48a] transition-all duration-100"
                        style={{ width: `${progress}%` }}
                      ></div>
                      {/* Scrubber dot */}
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#c5a075] shadow-[0_0_8px_rgba(197,160,117,0.5)] opacity-0 group-hover/progress:opacity-100 transition-opacity duration-200"
                        style={{ left: `calc(${progress}% - 5px)` }}
                      ></div>
                    </div>

                    {/* Controls Row */}
                    <div className="flex items-center justify-between">
                      {/* Left: Play + Time */}
                      <div className="flex items-center gap-2.5">
                        <button
                          onClick={togglePlay}
                          className="w-7 h-7 rounded-full flex items-center justify-center border border-white/10 bg-white/[0.04] hover:bg-[#c5a075]/20 hover:border-[#c5a075]/40 transition-all duration-300"
                        >
                          {isPlaying
                            ? <Pause className="w-3 h-3 text-white/80" />
                            : <Play className="w-3 h-3 text-white/80 ml-0.5" fill="currentColor" />
                          }
                        </button>
                        <span className="font-mono text-[9px] text-white/50 tracking-widest select-none">
                          {currentTime} <span className="text-white/20">/</span> {duration}
                        </span>
                      </div>

                      {/* Right: Volume + Fullscreen */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={toggleMute}
                          className="w-7 h-7 rounded-full flex items-center justify-center border border-white/10 bg-white/[0.04] hover:bg-[#c5a075]/20 hover:border-[#c5a075]/40 transition-all duration-300"
                        >
                          {isMuted
                            ? <VolumeX className="w-3 h-3 text-white/50" />
                            : <Volume2 className="w-3 h-3 text-white/50" />
                          }
                        </button>
                        <button
                          onClick={handleFullscreen}
                          className="w-7 h-7 rounded-full flex items-center justify-center border border-white/10 bg-white/[0.04] hover:bg-[#c5a075]/20 hover:border-[#c5a075]/40 transition-all duration-300"
                        >
                          <Maximize className="w-3 h-3 text-white/50" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}