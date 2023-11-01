import * as SQLite from "expo-sqlite";

const database_name = "HikeApp.db";
const database_version = "1.0";
const database_displayname = "Hike App Database";
const database_size = 200000;

const db = SQLite.openDatabase(
  database_name,
  database_version,
  database_displayname,
  database_size
);

const initDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS hikes (
        id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, date TEXT, location TEXT, availablePark TEXT, length INTEGER, difficulty TEXT, teamSize INTEGER, weather TEXT, description TEXT
      );`,
      [],
      () => console.log("Database and table created successfully."),
      (error) => console.log("Error occurred while creating the table.", error)
    );
  });
};

const getHikes = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM hikes",
        [],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const deleteHike = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM hikes WHERE id = ?",
        [id],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const addHike = (name, date, location, availablePark, length, weather, teamSize, difficulty, description) => {
    db.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO hikes (name, date, location, availablePark, length, weather, teamSize, difficulty, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [name, date, location, availablePark, length, weather, teamSize, difficulty, description],
            () => console.log("Hike added successfully."),
            (error) => console.log("Error occurred while adding the hike.", error)
        );
    });
};

const updateHike = (id, name, date, location, availablePark, length, weather, teamSize, difficulty, description) => {
    db.transaction((tx) => {
        tx.executeSql(
            "UPDATE hikes SET name = ?, date = ?, location = ?, availablePark = ?, length = ?, weather = ?, teamSize = ?, difficulty = ?, description = ? WHERE id = ?",
            [name, date, location, availablePark, length, weather, teamSize, difficulty, description, id],
            () => console.log("Hike updated successfully."),
            (error) => console.log("Error occurred while updating the hike.", error)
        );
    });
};

const deleteAllHikes = () => {
    db.transaction((tx) => {
        tx.executeSql(
            "DELETE FROM hikes",
            [],
            () => console.log("Hikes deleted successfully."),
            (error) => console.log("Error occurred while deleting the hikes.", error)
        );
    });
};

const Database = {
    initDatabase,
    addHike,
    getHikes,
    deleteHike,
    deleteAllHikes,
    updateHike
};

export default Database;