import { Howl } from "howler";
import { useEffect, useRef } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SoundStore {
  isMuted: boolean;
  toggleMute: () => void;
}

export const useSoundStore = create<SoundStore>()(
  persist(
    (set) => ({
      isMuted: false,
      toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
    }),
    {
      name: "sound-storage",
    },
  ),
);

const SOUNDS = {
  click: "/sounds/click.mp3",
  flip: "/sounds/flip.mp3",
  win: "/sounds/win.mp3",
  lose: "/sounds/lose.mp3",
  start: "/sounds/start.mp3",
};

export const useSound = () => {
  const isMuted = useSoundStore((state) => state.isMuted);
  const sounds = useRef<Record<keyof typeof SOUNDS, Howl | null>>({
    click: null,
    flip: null,
    win: null,
    lose: null,
    start: null,
  });

  useEffect(() => {
    Object.entries(SOUNDS).forEach(([key, src]) => {
      sounds.current[key as keyof typeof SOUNDS] = new Howl({
        src: [src],
        volume: 0.5,
      });
    });

    return () => {
      // Cleanup sounds
      Object.values(sounds.current).forEach((sound) => sound?.unload());
    };
  }, []);

  const playSound = (type: keyof typeof SOUNDS) => {
    if (!isMuted && sounds.current[type]) {
      sounds.current[type]?.play();
    }
  };

  return { playSound, isMuted };
};

