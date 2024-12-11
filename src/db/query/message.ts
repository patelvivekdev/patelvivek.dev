import { db } from '..';
import { InsertMessages, messages } from '../schema';

export const saveMessage = async (message: InsertMessages) => {
  try {
    const [{ id, name }] = await db.insert(messages).values(message).returning({
      id: messages.id,
      name: messages.name,
    });

    if (!id || !name) {
      throw new Error('Failed to send message.');
    }
  } catch (error: any) {
    console.log('Error', error.message);
    throw new Error(
      error.message || 'Failed to send message. Please try again.',
    );
  }
};
