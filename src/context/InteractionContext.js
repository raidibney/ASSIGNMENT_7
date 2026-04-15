"use client";
import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

const InteractionContext = createContext();

export const InteractionProvider = ({ children }) => {
  
  const [interactions, setInteractions] = useState([]);

  /**
   * Adds a new interaction to the timeline
   * @param {string} type - 'Call' | 'Text' | 'Video'
   * @param {string} friendName - The name of the friend contacted
   */
  const addInteraction = (type, friendName) => {
    const newEntry = {
      id: Date.now(),
      type,
      friendName,
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    };


    setInteractions((prev) => [newEntry, ...prev]);
    
    toast.success(`${type} logged with ${friendName}!`, {
      style: {
        borderRadius: '10px',
        background: '#1a4332', 
        color: '#fff',
      },
    });
  };

  return (
    <InteractionContext.Provider value={{ interactions, addInteraction }}>
      {children}
    </InteractionContext.Provider>
  );
};

export const useInteractions = () => {
  const context = useContext(InteractionContext);
  if (!context) {
    throw new Error("useInteractions must be used within an InteractionProvider");
  }
  return context;
};