import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


import renderHeader from '@/components/Header';
import { PUBLIC_TOPIC_ID } from '@/constants/Config';
import { connectToBroker, publishMessage } from '@/core/mqtt';
import { useEffect, useState } from 'react';


interface Sensor {
  senorSuhuAir: string;
  senorSuhu: string;
  sensorPPM: string;
  sensorPh: string;
  lastUpdate: string;
}

interface PayloadPompaA {
  PompaA: Boolean;
}

interface PayloadPompaB {
  PompaB: Boolean;
}

export default function HomeScreen() {
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState('');
  const [sensor, setSensor] = useState<Sensor | null>(null);
  const [pompaA, setPompaA] = useState(false);
  const [pompaB, setPompaB] = useState(false);

  useEffect(() => {
    connectToBroker({
      topic: PUBLIC_TOPIC_ID,
      onMessageArrived: (message) => {
        console.log('Received message:', message.payloadString);
        setData(message.payloadString);
        setSensor(JSON.parse(message.payloadString));
      },
      onConnectionLost: (error) => {
        console.error('Connection lost:', error.errorMessage);
      },
      onConnectionSuccess: () => {
        console.log('Connected to MQTT broker');
        setIsConnected(true)
      },
      onConnectionFailure: (error) => {
        console.error('Connection failed:', error.errorMessage);
        setIsConnected(false)
      },
    });
  }, []);


  const sendActionButtonA = (payload: PayloadPompaA) => {
    publishMessage({
      topic: 'demo/mqtt/data/action/pompaA',
      payload: JSON.stringify(payload),
    });
  }

  const sendActionButtonB = (payload: PayloadPompaB) => {
    publishMessage({
      topic: 'demo/mqtt/data/action/pompaB',
      payload: JSON.stringify(payload),
    });
  }


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {renderHeader()}
      <View style={styles.titleContainer}>
        <Text>Status MQTT</Text>
        <Text>{isConnected ? 'Connected' : 'Disconnected'}</Text>
      </View>
      <Text style={{ paddingHorizontal: 16, textAlign: 'right' }}>Last Update: {sensor?.lastUpdate}</Text>
      <View style={styles.contentContainer} >
        <View style={styles.content}>
          <Text style={styles.textTitleValue}>Sensor Suhu Air</Text>
          <Text style={styles.textValue}>{sensor?.senorSuhuAir} °C</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.textTitleValue}>Sensor Suhu Ruangan</Text>
          <Text style={styles.textValue}>{sensor?.senorSuhu} °C</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.textTitleValue}>Kadar PPM</Text>
          <Text style={styles.textValue}>{sensor?.sensorPPM} ppm</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.textTitleValue}>Sensor pH</Text>
          <Text style={styles.textValue}>{sensor?.sensorPh} pH</Text>
        </View>
        <View style={styles.contentButton}>
          <TouchableOpacity
            onPress={() => {
              setPompaA(!pompaA)
              sendActionButtonA({
                PompaA: pompaA
              })

            }}><View style={{
              backgroundColor: '#229799',
              flex: 1,
              borderRadius: 12,
              justifyContent: 'center'
            }}>
              <Text style={{
                color: 'white',
                textAlign: 'center',
                padding: 16,
                fontSize: 18,
                fontWeight: 'bold'
              }}>Pompa A</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setPompaB(!pompaB)
              sendActionButtonB({
                PompaB: pompaB
              })
            }}><View style={{
              backgroundColor: '#229799',
              flex: 1,
              borderRadius: 12,
              justifyContent: 'center'
            }}><Text style={{
              color: 'white',
              textAlign: 'center',
              padding: 16,
              fontSize: 18,
              fontWeight: 'bold'
            }}>Pompa B</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentContainer: {
    padding: 16,
    gap: 16
  },
  content: {
    flexDirection: 'column',
    gap: 16,
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#229799',
  },
  contentButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
    gap: 16,
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#eee',
    height: 100
  },
  textTitleValue: {
    fontSize: 16,
    fontWeight: 'regular',
    color: 'white'
  },
  textValue: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'right'
  }
});
