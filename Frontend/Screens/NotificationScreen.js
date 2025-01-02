import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NotificationScreen() {
  const [time, setTime] = useState(new Date());
  const [message, setMessage] = useState('');
  const [scheduledNotifications, setScheduledNotifications] = useState([]);

  // Lade gespeicherte Benachrichtigungen beim Start
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const storedNotifications = await AsyncStorage.getItem('scheduledNotifications');
        if (storedNotifications) {
          setScheduledNotifications(JSON.parse(storedNotifications));
        }
      } catch (error) {
        console.error('Fehler beim Laden der Benachrichtigungen:', error);
      }
    };

    loadNotifications();
  }, []);

  const saveNotifications = async (notifications) => {
    try {
      await AsyncStorage.setItem('scheduledNotifications', JSON.stringify(notifications));
    } catch (error) {
      console.error('Fehler beim Speichern der Benachrichtigungen:', error);
    }
  };

  const scheduleNotification = async () => {
    if (!message.trim()) {
      Alert.alert('Fehler', 'Bitte gib eine Nachricht ein.');
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
      // Wenn die Zeit in der Vergangenheit liegt, stelle den Wecker auf den nächsten Tag ein
      triggerTime.setDate(triggerTime.getDate() + 1);
    }

    const secondsUntilTrigger = Math.floor((triggerTime - now) / 1000);
    console.log('Sekunden bis zum Trigger:', secondsUntilTrigger); // Log die Sekunden bis zum Trigger

    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Lesezeit!',
          body: message,
        },
        trigger: {
          seconds: secondsUntilTrigger,
        },
      });

      const newNotification = {
        id: notificationId,
        message,
        time: triggerTime.toLocaleTimeString(),
      };

      const updatedNotifications = [...scheduledNotifications, newNotification];
      setScheduledNotifications(updatedNotifications);

      // Speichere die Benachrichtigungen
      saveNotifications(updatedNotifications);

     
      setMessage(''); // Eingabe leeren
    } catch (error) {
      console.error('Fehler beim Planen der Benachrichtigung:', error);
      Alert.alert('Fehler', 'Die Benachrichtigung konnte nicht erstellt werden.');
    }
  };

  const cancelNotification = async (id) => {
    try {
      await Notifications.cancelScheduledNotificationAsync(id);
      const updatedNotifications = scheduledNotifications.filter((n) => n.id !== id);
      setScheduledNotifications(updatedNotifications);

      // Speichere die aktualisierten Benachrichtigungen
      saveNotifications(updatedNotifications);

      
    } catch (error) {
      console.error('Fehler beim Löschen der Benachrichtigung:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lesezeitbenachrichtigung</Text>
      <Text style={styles.label}>Nachricht:</Text>
      <TextInput
        style={styles.input}
        placeholder="Gib eine Nachricht ein"
        value={message}
        onChangeText={setMessage}
      />
      <Text style={styles.label}>Wähle eine Uhrzeit:</Text>
      <DateTimePicker
        value={time}
        mode="time"
        is24Hour={true}
        display="default"
        onChange={(event, selectedDate) => {
          const currentDate = selectedDate || time;
          setTime(currentDate);
        }}
      />
      <Button title="Wecker erstellen" onPress={scheduleNotification} />

      <Text style={styles.subTitle}>Geplante Benachrichtigungen:</Text>
      <FlatList
        data={scheduledNotifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Text style={styles.notificationText}>
              {item.time} - {item.message}
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
    backgroundColor: '#E3E3FD',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#FFF',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: '#FFF',
    elevation: 3,
  },
  notificationText: {
    flex: 1,
    fontSize: 16,
  },
});