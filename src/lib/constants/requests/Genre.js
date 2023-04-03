import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { apiKey } from '../API';
import axios from 'axios';
const movieGenres = `
https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;

export function useGenre() {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get(movieGenres).then((resp) => {
                    setGenres(resp.data.genres)
                }).catch((error) => {
                    console.debug(error);
                });
            } catch (error) {
                console.debug(error);
            }

        }
        fetchData();
    }, [])


    return { genres }
}

const styles = StyleSheet.create({})