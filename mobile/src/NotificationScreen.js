import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NotificationScreen() {
  const [time, setTime] = useState(new Date());
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [scheduledNotifications, setScheduledNotifications] = useState([]);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Fehler", "Benachrichtigungen sind deaktiviert!");
      }
    })();

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });

    const loadNotifications = async () => {
      try {
        const storedNotifications = await AsyncStorage.getItem(
          "scheduledNotifications"
        );
        if (storedNotifications) {
          const notifications = JSON.parse(storedNotifications);
          const filteredNotifications = notifications.filter((notification) => {
            const notificationTime = new Date(notification.time);
            return notificationTime > new Date();
            n;
          });
          setScheduledNotifications(filteredNotifications);
        }
      } catch (error) {
        console.error("Fehler beim Laden der Benachrichtigungen:", error);
      }
    };

    loadNotifications();
  }, []);

  const saveNotifications = async (notifications) => {
    try {
      await AsyncStorage.setItem(
        "scheduledNotifications",
        JSON.stringify(notifications)
      );
    } catch (error) {
      console.error("Fehler beim Speichern der Benachrichtigungen:", error);
    }
  };

  const onTimeChange = (event, selectedTime) => {
    const currentDate = selectedTime || time;
    setShowPicker(Platform.OS === "ios");
    setTime(currentDate);
  };

  const scheduleNotification = async () => {
    if (!message.trim() || !title.trim()) {
      Alert.alert(
        "Fehler",
        "Bitte gib sowohl einen Titel als auch eine Nachricht ein."
      );
      return;
    }

    const now = new Date();
    const triggerTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      time.getHours(),
      time.getMinutes(),
      0
    );

    if (triggerTime <= now) {
      triggerTime.setDate(triggerTime.getDate() + 1);
    }

    // Benachrichtigung planen
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: message,
      },
      trigger: triggerTime,
    });

    const newNotification = {
      id: notificationId,
      title,
      message,
      time: triggerTime.toISOString(),
    };

    const updatedNotifications = [...scheduledNotifications, newNotification];

    const filteredNotifications = updatedNotifications.filter(
      (notification) => {
        const notificationTime = new Date(notification.time);
        return notificationTime > new Date();
      }
    );

    setScheduledNotifications(filteredNotifications);
    saveNotifications(filteredNotifications);

    setMessage("");
    setTitle("");

    Alert.alert(
      "Benachrichtigung geplant",
      `Die Benachrichtigung wird um ${triggerTime.toLocaleTimeString()} ausgelöst.`
    );
  };

  const cancelNotification = async (id) => {
    await Notifications.cancelScheduledNotificationAsync(id);

    const updatedNotifications = scheduledNotifications.filter(
      (n) => n.id !== id
    );

    const filteredNotifications = updatedNotifications.filter(
      (notification) => {
        const notificationTime = new Date(notification.time);
        return notificationTime > new Date();
      }
    );

    setScheduledNotifications(filteredNotifications);
    saveNotifications(filteredNotifications);

    Alert.alert(
      "Benachrichtigung gelöscht",
      "Die geplante Benachrichtigung wurde gelöscht."
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lesezeitbenachrichtigung</Text>

      {/* Titel und Nachricht Eingabefelder */}
      <Text style={styles.label}>Titel:</Text>
      <TextInput
        style={styles.input}
        placeholder="Gib einen Titel ein"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Nachricht:</Text>
      <TextInput
        style={styles.input}
        placeholder="Gib eine Nachricht ein"
        value={message}
        onChangeText={setMessage}
      />

      {/* Zeit Auswahl */}
      <Text style={styles.label}>
        Gewählte Uhrzeit: {time.toLocaleTimeString()}
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => setShowPicker(true)}>
        <Text style={styles.buttonText}>Uhrzeit wählen</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onTimeChange}
        />
      )}

<TouchableOpacity style={styles.button} onPress={scheduleNotification}>
        <Text style={styles.buttonText}>Benachrichtigung planen</Text>
      </TouchableOpacity>

      <Text style={styles.subTitle}>Geplante Benachrichtigungen:</Text>

      <FlatList
        data={scheduledNotifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Text style={styles.notificationText}>
              {new Date(item.time).toLocaleTimeString()} - {item.title}:{" "}
              {item.message}
            </Text>
            <Button
              title="Löschen"
              onPress={() => cancelNotification(item.id)}
              color="#FF6B6B"
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#D8C3FC",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#FFF",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  notificationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: "#FFF",
    elevation: 3,
  },
  notificationText: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#6A5ACD",  // Grüner Hintergrund
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    alignItems: "center",  // Text zentrieren
  },
  buttonText: {
    color: "#FFF", // Weißer Text
    fontSize: 16,
  },
});
