"use client";

import useSpeechToText from 'react-hook-speech-to-text';
import React, { useEffect, useState } from 'react';
import { Mic, Volume2, StopCircle } from 'lucide-react'; // Import StopCircle icon
import Addneworder from '../../../_components/Addneworder';
import { chatSession } from '../../../../../utils/GeminiAI';
import WelcomeMessage from '../../../_components/WelcomeMessage';

// Function to generate menu string
const menuItems = [
  { name: 'Margherita Pizza', price: 10.00 },
  { name: 'Pepperoni Pizza', price: 12.00 },
  { name: 'Veggie Pizza', price: 11.00 },
  { name: 'Cheese Burger', price: 8.00 },
  { name: 'Chicken Burger', price: 9.00 },
  { name: 'Veggie Burger', price: 7.50 },
  { name: 'Caesar Salad', price: 7.00 },
  { name: 'Greek Salad', price: 7.50 },
  { name: 'Grilled Chicken Sandwich', price: 9.00 },
  { name: 'BLT Sandwich', price: 8.50 },
  { name: 'Spaghetti Bolognese', price: 13.00 },
  { name: 'Fettuccine Alfredo', price: 12.50 },
  { name: 'Chicken Parmesan', price: 14.00 },
  { name: 'Fish and Chips', price: 11.50 },
  { name: 'Beef Steak', price: 18.00 },
  { name: 'Grilled Salmon', price: 17.00 },
  { name: 'Shrimp Scampi', price: 15.00 },
  { name: 'Tacos (Beef/Chicken/Veggie)', price: 9.00 },
  { name: 'Quesadilla', price: 8.00 },
  { name: 'Nachos', price: 7.50 },
  { name: 'French Fries', price: 4.00 },
  { name: 'Onion Rings', price: 4.50 },
  { name: 'Chocolate Cake', price: 6.00 },
  { name: 'Cheesecake', price: 6.50 },
  { name: 'Ice Cream Sundae', price: 5.00 }
];

function generateMenuString(menuItems) {
  let menuString = "";
  const categories = {
    "Pizzas": menuItems.slice(0, 3),
    "Burgers": menuItems.slice(3, 6),
    "Salads": menuItems.slice(6, 8),
    "Sandwiches": menuItems.slice(8, 10),
    "Pasta": menuItems.slice(10, 13),
    "Main Dishes": menuItems.slice(13, 17),
    "Mexican": menuItems.slice(17, 20),
    "Sides": menuItems.slice(20, 22),
    "Desserts": menuItems.slice(22, 25)
  };

  for (const category in categories) {
    menuString += `${category}:\n`;
    categories[category].forEach(item => {
      menuString += `- ${item.name} - $${item.price.toFixed(2)}\n`;
    });
    menuString += "\n";
  }
  return menuString;
}

function RecordOrder() {
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const [tempAnswer, setTempAnswer] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [aiResponse, setAiResponse] = useState('');
  const [utterance, setUtterance] = useState(null); // State for SpeechSynthesisUtterance

  useEffect(() => {
    if (interimResult) {
      setTempAnswer(interimResult);
    }
  }, [interimResult]);

  useEffect(() => {
    if (results.length > 0) {
      setUserAnswer((prev) => prev + results[results.length - 1].transcript + ' ');
    }
  }, [results]);

  useEffect(() => {
    // Cleanup: Cancel any ongoing speech synthesis when component unmounts
    return () => {
      if (utterance) {
        speechSynthesis.cancel();
      }
    };
  }, [utterance]);

  const textToSpeech = (text) => {
    if (!text) return;

    // Cancel any ongoing speech synthesis
    if (utterance) {
      speechSynthesis.cancel();
    }

    const newUtterance = new SpeechSynthesisUtterance();
    newUtterance.text = text;
    newUtterance.lang = 'en-US';
    newUtterance.onend = () => setUtterance(null); // Clear utterance when done
    setUtterance(newUtterance);
    speechSynthesis.speak(newUtterance);
  };

  const stopTextToSpeech = () => {
    if (utterance) {
      speechSynthesis.cancel();
      setUtterance(null);
    }
  };

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
      setAnswers((prev) => [...prev, { type: 'user', text: userAnswer.trim() }]);
      setUserAnswer('');
      setTempAnswer('');

      const menuString = generateMenuString(menuItems);

      const InputPrompt = `You are an AI assistant helping a restaurant take orders from customers. When a customer places an order, you should confirm the items ordered, the quantity, and any specific instructions or preferences they mention. After confirming the order, ask if there is anything else they would like to add or if they have any special requests. Here is the current order received from the customer:\n\nOrder Details:\n${userAnswer}\n\nAvailable Items:\n${menuString}\n"Hi there! I'd be happy to show you our menu. We have a delicious selection of dishes to choose from. Here's what we offer:  Is there anything specific you'd like to try, or would you like to place an order?"`;

      const result = await chatSession.sendMessage(InputPrompt);
      const aiText = await result.response.text();
      const formattedAiText = aiText.replace(/\*\*/g, ' ').replace(/\n\s*/g, ', ').trim();

      setAiResponse(formattedAiText);
      setAnswers((prev) => [...prev, { type: 'ai', text: formattedAiText }]);
    } else {
      setTempAnswer('');
      setUserAnswer('');
      startSpeechToText();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow p-4 max-w-2xl mx-auto">
        <WelcomeMessage />
        {/* <h1 className="text-xl font-bold mb-4">
          Recording: {isRecording ? 'Yes' : 'No'}
        </h1> */}

        <div>
          <div className="absolute top-25 left-10">
            <Addneworder />
          </div>
          <div className="col-span-9">
            <ul className="mt-4 space-y-2">
              {answers.map((answer, index) => (
                <li
                  key={index}
                  className={`p-2 rounded-md shadow-sm ${
                    answer.type === 'user' ? 'bg-blue-500 text-white' : 'bg-red-500 text-white'
                  } ${answer.type === 'ai' ? 'animate-puls' : ''}`}
                  style={{ textAlign: answer.type === 'user' ? 'right' : 'left' }}
                >
                  {answer.type === 'ai' && (
                    <>
                      <Volume2
                        className="cursor-pointer inline-block mr-2"
                        onClick={() => textToSpeech(answer.text)}
                        aria-label="Read question aloud"
                      />
                      <StopCircle
                        className="cursor-pointer inline-block ml-2"
                        onClick={stopTextToSpeech}
                        aria-label="Stop speech synthesis"
                      />
                    </>
                  )} <br/>
                  {answer.text}
                </li>
              ))}
              {tempAnswer && (
                <li className="bg-gray-100 p-2 rounded-md shadow-sm">
                  {tempAnswer}
                </li>
              )}
            </ul>

            {error && (
              <div className="mt-4 text-red-600">
                <strong>Error:</strong> {error.message}
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        className={`w-24 h-24 sticky bottom-4 left-1/2 transform -translate-x-1/2 rounded-full border-4 border-white text-white flex items-center justify-center ${
          isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-600'
        }`}
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <>
            <Mic className="w-6 h-6" />
            <span></span>
          </>
        ) : (
          <span className="text-sm md:text-sm">Start Recording</span>
        )}
      </button>
    </div>
  );
}

export default RecordOrder;
