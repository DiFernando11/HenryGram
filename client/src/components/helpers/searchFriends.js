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
