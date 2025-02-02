import {
    View,
    Text,
    FlatList,
    Image,
    RefreshControl,
    SafeAreaView,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { images } from "../../constants";
  import SearchInput from "@/components/SearchInput";
  import TrendingList from "../../components/TrendingList";
  import EmptyState from "@/components/EmptyState";
  import useVideoDataStore from "@/store/useVideoDataStore";
  import { getAllPosts, getLatestPosts } from "@/lib/appwrite";
  import VideoContent from "@/components/VideoContent";
  
  const Home = () => {
    const { videoData, setVideoData } = useVideoDataStore((state) => state);
    const [latestVideos, setLatestVideos] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [playingVideoId, setPlayingVideoId] = useState(null);
  
    const trendingData = [
      { id: "1", name: "United States" },
      { id: "2", name: "United Kingdom" },
      { id: "3", name: "India" },
      { id: "4", name: "Australia" },
    ];
  
    // Fetch all videos
    useEffect(() => {
      const fetchVideos = async () => {
        const posts = await getAllPosts();
        const videoData = posts.map((post) => ({
          id: post.$id,
          title: post.title,
          thumbnail: post.thumbnail,
          prompt: post.prompt,
          video: post.video,
          creator: post.creator.username,
          avatar: post.creator.avatar,
        }));
        setVideoData(videoData);
      };
  
      fetchVideos();
    }, []);
  
    // Fetch latest videos
    useEffect(() => {
      const fetchLatestVideos = async () => {
        const latest = await getLatestPosts();
        setLatestVideos(latest);
      };
  
      fetchLatestVideos();
    }, []);
  
    // Refresh function
    const onRefresh = async () => {
      setRefreshing(true);
      await getAllPosts();
      await getLatestPosts();
      setRefreshing(false);
    };
  
    // Toggle play/pause
    const handlePlayToggle = (videoId) => {
      setPlayingVideoId(playingVideoId === videoId ? null : videoId);
    };
  
    return (
      <SafeAreaView className="bg-primary h-full">
        <FlatList
          className="px-2"
          data={videoData || []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <VideoContent
              video={item}
              isPlaying={playingVideoId === item.id}
              onPlayToggle={() => handlePlayToggle(item.id)}
            />
          )}
          ListHeaderComponent={() => (
            <View className="flex my-6 px-4 space-y-6">
              <View className="flex justify-between items-start flex-row mb-6">
                <View>
                  <Text className="font-pmedium text-sm text-gray-100">
                    Welcome Back
                  </Text>
                  <Text className="text-2xl font-psemibold text-white">
                    JSMastery
                  </Text>
                </View>
  
                <View className="mt-1.5">
                  <Image
                    source={images.logoSmall}
                    className="w-9 h-10"
                    resizeMode="contain"
                  />
                </View>
              </View>
  
              <SearchInput />
  
              <View className="w-full flex-1 pt-5 pb-8">
                <Text className="text-sm font-pregular text-gray-100 mb-3">
                  Latest Videos
                </Text>
                <TrendingList data={latestVideos ?? []} />
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState title="No Videos Found" subtitle="No videos created yet" />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </SafeAreaView>
    );
  };
  
  export default Home;
  