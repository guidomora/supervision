import { envs } from "./config/plugins/envs.plugins";
import { MongoDatabase } from "./data/mongo/init";
import { Server } from "./presentation/server"
import 'dotenv/config'
import { LogModel } from './data/mongo/models/log.model';



(async() => {
    main()
})()

async function main() {
    // conexion a la base de datos
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    })


    // const newLog = await LogModel.create({
    //     message: "Hola mundo",
    //     origin: "App.ts",
    //     level: "low",
    // })
    // await newLog.save()
    // console.log(newLog);

    // const logs = await LogModel.find()
    // console.log(logs);
    
    


    Server.start()
    console.log(envs.PORT);
    
}


// Estructura de la app
// -config: objetos o cosas que son globales, plugims
// -domain: reglas con las cuales va a regir la app (origienes de datos, como lucen las entidades,
//          como trabajar con mis datasources, casos de usos)
// -infrastructure: ya tenemos las implementaciones del repositorio, de los datasources
// -presentation: cosas que estan bien cerca de la consola y del usuario