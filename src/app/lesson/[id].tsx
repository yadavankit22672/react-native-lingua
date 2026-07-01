import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LESSONS } from '@/data/lessons';
import { UNITS } from '@/data/units';
import { LANGUAGES } from '@/data/languages';
import { images } from '@/constants/images';

const { width } = Dimensions.get('window');

export default function AudioLessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const lesson = LESSONS.find(l => l.id === id) || LESSONS[0];
  const unit = UNITS.find(u => u.id === lesson.unitId);
  const language = LANGUAGES.find(l => l.id === unit?.languageId);
  
  // Extract vocabulary/phrases from activities for preview
  const phrases = lesson.activities.flatMap(act => {
    if (act.type === 'vocabulary' && act.vocabulary) return act.vocabulary.map(v => v.term);
    if (act.type === 'phrase' && act.phrases) return act.phrases.map(p => p.phrase);
    return [];
  }).filter(Boolean);

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View 
        className="px-5 flex-row justify-between items-center bg-white pb-3" 
        style={{ paddingTop: Math.max(insets.top, 40) }}
      >
        <View className="flex-row items-center flex-1">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Ionicons name="chevron-back" size={28} color="#1E293B" />
          </TouchableOpacity>
          <View>
            <Text className="text-[19px] font-extrabold text-[#1E293B]">AI Teacher</Text>
            <View className="flex-row items-center mt-0.5">
              <View className="w-2.5 h-2.5 bg-[#22C55E] rounded-full mr-1.5" />
              <Text className="text-[#64748B] font-medium text-[13px]">Online</Text>
            </View>
          </View>
        </View>
        
        <View className="flex-row items-center gap-2">
          <TouchableOpacity className="w-10 h-10 rounded-full border border-neutral-200 items-center justify-center">
            <Ionicons name="videocam-outline" size={22} color="#1E293B" />
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-10 rounded-full border border-neutral-200 items-center justify-center">
            <Text className="text-[#1E293B] font-bold text-sm">12</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-10 rounded-full border border-neutral-200 items-center justify-center">
            <Ionicons name="person-outline" size={20} color="#1E293B" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content Area */}
      <View className="flex-1 px-4 pb-6 pt-2">
        {/* Video / Avatar Container */}
        <View className="flex-1 bg-neutral-100 rounded-[32px] overflow-hidden relative">
          
          {/* Blurred Background */}
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=1000' }}
            className="absolute inset-0 w-full h-full opacity-60"
            resizeMode="cover"
            blurRadius={8}
          />
          
          {/* Gradient overlay at bottom for controls visibility */}
          <View className="absolute inset-x-0 bottom-0 h-1/2 bg-white/20" />

          {/* AI Teacher Mascot */}
          <View className="absolute inset-0 items-center justify-center pt-8">
            <Image 
              source={images.mascotWelcome}
              className="w-[280px] h-[280px]"
              resizeMode="contain"
            />
          </View>

          {/* Lesson Context Overlay */}
          <View className="absolute top-5 left-5 right-[130px] bg-white/85 rounded-2xl p-3 shadow-sm border border-white/50">
            <Text className="text-[#6366F1] font-bold text-[11px] mb-0.5 uppercase tracking-wider">{language?.name || 'Language'} • {lesson.title}</Text>
            <Text className="text-[#1E293B] font-extrabold text-[13px] mb-1">Goals: {lesson.goals?.join(', ')}</Text>
            {phrases.length > 0 && (
               <Text className="text-[#64748B] font-medium text-[11px]" numberOfLines={2}>
                 Practice: {phrases.join(', ')}
               </Text>
            )}
          </View>

          {/* User PiP (Picture in Picture) */}
          <View className="absolute top-5 right-5 w-[100px] h-[130px] rounded-2xl overflow-hidden border-[3px] border-white shadow-md">
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300' }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          {/* Speech Bubble */}
          <View className="absolute bottom-[160px] left-6 right-6 items-center">
            <View className="bg-white rounded-3xl p-4 shadow-sm w-full relative border border-neutral-100">
              <View className="flex-row justify-between items-start">
                <View className="flex-1 pr-3">
                  <Text className="text-[#1E293B] font-medium text-[14px] leading-5">
                    {lesson.aiTeacherPrompt || '¡Muy bien! That was great! 👏'}
                  </Text>
                </View>
                <Ionicons name="volume-medium" size={28} color="#6366F1" />
              </View>
              {/* Triangle pointer */}
              <View className="absolute -bottom-3 right-[20%] w-6 h-6 bg-white transform rotate-45 border-b border-r border-neutral-100" />
            </View>
          </View>

          {/* Call Controls */}
          <View className="absolute bottom-6 left-0 right-0 flex-row justify-center items-center gap-6 px-4">
            <View className="items-center">
              <TouchableOpacity className="w-[60px] h-[60px] bg-white rounded-full items-center justify-center shadow-sm mb-2">
                <Ionicons name="videocam" size={28} color="#1E293B" />
              </TouchableOpacity>
              <Text className="text-white font-bold text-xs">Camera</Text>
            </View>

            <View className="items-center">
              <TouchableOpacity className="w-[60px] h-[60px] bg-white rounded-full items-center justify-center shadow-sm mb-2">
                <Ionicons name="mic" size={28} color="#1E293B" />
              </TouchableOpacity>
              <Text className="text-white font-bold text-xs">Mic</Text>
            </View>

            <View className="items-center">
              <TouchableOpacity className="w-[60px] h-[60px] bg-white rounded-full items-center justify-center shadow-sm mb-2">
                <Text className="text-[#1E293B] font-extrabold text-xl">文A</Text>
              </TouchableOpacity>
              <Text className="text-white font-bold text-xs">Subtitles</Text>
            </View>

            <View className="items-center">
              <TouchableOpacity 
                onPress={() => router.back()}
                className="w-[60px] h-[60px] bg-[#EF4444] rounded-full items-center justify-center shadow-sm mb-2"
              >
                <Ionicons name="call" size={28} color="white" style={{ transform: [{ rotate: '135deg' }] }} />
              </TouchableOpacity>
              <Text className="text-white font-bold text-xs">End Call</Text>
            </View>
          </View>
        </View>

        {/* Feedback Card */}
        <View className="bg-white rounded-[24px] p-5 shadow-sm mt-4 border border-neutral-100 flex-row justify-between items-center">
          <View className="flex-1 items-center border-r border-neutral-200">
            <Text className="text-[#0F172A] font-bold text-[13px] mb-2">Speaking</Text>
            <Text className="text-[#22C55E] font-bold text-[15px]">Excellent</Text>
          </View>
          <View className="flex-1 items-center border-r border-neutral-200">
            <Text className="text-[#0F172A] font-bold text-[13px] mb-2">Pronunciation</Text>
            <Text className="text-[#3B82F6] font-bold text-[15px]">Great</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-[#0F172A] font-bold text-[13px] mb-2">Grammar</Text>
            <Text className="text-[#8B5CF6] font-bold text-[15px]">Good</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
