const UserModel = require("./user");

const CreateUser = async (obj) => {
  try {
    const user = new UserModel(obj);
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};
const Login = async (username, password) => {
  try {
    const user = await UserModel.findOne({ username, password });
    return user;
  } catch (error) {
    throw error;
  }
};

const Marry = async (userId, partnerId) => {
  try {
    console.log(userId, partnerId)
    const user = await UserModel.findByIdAndUpdate(userId, {partner : partnerId})
    console.log(user)
    return user
  } catch (error) {
    throw error
  }
}

const Query = async (query = {}) => {
  try {
    const data = await UserModel.find(query);
    return data;
  } catch (error) {
    throw error;
  }
};
const GetById = async (id) => {
  try {
    const user = await UserModel.findById(id);
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  CreateUser,
  Login,
  Marry,
  Query,
  GetById,
};
