import { View, Text, StyleSheet, ScrollView, Image, Dimensions, } from 'react-native'
import React from 'react'
import mocks from './mocks.json';


const Item = ({ item }) => {
    //   console.log(item.name);
    return (
        <View style={styles.itemContainer}>
            <View style={styles.imageBg}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemInner}>
                    <View>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemTime}>{item.time}</Text>
                    </View>
                    <View style={{ borderRadius: 30, borderColor: '#FB7200', overflow: 'hidden' }}>
                        <Text style={styles.itemSaleOff}>{item.saleoff}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};


export default function ListCard() {
    return (
        <View>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.textHeader}>Explore</Text>
                    <Text style={[styles.textHeader, { color: '#FFC107' }]}>
                        VIEW ALL (12)
                    </Text>
                </View>
                <ScrollView horizontal>
                    {mocks.map(item => {
                        return <Item key={item.id} item={item} />;
                    })}
                </ScrollView>
            </View>
        </View>
    )
}
const W = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        marginBottom: 50,
        paddingHorizontal: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        paddingBottom: 20,
    },
    textHeader: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#222',
    },
    itemImage: {
        width: (W - 60) / 2,
        height: (W - 40) / 2 + 30,
        backgroundColor: 'gray',
    },
    itemContainer: {
        marginRight: 20,
    },
    itemPrice: {
        fontWeight: 'bold',
        fontSize: 18,
        padding: 10,
    },
    itemPriceOriginal: {
        color: 'gray',
        fontWeight: '500',
        fontSize: 15,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    itemInner: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'space-between',
        padding: 12,
        alignItems: 'flex-end',
    },
    imageBg: {
        flex: 1,
        borderRadius: 10,
        overflow: 'hidden',
    },
    itemTime: {
        color: '#eee',
        fontWeight: '600',
        fontSize: 14,
    },
    itemSaleOff: {
        fontWeight: 'bold',
        backgroundColor: '#FB7200',
        alignItems: 'center',
        alignSelf: 'center',
        padding: 5,
        paddingHorizontal: 10,
    },
});