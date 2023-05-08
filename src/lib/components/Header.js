import { View, SafeAreaView } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import React, { useState } from 'react'

import styled from 'styled-components/native';
import { globalColors } from '../constants/colors';
import SearchButton from './SearchButton';


export const useHeader = () => {
    const [sortBy, setSortBy] = useState("popular");
    const Header = () => {
        return (
            <HeaderStyle>

                <View >
                    <View style={{
                        position: "relative",
                        width: "45%", backgroundColor: "#fff"

                    }}>


                        <Picker
                            selectedValue={sortBy}
                            onValueChange={itemValue => setSortBy(itemValue)}
                            style={{
                                height: 40,
                                backgroundColor: globalColors.backgroundColor,
                                color: '#fff'
                            }}
                            dropdownIconColor="#fff"
                            mode="dropdown"
                        >
                            <Picker.Item label="Popular" value="popular" />
                            <Picker.Item label="Now Playing" value="now_playing" />
                            <Picker.Item label="Top Rated" value="top_rated" />
                            <Picker.Item label="Upcoming" value="upcoming" />
                        </Picker>

                    </View>

                    <SearchButton />
                </View>

            </HeaderStyle>
        )
    }
    return { sortBy, Header }
}

const HeaderStyle = styled(SafeAreaView)`
background-color:${globalColors.backgroundColor};
backdrop-filter: "blur(10px)";
paddingHorizontal: 20px;
padding-top: 35px;
padding-bottom: 10px;

width: 100%;
`;





