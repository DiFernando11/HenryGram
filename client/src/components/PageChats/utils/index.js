export const sendMessage = (array, id ,messages) => {
  let value = array?.find((chat) => chat.id == id);
  console.log(value);
  value.messages = [...value.messages, messages];
  console.log(array);
  return array;
};
