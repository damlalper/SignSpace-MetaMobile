import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HandData } from '../hooks/useHandTracking';

interface DigitalMirrorProps {
    handData: HandData;
    similarityScore: number; // 0.0 to 1.0
}

const DigitalMirror: React.FC<DigitalMirrorProps> = ({ handData, similarityScore }) => {
    if (!handData.isVisible) return null;

    // Color feedback: Green if > 0.85, else Blue
    const feedbackColor = similarityScore > 0.85 ? '#00ff00' : '#0088ff';

    return (
        <View style={styles.container}>
            {/* Mock visualization of joints */}
            {Object.entries(handData.joints).map(([key, joint]) => (
                <View
                    key={key}
                    style={[
                        styles.joint,
                        {
                            backgroundColor: feedbackColor,
                            // Simple 2D projection for mock
                            left: 150 + joint.position.x * 200,
                            top: 150 - joint.position.y * 200,
                        },
                    ]}
                />
            ))}
            <Text style={[styles.score, { color: feedbackColor }]}>
                Match: {Math.round(similarityScore * 100)}%
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 300,
        height: 300,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
    },
    joint: {
        position: 'absolute',
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    score: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default DigitalMirror;
