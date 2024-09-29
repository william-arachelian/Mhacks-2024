import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

export default function Page() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Pressable style={styles.button} onPress={()=> router.replace("/")}>
      <Text style={styles.text}>back</Text>
    </Pressable>
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
