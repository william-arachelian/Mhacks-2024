import { Tabs } from "expo-router";


export default function RootLayout()
{
    return  <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
    <Tabs.Screen
      name="index"
      options={{
        title: 'Home',
        headerShown: false
        // tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
      }}
    />
    <Tabs.Screen
      name="RecipeGenerator"
      options={{
        title: 'Generate',
        headerShown: false

        // tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
      }}
    />
     <Tabs.Screen
      name="SavedRecipes"
      options={{
        title: 'Saved',
        headerShown: false

        // tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
      }}
    />
  </Tabs>
}
