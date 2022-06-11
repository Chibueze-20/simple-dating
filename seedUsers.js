const { trusted } = require("mongoose");
const { Roles } = require("./constants");
const Wives = [
  {
    username: "abby341",
    password: "Password12*",
    canCook: false,
    canClean: false,
    city: "London",
    role: Roles.User,
  },
  {
    username: "badhie.kelly",
    password: "Password12*",
    canCook: true,
    canClean: false,
    city: "Togo",
    role: Roles.User,
  },
  {
    username: "terris",
    password: "Password12*",
    canCook: true,
    canClean: true,
    city: "Texas",
    role: Roles.User,
  },
  {
    username: "AngieBaby",
    password: "Password12*",
    canCook: false,
    canClean: true,
    city: "Lagos",
    role: Roles.User,
  },
  {
    username: "chinemelum",
    password: "Password12*",
    canCook: true,
    canClean: true,
    city: "Abuja",
    role: Roles.User,
  },
  {
    username: "michie",
    password: "Password12*",
    canCook: false,
    canClean: false,
    city: "Melbourne",
    role: Roles.User,
  },
];
const Husbands = [
  {
    username: "freshBoyLee",
    password: "Password12*",
    canCook: false,
    canClean: false,
    city: "London",
    role: Roles.Bachelor,
  },
  {
    username: "mrPaul",
    password: "Password12*",
    canCook: false,
    canClean: false,
    city: "London",
    role: Roles.Bachelor,
  },
];
const admins = [
  {
    username: "admin",
    password: "Password12*",
    canCook: false,
    canClean: false,
    city: "Dublin",
    role: Roles.Admin,
  },
];

const User = require("./user");
const actions = async () => {
  try {
    const count = await User.count({});
    if (count > 0) {
      await User.deleteMany({});
    }
    await User.bulkSave(await User.create(Wives));
    await User.bulkSave(await User.create(Husbands));
    await User.bulkSave(await User.create(admins));
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  actions,
};
