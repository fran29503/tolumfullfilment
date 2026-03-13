export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  role: string;
  message: string;
  timestamp: Date;
  sentiment?: "positive" | "neutral" | "negative";
}

export const MOCK_MESSAGES: ChatMessage[] = [
  {
    id: "msg-001",
    sender: "user",
    role: "Client Coordinator",
    message: "How can we optimize our delivery routes for tomorrow?",
    timestamp: new Date(Date.now() - 8 * 60000),
    sentiment: "neutral",
  },
  {
    id: "msg-002",
    sender: "assistant",
    role: "TOLUM AI",
    message:
      "I've analyzed 47 active routes. Recommend consolidating zones 3-5. Est. savings: 12% fuel, 18 min/route.",
    timestamp: new Date(Date.now() - 7 * 60000),
    sentiment: "positive",
  },
  {
    id: "msg-003",
    sender: "user",
    role: "Operations Manager",
    message: "What's the status on the delayed shipments?",
    timestamp: new Date(Date.now() - 5 * 60000),
    sentiment: "neutral",
  },
  {
    id: "msg-004",
    sender: "assistant",
    role: "TOLUM AI",
    message:
      "3 shipments delayed due to traffic. TRUCK-C3 ETA adjusted to 16:45. Clients notified automatically.",
    timestamp: new Date(Date.now() - 4 * 60000),
    sentiment: "neutral",
  },
  {
    id: "msg-005",
    sender: "user",
    role: "Sales Manager",
    message: "Can you forecast next month's capacity needs?",
    timestamp: new Date(Date.now() - 2 * 60000),
    sentiment: "positive",
  },
];

const responseTemplates = [
  "I recommend implementing AI-driven load balancing to increase efficiency by 15%.",
  "Based on current trends, you should expand capacity in zones 4-6 next quarter.",
  "Predictive analysis shows peak demand on Thursdays. Suggest pre-positioning inventory.",
  "Real-time optimization saved your fleet 2.3 hours today. Continuing monitoring.",
  "Machine learning model updated with latest market data. Accuracy improved 8%.",
];

export function generateNewMessage(): ChatMessage {
  const newId = `msg-${Date.now()}`;
  const isAssistant = Math.random() > 0.4;

  return {
    id: newId,
    sender: isAssistant ? "assistant" : "user",
    role: isAssistant ? "TOLUM AI" : ["Operations Manager", "Sales Manager", "Client Coordinator"][Math.floor(Math.random() * 3)],
    message: responseTemplates[
      Math.floor(Math.random() * responseTemplates.length)
    ],
    timestamp: new Date(),
    sentiment: isAssistant ? "positive" : "neutral",
  };
}

export function updateMockMessages(messages: ChatMessage[]): ChatMessage[] {
  // Keep last 8 messages and add a new one randomly
  const updated = [...messages];

  if (updated.length >= 8) {
    updated.shift();
  }

  if (Math.random() > 0.5) {
    updated.push(generateNewMessage());
  }

  return updated;
}
