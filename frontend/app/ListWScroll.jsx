import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextInput,
  View,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
} from "react-native";

const ListWithScroll = () => {
  const [listValue, setListValue] = useState("");
  const [list, setList] = useState([]);
  const [markedForDeletion, setMarkedForDeletion] = useState(null); // Track the item marked for deletion

  useEffect(() => {
    axios.get("http://35.3.86.167:5000/ingredients").then((response) => {
      data = response.data;
      //   console.log(data);
      setList([...response.data["ingredients"]]);
    });
  }, []);

  const handlePress = () => {
    if (listValue.trim()) {
      setList([...list, listValue]);

      axios
        .post("http://35.3.86.167:5000/ingredients/add", { name: listValue })
        .then((response) => {
          setList([...list, response.data["output"]]);
        });
      setListValue("");
      setMarkedForDeletion(null); // Reset deletion marker
    }
  };

  const handleMarkForDeletion = (index) => {
    if (markedForDeletion === index) {
      // If already marked, unmark

      setMarkedForDeletion(null);
    } else {
      // Mark the item for deletion
      setMarkedForDeletion(index);
    }
  };

  const handleDelete = (index) => {
    axios
      .delete(
        `http://35.3.86.167:5000/ingredients/delete/${list[index]["_id"]}`
      )
      .then((response) => {
        console.log(response);
      });
    const newList = list.filter((_, i) => i !== index);

    setList(newList);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="e.g. Eggs, Milk, Cheese, Bacon"
        multiline={true} // placeholder vertical centering
        value={listValue} // Bind the state value to the TextInput
        onChangeText={(newValue) => setListValue(newValue)}
      />

      <View style={styles.button}>
        <Button title="Add List Item" color="green" onPress={handlePress} />
      </View>

      <View>
        {[...list].reverse().map((item, index) => {
          const originalIndex = list.length - 1 - index;
          return (
            <TouchableOpacity
              key={originalIndex}
              style={styles.itemContainer}
              onPress={() => handleMarkForDeletion(originalIndex)}
            >
              <View style={styles.listItem}>
                <Text style={styles.itemText}>
                  {list.length - index}. {item["name"]}
                </Text>
                {markedForDeletion === originalIndex && (
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(originalIndex)}
                  >
                    <Text style={styles.deleteButtonText}>X</Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default ListWithScroll;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    padding: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#777",
    backgroundColor: "#fff",
    padding: 8,
    margin: 10,
    height: 45,
    width: 300,
    fontSize: 18,
  },

  button: {
    padding: 1,
    marginTop: 5,
    marginBottom: 10,
    width: 300,
    backgroundColor: "#fff",
  },

  listItem: {
    backgroundColor: "pink",
    marginLeft: 10,
    marginTop: 3,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Space between item text and delete button
    padding: 10,
    width: 250, // Adjust width as needed
    borderRadius: 5,
  },

  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  deleteButton: {
    backgroundColor: "red",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 10, // Added margin to move the button to the right
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
