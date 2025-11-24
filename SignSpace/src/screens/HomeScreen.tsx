import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import GlassPanel from '../components/GlassPanel';

// Mock navigation prop type
interface HomeScreenProps {
    onSelectLevel: (levelId: number) => void;
}

const levels = [
    { id: 1, title: 'Universal', description: 'Hello, Yes, No' },
    { id: 2, title: 'Politeness', description: 'Please, Thank You, Good' },
    { id: 3, title: 'Needs', description: 'Water, Help, Home' },
    { id: 4, title: 'Alphabet', description: 'A, B, L' },
    { id: 5, title: 'Emotions', description: 'Love, Happy, Sad' },
];

const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectLevel }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>SignSpace</Text>
            <Text style={styles.subHeader}>Select a Level</Text>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {levels.map((level) => (
                    <TouchableOpacity key={level.id} onPress={() => onSelectLevel(level.id)}>
                        <GlassPanel style={styles.levelCard}>
                            <Text style={styles.levelTitle}>{level.title}</Text>
                            <Text style={styles.levelDesc}>{level.description}</Text>
                        </GlassPanel>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'transparent', // Important for Passthrough
    },
    header: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginTop: 40,
    },
    subHeader: {
        fontSize: 24,
        color: '#ddd',
        textAlign: 'center',
        marginBottom: 30,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    levelCard: {
        marginBottom: 15,
    },
    levelTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    levelDesc: {
        fontSize: 16,
        color: '#ccc',
        marginTop: 5,
    },
});

export default HomeScreen;
