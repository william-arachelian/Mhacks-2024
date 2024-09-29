
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
import { router } from "expo-router";
import background_image from "../assets/background_image.jpg"; // Adjust the path if necessary
import * as SplashScreen from "expo-splash-screen";
import axios from "axios";

SplashScreen.preventAutoHideAsync();

export default function Page() {

  const [ingredients, setIngredients] = useState([]);
  // const [recipes, setRecipes] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get("http://35.3.86.167:5000/ingredients").then((response) => {
      setIngredients([...response.data["ingredients"]]);
    });
    axios.get("http://35.3.86.167:5000/recipes/generate").then((response) => {
      setList([...response.data["recipes"]]);
    });
  }, [list]);
  const [appIsReady, setAppIsReady] = React.useState(false);
  React.useEffect(() => {
    async function prepare() {
      setAppIsReady(false)
      axios.get("http://35.3.86.167:5000/recipes/generate").then((response) => {
        setList([...response.data["recipes"]]);
        setAppIsReady(true);
      });
    }

    prepare();
  }, [list]);

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
        <Image source={require('../assets/foodloading.gif')} style={{ width: 200, height: 200 }} />
        </View>
    )
  }



  return (
    <ImageBackground source={background_image} resizeMode="cover" style={styles.background_image}>
    <ScrollView>
        <View style={{flex:1}} onLayout={onLayoutRootView}>
        <Text style= {styles.title}> Recipe List </Text>
        {

        list.map((item, i) => {
          return (
          <TouchableHighlight onPress={() => router.replace("recipe")}>
            <View style={styles.textboxName}>
            <Text>{item.name}</Text>
            </View>
          </TouchableHighlight>
          );
      })
      }
      </View>
      </ScrollView>

      </ImageBackground>

    );
  }

  return (
    <ImageBackground
      source={background_image}
      resizeMode="cover"
      style={styles.background_image}
    >
      <View onLayout={onLayoutRootView}>
        <Text style={styles.title}> Recipe List </Text>
        {list.map((item, i) => {
          return (
            <ListItem
              button
              onPress={() => router.navigate("../recipe")}
              key={i}
              bottomDivider
            >
              <ListItem.Content style={styles.textBox}>
                <ListItem.Title> {item.name}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          );
        })}
      </View>
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
    textAlign: "center",
    fontSize: 24,
    padding: 24,
    backgroundColor: "#dddddd",
  },

  const styles = StyleSheet.create({
    all:
    {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'

    }, 
    background_image: 
    {
      flex: 1,
    },

    title: {
      color:"#000",
      fontSize:24,
      padding: 24,
      backgroundColor:"#dddddd",
      textAlign: 'center'

    },

    waiting:
    {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },

    textbox:
    {
      flex: 2,
      padding:24,
      margin:24,
      flexGrow:1,
      flexDirection: 'column',
      backgroundColor:"#dddddd",
      color:"#0000",
      borderRadius: 10,
      justifyContent:'flex-start',
      alignItems:'stretch'
 
    },
    textboxName:
    {
      padding:10,
      margin:10,
      width:300,
      backgroundColor:"#fff",
      borderRadius: 10,
      borderBottomColor: '#000'
    },

    textboxDescription:
    {
      padding:10,
      marginLeft:10,
      backgroundColor:"#fff",
      borderRadius: 10,

    }

  });
  
