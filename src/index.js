import { app } from './app.js';
import { connectToDB } from './db/db.js';


connectToDB()
.then((res)=>{
    app.on('err',(err)=>{
        console.log(err);
        process.exit(1);
    });
    const port = process.env.PORT;
    app.listen(port ,()=>{
        console.log(`server started on http://localhost:${port}/`);
    });
})
.catch((err)=>{
    console.log(err);
    process.exit(1);
})
