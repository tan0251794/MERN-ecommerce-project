const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
app.use(cors());
app.use(express.json());

const uri = process.env.mongoose_ATLAS
mongoose.connect(uri, {
  useNewUrlParser: true,
  userCreateIndex: true
}); 
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("Kết nối MongoDB thành công!");
});

const port = process.env.POST || 5000;
app.listen(port, () => {
    console.log(`server is running at port: ${port}`)
})

const productRouter = require("./routes/product");
app.use("/product", productRouter );
const shopRouter = require("./routes/shop");
app.use("/shop", shopRouter );
const userRouter = require("./routes/user");
app.use("/user", userRouter );
const bigRouter = require("./routes/big");
app.use("/big", bigRouter );
const smallRouter = require("./routes/small");
app.use("/small", smallRouter );
const billRouter = require("./routes/bill");
app.use("/bill", billRouter );


//upload
const uploadRouter = require("./routes/upload");
app.use("/upload", uploadRouter );