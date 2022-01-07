const express = require('express')
const app = express()

const { candidates } = require('./candidates')

const cors = require("cors");
app.use(cors());

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get("/", (req, res) => {
    // const homePage = 
    // "<h2> Welcome to the HOME page! </h2>" + 
    // "<h3> Showing the latest candidates: </h3>"
    // let candidateList = ""
    // function displayForEachObj(data){
    //     candidateList =  `${candidateList}<p>The user ${data.name} is ${data.age} years old, and has an ID of ${data.id}!</p>`
    // }
    // candidates.forEach(displayForEachObj);
    
    res.send(candidates)
})

app.get("/database/search", (req, res) => {
    const { name, description } = req.query
    let nameCandidates = [...candidates]
    let descCandidates = [...candidates]

    if (name) {
        nameCandidates = nameCandidates.filter((data) => {
            return data.name.includes(name)
        })
    }
    
    if (description) {
        descCandidates = descCandidates.filter((data) => {
            return data.description.includes(description)
        })
    }
    
    let sortedCandidates = nameCandidates.concat(descCandidates)
    
    if (nameCandidates.length==[...candidates].length) sortedCandidates = nameCandidates

    if (sortedCandidates.length < 1) {
        return res.send("<h3> There's no candidates with this name or description!</h3>")
    }
    
    // const searchPage = 
    // "<h2> Welcome to the SEARCH page! </h2>" + 
    // "<h3> Showing the selected candidates: </h3>"
    
    // let candidateList = ""
    //  function displayForEachObj(data){
    //      candidateList =  `${candidateList}<p>The user ${data.name} is ${data.age} years old, and has an ID of ${data.id}!</p>`
    // }
    // sortedCandidates.forEach(displayForEachObj);
    
    // res.send(searchPage+candidateList)
    res.send(sortedCandidates)
})

app.get("/candidate/details/:id", (req, res) => {
    let selectedCandidate = [...candidates]
    const { id } = req.params
    selectedCandidate = selectedCandidate.filter((data) => {
        return data.id == id;
    })
    res.send(selectedCandidate)
})

app.post("/database", (req, res) => {
    const data = req.body
    const newCandidate = (`The user ${data.name} is ${data.age} years old, and has an ID of ${data.id}!`)
    res.send(newCandidate)
})

app.put("/database/:id", (req, res) => {
    const dataValue = req.params
    const dataNew = req.body

    const dataOld = candidates.find((dataOld) => dataOld.id === Number(dataValue.id))
    if (!dataOld) {
        return res.status(404).send(`No person with id ${dataValue.id}`)
    }

    const editedCandidate = (`Old: ${dataOld.name}, age: ${dataOld.age}, email: ${dataOld.email}, ID: ${dataOld.id} \n` + 
    `New: ${dataNew.name}, age: ${dataNew.age}, email: ${dataNew.email}, ID: ${dataValue.id}`)
    res.send(editedCandidate)
})

app.delete('/database/:id', (req, res) => {
    const dataValue = req.params

    const dataDelete = candidates.find((dataDelete) => dataDelete.id === Number(dataValue.id))
    if (!dataDelete) {
        return res.status(404).send(`No person with id ${dataValue.id}`)
    }

    const deleteCandidate = (`Delete person with name: ${dataDelete.name}, age: ${dataDelete.age}, email: ${dataDelete.email}, ID: ${dataDelete.id}`)

    return res.send(deleteCandidate)
})


app.listen(5000, () => {
    console.log('Server is online on port 5000...')
})