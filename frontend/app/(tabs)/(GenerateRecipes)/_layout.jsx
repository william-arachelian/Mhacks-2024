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

        {/* for dynamic route to individual recipe when pressed
        <Stack.Screen 
            name="[individual recipe name]"
            options={{headerShown: false}}
        /> */}

        
    </Stack>
}

export default GenerateRecipeLayout;