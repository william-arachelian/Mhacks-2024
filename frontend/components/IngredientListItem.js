import { View, Text, TouchableOpacity, Image } from "react-native";
import icons from "./../assets/Constants.js";
import axios from "axios";

const IngredientListItem = ({
  setIngredientsList,
  setSearchQuery,
  name,
  exiprationDate,
  quantity,
  unit,
  _id,
}) => {
  const handleDelete = (_id) => {
    console.log(`delete ${_id}`);
    axios
      .delete(`http://127.0.0.1:5000/ingredients/delete/${_id}`)
      .then((response) => {
        axios.get("http://127.0.0.1:5000/ingredients").then((response) => {
          setIngredientsList([...response.data["ingredients"]]);
        });
        setSearchQuery("");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <View className="flex-row justify-between w-full h-[75] bg-secondary rounded-xl p-[10] mb-[20]">
      <View className="flex justify-between">
        <Text className="font-semibold text-xl">{name}</Text>
        <Text className="italic">
          Expires: {exiprationDate[0]}/{exiprationDate[1]}
        </Text>
      </View>

      <View className="flex-row justify-center items-center">
        <View>
          <Text className="text-lg">
            {quantity} {unit}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            handleDelete(_id);
          }}
        >
          <View className="w-[50] h-full items-center justify-center">
            <Image
              className="w-[45%] h-[45%]"
              source={icons.Trash}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IngredientListItem;
