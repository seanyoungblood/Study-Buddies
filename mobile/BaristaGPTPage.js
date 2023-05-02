import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

export default function BaristaGPTPage({navigation, route}) {
  const [messages, setMessages] = useState([{
    text: 'Hello, I\'m BaristaGPT! I heard that you\'re a social loafer with no ambitions who hates studying. You\'ll fit right in here! Tell me what you\'re doing and I\'ll tell you the perfect drink to pair it with and how to make it! :)\n\nP.S. Type \"I\'m sorry\" into the chat at anytime to go back to the login screen.',
    createdAt: new Date(),
    user: {
      _id: 2, // This would be the ID of the chatbot user
      name: 'ChatGPT',
      avatar: 'https://www.clipartmax.com/png/small/241-2415024_http-static-festisite-starbucks-logo-png.png',
    },
    _id: Math.round(Math.random() * 1000000), // Add a unique ID to each message object

  }]);
  const [text, setText] = useState('');

  

  async function handleSend(newMessages = []) {
    const prePrompt = "You are a barista instructor. The following message is an activity that I am doing. I want you to respond in this format. \"A drink that pairs well with that activity is [insert drink name here]. Here\'s how to make it [insert recipe here]\" Here is the activity:\n\n"
    const userInput = newMessages[0].text;
    console.log(userInput + "  compared to   " + "exit");
    if(userInput === "I’m sorry"){
        console.log("exiting gpt");
        navigation.navigate('LoginPage');
        return;
    }
    setMessages(GiftedChat.append(messages, newMessages));
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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',
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: (prePrompt + userInput)
          }
        ]
      }),
    });
    const data = await response.json();
    if (data.choices && data.choices.length > 0) {
      const answer = data.choices[0].message.content;
      setMessages(previousMessages => GiftedChat.append(previousMessages, {
        text: answer,
        createdAt: new Date(),
        user: {
          _id: 2, // This would be the ID of the chatbot user
          name: 'ChatGPT',
          avatar: 'https://www.clipartmax.com/png/small/241-2415024_http-static-festisite-starbucks-logo-png.png',
        },
        _id: Math.round(Math.random() * 1000000), // Add a unique ID to each message object

      }));
    } else {
      console.log('Error: no response from API');
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        key="gifted-chat"
        messages={messages}
        onSend={handleSend}
        user={{
          _id: 1, // This would be the ID of the current user
        }}
        renderBubble={(props) => (
          <Bubble
            {...props}
            wrapperStyle={{
              left: {
                backgroundColor: '#f0f0f0',
              },
              right: {
                backgroundColor: '#0084ff',
              },
            }}
            textStyle={{
              left: {
                color: '#000',
              },
              right: {
                color: '#fff',
              },
            }}
          />
        )}
      />
      
    </View>
  );
}
