import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, Images, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles, theme } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/cast';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { fetchMovieDetails } from '../api/moviedb';


let { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const topMargin = ios ? '' : ' mt-3'
const movieName = 'Harry Potter: Prison Askaban';

export default function MovieScreen() {
    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [isFavorite, toggleFavorite] = useState(false);
    const [cast, setCast] = useState([1, 2, 3, 4, 5]);
    const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5,]);
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState({});

    useEffect(() => {
        console.log('itemid - ', item.imdbID);
        setLoading(true);
        getMovieDetails(item.imdbID);
    }, [item]);

    const getMovieDetails = async (id) => {
        const data = await fetchMovieDetails(id);
        console.log(data);
        if (data) setMovie(data);
        setLoading(false);
    }

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            className="flex-1 bg-neutral-900"
        >
            <View className="w-full">
                <SafeAreaView
                    className={"absolute z-20 w-full flex-row justify-between items-center px-4" + topMargin}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.background} className="rounded-xl p-1">
                        <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleFavorite(!isFavorite)}>
                        <HeartIcon size="35" color={isFavorite ? theme.background : "white"} />
                    </TouchableOpacity>
                </SafeAreaView>
                {loading ? (
                    <Loading />
                ) : (
                    <View>
                        <Image
                            source={{ uri: movie.Poster }}
                            style={{ width, height: height * 0.55 }} />
                        <LinearGradient
                            colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                            style={{ width, height: height * 0.4 }}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            className="absolute bottom-0" />
                    </View>
                )}
            </View>

            <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
                <Text className="text-white text-center text-3xl font-bold tracking-wider">
                    {movie.Title}
                </Text>
                <Text className=" text-neutral-400 font-semibold text-base text-center">
                    {movie.Released ? 'Released' : ''} * {movie?.Year} * {movie?.Runtime}
                </Text>

                <View
                    className="flex-row justify-center mx-4 space-x-2">
                    <Text className="text-neutral-400 font-semibold text-base text-center">
                        Action *
                    </Text>
                    <Text className="text-neutral-400 font-semibold text-base text-center">
                        Thrill *
                    </Text>
                    <Text className="text-neutral-400 font-semibold text-base text-center">
                        Comedy
                    </Text>
                </View>
                <Text className="text-neutral-400 mx-4 tracking-wide">
                    {movie.Plot}
                </Text>
            </View>

            <Cast navigation={navigation} cast={cast} />

            {/* <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} /> */}
        </ScrollView>
    )
}