import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { Card, CardItem } from "native-base";

const App = () => {
  const [loadingState, toggleLoadinState] = useState(true);
  const [dataState, updateDataState] = useState({
    data: [],
  });

  const getUserFromApi = () => {
    return fetch("https://randomuser.me/api/?results=50")
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        toggleLoadinState(false);
        updateDataState(
          Object.assign({}, dataState, {
            data: responseJson.results,
          })
        );
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUserFromApi();
  }, []);

  const _keyExtractor = (item, index) => item.email;

  if (loadingState) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#01cbc6" />
      </View>
    );
  } else {
    return (
      <SafeAreaView>
        <FlatList
          data={dataState.data}
          keyExtractor={_keyExtractor}
          renderItem={({ item }) => (
            <Card>
              <CardItem>
                <View style={styles.container}>
                  <Image
                    style={styles.profilePic}
                    source={{ uri: item.picture.medium }}
                  />
                </View>
                <View style={styles.userInfo}>
                  <Text>
                    Name: {item.name.title} {item.name.first} {item.name.last}
                  </Text>
                  <Text>Email: {item.email}</Text>
                  <Text>City: {item.location.city}</Text>
                  <Text>Phone: {item.phone}</Text>
                </View>
              </CardItem>
            </Card>
          )}
        />
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  profilePic: {
    flex: 2,
    height: 100,
    width: 100,
    marginEnd: 10,
    borderRadius: 100,
  },
  userInfo: {
    flex: 2,
    flexDirection: "column",
  },
});

export default App;
