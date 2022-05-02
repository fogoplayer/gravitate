export function sendInvites(attraction) {
  let { orbits, systems, friends } = attraction;

  Array.from(orbits).forEach(orbit => {
    orbit.members.forEach((person) => {
      sendInvite(person);
    });
  });

  Array.from(systems).forEach(system => {
    system.members.forEach((person) => {
      sendInvite(person);
    });
  });

  Array.from(friends).forEach(friend => {
    sendInvite(friend);
  });
}

function sendInvite(id) {
  console.log(id);
}