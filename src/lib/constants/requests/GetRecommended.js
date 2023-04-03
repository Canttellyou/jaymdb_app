import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { apiKey } from '../API';

export default function useRecommended(movieId) {
    const [recommendedMovies, setRecommendedMovies] = useState([]);
    const [error, setError] = useState(null);
    const fetchMovies = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}&language=en-US&page=1`);
            const data = await response.json();
            setRecommendedMovies(() => [...data?.results]);
        } catch (error) {
            console.log(error);
            setError(error);
        }
    };
    useEffect(() => {
        fetchMovies();
    });


    return { recommendedMovies, setRecommendedMovies, error }
}

const styles = StyleSheet.create({})