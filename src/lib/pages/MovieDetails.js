import { Image, Linking, Text, View } from 'react-native';
import { MaterialIcons, Feather, Entypo, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import React from 'react';
import styled from 'styled-components/native';
import { globalColors } from '../constants/colors';
import { useGenre } from '../constants/requests/Genre';
import { useMovieDetails } from '../constants/requests/GetMovieDetails';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useWatchPlaylist } from '../components/Watchlist';
import { RenderMovie } from '../components/MovieItem';
import useSimilarMovies from '../constants/requests/GetSimilarMovies';
import { FlatList } from 'react-native';
import { ScrollView } from 'react-native';
import useRecommended from '../constants/requests/GetRecommended';
import SearchButton from '../components/SearchButton';
import { SafeAreaView } from 'react-native';

export default function MovieDetails({ route }) {
    let movieDetails = route.params.movieDetails;
    const { genres } = useGenre();
    const { movieExtraDetails } = useMovieDetails(movieDetails.id);
    console.log('Details', movieExtraDetails);
    console.log(movieDetails);
    const genreNames = genres.filter(genre => movieDetails.genre_ids.includes(genre.id)).map(genre => genre.name);
    const navigation = useNavigation();
    const { watchList, addToWatchLater } = useWatchPlaylist();
    const { renderMovieItem } = RenderMovie();
    console.log(watchList);
    function toggleAdded(item) {
        if (watchList.some(favorite => favorite.original_title === item.original_title)) {
            return true
        } else {
            return false
        }
    }

    const SimilarMovies = () => {
        const { similarMovies, setSimilarMovies, error } = useSimilarMovies(movieDetails.id);
        return (
            <View>
                {
                    similarMovies && similarMovies.length != 0 ? (<FlatList
                        data={similarMovies}
                        renderItem={renderMovieItem}
                        horizontal={true}
                        keyExtractor={item => item.original_title}
                    />) : <Text style={{
                        color: "#c5c5c5"
                    }} >No similar movies</Text>
                }
            </View>
        );
    }
    const RecommendedMovies = () => {
        const { recommendedMovies, setRecommendedMovies, error } = useRecommended(movieDetails.id);
        return (
            <View>
                {
                    recommendedMovies && recommendedMovies.length != 0 ? (<FlatList
                        data={recommendedMovies}
                        renderItem={renderMovieItem}
                        horizontal={true}
                        keyExtractor={item => item.original_title}
                    />) : <Text style={{
                        color: "#c5c5c5"
                    }}>No recommendations</Text>
                }
            </View>

        );
    }

    return (
        <MovieDetailsStyle>
            <View style={{
                width: '100%',
                paddingVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: globalColors.backgroundColor
            }}>
                <TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={28} color="white" />
                </TouchableOpacity>
                <SearchButton />

            </View>

            <ScrollView><View style={{
                width: '100%',
                height: 205
            }}>
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path}` }}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                />
                <View
                    style={{
                        backgroundColor: globalColors.backgroundColor,
                        width: '100%',
                        height: 2.5,
                    }}
                >
                </View>

            </View>
                <View style={
                    {
                        paddingTop: 12,

                    }
                }>
                    <TextWhite style={{
                        color: 'white',
                        fontFamily: 'Poppins_500Medium',
                        fontSize: 20
                    }} >{movieDetails.original_title}</TextWhite>
                </View>
                <View style={
                    {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                        marginTop: 5
                    }
                }>
                    <View
                        style={{
                            width: '50%'
                        }}
                    >
                        {/* Genres --Start */}
                        <View
                            style={{
                                justifyContent: 'space-between',
                            }}
                        >
                            <TextWhite numberOfLines={1} ellipsizeMode="tail" style={{
                                color: '#c5c5c5',
                                // width: '100%',
                            }}>
                                {genreNames.map((genre, index, array) => (
                                    ` ${genre}${index !== array.length - 1 ? "," : ''}`
                                ))}
                            </TextWhite>
                        </View>
                        {/* Genres --End */}
                        <View style={{
                            flexDirection: 'row',
                            // width: '45%',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginVertical: 3
                        }}>
                            <TextWhite style={{
                                color: "#c5c5c5"
                            }}>{movieDetails.release_date?.slice(0, 4)}</TextWhite>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <MaterialIcons name="star-border" size={24} color="#c5c5c5" />
                                <TextWhite style={{
                                    color: "#c5c5c5"
                                }}>{movieDetails.vote_average}</TextWhite>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 3
                                }}>
                                <Feather name="clock" size={20} color="#c5c5c5" />
                                <TextWhite style={{
                                    color: "#c5c5c5"
                                }}>{movieExtraDetails.runtime}mins</TextWhite>
                            </View>
                        </View>
                    </View  >
                    {/* Watch Now -- Start */}
                    <TouchableOpacity
                        style={{
                            width: 150,
                            backgroundColor: 'white',
                            borderRadius: 6,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Entypo name="controller-play" size={24} color="black" />
                        <Text style={{
                            fontFamily: 'Poppins_600SemiBold',
                            fontSize: 15
                        }}
                            onPress={() => Linking.openURL(`https://hd.fmoviesto.site/${movieDetails.original_title.replace(/[\s:]+/g, "-").toLowerCase()}`)}
                        >Watch Now</Text>

                    </TouchableOpacity>
                    {/* Watch Now -- End */}
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        gap: 10,
                        marginTop: 20,
                    }}
                >
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 5
                        }}
                        onPress={() => navigation.push("Trailer", { movieTrailersId: movieDetails.id })}
                    >
                        <MaterialCommunityIcons name="television-play" size={24} color="white" />
                        <TextWhite>
                            Trailer
                        </TextWhite>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 2
                        }}
                        onPress={() => addToWatchLater(movieDetails)}
                    >
                        <Entypo name="bookmarks" size={24} color={toggleAdded(movieDetails) === true ? "#fff" : "#898989"} />
                        <Text style={{
                            color: toggleAdded(movieDetails) === true ? "#fff" : "#898989"
                        }}>
                            Watchlist
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={{
                        color: "#c5c5c5",
                        marginTop: 10,
                    }}>
                        {movieDetails.overview}
                    </Text>
                </View>

                <View>
                    <TextWhite style={{
                        fontFamily: 'Poppins_600SemiBold',
                        fontSize: 16,
                        marginTop: 10
                    }} >Similar Movies</TextWhite>
                    <SimilarMovies />
                </View>


                <View>
                    <TextWhite style={{
                        fontFamily: 'Poppins_600SemiBold',
                        fontSize: 16,
                        marginTop: 10
                    }} >Recommendations</TextWhite>
                    <RecommendedMovies />
                </View>
            </ScrollView>



        </MovieDetailsStyle >
    )
};




const MovieDetailsStyle = styled(View)`
    background-color: ${globalColors.backgroundColor};
    flex: 1;
    color: white;
    padding-top: 40px;
    paddingHorizontal:10px;
    width: 100%;
`;
const TextWhite = styled(Text)`
    color: white;
`;

