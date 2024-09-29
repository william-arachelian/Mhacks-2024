import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
} from "react-native";
import Index from ".";
import { router, useNavigation } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
export default function Page(props) {
  const { _id, name, ingredients, instructions, rating } =
    useLocalSearchParams();

  // ingredients_list = (ingredients.split(","));
  // instructions_list = instructions.split(",");
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
    <View style={{ flex: 1, alignItems: "center", width: "100%" }}>
      <BackButton>
        <View style={styles.container}>
          <Text>back</Text>
        </View>
      </BackButton>

      <View style={styles.container}>
        <View style={styles.border}>
          <Text style={styles.text}>Name: {name}</Text>
        </View>
        <View style={styles.border}>
          <Text style={styles.text}>Ingredients </Text>

          {ingredients.map((item, index) => {
            return (
              <Text style={(marginLeft = 20)}>
                {"\u2022"}
                {item}
              </Text>
            );
          })}
        </View>
        <View style={styles.border}>
          <Text style={styles.text}>Instructions</Text>
          {instructions.map((item, index) => {
            return (
              <Text>
                {index + 1}. {item}
              </Text>
            );
          })}
        </View>

        <Button
          onPress={() => {
            axios.delete(`http://35.3.86.167:5000/recipes/delete/${_id}`);
            router.push("/");
          }}
          title="Remove Recipe"
          color="#841584"
        />
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 24,

    position: "relative",
    top: 100,
    // left: 30,
    width: 300,
    height: 500,
    backgroundColor: "",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 15,
  },

  border: {
    borderColor: "green",
    marginBottom: 20,
    borderWidth: 2,
    borderRadius: 15,
    padding: 5,
  },

  button: {
    position: "absolute",
    top: 20, // Adjust based on your header height
    left: 10, // Padding from the left edge
    padding: 10,
    backgroundColor: "#f0f0f0", // Change as needed
    borderRadius: 5,
  },
  text: {
    color: "#007BFF", // Change as needed
    fontSize: 16,
  },
});
