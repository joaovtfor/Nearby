import { View } from 'react-native'
import { router } from 'expo-router'

import { Welcome } from '@/components/Welcome'
import { Steps } from '@/components/Steps'
import { Button } from '@/components/Button'

const Index = () => {
    return (
        <View style={{
            flex: 1,
            padding: 40,
            gap: 40
        }}>
            <Welcome />
            <Steps />
            <Button isLoading={false} onPress={() => router.navigate('/home')}>
                <Button.Title>Começar</Button.Title>
            </Button>
        </View>
    )
}

export default Index