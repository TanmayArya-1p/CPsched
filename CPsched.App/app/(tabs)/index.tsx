import { Image, StyleSheet, Platform, Text, View, ScrollView } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ContestCard from '@/components/ContestCard';
import { StatusBar } from 'expo-status-bar';


export default function HomeScreen() {
  return (<View>
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.centeredContent}>
        <ContestCard />
        <ContestCard />
        <ContestCard />
        <ContestCard />
        <ContestCard />
        <ContestCard />
        <ContestCard />
        <ContestCard />
        <ContestCard />
        <ContestCard />
      </View>
    </ScrollView>
    <StatusBar/>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredContent: {
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
