import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { PrimaryButton } from "@/components/PrimaryButton";

export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white p-8 gap-8">
      <Text className="text-4xl text-center text-primary font-bold">
        Duo Lingo Clone
      </Text>
      <PrimaryButton 
        title="Open Onboarding" 
        onPress={() => router.push('/onboarding')} 
      />
    </View>
  );
}
