import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function SearchButton() {
    const navigation = useNavigation();
    const route = useRoute();
    return (
        <SearchButtonStyle>
            <TouchableOpacity onPress={() => navigation.push("Search")}>
                <MaterialIcons name="search" size={24} color="white" />
            </TouchableOpacity>
            {
                route.name === "Home" && <TouchableOpacity onPress={() => navigation.push("Watch_List")} >
                    <Ionicons name="eye" size={24} color="white" />
                </TouchableOpacity>
            }

        </SearchButtonStyle>

    )
}

const SearchButtonStyle = styled(View)`
  position: absolute;
  top: 15px;
  right: 0px;
  flex-direction: row;
  gap: 10px;
`;