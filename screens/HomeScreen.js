import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
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
  await Database.deleteAllHikes();
  setHikes([]);
  Alert.alert("All Hikes deleted successfully.");
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
      />
      <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("Add Hike")}
      >
          <Text style={styles.addButtonText}>New Hike</Text>
      </TouchableOpacity>
      <TouchableOpacity
          style={styles.deleteAll}
          onPress={() => handleCleanHikes()}
      >
          <Text style={styles.deleteAllButtonText}>Clear All Hike</Text>
      </TouchableOpacity>
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  hikeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: "white",
  },
  addButton: {
    backgroundColor: "green",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
  },
  deleteAll: {
    backgroundColor: "red",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  deleteAllButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default HomeScreen;