import express from "express"
import cors from 'cors';
import { GrowdeverController } from "./controllers/growdever.controller";

const app = express();

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.json({ message: "server is running" }))


const controller = new GrowdeverController();

app.post('/growdevers', controller.create);
app.get('/growdevers', controller.list);
app.get('/growdevers/:id', controller.getByUid);
app.delete('/growdevers/:id', controller.remove);
app.put('/growdevers/:id', controller.update);

app.listen(8080, () => console.log("Server is running"))