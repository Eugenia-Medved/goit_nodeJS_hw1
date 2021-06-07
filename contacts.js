const fs = require('fs');
const path = require('path');
const ids = require('short-id');



const contactsPath = path.join(__dirname, './db/contacts.json');



function listContacts() {
    fs.readFile(contactsPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        console.table(data);
      })
    
  }
  
  function getContactById(contactId) {
    fs.readFile(contactsPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        const contacts = JSON.parse(data)
        const contact = contacts.find(contact => JSON.stringify(contact.id) === JSON.stringify(contactId));
        return console.log(contact);
      })


  }
  
  function removeContact(contactId) {
    fs.readFile(contactsPath, 'utf8', (err, data) => {
       
        if (err) {
            throw err;
        }
        const contacts = JSON.parse(data).filter(contact => JSON.stringify(contact.id)  !== JSON.stringify(contactId));

        fs.writeFile(contactsPath, JSON.stringify(contacts, null, '\t'), 'utf8', err => {
            if (err) {
                throw err;
            }
            listContacts()
      })
      
 })}
  
  function addContact(name, email, phone) {
      const user = {
          id: ids.generate(),
          name,
          email,
          phone
      }

      fs.readFile(contactsPath, 'utf8', (err, data) => {
                if (err) {
            throw err;
        }
        const contacts = JSON.parse(data);
        const users = [...contacts, user]

        fs.writeFile(contactsPath, JSON.stringify(users, null, '\t'), 'utf8', err => {
            if (err) {
                throw err;
            }
            listContacts()
      })


 })
  };

  const contacts = { 
      listContacts, 
      addContact,
      removeContact,
      getContactById
    };
    module.exports = contacts;