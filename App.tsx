import React, {useState} from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";

const App = () => {
  const [currentTodoText, setCurrentTodoText] = useState("");
  const [todos, setTodos] = useState([
    {text: "Do something", done: false},
    {text: "Do something else", done: false},
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <Text style={styles.title}>Todos</Text>

        <FlatList
          data={todos}
          contentContainerStyle={styles.list}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={styles.cell}
              key={index}
              onPress={() => {
                setTodos(
                  todos.map((todo, i) => {
                    return index === i ? {...todo, done: !todo.done} : todo;
                  }),
                );
              }}>
              <View style={styles.cellContent}>
                <View
                  style={[
                    styles.icon,
                    item.done ? styles.iconDone : styles.iconTodo,
                  ]}
                />
                <Text style={item.done ? styles.textDone : styles.text}>
                  {item.text}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <KeyboardAvoidingView behavior="position">
        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            placeholder="Start typing..."
            placeholderTextColor="#4A506A88"
            value={currentTodoText}
            onChangeText={setCurrentTodoText}
            onSubmitEditing={data => {
              const text = currentTodoText.trim();
              if (!text.length) return;
              setCurrentTodoText("");
              setTodos([...todos, {text, done: false}]);
            }}
            keyboardType="default"
            autoCapitalize="sentences"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0F0F0",
    flex: 1,
  },
  title: {
    fontSize: 32,
    color: "#252E5D",
    fontWeight: "bold",
    margin: 20,
    marginBottom: 16,
  },
  list: {
    paddingHorizontal: 20,
  },
  cell: {
    marginBottom: 16,
  },
  cellContent: {
    height: 60,
    flex: 1,
    paddingHorizontal: 16,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "white",
    alignItems: "center",
    flexDirection: "row",
  },
  icon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 16,
    borderColor: "#4076D7",
  },
  iconDone: {
    backgroundColor: "#D2DDF9",
    borderWidth: 0,
  },
  iconTodo: {
    borderWidth: 2,
  },
  text: {
    fontSize: 17,
    color: "#4A506A",
  },
  textDone: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    color: "#4A506A",
  },
  inputArea: {
    height: 60,
    alignSelf: "flex-end",
    width: "100%",
    backgroundColor: "#ffffff",
    justifyContent: "center",
    padding: 16,
  },
  input: {
    borderColor: "#4A506A",
    borderBottomWidth: 1,
    fontSize: 17,
    color: "#4A506A",
    paddingBottom: 4,
  },
});

export default App;
