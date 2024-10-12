import { useState } from "react"
import { View,Text,SafeAreaView,TextInput,ScrollView, TouchableOpacity, Touchable } from "react-native"
import { useRouter } from "expo-router";
import axios from "axios";
import { Provider as PaperProvider, Menu,Divider, Button } from 'react-native-paper';

const MenuText = ({title}) => {
    return <Text className="text-center">{title}</Text>
}

const NewIngredient = () => {
    
    const [unit, setUnit] = useState("");
    const [visible, setVisible] = useState(false);
    const units = ["fl oz", "pt", "qt", "gal", "lbs", "kgs"]

    const router = useRouter();
    const [ingredientObj, setIngredientObj] = useState({});

    const handleSubmit = () => {
        axios.post("http://127.0.0.1:5000/ingredients/add", ingredientObj)
        .then((response) => {
            console.log(response)
            router.dismiss()
        })
        .catch((e) => {
            console.log(e);
        })
    }
    return <PaperProvider>
    <SafeAreaView className="flex-1">

        <View className="w-full h-[200] mb-[20]">
            <View className="flex-1 justify-center items-center">
                <Text className="font-serif text-3xl ">New Ingredient</Text>
            </View>

            <View className="h-[65] px-10">
                <TextInput 
                    className="bg-secondary rounded-lg h-full text-center"
                    placeholder="Ingredient Name"  
                    onChangeText={(name)=>{setIngredientObj({...ingredientObj, "name": name})}}  
                />
            </View>
        </View>

        <View className="flex-row justify-between px-10 mb-[20]">

            <View className="h-[65] w-[45%]">
                <TextInput
                    className="bg-secondary w-full h-full text-center rounded-lg"
                    placeholder="Quantity"
                    onChangeText={(quantity)=>{setIngredientObj({...ingredientObj, "quantity": quantity})}}
                /> 
            </View>
         
            <Menu
                className="mt-[-30] w-[150] rounded-xl  "
                visible={visible}
                onDismiss={()=>{setVisible(false)}}
                mode="elevated"
                anchor={
                    <View className="h-[65] w-[150]">
                    <TextInput  
                            className="bg-secondary w-full h-full text-center rounded-lg"
                            placeholder="Unit" 
                            onTouchStart={()=>{setVisible(true)}}
                            editable={true}
                            onChangeText={(unit)=>{setIngredientObj({...ingredientObj, "unit": unit})}}
                            value={ingredientObj["unit"]}
                        />
                    </View>
                }
            >
            
            {units.map((unit)=> {
                return <>
                    <Menu.Item onPress={() => {setIngredientObj({...ingredientObj, "unit": unit})}} title={<MenuText title={unit}/>} />
                    <Divider/>
                </>
            })}

            </Menu>
        </View>

        <View className="h-[65] px-10 mb-[20]">
            <TextInput 
                className="bg-secondary rounded-lg h-full text-center"
                placeholder="Expiration Date"  
                onChangeText={(text)=>{setIngredientObj({...ingredientObj, "name": text})}}  
            />
        </View>

        <TouchableOpacity 
          className="relative px-[40] mt-[185]"
            onPress={handleSubmit}
        >
          <View className="bg-primary rounded-xl items-center justify-center w-full h-[50] mb-[50]">
            <Text>Add Ingredient</Text>
          </View>
          
        </TouchableOpacity>
    </SafeAreaView>
    </PaperProvider>
}
export default NewIngredient