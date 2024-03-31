import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { styles } from '../theme'
import { useNavigation } from '@react-navigation/native'

export default function MovieList({ title, data, hideSeeAll }) {
    let { width, height } = Dimensions.get('window');
    const movieName = 'Harry Potter: Prison Askaban';
    const navigation = useNavigation();

    return (
        <View className="mb-8 space-y-4">
            <View className="mx-4 flex-row justify-between items-center">
                <Text className="text-white text-xl">{title}</Text>
                {
                    !hideSeeAll && (
                        <TouchableOpacity>
                            <Text style={styles.text} className="text-lg">See All</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}>
                {data.map((item, index) => {
                    return (
                        <TouchableWithoutFeedback
                            key={index}
                            onPress={() => navigation.push('Movie', item)}
                        >
                            <View className="space-y-1 mr-4">
                                <Image
                                    source={{ uri: item.Poster }}
                                    className="rounded-3xl"
                                    style={{ width: width * 0.33, height: height * 0.22 }} />
                                <Text className="text-neutral-300 ml-1">
                                    {item.Title.length > 14 ? item.Title.slice(0, 14) + '...' : item.Title}
                                </Text>
                            </View>

                        </TouchableWithoutFeedback>
                    )
                })}
            </ScrollView>
        </View >
    )
}