import { StyleSheet, Image, Platform , Text,View , Button, Touchable, TouchableOpacity } from 'react-native';

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
      <ThemedView style={styles.titleContainer}>
      <Text className = "text-green-300">Device Subscription :  Active</Text>
      </ThemedView>
      <ThemedText>Subscribe to recieve a reminder notification an hour before a contest</ThemedText>
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <TouchableOpacity className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-xl border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onPress={() => {}} >
          <ThemedText>Subscribe</ThemedText>
        </TouchableOpacity>
      </View>
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
