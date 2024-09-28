import { StyleSheet, View, Pressable, Text } from 'react-native';
import { Link } from 'expo-router';

export default function Button({ label,link }) {
  return (
    <View style={styles.buttonContainer}>
        <Link href={link}>
      <Pressable style={styles.button}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
      </Link>
    </View>
  );
}   

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    color: '#000',
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    color: '#000'
  },
  buttonIcon: {
    paddingRight: 8,
    color: '#000'
  },
  buttonLabel: {
    color: '#000',
    fontSize: 16,
  },
});
