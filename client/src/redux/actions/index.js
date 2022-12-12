export const SEND_MESSAGE = "SEND_MESSAGE";

////CHATS
export const sendMessagesAction = (payload) => {
  return {
    type: SEND_MESSAGE,
    payload,
  };
};
