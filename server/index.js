const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const cors = require("cors");
app.use(cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    })
);

const pool = require("./db");
const bcrypt = require("bcrypt");
const { response } = require('express');
const saltRounds = 10

const session = require("express-session")

app.use(session({
        key: "tucano",
        secret: "unused",
        resave: false,
        saveUninitialized: true,
        cookie: {
            expires: 60*60*24*1000
        }
    })
);

const jwt = require('jsonwebtoken')
require('dotenv').config()


app.get("/", async (req, res) => {
    try {
        const fullData = await pool.query('SELECT user_id, user_name, full_name, user_title, user_email, phone_number, description, resume_date, user_institution, user_location, user_tags, resume_validation FROM "candidateUsers"')
        res.send(fullData.rows)
        
    } catch (error) {
        res.send(error)
    }
})

app.get("/database/search", async (req, res) => {
    const { dataDescripion } = req.query
    try {
        const fullData = await pool.query(`SELECT * FROM "candidateUsers" WHERE user_tags LIKE $1`, ["%" + dataDescripion + "%"])
        res.send(fullData.rows)
        
    } catch (error) {
        res.send(error)
    }
})

app.get("/candidate/details/:id", async (req, res) => {
    const { id } = req.params
    
    try {
        const fullData = await pool.query('SELECT user_id, user_name, full_name, user_title, user_email, phone_number, description, resume_date, user_institution, user_location, user_tags, resume_validation FROM "candidateUsers" WHERE user_id=$1', [id])
        res.send(fullData.rows)
        
    } catch (error) {
        res.send(error)
    }

})

// app.post("/database", (req, res) => {
//     const data = req.body
//     const newCandidate = (`The user ${data.name} is ${data.age} years old, and has an ID of ${data.id}!`)
//     res.send(newCandidate)
// })

// app.delete('/database/:id', (req, res) => {
//     const dataValue = req.params

//     const dataDelete = candidates.find((dataDelete) => dataDelete.id === Number(dataValue.id))
//     if (!dataDelete) {
//         return res.status(404).send(`No person with id ${dataValue.id}`)
//     }

//     const deleteCandidate = (`Delete person with name: ${dataDelete.name}, age: ${dataDelete.age}, email: ${dataDelete.email}, ID: ${dataDelete.id}`)

//     return res.send(deleteCandidate)
// })

//LOGIN


function setJWT(userData){
    const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET)
    return accessToken
}

const verifyAuthentication = (req, res, next) => {
    const token = req.headers['token']
    if(!token) res.send("Not logged")
    else{
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, result) => {
            if(err) res.send("Invalid token")
            else{
                res.send({user_name: result.user_name, user_id: result.user_id})
                next()
            }
        })
    }
}

const profileAuthentication = async (req, res, next) => {
    const token = req.headers['token']
    let verifyResult = "";
    if(!token) res.send("Not logged")
    else{
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, result) => {
            if(err) {
                res.send("Invalid token")
                next()
            }
            else{
                verifyResult = result
            }
        })
    }
    try {
        const fullData = await pool.query('SELECT * FROM "candidateUsers" WHERE user_id=$1', [verifyResult.user_id])
        if(fullData.rows.length > 0){
            const userObject = {
                user_id: fullData.rows[0].user_id,
                user_name: fullData.rows[0].user_name,
                full_name: fullData.rows[0].full_name,
                user_title: fullData.rows[0].user_title,
                user_email: fullData.rows[0].user_email,
                phone_number: fullData.rows[0].phone_number,
                description: fullData.rows[0].description,
                user_institution: fullData.rows[0].user_institution,
                user_location: fullData.rows[0].user_location,
                resume_date: fullData.rows[0].resume_date,
                user_tags: fullData.rows[0].user_tags,
                profile_picture: fullData.rows[0].profile_picture,
                pdf_link: fullData.rows[0].pdf_link,
                youtube_link: fullData.rows[0].youtube_link,
                resume_validation: fullData.rows[0].resume_validation
            }
            res.send(userObject)
            next()
        }
        else {
            res.send("User do not exist!")
            next()
        }
    }
    catch(err){
        //console.log(err)
        res.send("An error has occurred!")
        next()
    }
}

async function getUserData(userName){
    try {
        const result = await pool.query('SELECT * FROM "candidateUsers" WHERE user_name=$1', [userName])
        if(result.rows.length > 0) return(result.rows[0])
        else return("User do not exist!")
    }
    catch(err){
        //console.log(err)
        return("An error has occurred!")
    }
}

