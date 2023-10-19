import app from './app.js'
import {PORT} from './config.js'
//app.use(connectionRouter)
//app.use(authorRouter)
app.set("title", "Servidor Corriendo");
app.set("PORT", PORT);
//Server
app.listen(app.get("PORT"));
console.log(
  `${app.get("title")}, en la url http://localhost:${app.get("PORT")}/`
);
