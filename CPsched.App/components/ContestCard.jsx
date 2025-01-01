import React from 'react';
import { View, Text, Image } from 'react-native';
import AddToCalendarButton from '@/components/AddToCalendar';


function ContestCard({contest}) {
    let imgMap = {'CF' : require('@/assets/images/cf.png'), 'LC' : require('@/assets/images/leetcode.png'), 'CC' : require('@/assets/images/codechef.png')};
    const formatDate = (date) => {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(now.getDate() + 1);

        if (date.toDateString() === now.toDateString()) {
            return `Today ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return `Tomorrow ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        } else {
            return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        }
    };
    let platformMap = {'CF' : 'Codeforces', 'LC' : 'Leetcode', 'CC' : 'CodeChef'};
    return (
        <View className="max-w-sm p-4 border p-6 mt-3 bg-slate-800 border-gray-200 rounded-lg shadow dark:border-gray-700 flex-row">
            <View style={{ flex: 1 }}>
                <Text className="text-xl font-semibold text-gray-800 dark:text-gray-100">{contest.title}</Text>                
                <Text className="text-gray-600 dark:text-gray-400 mt-1">{platformMap[contest.platform] }</Text>
                <Text className="text-gray-600 dark:text-gray-400 mt-2">{formatDate(contest.startTime)}</Text>

                <View className="flex-row">

                    <AddToCalendarButton contest={contest} />
                </View>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image source={imgMap[contest.platform]} style={{ width: 50, height: 50 }} />
            </View>
        </View>
    );
}

export default ContestCard;
