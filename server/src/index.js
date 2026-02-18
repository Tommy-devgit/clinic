import dotenv from "dotenv";
import app from "./app.js";
import { connectDatabase } from "./config/db.js";

dotenv.config();

const port = Number(process.env.PORT || 5000);

async function bootstrap() {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

bootstrap().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
