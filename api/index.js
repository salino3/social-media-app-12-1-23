// npm i express mysql nodemon
// npm install bcryptjs
// npm install jsonwebtoken cors
// npm install cookie-parser
// npm i cookie    
// npm install moment
// npm i multer

import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import relationshipsRoutes from "./routes/relationships.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express();

// Middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true)
  next()
});
app.use(express.json());
app.use(cookieParser());



app.use(cors({
  origin: "http://localhost:3000"
}));


const storage = multer.diskStorage({
  destination: function (req, file, cb) { 
    cb(null, '../client/public/upload')
  }, 
  filename: function (req, file, cb) {
     
    cb(null, Date.now() + file.originalname )
  }
});

const upload = multer({storage: storage});

app.post('/api/upload', upload.single('file'), (req, res) => {
   const file = req.file;
  res.status(200).json(file.filename)
});
  
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/relationships", relationshipsRoutes);

app.listen(8090, () => {
  console.log("API working on port 8090");
});

 
 


