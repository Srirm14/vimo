import {
  View,
  Text,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormFields from "@/components/FormFields";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import useGlobalStore from "@/store/useGlobalStore";
import { signIn, signOut } from "@/lib/appwrite"; // Mocked API function

const SignIn = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { setIsLoggedIn, setIsLoading } = useGlobalStore((state) => state);

  const onSubmit = async (data) => {
    if (!data.email || !data.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    setIsLoading(true); // Start loading
    try {
      await signOut(); // Ensure user is logged out before signing in
      const user = await signIn(data.email, data.password);

      if (user) {
        setIsLoggedIn(true);
        Alert.alert("Success", "Logged in successfully!");
        router.replace("/home");
      } else {
        Alert.alert("Login failed", "Invalid email or password");
      }
    } catch (err) {
      console.error("Login Error:", err);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

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
                Login to Your Account
              </Text>

              {/* Email Field */}
              <Controller
                control={control}
                name="email"
                rules={{ required: "Email is required" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormFields
                    label="Email"
                    placeholder="Your email"
                    value={value}
                    handleChangeText={onChange}
                    onBlur={onBlur}
                    customStyles="mt-10"
                  />
                )}
              />

              {/* Password Field */}
              <Controller
                control={control}
                name="password"
                rules={{ required: "Password is required" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormFields
                    label="Password"
                    placeholder="Your secret password"
                    value={value}
                    handleChangeText={onChange}
                    onBlur={onBlur}
                    customStyles="mt-10"
                  />
                )}
              />

              {/* Forgot Password */}
              <Text className="w-full text-right text-gray-200 mt-3 text-sm font-plight">
                Forgot password?
              </Text>

              {/* Sign In Button */}
              <CustomButton
                title={"Sign In"}
                handlePress={handleSubmit(onSubmit)}
                containerStyles={"mt-10"}
              />

              {/* Navigation to Sign Up */}
              <Text className="font-pmedium text-center text-gray-200 mt-4">
                Don’t have an account?{" "}
                <Text
                  className="text-secondary-200"
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
