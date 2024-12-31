import React from 'react';
import { View, Text, Image } from 'react-native';

function ContestCard(props) {
    return (
        <View className="max-w-sm p-6 border p-6 mt-3 bg-slate-800 border-gray-200 rounded-lg shadow dark:border-gray-700 flex-row">
            <View style={{ flex: 1 }}>
                <Text className="text-xl font-semibold text-gray-800 dark:text-gray-100">Codeforces Round 992</Text>
                <Text className="text-gray-600 dark:text-gray-400">Div. 2</Text>
                <Text className="text-gray-600 dark:text-gray-400">Tomorrow 12:00 PM</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('@/assets/images/codechef.png')} style={{ width: 50, height: 50 }} />
            </View>
        </View>
    );
}

export default ContestCard;
