import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { styles } from '../theme';
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb';

export default function HomeScreen() {
    const navigation = useNavigation();
    const [trending, setTrending] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTrandingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    }, []);

    const getTrandingMovies = async () => {
        const data = await fetchTrendingMovies();
        if (data && data.Response == "True" && data.Search) setTrending(data.Search);
        setLoading(false);
    }
    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMovies();
        if (data && data.Response == "True" && data.Search) setUpcoming(data.Search);
        setLoading(false);
    }
    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies();
        if (data && data.Response == "True" && data.Search) setTopRated(data.Search);
        setLoading(false);
    }

    return (
        <View className="flex-1 bg-neutral-800">
            <SafeAreaView className="mb-3">
                <StatusBar style="light" />
                <View className="flex-row justify-between items-center mx-4">
                    <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
                    <Text className="text-white text-3xl font-bold">
                        <Text style={styles.text}>M</Text>ovies
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {
                loading ? (<Loading />) : (<ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 10 }}>
                    {/* {Trending movies} */}
                    {trending.length > 0 && <TrendingMovies data={trending} />}

                    {/* {Upcoming movies} */}
                    <MovieList title="Upcoming" data={upcoming} />

                    {/* {Top rated movies} */}
                    <MovieList title="Top Rated" data={topRated} />
                </ScrollView>)
            }
        </View>
    )
}