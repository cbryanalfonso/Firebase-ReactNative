 import React, {Component} from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
   Button,
   FlatList
 } from 'react-native';

 export default class Api extends Component{
    // para consumit una Api, lo que se tiene que hacer es sobreescribir un constructor
    // El constructor debe recibir un parametro.
    constructor(props){
        super(props);

        this.state = {
            loading: false,
            pokemon: [],
            url: 'https://pokeapi.co/api/v2/pokemon/'
        }

    }
    // EL SIGUIENTE PASO ES USAR EL COMPONENT
    componentDidMount(){ // Se ejecuta despues de que los componentes se hayan montado.
        // se ejecutará otra funcion, dentro de esta funcion
        this.getPokemon();
    }
    getPokemon = () =>{
        this.setState({loading:true})

        fetch(this.state.url)//puede recibir ushos parametros
        .then(res => res.json())// convertirila en json
        .then( res => {
            // se trabaja con promesas.
            this.setState({
                pokemon: res.results,
                url:res.next,
                loading: false
            })
        });



    };

    render(){
        if(this.state.loading){
            return(
                <View style={styles.containter}>
                   <Text>Descargado Pokemones ! </Text>
                </View>
            );
        }
        return(
            <View style={{flex: 1, paddingTop:50, paddingLeft:5, backgroundColor: 'white'}}>
               <FlatList
                data={this.state.pokemon}
                renderItem ={
                    ({item}) => <Text>{ item.name }</Text>
                }
               
               >

               </FlatList>
            </View>
        );
        
    }
 }
 
 const styles = StyleSheet.create({
   containter: {
       flex: 1,
     backgroundColor: 'white',
     justifyContent: 'center',
     alignItems: 'center',
   }
 });
 
 