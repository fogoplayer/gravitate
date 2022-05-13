import {
  addDoc,
  push,
  getCurrUserData,
  update,
  setDoc,
} from "./firebase/db.mjs";

export default async function createAttraction(attraction) {
  const { ref } = getCurrUserData();
  let docRef = await addDoc(ref.path + "/attractions", {});
  attraction.ref = docRef;

  console.log(attraction);
  await Promise.all([sendInvites(attraction), saveAttraction(attraction)]);
}

async function saveAttraction(attraction) {
  let { ref, ...rest } = await prepAttractionForFirebase(attraction);

  update(ref, rest);
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
  console.log(invitation);
  addDoc(person.ref.path + "/invitations", invitation);
}

export async function react(attractionRef, reaction) {
  let { uid, name, ref } = getCurrUserData();
  setDoc(attractionRef.path + "/reactions/" + uid, { reaction, name, ref });
}
