import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from '~/screens/private/home'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
    </Navigator>
  )
}
