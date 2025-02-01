import {
    View,
    Text,
    ScrollView,
    Image,
    KeyboardAvoidingView,
    Platform,
  } from "react-native";
  import React from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { images } from "../../constants";
  import FormFields from "@/components/FormFields";
  import CustomButton from "@/components/CustomButton";
  import { router } from "expo-router";
  import { Controller, useForm } from "react-hook-form";
  
  const SignUp = () => {
    const { control, handleSubmit } = useForm({
      defaultValues: {
        username: "",
        email: "",
        password: "",
      },
    });
  
    const onSubmit = (data) => {
      console.log(data); // Handle sign-up logic here
      router.replace("/home");
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
                  Create an Account
                </Text>
  
                {/* Username Field */}
                <Controller
                  control={control}
                  name="username" // Corrected name to match defaultValues
                  rules={{ required: "Username is required" }} // Validation rule
                  render={({ field: { onChange, onBlur, value } }) => (
                    <FormFields
                      label="Username"
                      placeholder="Your unique username"
                      value={value}
                      handleChangeText={onChange}
                      onBlur={onBlur}
                      customStyles="mt-10"
                    />
                  )}
                />
  
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
  
                {/* Create Account Button */}
                <CustomButton
                  title={"Create Account"}
                  handlePress={handleSubmit(onSubmit)} // Use handleSubmit for form submission
                  containerStyles={"mt-10"}
                />
  
                {/* Navigation to Sign In */}
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
  