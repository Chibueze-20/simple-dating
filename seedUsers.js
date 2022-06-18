const { Roles } = require("./constants");
const Wives = [
  {
    username: "abby341",
    password: "Password12*",
    canCook: false,
    canClean: false,
    city: "London",
    partner : null,
    profilePic : "",
    role: Roles.User,
  },
  {
    username: "badhie.kelly",
    password: "Password12*",
    canCook: true,
    canClean: false,
    city: "Togo",
    partner : null,
    profilePic : "",
    role: Roles.User,
  },
  {
    username: "terris",
    password: "Password12*",
    canCook: true,
    canClean: true,
    city: "Texas",
    partner : null,
    profilePic : "",
    role: Roles.User,
  },
  {
    username: "AngieBaby",
    password: "Password12*",
    canCook: false,
    canClean: true,
    city: "Lagos",
    partner : null,
    profilePic : "",
    role: Roles.User,
  },
  {
    username: "chinemelum",
    password: "Password12*",
    canCook: true,
    canClean: true,
    city: "Abuja",
    partner : null,
    profilePic : "",
    role: Roles.User,
  },
  {
    username: "michie",
    password: "Password12*",
    canCook: false,
    canClean: false,
    city: "Melbourne",
    partner : null,
    profilePic : "",
    role: Roles.User,
  },
];
const Husbands = [
  {
    username: "freshBoyLee",
    password: "Password12*",
    canCook: false,
    canClean: true,
    city: "London",
    partner : null,
    profilePic : "",
    isWorking : true,
    role: Roles.Bachelor,
  },
  {
    username: "mrPaul",
    password: "Password12*",
    canCook: true,
    canClean: false,
    city: "London",
    partner : null,
    profilePic : "",
    isWorking : false,
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
  actions
};
