import { Stack } from "expo-router"
import { colors } from "@/styles/colors"

const Layout = () => {
    return (
        <Stack screenOptions={{headerShown: false, 
            contentStyle: {
                backgroundColor: colors.gray[100],
            }}} />
    )
}

export default Layout