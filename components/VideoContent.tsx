import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video"; // Import necessary components from expo-video
import { icons } from "../constants";

const VideoContent = ({ video, isPlaying, onPlayToggle }) => {
  // Ensure you have a direct video URL (not a Vimeo player URL)
  const videoSource = { uri: video.video }; // This should be a direct link to a video file

  // Initialize the video player
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true; // Enable looping
    if (isPlaying) {
      player.play(); // Start playing if isPlaying is true on initialization
    }
  });

  // Effect to play or pause based on `isPlaying` state
  useEffect(() => {
    if (isPlaying) {
      console.log('Playing video');
      player.play(); // Play the video
    } else {
      console.log('Pausing video');
      player.pause(); // Pause the video
    }
  }, [isPlaying, player]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPlayToggle(!isPlaying)} // Toggle play/pause when the button is clicked
    >
      {/* Video Player */}
      {isPlaying && (
        <VideoView
          style={styles.video}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
        />
      )}

      {/* Thumbnail Image */}
      {!isPlaying && (
        <Image
          source={{ uri: video.thumbnail }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
      )}

      {/* Play Button */}
      <Image
        source={icons.play}
        style={[styles.playButton, { display: isPlaying ? 'none' : 'flex' }]}
        resizeMode="contain"
      />

      {/* Video Details */}
      <View style={styles.details}>
        <Image
          source={{ uri: video.avatar }}
          style={styles.avatar}
          resizeMode="cover"
        />
        <View>
          <Text style={styles.title}>{video.title}</Text>
          <Text style={styles.creator}>By {video.creator}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#1F2937',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  thumbnail: {
    width: '100%',
    height: 160,
    borderRadius: 10,
  },
  playButton: {
    height: 40,
    width: 40,
    position: 'absolute',
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    width: '100%',
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 0.7,
    borderColor: '#E5E7EB',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  creator: {
    color: '#9CA3AF',
    fontSize: 14,
  },
});

export default VideoContent;
