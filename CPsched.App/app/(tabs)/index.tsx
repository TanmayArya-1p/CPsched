import { Image, StyleSheet, Platform, Text, View, ScrollView  , RefreshControl} from 'react-native';
import React, { useEffect, useState } from 'react';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ContestCard from '@/components/ContestCard';
import { StatusBar } from 'expo-status-bar';
import {Contest, getContests} from '@/api/contests';


export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh =() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }

  const [contestList , setContestList] = useState([]);
  useEffect(() => {
    async function setContests(){
      setContestList(await getContests());
      console.log(contestList);
    }
    setContests()
  },[setContestList])

  return (<View>
    <ScrollView contentContainerStyle={styles.scrollViewContent} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => onRefresh} />}>
      <View style={styles.centeredContent}>
        {contestList.map((c) => <ContestCard contest={c} key={c.id}/>)}
        {/* <ContestCard contest={Contest.fromJSON({"id":"93ee5d4b-e07b-43c3-b67d-3fd452376d1f","title":"Weekly Contest 431","start_time":1736044200.0,"duration":5400,"platform":"CC"})}/> */}
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
