import { getDocData, getDocsData } from "./db.mjs";

const DOCUMENT_SNAPSHOT = "Ph";
const DOCUMENT_REFERENCE = "wc";

export async function parseGroups(groups) {
  for (let group in groups) {
    if (groups[group].constructor.name == DOCUMENT_REFERENCE) {
      groups[group] = await getDocData(groups[group]);
    }
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
  for (let event in events) {
    // Guest list
    if (events[event].guestList) {
      events[event].guestList = await parseIndividuals(events[event].guestList);
    }

    // Reactions
    const reactions = await getDocsData(events[event].ref.path + "/reactions");
    events[event].reactions = reactions.reduce(
      (object, reaction) => (object[reaction.name] = reaction),
      {}
    );
  }

  return events;
}
