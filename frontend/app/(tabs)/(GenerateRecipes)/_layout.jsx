import { Stack } from "expo-router"


const GenerateRecipeLayout = () => {
    return <Stack
        screenOptions={{
            headerTintColor:'#5DB075',
            headerStyle: {
                backgroundColor: 'white',
            },  
        }}
    >
        <Stack.Screen 
            name="GenerateRecipes"
            options={{headerShown: false}}
        />

        <Stack.Screen 
            name="SingleRecipe"
            options={{title: ""}}

        />

        
    </Stack>
}

export default GenerateRecipeLayout;