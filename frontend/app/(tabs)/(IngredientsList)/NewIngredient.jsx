import { useState } from "react"
import { View,Text,SafeAreaView,TextInput, TouchableOpacity, ScrollView } from "react-native"
import { useRouter } from "expo-router";
import axios from "axios";
import { Provider as PaperProvider, Menu,Divider } from 'react-native-paper';
import DateTimePicker from "react-native-ui-datepicker"

const MenuText = ({title}) => {
    return <Text className="text-center">{title}</Text>
}

const NewIngredient = () => {
    
    const router = useRouter();
    const [ingredientObj, setIngredientObj] = useState({});

    const [menuVisible, setMenuVisible] = useState(false);
    const units = ["","fl oz", "pt", "qt", "gal", "lbs", "kgs"]

    const [calendarVisible, setCalendarVisible] = useState(false);

    const handleSubmit = () => {         

        console.log(ingredientObj)
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
    <ScrollView>
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
                    onChangeText={(quantity)=>{setIngredientObj({...ingredientObj, "quantity": parseFloat(quantity)})}}
                    inputMode="decimal"
                /> 
            </View>
            
            <Menu
                className="mt-[-30] w-[150] rounded-xl  "
                visible={menuVisible}
                onDismiss={()=>{setMenuVisible(false)}}
                mode="elevated"
                anchor={
                    <View className="h-[65] w-[150]">
                        
                        <TextInput  
                            className="bg-secondary w-full h-full text-center rounded-lg"
                            placeholder="Unit" 
                            onTouchStart={()=>{setMenuVisible(true)}}
                            editable={false}
                            //onChangeText={(unit)=>{setIngredientObj({...ingredientObj, "unit": unit})}}
                            value={ingredientObj["unit"]}

                        />
                    </View>
                }
            >
            
            {units.map((unit, i)=> {
                return <View key={i}>
                    <Menu.Item onPress={() => {setIngredientObj({...ingredientObj, "unit": unit}); setMenuVisible(false)}} title={<MenuText title={unit}/>} />
                    <Divider/>
                    </View>
            })}

            </Menu>
        </View>

        <View className="px-10 mb-[20]">
            {calendarVisible ? 
            <DateTimePicker
                mode="single"
                date={ingredientObj['expirationDate']}
                onChange={(params) => { setIngredientObj({...ingredientObj, "expirationDate": new Date(params.date)}); setCalendarVisible(false); }}
                height={250}
                selectedItemColor= "#5DB075"
            /> : 
            <View className=" h-[65]">
                <TouchableOpacity 
                    className="bg-secondary rounded-lg h-full flex-1 justify-center"
                    onPress={() => setCalendarVisible(true)}
                >
                <Text className="text-center text-gray-400">{ingredientObj["expirationDate"] == null ? "Expiration Date" : ingredientObj["expirationDate"].toDateString()}</Text>
                </TouchableOpacity>
            
            </View>
            }
        </View>

        <TouchableOpacity 
          className={`relative px-[40] ${!calendarVisible ? "mt-[185]" : ""}`}
            onPress={handleSubmit}
        >
          <View className="bg-primary rounded-xl items-center justify-center w-full h-[50] mb-[50]">
            <Text>Add Ingredient</Text>
          </View>
          
        </TouchableOpacity>

    </ScrollView>
    </SafeAreaView>
    </PaperProvider>
}
export default NewIngredient