import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

// API Endpoints
//get all the tasks
app.get("/api/tasks", async (req, res) => {
    try {
      const tasks = await prisma.task.findMany();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  });

//get a single task by ID
app.get("/api/tasks/:id", async (req, res) => {
    try {
        const taskId = parseInt(req.params.id, 10);
        const tasks = await prisma.task.findUnique({ where: { id: taskId } });
        res.status(200).json(tasks);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch tasks" });
      }
  });

//create a new task
app.post("/api/tasks", async (req,res)=>{
    try{
        const {title,color}=req.body;
        const newTask = await prisma.task.create({
            data: { title, color, completed: false },
          });
        res.status(201).json(newTask);
    }catch{
        res.status(500).json({error:"Failed to create task"})
    }
});

//update a new task completed
app.put("/api/tasks/:id", async (req, res) => {
    try{
        const taskId = parseInt(req.params.id, 10);
        const { title, color, completed } = req.body;
        const updatedTask = await prisma.task.update({
            where: { id: taskId },
            data: { title, color, completed },
        });
        res.status(200).json(updatedTask);

    }catch{
        res.status(500).json({error:"Failed to update task"});
    }
  
});

//delete a task
app.delete("/api/tasks/:id", async (req, res) => {
    try{
        const taskId = parseInt(req.params.id, 10);
        await prisma.task.delete({where: { id: taskId }});
        res.status(204).json({message: "Task deleted successfully"}).end();

    }catch{
        res.status(500).json({error:"Failed to update task"});
    }
});

// Toggle task completion
app.post("/api/tasks/:id/toggle", async ( req,res)=>{
    try{
        const taskId = parseInt(req.params.id, 10);
        const task = await prisma.task.findUnique({where: {id: taskId}});
        if(task){
            const updatedTask = await prisma.task.update({
                where: { id: taskId },
                data: { completed: !task.completed },
            });
            res.status(200).json(updatedTask);
        }else{
            res.status(404).json({error: "Task not found"});
        }
        
    }catch{
        res.status(500).json({error:"Failed to toggle task"});
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});