import { useApp, useUser } from '@realm/react'
import { Power } from 'phosphor-react-native'
import { useCallback } from 'react'
import { TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import theme from '~/theme'

import { Container, Greeting, Message, Name, Picture } from './styles'

export function HomeHeader() {
  const app = useApp()
  const user = useUser()
  const insets = useSafeAreaInsets()

  const handleLogout = useCallback(() => {
    app.currentUser?.logOut()
  }, [app.currentUser])

  const paddingTop = insets.top + 32

  return (
    <Container style={{ paddingTop }}>
      <Picture
        source={{ uri: user?.profile.pictureUrl }}
        placeholder="L184i9ofbHof00ayjsay~qj[ayj@"
      />
      <Greeting>
        <Message>Olá</Message>
        <Name>{user?.profile.name}</Name>
      </Greeting>

      <TouchableOpacity activeOpacity={0.7} onPress={handleLogout}>
        <Power size={32} color={theme.COLORS.GRAY_400} />
      </TouchableOpacity>
    </Container>
  )
}
