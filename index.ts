// All the code should be in this file and you won't need to use any external library

// Use 'npx tsx filename.ts' to run your code
// You can run the code as many times as you want

// If you have any question please ask the interviewer instead of searching on the internet
 

class ORM {

    tables;
    tableIds;

    constructor() {
        this.tables = {};
        this.tableIds = {};
    }


    createTable(tableName, schema) {
        if (!this.tables[tableName]) {
            this.tables[tableName] = { schema, data: [] }
        }

        this.tableIds[tableName] = {id: 0};
    }
	

    getTables() {
        return Object.keys(this.tables);
    }


    table(tableName) {
        const table = this.tables[tableName];

        if (table) {
            return {
                insert: (data) => {
                    Object.entries(this.table[tableName].schema).forEach(([key, value]) => {
                        if (value == )
                    })

                    const id = this.tableIds[tableName].id += 1
                    const newEntry = {id, ...data}
                    table.data.push(newEntry);
                    return newEntry;
                },
                getAll: () => table.data,
                deleteById: (id) => {
                    const item = table.data.find((item) => item.id == id);
                    const index = table.data.indexOf(item);
                    table.data.splice(index, 1);
                    return item;
                },
                update: (id, newData) => {
                    let itemToUpdate = table.data.find((item) => item.id == id);
                    itemToUpdate = {...itemToUpdate, ...newData};
                    return itemToUpdate;
                }
            }
        }
    }
}

// All your code and changes should be above this line
const orm = new ORM()

orm.createTable('users', {
	// Consider that id will always exist and always will be primaryKey and autoIncrement
  id: { type: 'integer', primaryKey: true, autoIncrement: true },
  name: { type: 'text', notNull: true },
  email: { type: 'text', notNull: true },
})

orm.createTable('messages', {
  id: { type: 'integer', primaryKey: true, autoIncrement: true },
  title: { type: 'text', notNull: true },
	description: { type: 'text', notNull: true },
})

console.log('getTables:', orm.getTables())
// getTables: [ 'users', 'messages' ]

console.log('insert:', orm.table('users').insert({ name: 'John Doe', email: 'john.doe@email.com' }))
// insert: { id: 1, name: 'John Doe', email: 'john.doe@email.com' }

console.log('insert:', orm.table('users').insert({ name: 'Jane Doe', email: 'jane.doe@email.com' }))
// insert: { id: 2, name: 'Jane Doe', email: 'jane.doe@email.com' }

console.log('getAll:', orm.table('users').getAll())
// getAll: [
//   { id: 1, name: 'John Doe', email: 'john.doe@email.com' },
//   { id: 2, name: 'Jane Doe', email: 'jane.doe@email.com' }
// ]

console.log('delete:', orm.table('users').deleteById(2))
// delete: { id: 2, name: 'Jane Doe', email: 'jane.doe@email.com' }

console.log('getAll:', orm.table('users').getAll())
// getAll: [ { id: 1, name: 'John Doe', email: 'john.doe@email.com' } ]

console.log('insert:', orm.table('users').insert({ name: 'Joseph Doe', email: 'joseph.doe@email.com' }))
// insert: { id: 3, name: 'Joseph Doe', email: 'joseph.doe@email.com' }

console.log('getAll:', orm.table('users').getAll())
// getAll: [ 
//    { id: 1, name: 'John Doe', email: 'john.doe@email.com' },
//    { id: 3, name: 'Joseph Doe', email: 'joseph.doe@email.com' }
// ]

console.log('update:', orm.table('users').update(1, { name: 'John Doe Updated' }))
// update: { id: 1, name: 'John Doe Updated', email: 'john.doe@email.com' }

console.log('getAll', orm.table('users').getAll())
// getAll: [ 
//    { id: 1, name: 'John Doe Updated', email: 'john.doe@email.com' },
//    { id: 3, name: 'Joseph Doe', email: 'joseph.doe@email.com' }
// ]

/* 
 * *************
 * *** BONUS ***
 * *************
 */

console.log('\n BONUS \n')

console.log('insert:', orm.table('messages').insert({ description: 'A message description' }))
// insert: Invalid: title cannot be null

console.log('insert:', orm.table('users').insert({ name: 'John Doe' }))
// insert: Invalid: email cannot be null

console.log('insert:', orm.table('users').insert({ name: 10, email: 'john.doe@email.com' }))
// insert: Invalid: name must be a string

console.log('update:', orm.table('users').update(3, { name: 10 }))
// update: Invalid: name must be a string

console.log('update:', orm.table('users').update(3, { name: 'Other', lastName: 'Person' }))
// update: Invalid: lastName doesnt exists on schema

console.log('insert:', orm.table('messages').insert({ name: 'John Doe' }))
// insert: Invalid: name doesnt exists on schema