app.post("/register", async (req, res) => {
    try{
        const { userName, password } = req.body;

        const search_result = await getUserData(userName)

        if(search_result==="An error has occurred!") res.send("An error has occurred!")

        else if(userName.length < 2) res.send("Name too small")

        else if(password.length < 8) res.send("Password too small")
        
        else if(search_result==="User do not exist!"){

            pool.query('SELECT * FROM "candidateUsers" WHERE user_name=$1', [userName], (err, result) =>{
                    bcrypt.hash(password, saltRounds, (err, hash) => {
                        pool.query('INSERT INTO "candidateUsers" (user_name, user_password, resume_validation) VALUES($1, $2, $3) RETURNING *', [userName, hash, false]);
                    })
            });
            const new_result = await getUserData(userName)
            
            const jwtToken = setJWT(
                {user_id: new_result.user_id, 
                    user_name: new_result.user_name, 
                    user_password: new_result.user_password
                })
            res.send({token: jwtToken})
            //res.send("Welcome " + new_result.user_name + "! Your id number is: " + new_result.user_id + "!")
        }
        else res.send("User already exist!")
    }
    catch(err){
        //console.log(err)
        return("An error has occurred!")
    }
});

app.post("/login", async (req, res) => {
    const { userName, password } = req.body;

    if(userName.length < 2) res.send("Name too small")
    else if(password.length < 8) res.send("Password too small")
    else{
        try {
            const result = await pool.query('SELECT * FROM "candidateUsers" WHERE user_name=$1', [userName])

            if(result.rows.length > 0) {
                bcrypt.compare(password, result.rows[0].user_password, (error, response) => {
                    if(response){
                        //req.session.user = result.rows[0]
                        //console.log(req.session.user)
                        const jwtToken = setJWT(
                            {user_id: result.rows[0].user_id, 
                                user_name: result.rows[0].user_name, 
                                user_password: result.rows[0].user_password
                            })
                        res.send({token: jwtToken})
                    }
                    else res.send("Wrong password!")
                })
            }
            else res.send("User do not exist!")

        } catch (error) {
            //console.log(err)
            res.send("An error has occurred!")
        }
    }
});
app.get("/logged", verifyAuthentication, (req, res) => {

})

app.get("/profile", profileAuthentication, (req, res) => {

})

// app.get("/profile", (req, res) => {
//     if(req.session.user){
//         res.send("Logged")
//         console.log(req.session.user)
//         // console.log(req.session.cookie._expires)
//         // req.session.cookie.expires = new Date(Date.now() + 5 * 1000)
//         // console.log(req.session.cookie._expires)
//     }
//     else{
//         res.send("Not logged")
//     }
// })

//LISTEN

app.put("/database/:name", async (req, res) => {
    const dataValue = req.params
    const dataNew = req.body
    const token = dataNew.token
    const search_result = await getUserData(dataValue.name)
    
    if(search_result==="An error has occurred!") res.send("An error has occurred!")
    else if(search_result==="User do not exist!") res.send("User do not exist!")
    else{
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, result) => {
            if(err) res.send("Invalid token")
            else{
                pool.query('UPDATE "candidateUsers" SET full_name=$1, user_title=$2, user_email=$3, phone_number=$4, description=$5, resume_date=$6, user_institution=$7, user_location=$8, user_tags=$9, resume_validation=$10 WHERE user_name=$11;', 
                [dataNew.full_name, dataNew.user_title, dataNew.user_email, dataNew.phone_number, dataNew.description, dataNew.resume_date, dataNew.user_institution, dataNew.user_location, dataNew.user_tags, true, dataValue.name], (err, result) =>{
                    if(err) res.send(err)
                    else res.send("Success")
                });
            }
        })
    }

})

const profileDelete = async (req, res, next) => {
    const token = req.headers['token']
    const dataValue = req.headers['user_name']
    const search_result = await getUserData(dataValue)
    
    if(search_result==="An error has occurred!") res.send("An error has occurred!")
    else if(search_result==="User do not exist!") res.send("User do not exist!")
    else{
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, result) => {
            if(err) res.send("Invalid token")
            else{
                pool.query('DELETE FROM "candidateUsers" WHERE user_name IN ($1);', 
                [dataValue], (err, result) =>{
                    if(err) res.send(err)
                    else res.send("Success")
                });
            }
        })
    }
    next()
}

app.delete("/database", profileDelete, (req, res) => {
    
})

app.listen(5000, () => {
    console.log('Server is online on port 5000...')
})