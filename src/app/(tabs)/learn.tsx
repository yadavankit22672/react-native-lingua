import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter, Href } from 'expo-router';
import { useLanguageStore } from '@/store/useLanguageStore';
import { UNITS } from '@/data/units';
import { LESSONS } from '@/data/lessons';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { images } from '@/constants/images';

export default function LearnTab() {
  const router = useRouter();
  const { selectedLanguageId } = useLanguageStore();
  const insets = useSafeAreaInsets();
  
  // Get units for current language
  let units = UNITS.filter(u => u.languageId === selectedLanguageId);
  let currentUnit = units[0]; // Just showing the first one to match UI
  
  let unitLessons = currentUnit 
    ? LESSONS.filter(l => l.unitId === currentUnit.id) 
    : [];

  // Fallback to Spanish if no lessons exist for the chosen language (so UI is always visible)
  if (unitLessons.length === 0) {
    units = UNITS.filter(u => u.languageId === 'lang_es');
    currentUnit = units[0];
    unitLessons = currentUnit ? LESSONS.filter(l => l.unitId === currentUnit.id) : [];
  }

  return (
    <View className="flex-1 bg-[#F9FAFB]">
      <StatusBar style="dark" />
      
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Banner Section */}
        <View className="relative w-full h-[280px]">
           <Image 
             source={images.cafeBanner}
             className="absolute w-full h-full"
             resizeMode="cover"
           />
           
           {/* Header Nav */}
           <View className="px-5 flex-row justify-between items-center" style={{ marginTop: Math.max(insets.top, 40) }}>
             <TouchableOpacity className="w-10 h-10 items-center justify-center bg-white/70 rounded-full">
               <Ionicons name="chevron-back" size={26} color="#1E293B" />
             </TouchableOpacity>
             <View className="items-center bg-white/80 px-4 py-1.5 rounded-2xl shadow-sm">
               <Text className="text-[19px] font-extrabold text-[#1E293B]">At the Café</Text>
               <Text className="text-[#64748B] font-bold text-[13px]">Unit 3 • 3 / 6 lessons</Text>
             </View>
             <TouchableOpacity className="w-10 h-10 items-center justify-center bg-white/70 rounded-full">
               <Ionicons name="bookmark" size={24} color="#F97316" />
             </TouchableOpacity>
           </View>

           {/* Segmented Control */}
           <View className="absolute bottom-0 w-full px-5 pt-4">
             <View className="bg-white/95 rounded-t-3xl flex-row overflow-hidden">
               <TouchableOpacity className="flex-1 py-[18px] items-center border-b-[3px] border-[#6366F1]">
                 <Text className="text-[#6366F1] font-bold text-[17px]">Lessons</Text>
               </TouchableOpacity>
               <TouchableOpacity className="flex-1 py-[18px] items-center border-b-[3px] border-transparent">
                 <Text className="text-[#64748B] font-bold text-[17px]">Practice</Text>
               </TouchableOpacity>
             </View>
           </View>
        </View>

        {/* Lessons List */}
        <View className="px-5 pt-6 bg-[#F9FAFB] flex-1 min-h-[300px]">
          {unitLessons.length === 0 ? (
            <View className="items-center justify-center mt-10">
              <Text className="text-[#64748B] font-bold text-lg text-center">No lessons found for this language.</Text>
              <Text className="text-[#94A3B8] font-medium text-sm text-center mt-2">Try switching to Spanish or French in your profile.</Text>
            </View>
          ) : unitLessons.map((lesson, index) => {
            const isCompleted = index < 2;
            const isActive = index === 2;
            const isLocked = index > 2;

            if (isActive) {
              return (
                <TouchableOpacity 
                  key={lesson.id}
                  onPress={() => router.push(`/lesson/${lesson.id}` as Href<string>)}
                  className="mb-4 bg-[#EEF2FF] border border-[#6366F1] rounded-[24px] p-5 flex-row items-center justify-between shadow-sm"
                >
                  <View className="flex-1 pr-4">
                    <Text className="text-[#6366F1] font-bold text-[13px] mb-1">Lesson {index + 1}</Text>
                    <Text className="text-[#1E293B] font-extrabold text-lg mb-1">{lesson.title}</Text>
                    <Text className="text-[#6366F1] font-bold text-[13px]">In progress</Text>
                  </View>
                  <View className="w-16 h-16 bg-white rounded-full items-center justify-center border border-[#E0E7FF] shadow-sm overflow-hidden p-2">
                     <Image source={images.cafeTableIcon} className="w-[42px] h-[42px]" resizeMode="contain" />
                  </View>
                </TouchableOpacity>
              );
            }

            if (isCompleted) {
              return (
                <TouchableOpacity 
                  key={lesson.id}
                  onPress={() => router.push(`/lesson/${lesson.id}` as Href<string>)}
                  className="mb-4 bg-white border border-neutral-200 rounded-[24px] p-5 flex-row items-center justify-between"
                >
                  <View className="flex-1 pr-4">
                    <Text className="text-[#94A3B8] font-bold text-[13px] mb-1">Lesson {index + 1}</Text>
                    <Text className="text-[#1E293B] font-bold text-[17px]">{lesson.title}</Text>
                  </View>
                  <View className="w-[28px] h-[28px] bg-[#22C55E] rounded-full items-center justify-center">
                    <Ionicons name="checkmark" size={20} color="white" />
                  </View>
                </TouchableOpacity>
              );
            }

            return (
                <TouchableOpacity 
                  key={lesson.id}
                  onPress={() => router.push(`/lesson/${lesson.id}` as Href<string>)}
                  className="mb-4 bg-white border border-neutral-100 rounded-[24px] p-5 flex-row items-center justify-between opacity-80"
                >
                  <View className="flex-1 pr-4">
                    <Text className="text-[#94A3B8] font-bold text-[13px] mb-1">Lesson {index + 1}</Text>
                    <Text className="text-[#1E293B] font-bold text-[17px] mb-1">{lesson.title}</Text>
                    <Text className="text-[#94A3B8] font-medium text-[13px]">0 / 6 lessons</Text>
                  </View>
                  <View className="w-7 h-7 items-center justify-center">
                    <Ionicons name="lock-closed-outline" size={22} color="#64748B" />
                  </View>
                </TouchableOpacity>
            );
          })}
        </View>

      </ScrollView>
    </View>
  );
}
