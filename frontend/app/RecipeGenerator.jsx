import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TextInputExample from '../components/textbox';
import { ListItem} from 'react-native-elements';
import { router } from 'expo-router';

import { color } from '@rneui/base';

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

    );
  }


  const styles = StyleSheet.create({
    all:
    {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'

    },
    title: {
      color:"#000",
      textAlign: "center",
      padding: 24
    },

  });
  