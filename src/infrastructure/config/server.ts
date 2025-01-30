import dotenv from "dotenv"
dotenv.config()

import app from "./app";
const PORT = 3000;

let server: any = null;
if (require.main === module) {
  server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export { app, server };
