import mongoose from "mongoose";

class Database {
    private static instance: Database;

    private constructor() {
        mongoose.connect("mongodb://localhost:27017/secure-api")
        .then(() => console.log("Conectado a MongoDB"))
        .catch((err) => console.error("Error de conexión:", err));
    }

    static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

export const db = Database.getInstance();
