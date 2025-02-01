import {
  View,
  Text,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormFields from "@/components/FormFields";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  return (
    <SafeAreaView className="bg-primary h-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="w-full flex min-h-[84vh] justify-center px-5">
            <Image
              source={images.logo}
              resizeMode="contain"
              className="w-[115px] h-[35px]"
            />
            <View>
              <Text className="text-white font-psemibold text-xl mt-10">
                Login your Account
              </Text>
              <FormFields
                label="Email"
                placeholder="Your email"
                value={form.email}
                handleChangeText={(e: any) => setForm({ ...form, email: e })}
                customStyles="mt-10"
              />
              <FormFields
                label="Password"
                placeholder="Your secret password"
                value={form.password}
                handleChangeText={(e: any) => setForm({ ...form, password: e })}
                customStyles="mt-10"
              />
              <Text className="w-full text-right text-gray-200 mt-3 text-sm font-plight">
                Forgot password
              </Text>

              <CustomButton
                title={"Sign In"}
                handlePress={() => router.replace("/home")}
                containerStyles={"mt-10"}
              />

              <Text className="font-pmedium text-center text-gray-200 mt-4">
                Don’t have an account?{" "}
                <Text
                  className="text-secondary-200 "
                  onPress={() => router.replace("/signUp")}
                >
                  Sign Up
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
