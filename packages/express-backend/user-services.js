import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

// function getUsers(name, job) {
//   let promise;
//   if (name === undefined && job === undefined) {
//     promise = userModel.find();
//   } else if (name && !job) {
//     promise = findUserByName(name);
//   } else if (job && !name) {
//     promise = findUserByJob(job);
//   }
//   return promise;
// }

function getUsers(name, job) {
    let query = {};
  
    if (name) {
      query.name = name;
    }
  
    if (job) {
      query.job = job;
    }
  
    return userModel.find(query);
}

function findUserById(id) {
  return userModel.findById(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  return userToAdd.save();
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}

function findUsersByNameAndJob(name, job) {
    return userModel.find({ name: name, job: job });
}

function deleteUserById(id) {
    return userModel.findByIdAndDelete(id)
      .then((result) => {
        if (result) {
          console.log(`User with ID ${id} deleted successfully.`);
          return true;
        } else {
          console.log(`User with ID ${id} not found.`);
          return false;
        }
    })
    .catch((error) => {
        console.error("Error deleting user by ID:", error);
        throw error; // Propagate the error to the caller
    });
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  findUsersByNameAndJob,
  deleteUserById,
};