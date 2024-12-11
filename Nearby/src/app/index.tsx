import { View, Text } from 'react-native'

import { Welcome } from '@/components/Welcome'
import { Steps } from '@/components/Steps'

const Index = () => {
    return (
        <View style={{ 
            flex: 1, 
            padding: 40,
            gap: 40
        }}>
            <Welcome />
            <Steps />
        </View>
    )
}

export default Index