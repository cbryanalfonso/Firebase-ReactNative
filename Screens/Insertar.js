import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button, ScrollView, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';


const Insertar = () => {

    const [data, setData] = useState()
    const [rtData, setRTData] = useState([])

    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState('')
    const [color, setColor] = useState('')

    async function loadData() {
        try {
            const productos = await firestore().collection('Inventario').get()
            // console.log(productos.docs)
            setData(productos.docs)
        } catch (e) {
            console.log(e);
        }
    }

    async function loadRTData() {
        const suscriber = firestore().collection('Inventario').onSnapshot(querySnapshot => {

            const productos = []

            querySnapshot.forEach(documentSnapshot => {
                productos.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id
                })
            })
            setRTData(productos)

        })
        return () => suscriber()
    }

    useEffect(() => {
        loadData()
        loadRTData()
    }, [])

    function renderItem({ item }) {
        return (
            <View style={{ flexDirection: 'row', margin: 30, }}>
                <Text>  {item.data().nombre}</Text>
                <Text>  {item.data().color}</Text>
                <Text>   ${item.data().precio}</Text>
            </View>
        );
    }

    function renderRTItem({ item }) {
        return (
            <TouchableOpacity style={{ 
                backgroundColor: '#f0f0f0',
                borderRadius: 5,
                padding:10,
                flexDirection: 'row', 
                margin: 10, 
                }}
                onPress={() => eliminarProducto(item)}
                >
                <Text>  {item.nombre}</Text>
                <Text>  {item.color}</Text>
                <Text>   ${item.precio}</Text>
            </TouchableOpacity>
        );
    }

    function eliminarProducto(item){
        Alert.alert(
            'Eliminar ${item.nombre}',
            "Estas seguro de eliminar?",
            [{
                text: "Cancel"
            },{
                text: "Eliminar",
                onPress:()=>{
                    firestore().collection('Inventario').doc(item.key).delete().then(()=>{
                        Alert.alert(
                            "Dato eliminado con exito",
                            "Tu producto se ha eliminado con exito. "
                        )
                    })
                }
            }]
        )
    }

    function subirProducto() {

        try {
            firestore().collection('Inventario').add({
                nombre: nombre,
                color: color,
                precio: precio,
            })
        } catch (error) {
            console.log(error)
        } finally {
            setNombre('')
            setPrecio('')
            setColor('')
        }

    }
    return (
        <View style={styles.container}>
            <View style={{alignItems: 'center',}}>
                <Text
                    style={styles.titulo}
                >React native conectado con firebase.</Text>
            </View>

            <View>
                <TextInput
                    placeholder="Nombre"
                    placeholderTextColor="#000"
                    value={nombre}
                    onChangeText={text => setNombre(text)}
                    style={styles.input}
                    autoCapitalize={'none'}
                />
                <TextInput
                    placeholder="Precio"
                    placeholderTextColor="#000"
                    value={precio}
                    onChangeText={text => setPrecio(text)}
                    style={styles.input}
                    autoCapitalize={'none'}
                />
                <TextInput
                    placeholder="Color"
                    placeholderTextColor="#000"
                    value={color}
                    onChangeText={text => setColor(text)}
                    style={styles.input}
                    autoCapitalize={'none'}
                />
                <Button
                    title="Subir producto"
                    onPress={() => subirProducto()}
                />
            </View>
            
                

                <Text style={styles.titulo}> Mis productos en tiempo real</Text>
                <FlatList
                    data={rtData}
                    renderItem={renderRTItem}
                    keyExtractor={item => item.key}
                >
                </FlatList>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        backgroundColor: 'white',
    },
    input: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginBottom: 15,
        padding: 10,
        color: 'black'
    },
    titulo:{
        marginBottom: 40,
        fontSize: 20,
        color: 'red',
        marginTop: 30,
        
    }
});

export default Insertar;


/*
<Text>Mis productos</Text>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                >
                </FlatList>

*/