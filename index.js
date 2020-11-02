const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;

const expressLayouts=require('express-ejs-layouts');

const db=require('.config/mongoose');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');

const MongoStore=require('connect-mongo')(session);

app.use(express.urlencoded());

app.use(cookieParser());
app.use(express.static('./assets'))

app.use(expressLayouts);
app.set('layout extractStyle',true);
app.set('layout extractScript',true);


app.set('view engine', 'ejs');
app.set('views','./views')

//mongostore use to store the session cookie in the data
app.use(session({
    name:'codiel',
    //change the secret before the deployment in product mode

    secret:'blahsomthing',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(100*60*100)
    },
    store:new MongoStore(
        {
        mongooseConnection:db,
        autoRemove:'disabled'
    },
    function(err){
        console.log(err|| 'connect-mongodb setup ok');
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express routes
app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server ${err}` );
    }
        console.log(`server is running on port : ${port}`);
    
});