import { View, Text, TouchableOpacity, Image } from "react-native";
import icons from "./../assets/Constants.js";
import { useEffect } from "react";
import axios from "axios";
const IngredientListItem = ({ name, exiprationDate, quantity, unit, _id }) => {
  const handleDelete = (_id) => {
    console.log("delete");
    axios
      .delete(`http://35.3.86.167:5000/ingredients/delete/${_id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <View className="flex-row justify-between w-full h-[75] bg-secondary rounded-xl p-[10] mb-[20]">
      <View className="flex justify-between">
        <Text className="font-semibold text-xl">{name}</Text>
        {/* <Text className="italic">
          Expires: {exiprationDate.getMonth()}/{exiprationDate.getDay()}
        </Text> */}
      </View>

      <TouchableOpacity
        onPress={() => {
          handleDelete(_id);
        }}
      >
        <View className="flex-1 w-[50] h-full items-center justify-center">
          <Image
            className="w-[45%] h-[45%]"
            source={icons.Vector}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default IngredientListItem;
