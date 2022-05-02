import { getUserFromUsername } from "./firebase/db.mjs";

export async function sendInvites(attraction) {
  console.log(attraction);
  let { orbits, systems, friends } = attraction;

  orbits.forEach(orbit => {
    orbit.members?.forEach((person) => {
      sendInvite(person);
    });
  });

  systems.forEach(system => {
    system.members?.forEach((person) => {
      sendInvite(person);
    });
  });

  friends.forEach(person => {
    sendInvite(person);
  });
}

export async function sendInvite(person) {
  debugger;
  console.log(person);
  console.log(await getUserFromUsername(person.name));
}