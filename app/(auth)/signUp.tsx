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
  import { Controller, useForm } from "react-hook-form";
  import { createUser } from "@/lib/appwrite";
  import useGlobalStore from "@/store/useGlobalStore";
  
  const SignUp = () => {
    const { control, handleSubmit } = useForm({
      defaultValues: {
        username: "",
        email: "",
        password: "",
      },
    });
  
  
    const setIsLoggedIn = useGlobalStore((state) => state.setIsLoggedIn);
    const setUsers = useGlobalStore((state) => state.setUser);
  
    const onSubmit = async (data) => {
        if (!data.username || !data.email || !data.password) {
          Alert.alert("Error", "Please fill in all fields");
          return;
        }
      
        try {
          const user = await createUser(data.email, data.password, data.username);
      
          if (user) {
            setIsLoggedIn(true);
            setUsers({ email: user.email, username: user.name });
      
            Alert.alert("Success", "Account created successfully!");
            router.replace("/home");
          }
        } catch (err) {
          console.error("Signup Error:", err);
          Alert.alert("Error", "Failed to create an account. Please try again.");
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
                  Create an Account
                </Text>
  
                {/* Username Field */}
                <Controller
                  control={control}
                  name="username"
                  rules={{ required: "Username is required" }}
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
                  handlePress={handleSubmit(onSubmit)}
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
  