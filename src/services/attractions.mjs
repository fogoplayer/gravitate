import { push } from "./firebase/db.mjs";
import { getDocData } from "./firebase/db.mjs";
import { getCurrUserData } from "./firebase/db.mjs";
import { update } from "./firebase/db.mjs";
import { getUserFromUsername } from "./firebase/db.mjs";

export async function sendInvites(attraction) {
  let { orbits, systems, friends, ...invitation } = attraction;
  let { name } = getCurrUserData();
  // invitation.organizer = await getUserFromUsername(name);


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
  const ref = await getUserFromUsername(person.name);
  // console.log(await getDocData(invitation.organizer));
  update(ref, {
    invitations: push(invitation)
  });
}