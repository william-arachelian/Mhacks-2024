import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TextInputExample from '../components/textbox';
import { ListItem} from 'react-native-elements';
import { router } from 'expo-router';
import background_image from '../assets/background_image.jpg'; // Adjust the path if necessary

const list = [
  {
    name: 'food',
  },
  {
    name: 'sandwich'
  },
  {
    name: 'ga'
  }
] 

export default function Page() {

  return (
    <ImageBackground source={background_image} resizeMode="cover" style={styles.background_image}>

        <View>
        <Text style= {styles.title}> Recipe Generation </Text>
        <TextInputExample>textInput</TextInputExample>
        {
        list.map((item, i) => {
          return <ListItem button onPress={()=> router.navigate("../recipe")} key={i} bottomDivider>
            <ListItem.Content style={styles.textBox}>
              <ListItem.Title> {item.name}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
      })
      }
      </View>
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
    background_image: {
      flex: 1,
    },
    title: {
      color:"#000",
      textAlign: "center",
      padding: 24
    },

  });
  
