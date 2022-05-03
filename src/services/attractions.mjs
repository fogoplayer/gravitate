import { getUserFromUsername } from "./firebase/db.mjs";

export async function sendInvites(attraction) {
  console.log(attraction);
  let { orbits, systems, friends, ...rest } = attraction;


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
  console.log("Person", person);
  console.log("Ref", await getUserFromUsername(person.name));
}