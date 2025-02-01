import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

const FormFields = ({
  label,
  placeholder,
  customStyles,
  value,
  handleChangeText,
  onBlur,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`${customStyles} flex flex-col gap-2`}>
      <Text className={`text-gray-100`}>{label}</Text>
      <View
        className={`w-full h-16 px-4 bg-black-100 rounded-2xl border-2 ${
          isFocused ? "border-secondary" : "border-black-200"
        } flex flex-row items-center`}
      >
        <TextInput
          className="flex-1 text-white font-psemibold text-base w-full"
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            if (onBlur) onBlur(); // Call the onBlur prop if provided
          }}
          secureTextEntry={label === "Password" && !showPassword}
          {...props}
        />
        {label === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormFields;
