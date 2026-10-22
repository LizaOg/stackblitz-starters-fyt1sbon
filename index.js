import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from '@koa/router';
import ItemRouter from './item/item-router.js'



const app = new Koa(); //комплирует


app.use(bodyParser());
app.use(itemRouter.router());
app.use(itemRouter.allowMethods()); //техническая лабуда с подлкючением роутера и сервера

app.listen(3000); //создает в 3000 порту
