import {
  Image,
  TouchableHighlight,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ListItem } from "react-native-elements";
import Recipe from "../app/recipe";
import { useNavigation } from "@react-navigation/native";
import { router, useRouter } from "expo-router";
import background_image from "../assets/background_image.jpg"; // Adjust the path if necessary
import * as SplashScreen from "expo-splash-screen";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";

SplashScreen.preventAutoHideAsync();

export default function Page(props) {
  const navigation = useNavigation();
  const router = useRouter();
  const isFocused = useIsFocused();
  const [ingredients, setIngredients] = useState([]);
  // const [recipes, setRecipes] = useState([]);
  const [list, setList] = useState([]);

  const [appIsReady, setAppIsReady] = React.useState(false);

  useEffect(() => {
    console.log(props);
    if (isFocused == true && props.buttonClick) {
      props.setButtonClick(false);
      setAppIsReady(false);

      axios.get("http://35.3.86.167:5000/ingredients").then((response) => {
        setIngredients([...response.data["ingredients"]]);
      });
      axios.get("http://35.3.86.167:5000/recipes/generate").then((response) => {
        setList([...response.data["recipes"]]);
        setAppIsReady(true);
      });
    }
  }, [isFocused]);

  const onLayoutRootView = React.useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return (
      <View style={styles.waiting}>
        <Text>cooking your food</Text>
        <Image
          source={require("../assets/foodloading.gif")}
          style={{ width: 200, height: 200 }}
        />
      </View>
    );
  }

  return (
    <ImageBackground
      source={background_image}
      resizeMode="cover"
      style={styles.background_image}
    >
      <ScrollView>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <Text style={styles.title}> Recipe List </Text>
          {list.map((item, i) => {
            // console.log(item)
            item = {
              name: item.name,
              instructions: item.instructions,
              ingredients: item.ingredients,
              rating: item.rating,
            };
            return (
              <TouchableHighlight
                key={i}
                onPress={() => navigation.navigate("recipe", item)}
              >
                <View style={styles.textboxName}>
                  <Text>{item.name}</Text>
                  {}
                </View>
              </TouchableHighlight>
            );
          })}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  all: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background_image: {
    flex: 1,
  },

  title: {
    color: "#000",
    fontSize: 24,
    padding: 24,
    backgroundColor: "#f5f5dc",
    textAlign: "center",
  },

  waiting: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  textbox: {
    flex: 2,
    padding: 24,
    margin: 24,
    flexGrow: 1,
    flexDirection: "column",
    backgroundColor: "#f5f5dc",
    color: "#0000",
    borderRadius: 10,
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  textboxName: {
    padding: 10,
    margin: 10,
    width: 300,
    backgroundColor: "pink",
    borderRadius: 10,
    borderBottomColor: "#000",
  },

  textboxDescription: {
    padding: 10,
    marginLeft: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
});
