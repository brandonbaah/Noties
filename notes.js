const fs = require('fs')

const getNotes = function () {
  return "Your notes..."
}

const addNote = function (title, body) {
  const notes = loadNotes()

  notes.push({
    title: title,
    body: body
  })

  saveNotes(notes)
}

const saveNotes = function (notes) {
  noteJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', noteJSON)
}
 
const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (error) {
    return []
  }

  
}

module.exports = {
  getNotes: getNotes,
  addNote: addNote
}