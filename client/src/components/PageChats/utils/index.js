export const timeHours = (time) => {
  const timeDate = time.split("T");
  const dateTime = timeDate.length && timeDate[1].split(".");
  const dateHour = dateTime.length && dateTime[0].slice(0, 5);
  return dateHour;
};

export const searchFriendHelp = (name, arr) => {
  switch (name) {
    case "":
      return [];
    default:
      return arr.filter((friend) =>
        friend.firstName.toLowerCase().includes(name.toString().toLowerCase())
      );
  }
};
export const searchChatsHelp = (name, arr) => {
  switch (name) {
    case "":
      return arr;
    default:
      return arr.filter((friend) =>
        friend.usr.firstName
          .toLowerCase()
          .includes(name.toString().toLowerCase())
      );
  }
};
export const searchChatsGroupsHelp = (name, arr) => {
  console.log(name , "name")
  console.log(arr , "array")
  switch (name) {
    case "":
      return arr;
    default:
      return arr.filter((group) =>
        group.gr.title?.toLowerCase().includes(name.toString().toLowerCase())
      );
  }
};

export const changeMessageUltimateHelp = (chat, message) => {
  if (!message.length) return chat;
  const findMessage =
    chat?.length &&
    chat?.find((user) =>
      user?.msg?.users.includes(message[message.length - 1].to)
    );
  if (!findMessage) return chat;
  findMessage.msg.message.text = message[message.length - 1].message;
  return chat;
};
