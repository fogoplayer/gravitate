import { getDocData } from "./db.mjs";

const DOCUMENT_SNAPSHOT = "Ph";
const DOCUMENT_REFERENCE = "wc";

export async function parseGroups(groups) {
  for (let group in groups) {
    if (groups[group].constructor.name == DOCUMENT_REFERENCE) {
      groups[group] = await getDocData(groups[group]);
    } /*  else if (groups[group].constructor.name === DOCUMENT_SNAPSHOT) {
      groups[group] = groups[group].data();
    } */
    groups[group].members = await parseIndividuals(groups[group].members);
  }
  return groups;
}

export async function parseIndividuals(group) {
  for (let member in group) {
    group[member] = await getDocData(group[member]);
  }
  return group;
}

export async function parseEvents(events) {
  // events = events.docs.map((doc) => doc.data());

  for (let event in events) {
    if (events[event].guestList) {
      events[event].guestList = await parseIndividuals(events[event].guestList);
    }
  }

  return events;
}
