// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button, View, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

export default function App() {
    const [protagonist, setProtagonist] = useState('');
    const [mainIdea, setMainIdea] = useState('');
    const [tale, setTale] = useState('');
    const [loading, setLoading] = useState(false);

    const generateTale = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://dev.192.168.1.107.nip.io:3300/chatgpt', {
                messages: [
                    { role: "system", content: "You are a helpful assistant. Please provide answers for given requests." },
                    { role: "user", content: `Write a fairy tale featuring a ${protagonist} with the main idea of ${mainIdea}` }
                ],
                model: "gpt-4o"
            });

            const { data } = response;
            setTale(data.response);
        } catch (error) {
            console.error(error);
            setTale('Error generating tale. Please try again.');
        }
        setLoading(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={styles.title}>Fairy Tale Generator</Text>

                <Picker
                    selectedValue={protagonist}
                    onValueChange={(itemValue, itemIndex) => setProtagonist(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Choose a protagonist" value="" />
                    <Picker.Item label="Prince" value="Prince" />
                    <Picker.Item label="Princess" value="Princess" />
                    <Picker.Item label="Dragon" value="Dragon" />
                    <Picker.Item label="Wizard" value="Wizard" />
                </Picker>

                <TextInput
                    style={styles.input}
                    placeholder="Enter the main idea of the tale"
                    value={mainIdea}
                    onChangeText={setMainIdea}
                />

                <Button
                    title="Generate Tale"
                    onPress={generateTale}
                    disabled={protagonist === '' || mainIdea === ''}
                />

                {loading && <Text style={styles.loading}>Generating your tale...</Text>}

                {tale && (
                    <View style={styles.taleContainer}>
                        <Text style={styles.tale}>{tale}</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    scrollViewContent: {
        paddingBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    picker: {
        marginBottom: 20,
    },
    input: {
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        marginBottom: 20,
    },
    loading: {
        marginVertical: 20,
        fontSize: 16,
        textAlign: 'center',
    },
    taleContainer: {
        backgroundColor: '#F3F3F3',
        padding: 20,
        borderRadius: 10,
        marginTop: 20,
    },
    tale: {
        fontSize: 16,
        lineHeight: 24,
    },
});