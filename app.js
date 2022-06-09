const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/todos", async (req, res) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos",
      {
        headers: {
          Accept: "accept",
          Authorization: "authorize",
        },
      }
    );
    if (response) {
      res.json(
        response.data.filter((e) => {
          delete e.userId;
          return e;
        })
      );
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${req.params.id}`,
      {
        headers: {
          Accept: "accept",
          Authorization: "authorize",
        },
      }
    );
    if (response) {
      const todoData = await axios.get(
        "https://jsonplaceholder.typicode.com/todos",
        {
          headers: {
            Accept: "accept",
            Authorization: "authorize",
          },
        }
      );
      console.log(req.params.id);
      const newArray = todoData.data.filter((e) => e.userId == req.params.id);
      delete response.data.username
      delete response.data.address
      delete response.data.website
      delete response.data.company
      response.data.todos=newArray
      //  console.log(response.data)
      
      res.json(response.data)
      
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(1027, () => {
  console.log("Running on port 1027");
});
