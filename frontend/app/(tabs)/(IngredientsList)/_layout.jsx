import { Stack } from "expo-router";


const IngredientsListLayout = () => {
    return <Stack
        screenOptions={{
            headerTintColor:'#5DB075',
            headerStyle: {
                backgroundColor: 'white',
            },  
        }}
    >
        <Stack.Screen 
            name="IngredientsList"
            options={{headerShown: false}}
        />
        <Stack.Screen 
            name="NewRecipe"
            options={{title: ""}}
        />
    </Stack>    


}
export default IngredientsListLayout;