import { StyleSheet, Image, Platform , Text,View , Button, Touchable, TouchableOpacity } from 'react-native';
import Animated, {SlideInRight } from "react-native-reanimated";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import {
  useRecoilState,
  useRecoilValue,
} from 'recoil';


export default function TabTwoScreen() {
  const [key, setKey] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setKey((prevKey) => prevKey + 1);
    }, [])
  );


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
      <IconSymbol
      size={300}
      color="#808080"
      name="chevron.left.forwardslash.chevron.right"
      style={[styles.headerImage, { bottom: 30 }]}
      />
      }>
      <View className="flex-row display-flex justify-between">
        <Text className = "text-green-300 mt-3">Device Subscription :  Active</Text>
        <Animated.View style={{ alignItems: 'center'}} key={key} entering={SlideInRight}>
          <TouchableOpacity className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-xl border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onPress={() => {}} >
            <ThemedText>Subscribe</ThemedText>
          </TouchableOpacity>
        </Animated.View>
      </View>
      <ThemedText>Subscribe to recieve a reminder notification an hour before a contest</ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
