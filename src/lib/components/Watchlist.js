import React, { useEffect, useState } from 'react';
import { View, Alert, LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useToast } from 'react-native-toast-notifications';
import { RenderMovie } from './MovieItem';
import { FlatList } from 'react-native';
import { useHeader } from './Header';
import { globalColors } from '../constants/colors';


export function WatchList(props) {
    const { watchList, setWatchList } = useWatchPlaylist();
    const { renderMovieItem } = RenderMovie();
    const { Header } = useHeader();
    return (
        <View style={{
            backgroundColor: globalColors.backgroundColor,
            flex: 1,
        }}>
            <Header />
            <View style={{
                marginTop: 120
            }} >
                <FlatList
                    data={watchList}
                    renderItem={renderMovieItem}
                    keyExtractor={item => item.original_title}
                    numColumns={4}
                />
            </View>

        </View>
    );
}

export const useWatchPlaylist = (props) => {
    const toast = useToast();
    const [watchList, setWatchList] = useState([]);
    useEffect(() => {
        // Load watchList from AsyncStorage on component mount
        AsyncStorage.getItem('watchList').then(value => {
            if (value !== null) {
                setWatchList(JSON.parse(value));
            }
        });
    }, []);
    // Adding and removing  items form watch list
    function addToWatchLater(item) {
        if (watchList.find(favorite => favorite.original_title === item.original_title)) {
            setWatchList(prevFavorites => prevFavorites.filter(favorite => favorite.original_title !== item.original_title));
            toast.show("Removed from watch list", {
                type: "normal",
                placement: "bottom",
                duration: 1000,
                animationType: "slide-in",
            });

        } else {
            setWatchList(prevFavorites => [...prevFavorites, item]);
            toast.show("Added to watch list", {
                type: "normal",
                placement: "bottom",
                duration: 1000,

                animationType: "slide-in",
            });
        }
    }
    useEffect(() => {
        // Save watchList to AsyncStorage whenever it changes
        AsyncStorage.setItem('watchList', JSON.stringify(watchList));
    }, [watchList]);
    return { watchList, setWatchList, addToWatchLater }
}

