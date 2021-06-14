const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js password to\
      get a list of all entries, or node mongo.js password newName newNumber to add a new entry')
} if(process.argv.length === 4) {
  console.log('Please provide both the new name and the new number:\
                 node.js mongo.js password newName newNumber')
}

const password = process.argv[2]

const url = `mongodb+srv://persons:${password}@cluster0.ihwjg.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true,
  useFindAndModify: false, useCreateIndex: true })


const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)


if (process.argv.length === 3) {
  console.log('Phonebook: ')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name,  person.number)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then(result => {
    console.log(`Added ${result.name} number ${result.number}`)
    mongoose.connection.close()
  })
}