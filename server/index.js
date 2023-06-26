import express from 'express';

import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';
import { register } from './controllers/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import { verifyToken } from './middleware/auth.js';
import { createPost } from './controllers/posts.js';
import User from './models/User.js';
import Post from './models/Post.js';
import { users, posts } from './data/index.js';

// { } => importing a particular function present in a file which has multiple functions, createPost is the only function needed from posts, in index.js

/* middle ware package configuration */

const __filename = fileURLToPath(import.meta.url); // grab file url while using modules
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors()); //invoke cross origin sharing policies
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
//set the directory of assets like images, assets being stored locally

/* file storage */
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, 'public/assets');
  },
  filename: function (req, res, cb) {
    cb(null, file.originalname);
  },
});
//all files being uploaded to the website will be stored locally in the directory public/assets

const upload = multer({ storage }); //anytime we "upload" itll store locally

/*routes with files */

app.post('/auth/register', upload.single('picture'), register);
app.post('/posts', verifyToken, upload.single('picture'), createPost);

// sets property and graps from front end and uploads

//upload picture locally upload done before it hits register endpoint

//this route put here due to the upload hence cannot be moved to routes folder

/*route */
app.use('/auth', authRoutes); //prefix

/*user routes */
// grab individual user

//grab any user via id

//get user friends

//add remove friends

app.use('/users', userRoutes);

/* post routes */
app.use('/posts', postRoutes);

/* Mongoose Set up */

const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`server Port : ${PORT}`));

    /*Add data once */
    // User.insertMany(users);
    // Post.insertMany(posts); 
  })
  .catch((error) => console.log(`${error} did not connect`));
