import { View, ActivityIndicator, BackHandler, StatusBar } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';


import styled from 'styled-components/native';
import { useTrailerData } from '../../../constants/requests/GetTrailers';
import { Text } from 'react-native';
import { globalColors } from '../../../constants/colors';
import * as ScreenOrientation from "expo-screen-orientation";
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';


export default function Trailer({ route }) {
    let TrailersID = route.params.movieTrailersId;
    const navigation = useNavigation()

    const { loading, videoData, error } = useTrailerData(TrailersID);
    //Device is in portrait mode, rotate to landscape mode.
    function setOrientation() {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }

    useEffect(() => {
        const handleBackButtoner = () => {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
            navigation.goBack();
            return true
        };

        BackHandler.addEventListener('hardwareBackPress', handleBackButtoner);

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtoner);
        };
    }, []);

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
            {error && <Text style={{
                color: 'white'
            }}>An error occurred</Text>}
        </NowPlayingStyle>
    )
}

const NowPlayingStyle = styled(View)`
flex: 1;
  background-color: ${globalColors.backgroundColor};
`;