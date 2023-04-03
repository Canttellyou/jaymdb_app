import React from 'react';
import { Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';
import { globalColors } from '../constants/colors';

const ImageWithGradient = ({ source, colors }) => {
    return (
        <Container>
            <Image
                source={source}
                style={{
                    width: '100%',
                    height: 50,
                    transform: [{ scaleY: -1 }]

                }}
                blurRadius={10}
            />
            <Overlay colors={['#101010a0', globalColors.backgroundColor, globalColors.backgroundColor]} />
        </Container>
    );
};

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

const Overlay = styled(LinearGradient)`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export default ImageWithGradient;