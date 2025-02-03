import express from "express";
import cors from "cors";
import taskRoutes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT; //|| 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

