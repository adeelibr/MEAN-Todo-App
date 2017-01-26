let express = require('express');
let router  = express.Router();

let mongojs = require('mongojs');
let db = mongojs('mongodb://adeel:test@ds153735.mlab.com:53735/meantodos', ['todos']);

// Endpoint api/todos
// Get All Todos
router.get('/', (req, res, next) => {
    db.todos.find((error, todos) => {
        if (error) {
            res.status(400).json({ error }).end();
        } else {
            res.status(200).json({ todos }).end();
        }
    });
});

// Endpoint api/todos/:id
// Get A Todo By Id
router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    db.todos.findOne({ _id: mongojs.ObjectId(id) }, (error, todo) => {
        if (error) {
            res.status(400).json({ error }).end();
        } else {
            res.status(200).json({ todo }).end();
        }
    });
});

// Endpoint api/todos/
// Add A New Todo
router.post('/', (req, res, next) => {
    let todo = {
        text: req.body.text,
        isCompleted: req.body.isCompleted,
    };
    if (!todo.text || !(todo.isCompleted + '')) {
        res.status(400).json({ error: 'text and isCompleted required fields' }).end();
    } else {
        db.todos.save(todo, (error, result) => {
            if (error) {
                res.status(400).json({ error }).end();
            } else {
                res.status(200).json({ result }).end();
            }
        });
    }   
});

// Endpoint api/todo/:id
// Update A Todo By Id
router.put('/:id', (req, res, next) => {
    let id = req.params.id;
    let todo = {
        text: req.body.text,
        isCompleted: req.body.isCompleted,
    };
    let updatedObject = {};
    
    if (todo.text) { updatedObject.text = todo.text };
    if (todo.isCompleted) { updatedObject.isCompleted = todo.isCompleted };

    if (!updatedObject) {
        res.status(400).json({ error: 'Invalid data' }).end();
    } else {
        db.todos.update(
            { _id: mongojs.ObjectId(id) }, 
            updatedObject, 
            {}, // Options 
            (error, result) => {
                if (error) {
                    console.log('Put Request Error: ', error);
                    res.status(400).json({ error }).end();
                } else {
                    res.status(200).json({ result }).end();
                }
            }
        );
    }
});

// Endpoint api/todo/:id
// Delete A Todo By Id
router.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    db.todos.remove({ _id: mongojs.ObjectId(id) }, '', (error, result) => {
        if (error) {
        res.status(400).json({ error }).end();
        } else {
            res.status(200).json({ result }).end();
        }
    });
});

module.exports = router;