import type { BuildingMessage, Message } from '$lib/ai';
import DB from './';

export interface Conversation {
  id: string;
  userId: number;
  title: string;
  description?: string;
  messages: Message[];
}

export async function getConversations(userId: number): Promise<Conversation[]> {
  const sql = `
  SELECT
    *
  FROM conversation
  WHERE userId = ?
  `;
  const [conversations] = await DB.query(sql, [userId]);
  Promise.all(
    conversations.map(async (conversation: Conversation) => {
      conversation.messages = await getMessages(conversation);
      return conversation;
    })
  );

  return conversations as Conversation[];
}

export async function getConversation(idConversation: number): Promise<Conversation> {
  const sql = `
  SELECT
    *
  FROM conversation
  WHERE id = ?
  `;
  const [conversations] = await DB.query(sql, [idConversation]);
  const conversation = conversations[0] as Conversation;
  conversation.messages = await getMessages(conversation);
  return conversation;
}

export async function getMessages(idConversation: number): Promise<Message[]> {
  const sql = `
  SELECT
    *
  FROM message
  WHERE conversationId = ?
  `;
  const [messages] = await DB.query(sql, [idConversation]);
  return messages as Message[];
}

export async function createConversation(data: Conversation): Promise<Conversation> {
  const sql = `
  INSERT INTO conversation (userId, title, description)
  VALUES (?, ?, ?)
  `;
  const result = await DB.query(sql, [data.userId, data.title, data.description ?? null]);
  return { ...data, id: result.insertId };
}

export async function createMessage(
  data: BuildingMessage,
  idConversation: number
): Promise<Message> {
  const sql = `
  INSERT INTO message (conversationId, content, role)
  VALUES (?, ?, ?)
  `;
  const msg = typeof data.text === 'string' ? data.text : data.text.message;
  const result = await DB.query(sql, [idConversation, msg, data.role]);
  return { ...data, id: result.insertId };
}
