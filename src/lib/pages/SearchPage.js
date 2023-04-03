import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native';
import { TextInput } from 'react-native';
import { globalColors } from '../constants/colors';
import { apiKey } from '../constants/API';
import { RenderMovie } from "../components/MovieItem"
import { ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const SEARCHAPI =
    `https://api.themoviedb.org/3/search/movie?&api_key=${apiKey}&query=`;

export default function SearchPage() {
    const [inputText, setInputText] = useState("");
    const navigation = useNavigation();
    const [searchedMovies, setSearchedMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { renderMovieItem } = RenderMovie();
    const fetchMovies = async () => {
        setLoading(true);
        try {
            const response = await fetch(SEARCHAPI + inputText);
            const data = await response.json();
            setSearchedMovies(() => [...data?.results]);
            console.log(searchedMovies);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, [inputText]);

    return (
        <SearchContainerStyle>
            <View style={{
                flexDirection: 'row',
                gap: 5
            }}>
                <TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()} style={{
                    marginTop: 8
                }}>
                    <Ionicons name="arrow-back" size={28} color="white" />
                </TouchableOpacity>
                <TextInputStyle onChangeText={(text) => setInputText(text)} placeholder="Search Movies..." placeholderTextColor="#999" />
            </View>

            {loading && <ActivityIndicator
                style={{ marginVertical: 20 }}
                size="large"
                color="grey"
            />}

            {
                searchedMovies.length != 0 &&
                <FlatList
                    data={searchedMovies}
                    renderItem={renderMovieItem}
                    keyExtractor={item => item.original_title}
                    numColumns={4}
                />
            }
            {
                error && <Text style={{
                    color: 'white'
                }}>
                    {error}
                </Text>
            }
            {
                inputText.length > 0 && !loading && searchedMovies.length === 0 && <Text style={{
                    color: "#c5c5c5"
                }}>No results found</Text>
            }
        </SearchContainerStyle>
    )
}

const TextInputStyle = styled(TextInput)`

padding: 10px;

color: #fff;
font-size: 16px;
margin-bottom: 20px;
border-radius: 5px;

`;

const SearchContainerStyle = styled(View)`
   
    background-color: ${globalColors.backgroundColor};
    flex: 1;
    padding: 10px;
     padding-top: 40px;
`