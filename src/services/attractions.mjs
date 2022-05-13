import { addDoc, push } from "./firebase/db.mjs";
import { getDocData } from "./firebase/db.mjs";
import { getCurrUserData } from "./firebase/db.mjs";
import { update } from "./firebase/db.mjs";

export default async function createAttraction(attraction) {
  await Promise.all([sendInvites(attraction), saveAttraction(attraction)]);
}

async function saveAttraction(attraction) {
  attraction = await prepAttractionForFirebase(attraction);

  const { ref } = getCurrUserData();
  addDoc(ref.path + "/attractions", attraction);
}

async function prepAttractionForFirebase(attraction) {
  const guestNames = new Set();

  // Convert sets to arrays
  attraction.orbits = Array.from(attraction.orbits);
  attraction.systems = Array.from(attraction.systems);
  attraction.friends = Array.from(attraction.friends);
  attraction.guestList = [];

  // Convert to references
  for (let orbit of attraction.orbits) {
    for (let member of orbit.members) {
      if (!guestNames.has(member.name)) {
        guestNames.add(member.name);
        attraction.guestList.push(member.ref);
      }
      member = member.ref;
    }
  }

  for (let system of attraction.systems) {
    for (let member of system.members) {
      if (!guestNames.has(member.name)) {
        guestNames.add(member.name);
        attraction.guestList.push(member.ref);
      }
      member = member.ref;
    }
  }

  for (let friend of attraction.friends) {
    if (!guestNames.has(friend.name)) {
      guestNames.add(friend.name);
      attraction.guestList.push(friend.ref);
    }
    friend = friend.ref;
  }

  return attraction;
}

async function sendInvites(attraction) {
  let { orbits, systems, friends, ...invitation } = attraction;
  let { ref } = getCurrUserData();
  const namesInvited = new Set();
  invitation.organizer = ref;

  for (let system of systems) {
    invitation.origin = system.ref;
    for (let member of system.members) {
      if (!namesInvited.has(member.name)) {
        sendInvite(invitation, member);
        namesInvited.add(member.name);
      }
    }
  }

  for (let orbit of orbits) {
    for (let person of orbit.members) {
      if (!namesInvited.has(person.name)) {
        sendInvite(invitation, person);
        namesInvited.add(person.name);
      }
    }
  }

  for (let person of friends) {
    if (!namesInvited.has(person.name)) {
      sendInvite(invitation, person);
      namesInvited.add(person.name);
    }
  }
}

export async function sendInvite(invitation, person) {
  addDoc(person.ref.path + "/invitations", invitation);
}
