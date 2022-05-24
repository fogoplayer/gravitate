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
  for (let group of groups) {
    try {
      if (group.constructor.name == DOCUMENT_REFERENCE) {
        group = await getDocData(group);
      }
      group.members = await parseIndividuals(group.members);
      newGroups.add(group);
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
  return Array.from(newGroups);
}

export async function parseIndividuals(group) {
  for (let member in group) {
    group[member] = await getDocData(group[member]);
  }
  return group;
}

export async function parseEvents(events) {
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
      events[event].guestList = await parseIndividuals(events[event].guestList);
    }

    // Reactions
    watch(events[event].ref.path + "/reactions");
    const reactions = await getDocsData(events[event].ref.path + "/reactions");
    events[event].reactions = reactions.reduce((object, reaction) => {
      if (object[reaction.reaction]) {
        object[reaction.reaction].push(reaction);
      } else {
        object[reaction.reaction] = [reaction];
      }
      return object;
    }, {});
  }

  return events;
}
