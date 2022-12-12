export const SEND_MESSAGE = "SEND_MESSAGE";

////CHATS
export const sendMessagesAction = (id, payload) => {
  return {
    type: SEND_MESSAGE,
    payload,
    id,
  };
};
