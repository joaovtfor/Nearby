import { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
;
import { Categories, CategoriesProps } from '@/components/Categories';
;
import { api } from '@/services/api';
import { colors, fontFamily } from '@/styles/theme';

import { PlaceProps } from '@/components/place';
import { Places } from '@/components/Places';
;
import MapView, { Callout, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { router } from 'expo-router';

type MarketProps = PlaceProps & {
    latitude: number;
    longitude: number;
}


const Home = () => {
    const currentLocation = {
        latitude: -23.561187293883442,
        longitude: -46.656451388116494
    }

    const [categories, setCategories] = useState<CategoriesProps>([]);
    const [category, setCategory] = useState("");

    const [markets, setMarkets] = useState<MarketProps[]>([]);

    useEffect(() => {
        fetchCategories();
        // getCurrentLocation();
    }, []);

    useEffect(() => {
        fetchMarkets();
    }, [category]);

    async function fetchCategories() {
        try {
            const { data } = await api.get('/categories');
            setCategories(data);
            setCategory(data[0].id);
        } catch (error) {
            console.error(error);
            Alert.alert("Categorias", "Erro ao buscar categorias");
        }
    }

    async function fetchMarkets() {
        if (!category) return;

        try {
            const { data } = await api.get('/markets/category/' + category);
            setMarkets(data);
        } catch (error) {
            console.error(error);
            Alert.alert("Locais", "Erro ao buscar locais");
        }
    }

    async function getCurrentLocation() {
        try {
            let { granted } = await Location.requestForegroundPermissionsAsync();

            if (granted) {
                const location = await Location.getCurrentPositionAsync();
                console.log(location);
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Localização", "Erro ao buscar localização");
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#CECECE" }}>
            <Categories data={categories} onSelect={setCategory} selected={category} />

            <MapView style={{ flex: 1 }}
                initialRegion={{ latitude: currentLocation.latitude, longitude: currentLocation.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 }}
            >
                <Marker identifier='current' coordinate={{ latitude: currentLocation.latitude, longitude: currentLocation.longitude }} image={require("@/assets/location.png")} />

                {markets.map((item, index) => (
                    <Marker key={index} identifier={item.id} coordinate={{ latitude: item.latitude, longitude: item.longitude }} image={require("@/assets/pin.png")}>
                        <Callout onPress={() => router.navigate(`/market/${item.id}`)}>
                            <View>
                                <Text style={{fontSize: 14, color: colors.gray[600], fontFamily: fontFamily.medium}}>{item.name}</Text>
                                <Text style={{fontSize: 12, color: colors.gray[600], fontFamily: fontFamily.regular}}>{item.address}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>

            <Places data={markets} />
        </View>
    )
}

export default Home
