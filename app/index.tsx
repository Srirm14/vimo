import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Index = () => {
  return (
    <View className="flex justify-center items-center h-full bg-black">
      <Link href="/home">
        <View className="justify-center items-center flex flex-col gap-2">
          <Text className="font-bold text-2xl text-white">Vimo</Text>
          <Text className="text-gray-300">Welcomes You!!</Text>
        </View>
      </Link>
    </View>
  );
};

export default Index;
