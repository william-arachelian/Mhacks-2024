import { Tabs } from "expo-router";
import { View, Image, Text } from "react-native";
import icons from "./../../assets/Constants.js"
const TabIcon = ({icon, color, focused}) => {
    return <View
        className= 'flex-1 items-center justify-center'
    >
        <Image 
            source={icon}
            resizeMode="cover"
            tintColor={color}
            className="w-[22] h-[22]"

        />
       
    </View> 
}

export default function TabsLayout()
{
    return  <Tabs screenOptions={{ tabBarActiveTintColor: '#5DB075', tabBarInactiveTintColor: '#3A405A' }}>
    <Tabs.Screen
      name="(IngredientsList)"
      
      options={{
        title: 'Home',
        headerShown: false,
        tabBarIcon:({color, focused})=><TabIcon icon={icons.Home} color={color} focused={focused} />
      }}
      
    />
    <Tabs.Screen
      name="(GenerateRecipes)"
      options={{
        title: 'Generate',
        headerShown: false,
        tabBarIcon:({color, focused})=><TabIcon icon={icons.GenerateRecipes} color={color} focused={focused} />


      }}
    />
     <Tabs.Screen
      name="SavedRecipes"
      options={{
        title: 'Saved',
        headerShown: false,
        tabBarIcon:({color, focused})=><TabIcon icon={icons.RecipesList} color={color} focused={focused} />


      }}
    />
  </Tabs>
}
