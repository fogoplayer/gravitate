import {
  deleteDoc,
  getCurrUserData,
  getDocData,
  getDocsData,
  pop,
  update,
  watch,
} from "./db.mjs";

const DOCUMENT_SNAPSHOT = "Ph";
const DOCUMENT_REFERENCE = "wc";

export async function parseGroups(groups) {
  let newGroups = new Set();
  let promises = [];
  for (let group of groups) {
    try {
      if (group.constructor.name == DOCUMENT_REFERENCE) {
        let promise = getDocData(group).then((group) =>
          parseIndividuals(group.members).then((members) => {
            group.members = members;
            newGroups.add(group);
          })
        );

        promises.push(promise);
      } else {
        let promise = parseIndividuals(group.members).then((members) => {
          group.members = members;
          newGroups.add(group);
        });
        promises.push(promise);
      }
    } catch (error) {
      if (error.code === "permission-denied" && group.path.match(/systems/)) {
        console.log(group);
        console.error("You've been removed from one of your systems");
        update(getCurrUserData().dataDocRef, {
          systems: pop(group),
        });
      }
    }
  }
  await Promise.all(promises);
  return Array.from(newGroups);
}

export async function parseIndividuals(group) {
  for (let member in group) {
    group[member] = getDocData(group[member]);
  }
  return await Promise.all(group);
}

export async function parseEvents(collection) {
  watch(collection);

  let events = await getDocsData(collection);
  let promises = [];

  for (let event in events) {
    watch(events[event].ref);

    // Expiration Date
    if (events[event].expiration?.toDate) {
      events[event].expiration = events[event].expiration.toDate();
      if (events[event].expiration < new Date()) {
        deleteDoc(events[event].ref);
      }
    }

    // Guest list
    if (events[event].guestList) {
      promises.push(
        parseIndividuals(events[event].guestList).then(
          (guestList) => (events[event].guestList = guestList)
        )
      );
    }

    // Reactions
    watch(events[event].ref.path + "/reactions");
    promises.push(
      getDocsData(events[event].ref.path + "/reactions").then(
        (reactions) =>
          (events[event].reactions = reactions.reduce((object, reaction) => {
            if (object[reaction.reaction]) {
              object[reaction.reaction].push(reaction);
            } else {
              object[reaction.reaction] = [reaction];
            }
            return object;
          }, {}))
      )
    );
  }
  await Promise.all(promises);
  return events;
}
