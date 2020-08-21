const fs = require('fs')
const chalk = require('chalk')
log = console.log

const getNotes = () => "Your notes..."

const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNotes = notes.filter((note) => note.title === title)

  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body
    })
  
    saveNotes(notes)
    log(chalk.bgGreen('New note added!'))
  } else {
    log(chalk.bgRed('Note title taken!'))
  }

  
}

const saveNotes = (notes) => {
  noteJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', noteJSON)
}
 
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (error) {
    return []
  }

  
}

const removeNote = (title) => {
  
  const notes = loadNotes()

  const notesToKeep = notes.filter((note) => title !== note.title)

  if (notesToKeep.length < notes.length){
    log(chalk.bgGreen('Note removed!'))
    saveNotes(notesToKeep)
  } else {
    log(chalk.bgRed('No note found!'))
  }
  

}

const listNotes = () => {
  const notes = loadNotes()
  log(chalk.bgYellow.inverse("Your Notes"))
  notes.forEach(note => console.log(note.title))

}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes
}