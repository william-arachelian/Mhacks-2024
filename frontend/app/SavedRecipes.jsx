import { Image,TouchableHighlight, ImageBackground, StyleSheet, Text, View, } from 'react-native';
import React, { useState } from 'react';
import { ListItem} from 'react-native-elements';
import { router } from 'expo-router';
import background_image from '../assets/background_image.jpg'; // Adjust the path if necessary
import * as SplashScreen from 'expo-splash-screen';
import { ScrollView } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function Page() {

  const [list, setList] = useState(([{
    name: 'Saved one',
  },
  {
    name: 'Saved two'
  },
  {
    name: 'Saved three'
  },

]))


  return (
    <ImageBackground source={background_image} resizeMode="cover" style={styles.background_image}>
    <ScrollView>
        <View style={{flex:1}}>
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
  