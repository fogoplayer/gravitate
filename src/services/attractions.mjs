import { push } from "./firebase/db.mjs";
import { getDocData } from "./firebase/db.mjs";
import { getCurrUserData } from "./firebase/db.mjs";
import { update } from "./firebase/db.mjs";

export default async function createAttraction(attraction) {
  console.log(attraction);
  sendInvites(attraction);
  saveAttraction(attraction);
}

async function saveAttraction(attraction) {
  attraction = await prepAttractionForFirebase(attraction);

  const { ref } = getCurrUserData();
  debugger;
  update(ref, { attractions: push(attraction) });
}

async function prepAttractionForFirebase(attraction) {
  // Convert sets to arrays
  attraction.orbits = Array.from(attraction.orbits);
  attraction.systems = Array.from(attraction.systems);
  attraction.friends = Array.from(attraction.friends);

  console.log(attraction.orbits, attraction.systems, attraction.friends);


  // Convert to references
  for (let orbit = 0; orbit < attraction.orbits.length; orbit++) {
    for (let member = 0; member < attraction.orbits[orbit].members.length; member++) {
      console.log(attraction.orbits[orbit][member]);
      attraction.orbits[orbit].members[member] = attraction.orbits[orbit].members[member].ref;
    }
  }

  for (let system = 0; system < attraction.systems.length; system++) {
    for (let member = 0; member < attraction.systems[system].members.length; member++) {
      attraction.systems[system].members[member] = await attraction.systems[system].members[member].ref;
    }
  }

  for (let member = 0; member < attraction.friends.length; member++) {
    attraction.friends[member] = attraction.friends[member].ref;
  }


  console.log(attraction.orbits, attraction.systems, attraction.friends);
  return attraction;
}

async function sendInvites(attraction) {
  let { orbits, systems, friends, ...invitation } = attraction;
  let { ref } = getCurrUserData();
  invitation.organizer = ref;


  orbits.forEach(orbit => {
    orbit.members?.forEach((person) => {
      sendInvite(invitation, person);
    });
  });


  systems.forEach(system => {
    system.members?.forEach((person) => {
      sendInvite(invitation, person);
    });
  });

  friends.forEach(person => {
    sendInvite(invitation, person);
  });
}

export async function sendInvite(invitation, person) {
  update(person.ref, { invitations: push(invitation) });
}