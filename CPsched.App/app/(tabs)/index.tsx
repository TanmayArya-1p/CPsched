import React, { useEffect, useState } from 'react';
import { View, ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import ContestCard from '@/components/ContestCard';
import { getContests } from '@/api/contests';


export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contestList, setContestList] = useState([]);
  async function setContests() {
    setLoading(true);
    const contests = await getContests();
    setContestList(contests);
    setLoading(false);
  }

  const onRefresh = () => {
    console.log("REFRESH");
    setContests();
  }

  useEffect(() => {
    setContests();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <ScrollView
        contentContainerStyle={{ padding: 16 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {loading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <MotiView
              key={index}
              from={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{
                type: 'timing',
                duration: 1000,
                loop: true,
              }}
              style={styles.skeletonContainer}
            >
              <View style={{ flex: 1 }}>
                <View style={[styles.skeletonText, { width: '60%', height: 20 }]} />
                <View style={[styles.skeletonText, { width: '40%', height: 20 }]} />
              </View>
              <View style={styles.skeletonImage} />
            </MotiView>
          ))
        ) : (
          contestList.map((contest, index) => (
            <MotiView
              key={index}
              from={{ opacity: 0, translateY: -20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 500, delay: index * 100 }}
            >
              <ContestCard contest={contest} />
            </MotiView>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  skeletonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#2c2c2c',
    borderRadius: 8,
    marginBottom: 16,
    height: 120,
  },
  skeletonText: {
    backgroundColor: '#444',
    borderRadius: 4,
    marginBottom: 8,
  },
  skeletonImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#444',
    marginLeft: 'auto',
  },
});