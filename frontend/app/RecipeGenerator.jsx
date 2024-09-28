import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TextInputExample from '../components/textbox';

export default function Page() {
    return (
      <View style={styles.title}>
        <Text>Recipe Generation</Text>
        <TextInputExample></TextInputExample>
      </View>
    );
  }

  
  
  const styles = StyleSheet.create({
    title: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'top',
      padding: 24,
      fontScale: 24
    }
  });
  