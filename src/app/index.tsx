import { View, ActivityIndicator } from "react-native";
import { Redirect } from "expo-router";
import { useAuth } from "@clerk/expo";
import { useLanguageStore } from "@/store/useLanguageStore";
import { LANGUAGES } from "@/data/languages";

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();
  
  const { selectedLanguageId, hasHydrated, clearLanguage } = useLanguageStore();

  if (!isLoaded || !hasHydrated) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  if (!selectedLanguageId) {
    return <Redirect href="/choose-language" />;
  }

  const selectedLanguage = LANGUAGES.find(lang => lang.id === selectedLanguageId);

  if (!selectedLanguage) {
    // Stored ID is invalid (e.g. data changed), clear and redirect
    setTimeout(() => clearLanguage(), 0);
    return <Redirect href="/choose-language" />;
  }

  // Successfully authenticated and selected language, go to tabs
  return <Redirect href="/(tabs)" />;
}
