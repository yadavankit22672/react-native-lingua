import { View, Text, Pressable, useWindowDimensions, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Animated, { useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  
  // Calculate the width of a single tab
  const tabWidth = width / state.routes.length;

  // Animated style for the sliding indicator
  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(state.index * tabWidth, { duration: 200, easing: Easing.out(Easing.ease) }) }],
    };
  });

  return (
    <View style={[styles.tabBarContainer, { paddingBottom: insets.bottom || 16 }]}>
      {/* Sliding Circle Indicator */}
      <Animated.View style={[styles.indicatorContainer, { width: tabWidth }, indicatorStyle]}>
        <View className="bg-primary/20 h-14 w-14 rounded-full items-center justify-center border-2 border-primary" />
      </Animated.View>

      {/* Tab Items */}
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        // Determine icon name based on route
        let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';
        if (route.name === 'index') iconName = 'home-outline';
        else if (route.name === 'learn') iconName = 'book-outline';
        else if (route.name === 'ai-teacher') iconName = 'videocam-outline';
        else if (route.name === 'chat') iconName = 'chatbubble-outline';
        else if (route.name === 'profile') iconName = 'person-outline';

        // Override with solid icon if focused
        if (isFocused) {
          iconName = iconName.replace('-outline', '') as keyof typeof Ionicons.glyphMap;
        }

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItem}
          >
            <View className="items-center justify-center h-14">
              <Ionicons 
                name={iconName} 
                size={24} 
                color={isFocused ? '#208AEF' : '#9CA3AF'} // primary or neutral-400
              />
              {!isFocused && (
                <Text className="text-[10px] mt-1 font-bold text-neutral-400">
                  {label as string}
                </Text>
              )}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 2,
    borderTopColor: '#e5e7eb',
    paddingTop: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1, // ensure pressable is on top of absolute indicator
  },
  indicatorContainer: {
    position: 'absolute',
    top: 8,
    height: 56, // h-14 is 56px
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  }
});
