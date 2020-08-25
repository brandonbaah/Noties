const fs = require('fs')
const chalk = require('chalk')
log = console.log

const readNote = (title) => {
  const notes = loadNotes()
  const foundNote = notes.find((note) => note.title === title)

  if(foundNote){
    log(`${foundNote.title} : ${foundNote.body}`)
  }else{
    log(chalk.bgRed('No note found.'))
  }


}
const getNotes = () => "Your notes..."

const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNote = notes.find((note) => note.title === title)


  debugger 

  if (!duplicateNote) {
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
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
}