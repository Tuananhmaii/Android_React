import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Button
} from "react-native";
import Database from "../Database/Database"

const HomeScreen = ({ navigation }) => {
  const [Hikes, setHikes] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await Database.getHikes();
            setHikes(data);
        } catch (error) {
            console.log("Error fetching Hikes", error);
        }
    };

    fetchData();
}, [isFocused]);

const handleDeleteHike = async (id) => {
  await Database.deleteHike(id);
  const data = await Database.getHikes();
  setHikes(data);
};

const handleCleanHikes = async () => {
  Alert.alert(
    "Delete all hike",
    "Do you want to delete all hikes ?",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Canceled"), // You can navigate back to the screen here
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          Database.deleteAllHikes();
          setHikes([]);
        },
      },
    ],
    { cancelable: false }
  );
};

const renderHikeItem = ({ item }) => (
  <TouchableOpacity
    style={styles.hikeItem}
    onPress={() => navigation.navigate("Edit Hike", { hike: item })}
  >
    <View style={styles.infoContainer}>
      <Text style={styles.infoHeader}>{item.name}</Text>
      <Text style={styles.infoBody}>{item.date}</Text>
      <Text style={styles.infoBody}>{item.location}</Text>
      <Text style={styles.infoBody}>{item.length}m</Text>
    </View>
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => handleDeleteHike(item.id)}
    >
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
  </TouchableOpacity>
);

return (
  <View style={styles.container}>
    <FlatList
      data={Hikes}
      renderItem={renderHikeItem}
      keyExtractor={(item) => item.id.toString()}
      scrollEnabled={true}
      style={styles.flatList}
      ListHeaderComponent={<View style={styles.header} />}
      ListFooterComponent={<View style={styles.footer} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("Add Hike")}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteAll} onPress={handleCleanHikes}>
        <Icon name="trash" style={styles.deleteAllIcon} />
      </TouchableOpacity>
    </View>
  </View>
);
};

const styles = StyleSheet.create({
  hikeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  infoContainer: {
    flex: 1,
  },
  infoHeader: {
    fontSize: 18,
    fontWeight: "bold",
  },
  infoBody: {
    fontSize: 14,
    color: "#888",
  },
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 16,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 8,
    justifyContent: "center",
  },
  deleteButtonText: {
    color: "#fff",
  },
  addButton: {
    backgroundColor: 'blue',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
  },
  deleteAll: {
    backgroundColor: 'red',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 16,
    left: 16, // Adjust the left value to position it at the bottom left
  },
  deleteAllIcon: {
    color: 'white',
    fontSize: 24,
  },
});

export default HomeScreen;