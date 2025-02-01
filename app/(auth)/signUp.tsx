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

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
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
                Create an Account
              </Text>
              <FormFields
                label="Username"
                placeholder="Your unique username"
                value={form.username}
                handleChangeText={(e: any) => setForm({ ...form, username: e })}
                customStyles="mt-10"
              />
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
              <CustomButton
                title={"Create Account"}
                handlePress={() => router.replace("/home")}
                containerStyles={"mt-10"}
              />
              <Text className="font-pmedium text-center text-gray-200 mt-4">
                Already have an account?{" "}
                <Text
                  className="text-secondary-200 "
                  onPress={() => router.replace("/signIn")}
                >
                  Log In
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
