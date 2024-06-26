import { View, Text, Dimensions, Platform, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../theme';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import MovieList from '../components/movieList';
import Loading from '../components/loading';

let { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const verticalMargin = ios ? '' : ' my-3'

export default function PersonScreen() {
    const navigation = useNavigation();
    const [isFavorite, toggleFavorite] = useState(false);
    const [personMovies, setPersonMovies] = useState([1, 2, 3, 4]);
    const [loading, setLoading] = useState(true);
    return (
        <ScrollView className="flex-1 bg-neutral-900" contentContainerStyle={{ paddingBottom: 20 }}>
            <SafeAreaView className={"z-20 w-full flex-row justify-between items-center px-4 " + verticalMargin}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.background} className="rounded-xl p-1">
                    <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleFavorite(!isFavorite)}>
                    <HeartIcon size="35" color={isFavorite ? "red" : "white"} />
                </TouchableOpacity>
            </SafeAreaView>

            {loading ? (<Loading />) : (
                <View>
                    <View className="flex-row justify-center"
                        style={{
                            shadowColor: 'gray',
                            shadowRadius: 40,
                            shadowOffset: { width: 0, height: 5 },
                            shadowOpacity: 1,
                        }}
                    >
                        <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
                            <Image
                                source={require('../assets/images/cast1.jpg')}
                                style={{ height: height * 0.43, width: width * 0.74 }} />
                        </View>
                    </View>
                    <View className="my-6">
                        <Text className="text-3xl text-white font-bold text-center">
                            Daniel Jacob Radcliffe
                        </Text>
                        <Text className="text-base text-neutral-500 font-bold text-center">
                            London, United Kingdom
                        </Text>
                    </View>
                    <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
                        <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                            <Text className="text-white font-semibold">Gender</Text>
                            <Text className="text-neutral-300 text-sm">Male</Text>
                        </View>
                        <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                            <Text className="text-white font-semibold">Birthday</Text>
                            <Text className="text-neutral-300 text-sm">1990-09-02</Text>
                        </View>
                        <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                            <Text className="text-white font-semibold">Know for</Text>
                            <Text className="text-neutral-300 text-sm">Acting</Text>
                        </View>
                        <View className="px-2 items-center">
                            <Text className="text-white font-semibold">Popularity</Text>
                            <Text className="text-neutral-300 text-sm">97</Text>
                        </View>
                    </View>

                    <View className="my-6 mx-4 space-y-2">
                        <Text className="text-white text-lg">Biography</Text>
                        <Text className="text-neutral-400 tracking-wide">Дэниел Джейкоб Рэдклифф (род. 23 июля 1989, Лондон, Англия, Великобритания) — британский актёр театра, кино и телевидения, продюсер.
                            Известен как исполнитель роли Гарри Поттера в многолетней серии одноимённых фильмов, снятых по произведениям писательницы Джоан Роулинг.</Text>
                    </View>
                    <MovieList title={'Movies'} hideSeeAll={true} data={personMovies} />
                </View>)}
        </ScrollView >
    )
}