import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  Colors,
  Header,
} from 'react-native/Libraries/NewAppScreen';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  let message_body = remoteMessage.notification.body;
  let message_title = remoteMessage.notification.title;
  let avatar = remoteMessage.notification.android.imageUrl;
  setMessages(messages => GiftedChat.append(messages, {
    _id: Math.round(Math.random() * 1000000),
    text: message_body,
    createdAt: new Date(),
    user: {
        _id: 2,
        name: "PartyB",
        avatar: avatar,
    },        
  }));
  Alert.alert(message_title, message_body);
});



export default function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   console.log('Message received. ', remoteMessage);
    //   setMessages([...messages, remoteMessage]);
    // });

    const subscribe = messaging().onMessage(async remoteMessage => {     
      let message_body = remoteMessage.notification.body;
      let message_title = remoteMessage.notification.title;
      let avatar = remoteMessage.notification.android.imageUrl;
      setMessages(messages => GiftedChat.append(messages, {
        _id: Math.round(Math.random() * 1000000),
        text: message_body,
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "PartyB",
          avatar: avatar,
        },        
      }));
      Alert.alert(message_title, message_body);
    });

    return subscribe;
  }, [messages]);
 
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello there',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'PartyA',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, [])
 
  const onSend = useCallback((messages = []) => {
    console.log("messages", messages);
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
 
  return (
    
    <GiftedChat
        backgroundColor ={ isDarkMode ? Colors.black : Colors.white}
        messages={messages}
        onSend={messages => onSend(messages)}        
        user={{
          _id: 1,
        }}
      />
    
  //   <SafeAreaView style={backgroundStyle}>
  //   <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
  //   <ScrollView
  //     contentInsetAdjustmentBehavior="automatic"
  //     style={backgroundStyle}>
  //     <View
  //       style={{
  //         backgroundColor: isDarkMode ? Colors.black : Colors.white,
  //       }}>
          
  //     </View>
  //   </ScrollView>
  // </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});