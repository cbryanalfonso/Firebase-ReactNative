import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = () =>{

    const [data, setData] = useState()

    async function loadData(){
        try {
            const productos = await firestore().collection('Inventario').get()
            console.log(productos.docs)
            setData(productos.docs)
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(()=>{
        loadData()
    }, [])

    function renderItem({item}){
        return(
            <View style={{flexDirection: 'row', margin: 30,}}>
                <Text>  {item.data().nombre}</Text>
                <Text>  {item.data().color}</Text>
                <Text>   ${item.data().precio}</Text>
            </View>
        );
    }
    return(
        <View style={styles.container}>
            <Text>Mis productos</Text>
            <FlatList
                data = {data}
                renderItem = { renderItem }
                keyExtractor = { item => item.id}
            >  
            </FlatList>
        </View>

    );
}

const styles = StyleSheet.create({
  container:{
      padding: 30,
      backgroundColor: 'white',
  }
});

export default HomeScreen;