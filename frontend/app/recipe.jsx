import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { router, useNavigation } from 'expo-router';
import { useLocalSearchParams } from "expo-router";
export default function Page( props ) {
  const {name,ingredients,instructions,rating} = useLocalSearchParams();
  
  console.log(typeof ingredients)
  const BackButton = () => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.text}>Back</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
    <BackButton>
      <View style={styles.container}>
        <Text>back</Text>
      </View>
    </BackButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding:24,
    margin:50,
    width:150,
    backgroundColor: '#',
    alignItems: 'left',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    top: 20, // Adjust based on your header height
    left: 10, // Padding from the left edge
    padding: 10,
    backgroundColor: '#f0f0f0', // Change as needed
    borderRadius: 5,
  },
  text: {
    color: '#007BFF', // Change as needed
    fontSize: 16,
  },
});

