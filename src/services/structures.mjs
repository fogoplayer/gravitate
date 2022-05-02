export class User {
  constructor(
    name = "",
    icon = "",
    orbits = [],
    systems = [],
    friends = [],
  ) {
    Object.assign(this, arguments);
  }
};

export class Orbit {
  constructor(name = "", icon = "", members = []) {
    Object.assign(this, arguments);
  }
}

export class System {
  constructor(name = "", icon = "", members = []) {
    Object.assign(this, arguments);
  }
}