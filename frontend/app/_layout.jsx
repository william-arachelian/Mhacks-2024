import { Stack } from "expo-router";


export default function RootLayout()
{
    return <Stack
      screenOptions={{
        headerTintColor:'#5DB075',
        headerStyle: {
            backgroundColor: 'white',
        },  
  }}>
      <Stack.Screen 
        name="index"
      />
      <Stack.Screen 
        name="(tabs)"
        options={{headerShown: false}}
      />
    </Stack>

}
