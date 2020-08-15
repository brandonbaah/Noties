const fs = require('fs')
const chalk = require('chalk')
log = console.log

const getNotes = function () {
  return "Your notes..."
}

const addNote = function (title, body) {
  const notes = loadNotes()
  const duplicateNotes = notes.filter(function(note) {
    return note.title === title
  })

  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body
    })
  
    saveNotes(notes)
    console.log('New note added!')
  } else {
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
  
  const notes = loadNotes()

  const notesToKeep = notes.filter(function(note) {
    return title !== note.title
  })

  if (notesToKeep.length < notes.length){
    log(chalk.bgGreen('Note removed!'))
    saveNotes(notesToKeep)
  } else {
    log(chalk.bgRed('No note found!'))
  }
  

}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote
}