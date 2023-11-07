import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  ScrollView,
  Pressable, // Import ScrollView
} from "react-native";

import {Picker} from '@react-native-picker/picker';
import Database from "../Database/Database";
import DateTimePicker from '@react-native-community/datetimepicker';

const EditScreen = ({ navigation, route }) => {
  const { hike } = route.params;

  const [name, setName] = useState(hike.name);
  const [location, setLocation] = useState(hike.location);

  const [date, setDate] = useState(new Date(hike.date));
  const [showPicker, setShowPicker] = useState(false);

  const [availablePark, setAvailablePark] = useState(hike.availablePark);
  const [length, setLength] = useState(hike.length);
  const [difficulty, setDifficulty] = useState(hike.difficulty);
  const [description, setDescription] = useState(hike.description);
  const [weather, setWeather] = useState(hike.weather);
  const [teamSize, setTeamSize] = useState(hike.teamSize);

  const handleUpdateHike = async () => {
    if (!name || !location || !date || !availablePark || !length || !difficulty || !weather || !teamSize) {
      Alert.alert("Error", "Please enter all information");
      return;
    }

    const hikeInfo = `
    Name: ${name}
    Date: ${date.toDateString()}
    Location: ${location}
    Available park: ${availablePark}
    Length: ${length}
    Difficulty: ${difficulty}
    Weather: ${weather}
    Team Size: ${teamSize}
    Description: ${description}
  `;
    Alert.alert(
      "Update Hike",
      hikeInfo,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Canceled"), // You can navigate back to the screen here
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            Database.updateHike(hike.id, name, date.toDateString(), location, availablePark, length, weather, teamSize, difficulty, description);
            navigation.goBack();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const onChange = (event, selectedDate) => {
    if (selectedDate) {
      setShowPicker(false);
      setDate(selectedDate);
    }
  };

  const handleLengthChange = (text) => {
    const numericInput = text.replace(/[^0-9]/g, '');
    setLength(numericInput);
  };

  const handleTeamSizeChange = (text) => {
    const numericInput = text.replace(/[^0-9]/g, '');
    setTeamSize(numericInput);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter Name"
      />
      <Text style={styles.label}>Date:</Text>
      <Pressable onPress={() => setShowPicker(true)}>
        <View pointerEvents="none">

        <TextInput
          style={styles.input}
          placeholder="Enter Location"
          value={date.toDateString()}
        />
        </View>
      </Pressable>
      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date" 
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <Text style={styles.label}>Location:</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Enter Location"
      />
      <Text style={styles.label}>Available park:</Text>
      <Picker
        style={styles.input}
        selectedValue={availablePark}
        onValueChange={(itemValue) => setAvailablePark(itemValue)}
      >
        <Picker.Item label="Yes" value="Yes" />
        <Picker.Item label="No" value="No" />
      </Picker>
      <Text style={styles.label}>Length:</Text>
      <TextInput
        style={styles.input}
        value={length.toString()}
        onChangeText={handleLengthChange}
        placeholder="Enter length"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Weather:</Text>
      <TextInput
        style={styles.input}
        value={weather}
        onChangeText={setWeather}
        placeholder="Enter Weather"
        multiline
      />
      <Text style={styles.label}>Team Size:</Text>
      <TextInput
        style={styles.input}
        value={teamSize.toString()}
        onChangeText={handleTeamSizeChange}
        placeholder="Enter team size"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Difficulty:</Text>
      <Picker
        style={styles.input}
        selectedValue={difficulty}
        onValueChange={(itemValue) => setDifficulty(itemValue)}
      >
        <Picker.Item label="Easy" value="Easy" />
        <Picker.Item label="Medium" value="Medium" />
        <Picker.Item label="Hard" value="Hard" />
      </Picker>
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter Description"
      />
      <TouchableOpacity style={styles.addButton} onPress={handleUpdateHike}>
        <Text style={styles.addButtonText}>Update Hike</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 16,
    padding: 8,
  },
  addButton: {
    backgroundColor: "green",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default EditScreen;
