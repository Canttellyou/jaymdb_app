import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SearchButton() {
    const navigation = useNavigation();
    return (
        <SearchButtonStyle>
            <TouchableOpacity onPress={() => navigation.push("Search")}>
                <MaterialIcons name="search" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.push("Watch_List")} ><Ionicons name="eye" size={24} color="white" /></TouchableOpacity>
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