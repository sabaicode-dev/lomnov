import app from "@/src/app"
import configs from "@/src/config";

function run() {
   app.listen(configs.port, () => {
     console.log(`User Service running on Port: ${configs.port}`)
   })
}

run();