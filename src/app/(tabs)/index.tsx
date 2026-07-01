import { View, Text, ScrollView, Image, TouchableOpacity, Platform } from 'react-native';
import { useUser } from '@clerk/expo';
import { useLanguageStore } from '@/store/useLanguageStore';
import { LANGUAGES } from '@/data/languages';
import { images } from '@/constants/images';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function HomeTab() {
  const { user } = useUser();
  const { selectedLanguageId } = useLanguageStore();
  const insets = useSafeAreaInsets();
  
  const selectedLanguage = LANGUAGES.find(l => l.id === selectedLanguageId);
  
  // Use user's first name or default to 'Alex' from the design
  const firstName = user?.firstName || 'Alex';

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ 
          paddingTop: Platform.OS === 'android' ? insets.top + 16 : insets.top, 
          paddingBottom: 100, 
        }}
        showsVerticalScrollIndicator={false}
      >
        
        {/* Header Row */}
        <View className="flex-row items-center justify-between px-5 mb-6 mt-2">
          <View className="flex-row items-center">
            {selectedLanguage?.flag ? (
              <Image 
                source={{ uri: selectedLanguage.flag }} 
                className="w-8 h-8 rounded-full border border-neutral-200 mr-3"
              />
            ) : (
              <View className="w-8 h-8 rounded-full bg-neutral-200 border border-neutral-300 mr-3" />
            )}
            <Text className="text-[19px] font-extrabold text-neutral-800">Hola, {firstName}! 👋</Text>
          </View>

          <View className="flex-row items-center gap-4">
            {/* Streak */}
            <View className="flex-row items-center">
              <Image source={images.streakFire} className="w-6 h-6 mr-1" resizeMode="contain" />
              <Text className="text-neutral-500 font-bold text-base">12</Text>
            </View>
            {/* Bell Icon */}
            <Ionicons name="notifications-outline" size={24} color="#374151" />
          </View>
        </View>

        <View className="px-5">
          {/* Daily Goal Card */}
          <View className="bg-[#FFF6E5] rounded-3xl p-5 mb-5 flex-row justify-between items-center relative overflow-hidden">
            <View className="z-10">
              <Text className="text-[#475569] font-bold text-[15px] mb-1">Daily goal</Text>
              <View className="flex-row items-baseline mb-3">
                <Text className="text-[#1E293B] font-extrabold text-[28px]">15</Text>
                <Text className="text-[#94A3B8] font-bold text-[15px] ml-1">/ 20 XP</Text>
              </View>
              {/* Progress Bar */}
              <View className="w-32 h-2.5 bg-[#FDE6D5] rounded-full overflow-hidden">
                <View className="w-3/4 h-full bg-[#FF8A00] rounded-full" />
              </View>
            </View>
            <Image 
              source={images.treasure} 
              className="w-24 h-24 absolute -right-2 top-2 z-0" 
              resizeMode="contain" 
            />
          </View>

          {/* Continue Learning Card */}
          <View className="bg-[#6366F1] rounded-3xl p-6 mb-8 relative overflow-hidden h-[180px]">
            {/* Using a solid color since gradient isn't available, but keeping styling exact */}
            <View className="z-10 absolute top-6 left-6">
              <Text className="text-white/90 font-medium text-[15px] mb-1">Continue learning</Text>
              <Text className="text-white font-extrabold text-[28px] mb-1">Spanish</Text>
              <Text className="text-white/80 font-medium text-[15px] mb-4">A1 • Unit 3</Text>
              
              <TouchableOpacity className="bg-white rounded-full py-2.5 px-6 self-start">
                <Text className="text-[#6366F1] font-bold text-base">Continue</Text>
              </TouchableOpacity>
            </View>
            
            <Image 
              source={images.palace} 
              className="w-48 h-48 absolute -right-4 -bottom-4 z-0" 
              resizeMode="contain" 
            />
          </View>

          {/* Today's plan header */}
          <View className="flex-row justify-between items-center mb-5">
            <Text className="text-xl font-extrabold text-neutral-800">Today's plan</Text>
            <TouchableOpacity>
              <Text className="text-[#6366F1] font-bold text-[15px]">View all</Text>
            </TouchableOpacity>
          </View>

          {/* List Items */}
          <View className="mb-8">
            {/* Item 1 */}
            <View className="flex-row items-center mb-6">
              <View className="w-[52px] h-[52px] bg-[#6366F1] rounded-2xl items-center justify-center mr-4">
                <Ionicons name="book" size={26} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-[17px] font-bold text-[#1E293B] mb-0.5">Lesson</Text>
                <Text className="text-[15px] text-[#64748B] font-medium">At the café</Text>
              </View>
              <View className="w-7 h-7 bg-[#6366F1] rounded-full items-center justify-center">
                <Ionicons name="checkmark" size={18} color="white" />
              </View>
            </View>

            {/* Item 2 */}
            <View className="flex-row items-center mb-6">
              <View className="w-[52px] h-[52px] bg-[#8B5CF6] rounded-2xl items-center justify-center mr-4">
                <Ionicons name="headset" size={28} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-[17px] font-bold text-[#1E293B] mb-0.5">AI Conversation</Text>
                <Text className="text-[15px] text-[#64748B] font-medium">Talk about your day</Text>
              </View>
              <View className="w-7 h-7 border-[2.5px] border-[#CBD5E1] rounded-full" />
            </View>

            {/* Item 3 */}
            <View className="flex-row items-center">
              <View className="w-[52px] h-[52px] bg-[#FB7185] rounded-2xl items-center justify-center mr-4">
                {/* Fallback to happy face for the ghost icon */}
                <Ionicons name="happy" size={28} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-[17px] font-bold text-[#1E293B] mb-0.5">New words</Text>
                <Text className="text-[15px] text-[#64748B] font-medium">10 words</Text>
              </View>
              <View className="w-7 h-7 border-[2.5px] border-[#CBD5E1] rounded-full" />
            </View>
          </View>


          
        </View>
      </ScrollView>
    </View>
  );
}
