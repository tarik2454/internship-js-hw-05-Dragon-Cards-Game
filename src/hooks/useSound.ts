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
  click: "/sounds/click.wav",
  cardFlip: "/sounds/card-flip.mp3",
  reveal: "/sounds/reveal.mp3",
  result: "/sounds/result.mp3",
};

export const useSound = () => {
  const isMuted = useSoundStore((state) => state.isMuted);
  const sounds = useRef<Record<keyof typeof SOUNDS, Howl | null>>({
    click: null,
    cardFlip: null,
    reveal: null,
    result: null,
  });

  useEffect(() => {
    Object.entries(SOUNDS).forEach(([key, src]) => {
      const volume = key === "cardFlip" ? 0.1 : 0.5;
      sounds.current[key as keyof typeof SOUNDS] = new Howl({
        src: [src],
        volume,
      });
    });

    const currentSounds = sounds.current;

    return () => {
      Object.values(currentSounds).forEach((sound) => sound?.unload());
    };
  }, []);

  const playSound = (type: keyof typeof SOUNDS) => {
    if (!isMuted && sounds.current[type]) {
      if (type !== "cardFlip") {
        sounds.current[type]?.stop();
      }
      sounds.current[type]?.play();
    }
  };

  return { playSound, isMuted };
};
