import app from "./app";
import configs from "./config";

app.listen(configs.port, () => {
  console.log(`API Gateway running on: ${configs.port}`);
});

