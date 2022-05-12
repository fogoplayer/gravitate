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
  // Convert sets to arrays
  attraction.orbits = Array.from(attraction.orbits);
  attraction.systems = Array.from(attraction.systems);
  attraction.friends = Array.from(attraction.friends);

  // Convert to references
  for (let orbit = 0; orbit < attraction.orbits.length; orbit++) {
    for (
      let member = 0;
      member < attraction.orbits[orbit].members.length;
      member++
    ) {
      attraction.orbits[orbit].members[member] =
        attraction.orbits[orbit].members[member].ref;
    }
  }

  for (let system = 0; system < attraction.systems.length; system++) {
    for (
      let member = 0;
      member < attraction.systems[system].members.length;
      member++
    ) {
      attraction.systems[system].members[member] = await attraction.systems[
        system
      ].members[member].ref;
    }
  }

  for (let member = 0; member < attraction.friends.length; member++) {
    attraction.friends[member] = attraction.friends[member].ref;
  }

  return attraction;
}

async function sendInvites(attraction) {
  let { orbits, systems, friends, ...invitation } = attraction;
  let { ref } = getCurrUserData();
  const namesInvited = new Set();
  invitation.organizer = ref;

  systems.forEach((system) => {
    system.members?.forEach((person) => {
      invitation.origin = system.ref;
      if (!namesInvited.has(person.name)) {
        sendInvite(invitation, person);
        namesInvited.add(person.name);
      }
    });
  });

  orbits.forEach((orbit) => {
    orbit.members?.forEach((person) => {
      if (!namesInvited.has(person.name)) {
        sendInvite(invitation, person);
        namesInvited.add(person.name);
      }
    });
  });

  friends.forEach((person) => {
    if (!namesInvited.has(person.name)) {
      sendInvite(invitation, person);
      namesInvited.add(person.name);
    }
  });
}

export async function sendInvite(invitation, person) {
  addDoc(person.ref.path + "/invitations", invitation);
}
