const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

morgan.token('post-data', req => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ' '
})
app.use(cors())

app.use(express.json())
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :post-data'
  )
)

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345'
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122'
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  const date = new Date()
  response.send(`<p>Phonebook has info for ${persons.length}</p>
    <p>${date}</p>`)
})

const generateId = () => {
  const id = Math.floor(Math.random() * 5000)
  console.log(id)

  return id
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log(body)

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or body empty'
    })
  }
  const existing = persons.find(persons => persons.name === body.name)
  if (existing) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(person)
  console.log(persons)

  response.json(person)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
