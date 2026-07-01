import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LANGUAGES } from '@/data/languages';
import { PrimaryButton } from '@/components/PrimaryButton';
import { images } from '@/constants/images';

export default function ChooseLanguageScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguageId, setSelectedLanguageId] = useState<string | null>('lang_es');

  const filteredLanguages = LANGUAGES.filter((lang) =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={['top']}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView 
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="px-4 py-3 flex-row items-center">
            <TouchableOpacity onPress={() => router.back()} className="p-1">
              <Ionicons name="chevron-back" size={28} color="#4B4B4B" />
            </TouchableOpacity>
            <Text className="flex-1 text-center text-xl font-bold text-[#4B4B4B] mr-8">
              Choose a language
            </Text>
          </View>

          <View className="px-5 mt-4" style={{ flex: 1 }}>
            {/* Search */}
            <View className="flex-row items-center bg-transparent border-2 border-neutral-200 rounded-3xl px-4 py-3 mb-6">
              <Ionicons name="search" size={22} color="#AFAFAF" />
              <TextInput
                className="flex-1 ml-3 text-lg text-neutral-500 font-semibold"
                placeholder="Search languages"
                placeholderTextColor="#AFAFAF"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            <Text className="text-xl font-bold text-[#4B4B4B] mb-2">Popular</Text>

            {/* List */}
            {filteredLanguages.map((item) => {
              const isSelected = selectedLanguageId === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => setSelectedLanguageId(item.id)}
                  className={`flex-row items-center p-4 mb-2 rounded-3xl border-2 ${
                    isSelected ? 'border-[#7E69FF]' : 'border-transparent'
                  }`}
                  style={isSelected ? { backgroundColor: 'rgba(126, 105, 255, 0.05)' } : undefined}
                >
                  <Image
                    source={{ uri: item.flag }}
                    className="w-12 h-12 rounded-full mr-4"
                    resizeMode="cover"
                  />
                  <View className="flex-1">
                    <Text className={`text-lg font-bold ${isSelected ? 'text-black' : 'text-[#4B4B4B]'}`}>
                      {item.name}
                    </Text>
                    <Text className="text-[15px] text-[#AFAFAF] font-semibold mt-1">
                      {item.learners} learners
                    </Text>
                  </View>
                  {isSelected ? (
                    <View className="w-7 h-7 rounded-full bg-[#7E69FF] items-center justify-center">
                      <Ionicons name="checkmark" size={18} color="white" />
                    </View>
                  ) : (
                    <Ionicons name="chevron-forward" size={22} color="#AFAFAF" />
                  )}
                </TouchableOpacity>
              );
            })}
            
            {/* Confirmation Button */}
            <View className="mt-4 mb-6">
              <PrimaryButton 
                title="CONTINUE" 
                onPress={() => {
                  if (selectedLanguageId) {
                    router.back();
                  }
                }}
                style={{ opacity: selectedLanguageId ? 1 : 0.5 }}
                disabled={!selectedLanguageId}
              />
            </View>

            {/* Spacer to push earth image to bottom if screen is tall */}
            <View className="flex-1" />

            {/* Earth Image */}
            <View className="items-center w-full mt-4">
              <Image 
                source={images.earth} 
                className="w-full h-32" 
                resizeMode="cover" 
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
