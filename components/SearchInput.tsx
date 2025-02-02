import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React from "react";
import { icons } from "@/constants";

const SearchInput = () => {
  return (
    <View
      className={`flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200`}
    >
      <TextInput
        className="flex-1 text-white font-pregular text-base w-full"
        value={""}
        placeholder={"Search for a video topic"}
        onChangeText={() => {}}
        onFocus={() => {}}
        onBlur={() => {}}
      />

      <TouchableOpacity>
        <Image
          source={icons.search}
          style={{
            width: 20,
            height: 20,
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
