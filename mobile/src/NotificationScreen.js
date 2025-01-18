import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Svg, { Path } from "react-native-svg";

export default function NotificationScreen({ route, navigation }) {
  const [time, setTime] = useState(null);
  const [message, setMessage] = useState("");
  const [scheduledNotifications, setScheduledNotifications] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const [timeSelected, setTimeSelected] = useState(false);

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
    setTimeSelected(true);
  };

  const scheduleNotification = async () => {
    if (!message.trim() || !time) {
      Alert.alert("Fehler", "Bitte eine Nachricht und eine Zeit eingeben.");
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

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        body: message,
      },
      trigger: triggerTime,
    });

    const newNotification = {
      id: notificationId,
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
    setTime(null);
    setTimeSelected(false);

    navigation.navigate("SuccessScreen", {
      titleText: "Lesezeitbenachrichtigung erfolgreich eingestellt!",
    });
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

      <Text style={styles.subtitle}>Bitte richte einen Zeitpunkt ein:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nachricht"
        value={message}
        onChangeText={setMessage}
      />

      <TouchableOpacity
        style={[styles.button, timeSelected && styles.disabledButton]}
        onPress={() => setShowPicker(true)}
        disabled={timeSelected}
      >
        <Text style={styles.buttonText}>Zeit</Text>
        <Svg
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M4 9H6V11H4V9ZM18 4V18C18 19.1 17.1 20 16 20H2C0.89 20 0 19.1 0 18L0.00999999 4C0.00999999 2.9 0.89 2 2 2H3V0H5V2H13V0H15V2H16C17.1 2 18 2.9 18 4ZM2 6H16V4H2V6ZM16 18V8H2V18H16ZM12 11H14V9H12V11ZM8 11H10V9H8V11Z"
            fill="#AC9999"
          />
        </Svg>
      </TouchableOpacity>
      <Text style={styles.label}>
        Gewählte Uhrzeit:{" "}
        {time ? time.toLocaleTimeString() : "Keine Uhrzeit gewählt"}
      </Text>

      {showPicker && (
        <DateTimePicker
          value={time || new Date()}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onTimeChange}
        />
      )}

      <TouchableOpacity
        style={[
          styles.saveButton,
          (!message.trim() || !time) && styles.disabledButton,
        ]}
        onPress={scheduleNotification}
        disabled={!message.trim() || !time}
      >
        <Text style={styles.saveButtonText}>Speichern</Text>
      </TouchableOpacity>

      <Text style={styles.subTitle}>Geplante Benachrichtigungen:</Text>

      <FlatList
        data={scheduledNotifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Text style={styles.notificationText}>
              {new Date(item.time).toLocaleTimeString()} - {item.message}
            </Text>
            <TouchableOpacity
              onPress={() => cancelNotification(item.id)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteButtonText}>Löschen</Text>
            </TouchableOpacity>
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
    fontSize: 36,
    color: "#000000",
    marginBottom: 40,
    fontWeight: "300",
    marginLeft: 15,
  },
  label: {
    fontSize: 14,
    marginLeft: "16%",
    marginBottom: "30%",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: "#555",
    marginLeft: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#FFF",
    marginLeft: 50,
    marginRight: 50,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "300",
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
    fontWeight: "300",
  },
  deleteButton: {
    backgroundColor: "#FF6B6B",
    padding: 10,
    borderRadius: 10,
  },
  deleteButtonText: {
    color: "#FFF",
    fontWeight: "300",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    alignItems: "center",
    marginLeft: 50,
    marginRight: 50,
  },
  saveButton: {
    flexDirection: "row",
    backgroundColor: "#6C76CE",
    borderRadius: 17,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    alignItems: "center",
    marginLeft: 50,
    marginRight: 50,
  },
  buttonText: {
    color: "#AC9999",
    fontSize: 18,
    marginLeft: "40%",
    marginRight: "37%"
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    marginLeft: "30%",
  },
  disabledButton: {
    backgroundColor: "#AAA",
  },
});
