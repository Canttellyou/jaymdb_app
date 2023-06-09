import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { FlatList, ActivityIndicator, StyleSheet, RefreshControl } from 'react-native';
import { apiKey } from '../../../constants/API';
import { RenderMovie } from '../../MovieItem';

const MovieList = ({ dataUrl }) => {

    const { renderMovieItem } = RenderMovie();
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        setMovies([]);
        setPage(1);
        fetchMovies()
    }, [dataUrl]);


    const fetchMovies = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${dataUrl}?api_key=${apiKey}&language=en-US&page=${page}`);
            const data = await response.json();
            if (page === 1) {
                setMovies(() => [...data.results])
            } else {
                setMovies(prevMovies => [...prevMovies, ...data.results]);
            }

        } catch (error) {
            console.log(error);
            setError(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        setMovies([]);
        setPage(1);
        fetchMovies();
    }, []);

    const handleRefresh = () => {
        setRefreshing(true);
        setMovies([]);
        setPage(1);
        fetchMovies();
        setRefreshing(false);
    };
    const handleEndReached = () => {
        if (!loading) {
            setPage(prevPage => prevPage + 1);
            fetchMovies()
        }
    };



    const renderFooter = () => {
        if (!loading) return null;
        return (
            <ActivityIndicator
                style={{ marginVertical: 20 }}
                size="large"
                color="grey"
            />
        );
    };



    return (
        <SafeAreaView>

            <FlatList
                data={movies}
                renderItem={renderMovieItem}
                keyExtractor={item => item.original_title}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0}
                ListFooterComponent={renderFooter}
                contentContainerStyle={styles.container}
                numColumns={4}
                refreshControl={
                    <RefreshControl refreshing={refreshing} style={{

                    }} onRefresh={handleRefresh} />
                }
            />

            {error && <Text style={{
                color: 'white'
            }} >An error occurred. Pull down to refresh.</Text>}

            {!loading && movies.length === 0 && <Text style={{
                color: 'white'
            }} >No movies currently.</Text>}
        </SafeAreaView>


    );
};

export default MovieList;
const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 5,
    },
});