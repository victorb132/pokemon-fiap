import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  FlatList
} from 'react-native';

export default function App() {
  const [pokemonsIniciais, setPokemonsIniciais] = useState([]);
  const [pokemonEscolhido, setPokemonEscolhido] = useState(null);

  const getInitialPokemons = () => {
    const endpoint = `https://pokeapi.co/api/v2/pokemon`

    fetch(endpoint)
      .then(response => response.json())
      .then(response => {
        const data = response.results;
        setPokemonsIniciais(data);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert('Erro', 'Não foi possível carregar os pokemons');
      })
  }

  const getPokemonData = (url) => {
    fetch(url)
      .then(response => response.json())
      .then(response => {
        const pokemon = {
          nome: response.name,
          img: response.sprites.other['official-artwork'].front_default,
          peso: response.weight,
        };

        setPokemonEscolhido(pokemon);
      })
      .catch(() => {
        Alert.alert('Erro', 'Erro ao encontrar o pokemon');
      })
  }

  useEffect(() => {
    getInitialPokemons();
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ESCOLHA SEU POKEMON</Text>
      </View>

      {pokemonEscolhido && (
        <View style={styles.pokemonContainer}>
          <Text style={styles.pokemonName}>Nome: {pokemonEscolhido.nome}</Text>
          <Text style={styles.pokemonWeight}>Peso: {pokemonEscolhido.peso}</Text>
          <Image resizeMode='stretch' style={styles.pokemonImage} source={{ uri: pokemonEscolhido.img }} />
        </View>
      )}

      <FlatList
        data={pokemonsIniciais}
        renderItem={({ item }) => {
          return (
            <View style={styles.cardContainer}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <TouchableOpacity onPress={() => getPokemonData(item.url)} style={styles.cardButton}>
                <Text style={styles.cardButtonText}>Dados do pokemon</Text>
              </TouchableOpacity>
            </View>
          )
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 80,
    paddingTop: 40,
    marginBottom: 20,
    backgroundColor: '#e73e33'
  },
  headerTitle: {
    fontSize: 22,
    marginBottom: 10,
    color: '#fff',
    textAlign: 'center'
  },
  pokemonContainer: {
    alignItems: 'center'
  },
  pokemonName: {
    fontSize: 22
  },
  pokemonWeight: {
    fontSize: 18
  },
  pokemonImage: {
    width: 150,
    height: 150,
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: '#d5d5d5',
    borderRadius: 4,
    marginBottom: 10,
    marginHorizontal: 20,
    padding: 10,
    alignItems: 'center'
  },
  cardTitle: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center'
  },
  cardButton: {
    backgroundColor: '#e73e33',
    padding: 10,
    borderRadius: 10,
    width: 200,
  },
  cardButtonText: {
    fontSize: 15,
    color: '#ffff',
    textAlign: 'center'
  }
});
