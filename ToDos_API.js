const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const todos = [
  {
    id: "0",
    name: "node js",
    isCompleted: false
  },
  {
    id: "1",
    name: "Express js",
    isCompleted: false
  }
];

const done=[]

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
    console.log("in task/id");
    console.log((req.url).replace("/tasks/", ""));
    let id = (req.url).replace("/tasks/", "");
    console.log(typeof (Number(id)));
    id = Number(id);

    if(id>todos.length-1){
      res.statusCode = 404;
      res.end("task not found")
    }
    else{
      let s = "";
      res.setHeader("Content-Type", "text/html");
      const status = todos[id].isCompleted ? "completed" : "not completed";
      s = `The task named ${todos[id].name} is ${status}`;
      res.end(s);
    }
  }

  // To tick as done or undone
  else if (/tasks\/[0-9]+$/.test(req.url) && req.method === "PUT") {
    res.statusCode = 200;
    console.log("in task/id");
    console.log((req.url).replace("/tasks/", ""));
    let id = (req.url).replace("/tasks/", "");
    console.log(typeof (Number(id)));
    id = Number(id);

    if(id>todos.length-1){
      res.statusCode = 404;
      res.end("task not found")
    }
    else{
      todos[id].isCompleted = !(todos[id].isCompleted)
      let s = "";
      todos.forEach(todo => {
        s += (todo.name + "|| Is completed: " + todo.isCompleted + "\n");
      });
      res.end(s);
    }
  }

  // To delete or remove all done tasks
  else if (req.url=="/tasks/deldone" && req.method==="DELETE"){
    res.statusCode=200;
    console.log("in task/deldone")
    let deIndex=0
    todos.forEach(todo=> {
      if (todo.isCompleted){
        done.push(todo)
        todos.splice(todo.id,1)
        deIndex+=1
      }
      else{
        todo.id=String(todo.id-deIndex)
      }
    });
    let s = "";
    todos.forEach(todo => {
      s += (todo.name + "|| Is completed: " + todo.isCompleted + "\n");
    });
    res.end(s);
    console.log(todos)
    console.log(done)
  }


});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
