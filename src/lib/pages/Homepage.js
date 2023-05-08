import { View, StatusBar as Bar, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import AppLoading from 'expo-app-loading';
import { useFontsComponent } from '../constants/useFontsComponent';
import { useHeader } from '../components/Header';
import MovieList from '../components/MainContent/MovieList/MovieList';
import { globalColors } from '../constants/colors';

export default function Homepage() {
    const { sortBy, Header } = useHeader();
    // Getting fonts
    const { fontsLoaded } = useFontsComponent();
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <AppStyle>
                <Header />
                <MovieList dataUrl={sortBy} />
            </AppStyle>
        )
    }

}
const AppStyle = styled(View)`
 background-color: ${globalColors.backgroundColor};
   flex: 1;
   
`;




