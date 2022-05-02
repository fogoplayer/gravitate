import { getUserFromUsername } from "./firebase/db.mjs";

export async function sendInvites(attraction) {
  console.log(attraction);
  let { orbits, systems, friends, ...rest } = attraction;

  debugger;

  orbits.forEach(orbit => {
    console.log(orbit);
    orbit.members?.forEach((person) => {
      sendInvite(person);
    });
  });

  debugger;

  systems.forEach(system => {
    console.log(system);
    system.members?.forEach((person) => {
      sendInvite(person);
    });
  });

  friends.forEach(person => {
    console.log(person);
    sendInvite(person);
  });
}

export async function sendInvite(person) {
  debugger;
  console.log(person);
  console.log(await getUserFromUsername(person.name));
}