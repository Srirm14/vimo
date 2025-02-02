import { create } from "zustand";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  prompt: string;
  video: string;
  creator?: string;
  avatar?: string;
}

interface VideoDataStore {
  videoData: Video[];
  isLoading: boolean;
  setVideoData: (videos: Video[]) => void;
}

const useVideoDataStore = create<VideoDataStore>((set) => ({
  videoData: [],
  isLoading: false,

  setVideoData: (videos) => {
    set({ isLoading: true }); // Start loading
    setTimeout(() => {
      set({ videoData: videos, isLoading: false }); // Update data and stop loading
    }, 500); // Simulate API delay
  },
}));

export default useVideoDataStore;
