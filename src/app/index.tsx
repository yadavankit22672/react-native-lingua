import { Text, View, ActivityIndicator } from "react-native";
import { Redirect } from "expo-router";
import { PrimaryButton } from "@/components/PrimaryButton";
import { useAuth, useClerk } from "@clerk/expo";

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();
  const { signOut } = useClerk();

  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <View className="flex-1 items-center justify-center bg-white p-8 gap-8">
      <Text className="text-4xl text-center text-primary font-bold">
        Duo Lingo Clone
      </Text>
      <PrimaryButton 
        title="Sign Out" 
        onPress={() => signOut()} 
      />
    </View>
  );
}
