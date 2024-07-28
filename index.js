const cloudinary = require("cloudinary")
const express = require("express");
const dbConnect = require("./dbConnect");
const dotenv = require("dotenv");
const authRouter = require('./routers/authRouter');
const postsRouter = require('./routers/postsRouter');
const userRouter = require('./routers/userRouter');
const cookieParser = require('cookie-parser');
dotenv.config('./.env');
const app = express();
const morgan = require('morgan');
const { success } = require('./Uitils/responseWrapper');
const cors = require('cors')

          
cloudinary.config({ 
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
   api_key: process.env.CLOUDINARY_API_KEY, 
   api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(express.json({limit: '10mb'}))
app.use(morgan("common"))
app.use(cookieParser())
app.use(cors({
    
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],
   
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Type'],

}
))
app.options('*', cors())

app.use('/auth', authRouter)
app.use('/posts', postsRouter)
app.use('/user', userRouter)
app.get('/', (req, res) => {
    res.send(success(200, 'Ok from server'))
})

const PORT = process.env.PORT || 4001

dbConnect();

app.listen(PORT, () => {
    console.log(`listening on port : ${PORT}`);
})