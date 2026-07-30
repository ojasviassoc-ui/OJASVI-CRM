import app from "./app.js";
import { env } from "./config/env.js";

app.listen(env.PORT, () => {
  console.log(`
====================================
   OJASVI CRM Backend Started
====================================
Environment : ${env.NODE_ENV}
Port        : ${env.PORT}
====================================
`);
});