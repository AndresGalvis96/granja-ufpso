import express from "express";
import bodyParser from "body-parser"
import router from "../routes/index.routes.js";
import middle from '../middlewares/index.middleware.js'
import pgService from "../services/pg.services.js";
import { exports } from "./default.js";
import { login } from '../controller/auth.controller.js';
export default class Server{

    constructor(){

        this.app=express();
        this.port= exports.port
    }
    async conecctionDb(){
        new pgService();
    }

    middleware(){
        this.app.use(bodyParser.json());
        this.app.use(middle);
        this.app.use(express.json());

        this.app.set('view engine', 'ejs');
        this.app.use(express.static('views'));

    }

    routes(){
        this.app.use(express.urlencoded({ extended: true }));


        this.app.post('/auth/login', login);


        this.app.use(router);
        this.app.get("/animales", (req, res) => {
            res.render("animales");
        });

        this.app.get('/', (req, res) => {
            res.render('index', { title: 'Página de inicio' });
        });

        router.get('/bienvenido', (req, res) => {
            const token = req.query.token;
            if (token) {
                res.render('bienvenido', { title: '¡Bienvenido!', token: token });
            } else {
                res.redirect('/');
            }
        });

    }

    runserver(){
        this.app.listen(this.port ,()=>{
            console.log("Corriendo en puerto: ", this.port)
        })
    }

    load(){
        this.conecctionDb();
        this.middleware();
        this.routes();
        this.runserver();
    }
}