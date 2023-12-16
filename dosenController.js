const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM dosen', (error, results) => {
        if (error) {
            console.error('Error fetching dosen', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});

router.get('/:nip', (req, res) => {
    const dosenNip = req.params.nip;
    db.query('SELECT * FROM dosen WHERE nip = ?', [dosenNip], (error, results) => {
        if (error) {
            console.error('Error fetching dosen', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else if (results.length === 0) {
            res.status(404).json({ message: 'Dosen not found' });
        } else {
            res.json(results[0]);
        }
    });
});

router.put('/:nip', (req, res) => {
    const dosenNip = req.params.nip;
    const { nama, gender, prodi, alamat } = req.body;
    db.query('UPDATE dosen SET nama = ?,gender = ?,prodi = ?,alamat= ? WHERE nip = ?',
        [nama, gender, prodi, alamat, dosenNip], (error) => {
            if (error) {
                console.error('Error updating dosen:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            } else {
                res.json('Updating dosen successfully');
            }
        }
    );
});

router.post('/', (req, res) => {
    const { nip, nama, gender, prodi, alamat } = req.body;
    db.query('INSERT INTO dosen (nip, nama, gender, prodi, alamat) VALUES (?, ?, ?, ?, ?)',
        [nip, nama, gender, prodi, alamat],
        (error) => {
            if (error) {
                console.error('Error creating new dosen:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            } else {
                res.json('Creating new dosen successfully');
            }
        }
    );
});

router.delete('/:nip', (req, res) => {
    const dosenNip = req.params.nip;
    db.query('DELETE FROM dosen WHERE nip = ?', [dosenNip], (error) => {
        if (error) {
            console.error('Error deleting dosen:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.json('Deleting dosen successfully');
        }
    });
});

module.exports = router;
