import { ActivityIndicator, Image, Linking, Text, View } from 'react-native';
import { MaterialIcons, Feather, Entypo, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { globalColors } from '../constants/colors';
import { useGenre } from '../constants/requests/Genre';
import { useMovieDetails } from '../constants/requests/GetMovieDetails';
import { TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useWatchPlaylist } from '../components/Watchlist';
import { RenderMovie } from '../components/MovieItem';
import useSimilarMovies from '../constants/requests/GetSimilarMovies';
import { FlatList } from 'react-native';
import { ScrollView } from 'react-native';
import useRecommended from '../constants/requests/GetRecommended';
import SearchButton from '../components/SearchButton';
import { BackHandler } from 'react-native';

const SimilarMovies = ({ id }) => {
    const { renderMovieItem } = RenderMovie();
    const { similarMovies, error, loading } = useSimilarMovies(id);
    return (
        <View>
            {loading && <ActivityIndicator
                style={{ marginVertical: 20 }}
                size="large"
                color="grey"
            />}
            {
                similarMovies && !loading && similarMovies.length != 0 && (<FlatList
                    data={similarMovies}
                    renderItem={renderMovieItem}
                    horizontal={true}
                    keyExtractor={item => item.original_title}
                />)
            }

            {
                error && <Text style={{
                    color: 'white'
                }}>
                    {error}
                </Text>
            }
            {similarMovies && !loading && similarMovies.length === 0 && <Text style={{
                color: "#c5c5c5"
            }}>No recommendations</Text>}
        </View>
    );
}
const RecommendedMovies = ({ id }) => {
    const { renderMovieItem } = RenderMovie();
    const { recommendedMovies, error, loading } = useRecommended(id);
    return (
        <View>
            {loading && <ActivityIndicator
                style={{ marginVertical: 20 }}
                size="large"
                color="grey"
            />}
            {
                recommendedMovies && recommendedMovies.length != 0 && (<FlatList
                    data={recommendedMovies}
                    renderItem={renderMovieItem}
                    horizontal={true}
                    keyExtractor={item => item.original_title}
                />)
            }
            {
                error && <Text style={{
                    color: 'white'
                }}>
                    {error}
                </Text>
            }
            {recommendedMovies && !loading && recommendedMovies.length === 0 && <Text style={{
                color: "#c5c5c5"
            }}>No recommendations</Text>}
        </View>

    );
}
export default function MovieDetails({ route }) {

    let movieDetails = route.params.movieDetails;
    const { genres } = useGenre();
    const { movieExtraDetails } = useMovieDetails(movieDetails.id);
    const genreNames = genres.filter(genre => movieDetails.genre_ids.includes(genre.id)).map(genre => genre.name);
    const navigation = useNavigation();
    const router = useRoute();
    const { watchList, addToWatchLater } = useWatchPlaylist();
    function toggleAdded(item) {
        if (watchList.some(favorite => favorite.original_title === item.original_title)) {
            return true
        } else {
            return false
        }
    }
    useEffect(() => {
        const handleBackButton = () => {
            navigation.push('Home');
            return true;
        };

        BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        };
    }, []);


    return (
        <MovieDetailsStyle>
            <View style={{
                width: '100%',
                paddingVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: globalColors.backgroundColor
            }}>
                <TouchableOpacity activeOpacity={1} onPress={() => navigation.push("Home")}>
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
                                }}>{parseFloat(movieDetails.vote_average).toFixed(1)}</TextWhite>
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
                            color: "#fff"
                        }}>
                            {toggleAdded(movieDetails) === true ? "Remove from Watchlist" : "Add to Watchlist"}
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
                    <SimilarMovies id={movieDetails.id} />
                </View>


                <View>
                    <TextWhite style={{
                        fontFamily: 'Poppins_600SemiBold',
                        fontSize: 16,
                        marginTop: 10
                    }} >Recommendations</TextWhite>
                    <RecommendedMovies id={movieDetails.id} />
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

