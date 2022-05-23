import { getCurrUserData } from "../../services/firebase/db.mjs";
import { jsx } from "../../services/render.mjs";

export default function FriendPage(id) {
  let { friends } = getCurrUserData();
  let [friend] = friends.filter((friend) => friend.name === id); // jsx``;
  return friend.name;
}
