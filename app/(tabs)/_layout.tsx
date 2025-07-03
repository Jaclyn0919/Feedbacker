import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const TabLayout = () => {
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
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(17, 17, 17, 0.9)',
            borderTopWidth: 1,
            borderTopColor: 'rgba(51, 51, 51, 0.5)',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
          android: {
            backgroundColor: '#111111',
            borderTopWidth: 1,
            borderTopColor: '#333333',
            elevation: 8,
          },
          default: {
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
            <Feather name="map-pin" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="circles"
        options={{
          title: 'Circles',
          tabBarIcon: ({ color }) => (
            <Feather name="users" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
