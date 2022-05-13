import { getDocData } from "./db.mjs";

const DOCUMENT_SNAPSHOT = "Ph";
const DOCUMENT_REFERENCE = "wc";

export async function parseGroups(groups) {
  for (let group in groups) {
    if (groups[group].constructor.name == DOCUMENT_REFERENCE) {
      groups[group] = await getDocData(groups[group]);
    } else if (groups[group].constructor.name === DOCUMENT_SNAPSHOT) {
      groups[group] = groups[group].data();
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
