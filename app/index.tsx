import React, { useState } from "react";
import { Text, View, StyleSheet, Pressable, Button } from "react-native";
import { FlatList, ScrollView, TextInput } from "react-native-gesture-handler";

type Ingredient = {
  name: string,
};

type ListProps = {
  item: Ingredient;
};

const IngredientList = ({item}: ListProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.listText}>{item.name}</Text>
      <Pressable>
        <Text style={styles.listText}>X</Text>
      </Pressable>
    </View>
  );
}

export default function Index() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [text, setText] = useState('');

  const renderItem = ({item}: {item: Ingredient}) => {
    return (
      <IngredientList item={item}></IngredientList>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} onChangeText={setText} value={text}></TextInput>
        <Button 
          title="Add"
          onPress={() => {
            if(text == '' || text.length == 0) return;

            let tmp: Ingredient = {name: text};
            setIngredients(prevState => [tmp, ...prevState]);
            setText('');
          }}
        />
      </View>
      <Text style={styles.header}>Fridge:</Text>
      <ScrollView>
        <FlatList data={ingredients} renderItem={renderItem} />
      </ScrollView>
      <Button 
        title="Search"
        onPress={() => {
          fetch(`http://localhost:8083/recipe/find/${ingredients[0].name}`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
          .then(res => res.json())
          .then(res => console.log(res))
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
  },
  header: {
    fontWeight: 'bold',
    marginTop: 12,
    fontSize: 16,
  },
  card: {
    backgroundColor: 'red',
    marginVertical: 5,
    padding: 10,
    paddingStart: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  listText: {
    color: 'white',
  },
  button: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  input: {
    flex: 1,
    borderColor: 'solid black',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 5,
  },
})
