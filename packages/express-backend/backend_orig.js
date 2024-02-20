// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;
app.use(cors());
app.use(express.json())

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
};

const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
  };
  
app.get("/users", (req, res) => {
    const name = req.query.name;
    if (name != undefined) {
      let result = findUserByName(name);
      result = { users_list: result };
      res.send(result);
    } else {
      res.send(users);
    }
});

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

const generateRandomId = () => {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const randomLetters = Array.from({ length: 3 }, () => letters[Math.floor(Math.random() * letters.length)]);
  const randomNumbers = Math.floor(100 + Math.random() * 900); // Generates a random 3-digit number
  return `${randomLetters.join('')}${randomNumbers}`;
};

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};
  
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const userId = generateRandomId();
  userToAdd.id = userId;
  addUser(userToAdd);
  res.status(201).json(userToAdd);
});

const deleteUserById = (id) => {
  const index = users["users_list"].findIndex((user) => user["id"] === id);
  if (index !== -1) {
    users["users_list"].splice(index, 1);
    return true;
  }
  return false;
};

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  const deleted = deleteUserById(id);

  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).send("Resource not found.");
  }
});

const findUsersByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};

app.get("/users", (req, res) => {
  const { name, job } = req.query;

  if (name !== undefined && job !== undefined) {
    const result = findUsersByNameAndJob(name, job);
    res.send({ users_list: result });
  } else if (name !== undefined) {
    const result = findUserByName(name);
    res.send({ users_list: result });
  } else {
    res.send(users);
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});