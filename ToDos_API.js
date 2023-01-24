const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

let todos =[
  {
    "id":"1",
    "name":"node js",
    "isCompleted":false
  },
  {
    "id":"2",
    "name":"Express js",
    "isCompleted":false
  }
]

const server = http.createServer((req, res) => {

  // To Display all the tasks in to do list 
  if(req.url=="/tasks" && req.method==="GET"){
    res.statusCode = 200;
    let s=""
    res.setHeader('Content-Type', 'text/html');
    todos.forEach(todo => {
      s+=(todo['name']+"|| Is completed: "+todo["isCompleted"]+"\n");
    });
    res.end(s)
  }

  // To Create a task in to do list
  else if(req.url=="/tasks" && req.method==="POST"){
    console.log("Executing the code")
    let data = ""
    req.on("data", chunk => {
        data+= chunk.toString()
    })
    req.on("end", ()=> {
        todos.push(JSON.parse(data))
        res.writeHead(200,{'Content-Type': 'application/json'})
        n=String(todos.length-1)
        todos[n]["id"]=n
        todos[n]["isCompleted"]=false
        console.log(todos)
        s=""
        todos.forEach(todo => {
          s+=(todo['name']+"|| Is completed: "+todo["isCompleted"]+"\n");
        });
        res.end(s)
    })
  }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});