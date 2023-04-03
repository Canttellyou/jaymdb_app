import { View, FlatList, ActivityIndicator, ScrollView, Dimensions, BackHandler, StatusBar } from 'react-native';
import React, { useEffect, useRef } from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';


import styled from 'styled-components/native';
import { useTrailerData } from '../../../constants/requests/GetTrailers';
import { Text } from 'react-native';
import { globalColors } from '../../../constants/colors';
import * as ScreenOrientation from "expo-screen-orientation";


export default function Trailer({ route }) {
    let TrailersID = route.params.movieTrailersId;

    const { loading, videoData, error } = useTrailerData(TrailersID);

    function setOrientation() {
        //Device is in portrait mode, rotate to landscape mode.
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);


    }
    BackHandler.addEventListener('hardwareBackPress', function () {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    });






    return (
        <NowPlayingStyle
            onLoad={setOrientation()}
        >
            <StatusBar hidden />
            {
                loading && (
                    <ActivityIndicator
                        //visibility of Overlay Loading Spinner
                        visible={loading}
                        //Text with the Spinner
                        textContent={''}
                        //Text style of the Spinner Text
                        textStyle={{
                            color: '#FFF'
                        }}
                    />
                )
            }
            {
                !loading && videoData.length !== 0 &&
                <YoutubePlayer
                    videoId={videoData?.find((id) => id.name === "Official Trailer").key || videoData?.[0]?.key}

                    play={true}


                    height={'100%'}
                    // video width -> screen height
                    width={'100%'}
                    // // prevent aspect ratio auto sizing
                    webViewProps={{
                        injectedJavaScript: `
                    var element = document.getElementsByClassName('container')[0];
                    element.style.position = 'unset';
                    element.style.paddingBottom = 'unset';
                    true;
                  `,
                    }}

                />
            }
            {error && <Text>{error}</Text>}
        </NowPlayingStyle>
    )
}

const NowPlayingStyle = styled(View)`
flex: 1;
  background-color: ${globalColors.backgroundColor};
`;