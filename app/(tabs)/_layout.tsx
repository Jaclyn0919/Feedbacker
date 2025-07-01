import { Tabs } from 'expo-router';
import React from 'react';
<<<<<<< HEAD
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
=======
import { Platform, Text } from 'react-native';

// 导入需要的组件和样式
import { HapticTab } from '@/components/HapticTab';
>>>>>>> main
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

<<<<<<< HEAD
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
=======
const MockIconSymbol = ({ name, size, color } :any) => (
  <Text style={{ fontSize: size, color, pointerEvents: 'box-none' }}>
    {name}
  </Text>
);

const TabLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <>
      {/* <StatusBar barStyle="light-content" backgroundColor="#000000" /> */}
      <Tabs
        screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground ,
         tabBarStyle: Platform.select({
            ios: {
              // iOS 平台样式
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(17, 17, 17, 0.9)', // 半透明背景
              borderTopWidth: 1,
              borderTopColor: 'rgba(51, 51, 51, 0.5)',
              // iOS 阴影效果（可选）
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            },
            android: {
              // Android 平台样式
              backgroundColor: '#111111',
              borderTopWidth: 1,
              borderTopColor: '#333333',
              elevation: 8, // Android 专用阴影属性
            },
            default: {
              // 默认样式（如果需要支持其他平台）
              backgroundColor: '#111111',
              borderTopWidth: 1,
              borderTopColor: '#333333',
            },
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Posts',
            tabBarIcon: ({ color }) => (
              <MockIconSymbol size={28} name="📍" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="merchantDetail"
          options={{
            title: 'MerchantDetail',
            tabBarItemStyle: {
              display: 'none'
            }
          }}
        />
        <Tabs.Screen
          name="postDetail"
          options={{
            title: 'PostDetail',
            tabBarItemStyle: {
              display: 'none'
            }
          }}
        />
        <Tabs.Screen
          name="circles"
          options={{
            title: 'Circles',
            tabBarIcon: ({ color }) => (
              <MockIconSymbol size={28} name="👥" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => (
              <MockIconSymbol size={28} name="👤" color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabLayout;
>>>>>>> main
