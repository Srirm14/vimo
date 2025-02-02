import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useVideoPlayer, VideoView } from "expo-video"; // Import necessary components from expo-video
import { icons } from "../constants";
import { useEvent } from "expo";

const VideoContent = ({ video, isPlaying, onPlayToggle }) => {
  const videoSource = "https://player.vimeo.com/video/949579770?h=897cd5e781";

  // Initialize the video player
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.staysActiveInBackground = true;
    player.play();
  });

  return (
    <TouchableOpacity
      className="mb-4 p-3 bg-gray-800 rounded-lg px-4 flex justify-center items-center"
      onPress={() => onPlayToggle(!isPlaying)} // Toggle play/pause when the button is clicked
    >
      {/* Video Player */}
      {isPlaying && (
        <VideoView
          style={styles.video}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
          startsPictureInPictureAutomatically
        />
      )}

      {/* Thumbnail Image */}
      {!isPlaying && (
        <Image
          source={{ uri: video.thumbnail }}
          className="w-full h-40 rounded-lg"
          resizeMode="cover"
        />
      )}

      {/* Play Button */}
      <Image
        source={icons.play}
        className={`h-10 w-10 rounded-full absolute ${
          isPlaying ? "hidden" : "flex"
        }`}
        resizeMode="contain"
      />

      {/* Video Details */}
      <View className="flex flex-row items-center gap-4 mt-2 w-full">
        <Image
          source={{ uri: video.avatar }}
          className="h-10 w-10 rounded-full border-[0.7px] border-gray-200"
          resizeMode="cover"
        />
        <View>
          <Text className="text-white text-lg">{video.title}</Text>
          <Text className="text-gray-400 text-sm">By {video.creator}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  video: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width * (9 / 16), // Adjust the height as needed
  },
});

export default VideoContent;
