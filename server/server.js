const express = require('express');
const app = express();
// const cors = require('cors');

app.use(express.json());

// Allow all origins
// app.use(cors());
// Allow specific origin(s)
// app.use(cors({
//   origin: 'https://splititapp-pi.vercel.app/'
// }));

require('dotenv').config();
const dbconfig = require('./config/dbConfig');
const port = process.env.PORT || 5000;


const usersRoute = require('./routes/usersRoutes');
const groupsRoute = require('./routes/groupsRoute');
const expenseRoute = require('./routes/expenseRoute');
const settlementRoute = require('./routes/settlementRoute');

app.use('/api/users',usersRoute);
app.use('/api/groups',groupsRoute);
app.use('/api/expense',expenseRoute);
app.use('/api/settlement',settlementRoute);



// deployment config
const path = require("path");
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}


app.listen(port,()=>console.log(`Node/express JS Server started on port ${port}`));