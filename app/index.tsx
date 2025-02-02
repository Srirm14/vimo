import { View, Text, ScrollView, Image, StatusBar } from "react-native";
import React from "react";
import { Link, Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "@/components/CustomButton";
import useGlobalStore from "@/store/useGlobalStore";

const Index = () => {
  const { isLoggedIn, isLoading } = useGlobalStore((state) => state);
  if (isLoggedIn && !isLoading) return <Redirect href={"/home"} />;
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-[84vh]">
          <Image
            source={images.logo}
            className="w-[180] h-[34]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            resizeMode="contain"
            className="w-[375px] h-[298px]"
          />
          <View className="relative mt-5 w-[333px]">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Possibilities with{" "}
              <Text className="text-secondary-200">Vimo</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>
          <View className=" w-[333px] mt-5">
            <Text className="text-gray-200 text-center font-pregular text-sm">
              Where Creativity Meets Innovation: Embark on a Journey of
              Limitless Exploration with Vimo
            </Text>
          </View>
          <View className=" w-[333px] items-center">
            <CustomButton
              title="Sign In"
              handlePress={() => router.push("/signIn")}
              containerStyles="w-full mt-7 "
            />
          </View>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="161622" barStyle={"light-content"} />
    </SafeAreaView>
  );
};

export default Index;
