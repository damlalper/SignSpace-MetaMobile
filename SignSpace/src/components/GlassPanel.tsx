import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface GlassPanelProps {
    children: React.ReactNode;
    style?: ViewStyle;
}

const GlassPanel: React.FC<GlassPanelProps> = ({ children, style }) => {
    return (
        <View style={[styles.container, style]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent white
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        padding: 20,
        // Shadow for depth
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
});

export default GlassPanel;
