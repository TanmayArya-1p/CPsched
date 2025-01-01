import React from 'react';
import { Alert, StyleSheet, TouchableOpacity  , Text , View} from 'react-native';
import * as Linking from 'expo-linking';
import {IconSymbol} from './ui/IconSymbol';

let platformMap = {'CF' : 'Codeforces', 'LC' : 'Leetcode', 'CC' : 'CodeChef'};

const AddToCalendarButton = ({ contest }) => {
  const openGoogleCalendar = () => {
    const { title, startTime, duration, platform } = contest;
    const endDate = new Date(startTime.getTime() + duration * 1000);

    const formatDate = (date) => date.toISOString().replace(/-|:|\.\d+/g, "");

    const googleCalendarURL = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      `${title} - ${platformMap[platform]}`
    )}&details=${encodeURIComponent(`Platform: ${platform}`)}&dates=${formatDate(startTime)}/${formatDate(endDate)}`;

    Linking.openURL(googleCalendarURL).catch(() =>
      Alert.alert("Error", "Unable to open Google Calendar")
    );
  };

  return (
    <TouchableOpacity className="mt-2" onPress={openGoogleCalendar}>
        <View className="flex-row">
            <IconSymbol
                size={20}
                color="#679fc2"
                name="calendar"
                />
            <Text className="text-blue-300 w-auto"> Add to Calendar</Text>

        </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    padding: 10,
  },
});

export default AddToCalendarButton;