import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Canvas } from '@react-three/fiber';
import GhostHand from '../components/GhostHand';
import DigitalMirror from '../components/DigitalMirror';
import GlassPanel from '../components/GlassPanel';
import { useHandTracking } from '../hooks/useHandTracking';
import { calculateSimilarity } from '../utils/poseMath';
import { identifyObject } from '../services/aiService';
import gesturesData from '../data/gestures.json';

interface LessonScreenProps {
    levelId: number;
    onBack: () => void;
}

const LessonScreen: React.FC<LessonScreenProps> = ({ levelId, onBack }) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [targetWord, setTargetWord] = useState('');
    const [similarity, setSimilarity] = useState(0);
    const [isScanning, setIsScanning] = useState(false);

    const handData = useHandTracking();

    // Filter gestures for this level (mock logic)
    const levelGestures = gesturesData.filter(g => g.level === levelId);
    const currentGesture = levelGestures[currentWordIndex] || levelGestures[0];

    useEffect(() => {
        if (currentGesture) {
            setTargetWord(currentGesture.name);
        }
    }, [currentGesture]);

    // Check similarity loop
    useEffect(() => {
        if (handData.isVisible && currentGesture) {
            const score = calculateSimilarity(handData.joints, currentGesture.joints);
            setSimilarity(score);
        }
    }, [handData, currentGesture]);

    const handleScan = async () => {
        setIsScanning(true);
        // Mock taking photo and sending to AI
        const identified = await identifyObject('base64_mock');
        setTargetWord(identified); // Update UI with found object
        setIsScanning(false);
    };

    return (
        <View style={styles.container}>
            {/* 3D Scene */}
            <View style={styles.sceneContainer}>
                <Canvas>
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <GhostHand gestureData={currentGesture?.joints} visible={true} />
                </Canvas>
            </View>

            {/* UI Overlay */}
            <View style={styles.uiOverlay}>
                <GlassPanel style={styles.headerPanel}>
                    <TouchableOpacity onPress={onBack}>
                        <Text style={styles.backButton}>← Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.wordTitle}>{targetWord || 'Loading...'}</Text>
                </GlassPanel>

                <View style={styles.controls}>
                    <TouchableOpacity style={styles.button} onPress={handleScan}>
                        <Text style={styles.buttonText}>{isScanning ? 'Scanning...' : 'Snap & Sign'}</Text>
                    </TouchableOpacity>
                </View>

                <DigitalMirror handData={handData} similarityScore={similarity} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    sceneContainer: {
        ...StyleSheet.absoluteFillObject,
    },
    uiOverlay: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
    headerPanel: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backButton: {
        color: '#fff',
        fontSize: 18,
    },
    wordTitle: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
    },
    controls: {
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#0088ff',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 25,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default LessonScreen;
