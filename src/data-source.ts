import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Profile } from "./entity/Profile";
import { Post } from "./entity/Post";
import { Group } from "./entity/Group";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "svc_typeorm",
    password: "password",
    database: "db_typeorm",
    synchronize: true,
    logging: false,
    entities: [User, Profile, Post, Group],
    migrations: [],
    subscribers: [],
})
