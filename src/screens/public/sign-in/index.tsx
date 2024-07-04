import { IOS_CLIENT_ID, WEB_CLIENT_ID } from '@env'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { useApp } from '@realm/react'
import { useCallback, useState } from 'react'
import { Alert } from 'react-native'
import { Credentials } from 'realm'

import backgroundImg from '~/assets/background.png'
import { Button } from '~/components/button'

import { Container, Slogan, Title } from './styles'

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: WEB_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID,
})

export function SignIn() {
  const app = useApp()
  const [isAutenticating, setIsAuthenticanting] = useState(false)

  const handleGoogleSignIn = useCallback(async () => {
    try {
      setIsAuthenticanting(true)

      const { idToken } = await GoogleSignin.signIn()

      if (idToken) {
        const credentials = Credentials.jwt(idToken)

        await app.logIn(credentials)
      } else {
        Alert.alert(
          'Entrar',
          'Não foi possível conectar-se a sua conta google.',
        )
        setIsAuthenticanting(false)
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Entrar', 'Não foi possível conectar-se a sua conta google.')
      setIsAuthenticanting(false)
    }
  }, [app])

  return (
    <Container source={backgroundImg}>
      <Title>Ignite Fleet</Title>

      <Slogan>Gestão de uso de veículos</Slogan>

      <Button
        title="Entrar com Google"
        onPress={handleGoogleSignIn}
        isLoading={isAutenticating}
      />
    </Container>
  )
}
