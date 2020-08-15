const fs = require('fs')

const getNotes = function () {
  return "Your notes..."
}

const addNote = function (title, body) {
  const notes = loadNotes()
  const duplicateNotes = notes.filter(function(note) {
    return note.title === title
  })

  if(duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body
    })
  
    saveNotes(notes)
    console.log('New note added!')
  }else {
    console.log('Note title taken!')
  }

  
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

const removeNote = function (title) {
  console.log(`Removing "${title}" from notes!`)
  
  const notes = loadNotes()

  
  const notesToKeep = notes.filter(function(note) {
    return title !== note.title
  })

 
  saveNotes(notesToKeep)

 


  // if(noteToDelete.length === 1) {
  //   notes.
  // }
}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote
}