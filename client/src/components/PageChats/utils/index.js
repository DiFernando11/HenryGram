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
