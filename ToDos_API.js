const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const todos = [
  {
    id: "1",
    name: "node js",
    isCompleted: false
  },
  {
    id: "2",
    name: "Express js",
    isCompleted: false
  }
];

const server = http.createServer((req, res) => {
  // To Display all the tasks in to do list
  if (req.url == "/tasks" && req.method === "GET") {
    res.statusCode = 200;
    let s = "";
    res.setHeader("Content-Type", "text/html");
    todos.forEach(todo => {
      s += (todo.name + "|| Is completed: " + todo.isCompleted + "\n");
    });
    res.end(s);
  }

  // To Create a task in to do list
  else if (req.url == "/tasks" && req.method === "POST") {
    console.log("Executing the code");
    let data = "";
    req.on("data", chunk => {
      data += chunk.toString();
    });
    req.on("end", () => {
      todos.push(JSON.parse(data));
      res.writeHead(200, { "Content-Type": "application/json" });
      const n = String(todos.length - 1);
      todos[n].id = n;
      todos[n].isCompleted = false;
      console.log(todos);
      let s = "";
      todos.forEach(todo => {
        s += (todo.name + "|| Is completed: " + todo.isCompleted + "\n");
      });
      res.end(s);
    });
  }

  // To Display a particular task in to do list
  else if (/tasks\/[0-9]+$/.test(req.url) && req.method === "GET") {
    res.statusCode = 200;
    console.log("in tast/id");
    console.log((req.url).replace("/tasks/", ""));
    let id = (req.url).replace("/tasks/", "");
    console.log(typeof (Number(id)));
    id = Number(id);

    let s = "";
    res.setHeader("Content-Type", "text/html");
    const status = todos[id].isCompleted ? "completed" : "not completed";
    s = `The task named ${todos[id].name} is ${status}`;
    res.end(s);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
