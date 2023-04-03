import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
function getClassByAverage(vote) {
    if (vote >= 7.5) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}
export const RenderMovie = () => {
    const navigation = useNavigation();

    const renderMovieItem = ({ item }) => (<TouchableOpacity activeOpacity={1} style={{ width: 88, overflow: "hidden", marginVertical: 10, marginHorizontal: 5 }} key={item.original_title} onPress={() => navigation.push("Movie_Details", { movieDetails: item })}>
        <Image source={{
            uri: `https://image.tmdb.org/t/p/w1280${item.poster_path}`
        }}
            style={{ width: "100%", height: 130 }}
        />
        <View style={{
            width: '100%', justifyContent: "space-between", padding: 10,
            // backgroundColor: "#32323213"
        }}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={{ width: '80%', color: "#fff", fontFamily: 'Poppins_600SemiBold', fontSize: 14 }} >{item.original_title}</Text>
            <View style={{
                borderRadius: 5
            }} ><Text style={{
                fontFamily: 'Poppins_600SemiBold', fontSize: 14, color: getClassByAverage(
                    item.vote_average
                )
            }}>{parseFloat(item.vote_average).toFixed(1)}</Text>
                <Text style={{ color: "#fff", fontFamily: 'Poppins_300Light', fontSize: 14 }} >{item.release_date?.slice(0, 4)}</Text>
            </View>
        </View>

    </TouchableOpacity>)

    return { renderMovieItem };

};

