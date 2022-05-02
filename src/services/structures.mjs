export class User {
  constructor(
    name = "",
    icon = "",
    orbits = [],
    systems = [],
    friends = [],
    invitations = [],
    attractions = [],
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

export class Attraction {
  constructor(organizer = "", name = "", location = "", expiration = new Date()) {
    Object.assign(this, arguments);
  }
}

export class Invitation {
  constructor(organizer = "", name = "", location = "", expiration = new Date();) {
    Object.assign(this, arguments);
  }
}