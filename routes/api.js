var express = require('express');
var router = express.Router();
const Crypto = require('node-crypt');
const sc = new Crypto({
    key: 'b95d8cb128734ff8821ea634dc34334535afe438524a782152d11a5248e71b01',
    hmacKey: 'dcf8cd2a90b1856c74a9f914abbb5f467c38252b611b138d8eedbe2abb4434fc'
});
const {Client} = require('pg');
const cors = require('cors')

var nodemailer = require('nodemailer');
var NODE_TLS_REJECT_UNAUTHORIZED = '0';

const corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true,

}
router.use(cors(corsOptions));

const dbdata = {
    user: 'admin',
    host: 'localhost',
    database: 'zeitbuchung',
    password: '301669',
    port: 5432
};


/* Add user post */
router.post('/add-user', function (req, res) {

    var pool = new Client(dbdata);
    var username = req.body.user_name;
    var email = req.body.email;
    var password = sc.encrypt(req.body.password);
    var decryp = sc.decrypt(password);
    pool.connect().then(() => {
        const sql = ' INSERT into user_info (user_name, email, password) VALUES($1, $2, $3) RETURNING id';
        return pool.query(sql, [username, email, password], function (err, result) {
            if (err) {
                console.log(err);
            } else {
                pool.end()
                res.status(200).send();
            }
        });
    })
});

/* Login Authenticate */
router.post('/login/checkAuthentication', function (req, res) {

    var pool = new Client(dbdata);
    var email = req.body.inputEmail;
    var password = req.body.inputPassword;
    pool.connect().then(() => {
        const sql = 'SELECT  * FROM user_info where email = $1';
        return pool.query(sql, [email], function (err, result) {
            if (err || result.rows.length == 0) {
                res.status(204).send();
                pool.end()
            } else {
                if (sc.decrypt(result.rows[0].password.trim()) == password.trim()) {
                    sess = req.session;
                    sess.email = email;
                    sess.password = password;
                    res.send(email);
                    pool.end()
                } else {
                    pool.end()
                    res.status(204).send();
                }
            }
        });
    })
});

/* Edit Reference with id */
router.get('/edit_anzeige/:id', function (req, res) {
    var id = req.params.id
    var pool = new Client(dbdata);
    pool.connect().then(() => {
        return pool.query('SELECT  * FROM referenz_anmeldung where id = $1', [id]);
    }).then(result => {
        pool.end()
        res.send(result.rows);
    })

});


/* Update reference */
router.post('/update_referenz', function (req, res) {

    var pool = new Client(dbdata);

    var referenz = req.body.referenz;
    var id = req.body.id;
    var plz = req.body.plz;
    var europaletten = req.body.europaletten;
    var sendung_gewicht = req.body.sendung_gewicht;
    var abholung_bereit = req.body.abholung_bereit;
    var abholung_bereit_in = req.body.abholung_bereit_in;
    var anlieferung_spat_bis = req.body.anlieferung_spat_bis;
    var anlieferung_spat_in = req.body.anlieferung_spat_in;
    pool.connect().then(() => {
        const sql = 'UPDATE referenz_anmeldung SET referenz=($1), plz=($2), europaletten=($3), sendung_gewicht=($4), ' +
            'abholung_bereit=($5), abholung_bereit_in=($6), anlieferung_spat_bis=($7), anlieferung_spat_in=($8) WHERE id=($9)';
        return pool.query(sql, [referenz, plz, europaletten, sendung_gewicht,
            abholung_bereit, abholung_bereit_in, anlieferung_spat_bis, anlieferung_spat_in, id], function (err, result) {
            if (err) {
                console.log(err);
                pool.end()
            } else {
                pool.end()
                res.status(200).send();
            }
        });
    })
});


/* Add reference */
router.post('/add_referenz', function (req, res) {

    var pool = new Client(dbdata);

    var referenz = req.body.referenz;
    var plz = req.body.plz;
    var europaletten = req.body.europaletten;
    var sendung_gewicht = req.body.sendung_gewicht;
    var abholung_bereit = req.body.abholung_bereit;
    var abholung_bereit_in = req.body.abholung_bereit_in;
    var anlieferung_spat_bis = req.body.anlieferung_spat_bis;
    var anlieferung_spat_in = req.body.anlieferung_spat_in;
    pool.connect().then(() => {
        const sql = ' INSERT into referenz_anmeldung (referenz, plz, europaletten,sendung_gewicht' +
            ',abholung_bereit,abholung_bereit_in,anlieferung_spat_bis,anlieferung_spat_in,verfügbar)' +
            ' VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)';
        return pool.query(sql, [referenz, plz, europaletten, sendung_gewicht,
            abholung_bereit, abholung_bereit_in, anlieferung_spat_bis, anlieferung_spat_in, true], function (err, result) {
            if (err) {
                console.log(err);
                pool.end()
            } else {
                res.status(200).send();
                pool.end()
            }
        });
    })
});


/* View references */
router.get('/view_anzeige/:page?', function (req, res) {
    sess = req.session;
    var sum;
    var perPage = 9
    if (isNaN(req.params.page)) {
        var page = 1
    } else {
        var page = req.params.page
    }
    var pool = new Client(dbdata);
    pool.connect().then(() => {
        return pool.query('SELECT COUNT(id) FROM referenz_anmeldung;');
    }).then(count => {
        sum = count.rows[0].count;
    }).then(() => {
        var offset = (page - 1) * perPage;
        return pool.query('SELECT * from referenz_anmeldung LIMIT ($1) OFFSET ($2)', [perPage, offset]);
    }).then(result => {
        pool.end()
        res.send({pages: Math.ceil(sum / perPage), current: page, data: result.rows})
    })

});


/* Delete reference*/
router.post('/delete_anzeige', function (req, res, next) {
    var id = req.body.identification;
    var pool = new Client(dbdata);
    pool.connect().then(() => {
        return pool.query('DELETE FROM referenz_anmeldung WHERE id=($1)', [id]);

    }).then((result) => {
        pool.end()
        res.status(200).send();
    })
});



/* View users*/
router.get('/view_users/:page?', function (req, res) {
    sess = req.session;
    var sum;
    var perPage = 20
    var page = req.params.page || 1
    var pool = new Client(dbdata);
    pool.connect().then(() => {
        return pool.query('SELECT COUNT(id) FROM user_info;');
    }).then(count => {
        sum = count.rows[0].count;
    }).then(() => {
        var offset = (page - 1) * perPage;
        return pool.query('SELECT * from user_info LIMIT ($1) OFFSET ($2)', [perPage, offset]);
    }).then(result => {
        res.send({pages: Math.ceil(sum / perPage), current: page, data: result.rows})
        pool.end()
    })

});

/* Update user*/
router.post('/update_user', function (req, res) {
    var user_name = req.body.user_name;
    var email = req.body.email;
    var password = sc.encrypt(req.body.password);
    var id = req.body.identification;

    var pool = new Client(dbdata);
    pool.connect().then(() => {
        return pool.query('UPDATE user_info SET user_name=($1), email=($2), password=($3) WHERE id=($4)',
            [user_name, email, password, id], function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    res.status(200).send();
                    pool.end()
                }

            });
    })

});

/* Authenticate with reference adn plz*/
router.post('/login/checkReferenz', function (req, res) {

    var pool = new Client(dbdata);
    var referenz = [req.body.referenz];
    var plz = req.body.plz;
    pool.connect().then(() => {
        const sql = 'SELECT  * FROM referenz_anmeldung where referenz = $1';
        return pool.query(sql, referenz, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                if (result.rows[0].plz.trim() == plz.trim()) {
                    res.status(200).send();
                } else {
                    res.status(204).send();
                }

            }
        });
    })
});


/* Delete user*/
router.post('/delete_user', function (req, res, next) {
    var id = req.body.identification;
    var pool = new Client(dbdata);
    pool.connect().then(() => {
        return pool.query('DELETE FROM user_info WHERE id=($1)', [id]);
        res.status(200).send();
        pool.end()
    })
});


/* Reference time register*/
router.get('/referenz_anmeldung/:referenz', function (req, res, next) {
    var resultfirst;
    var referenz = req.params.referenz.trim();
    var pool = new Client(dbdata);
    pool.connect().then(() => {
        return pool.query('SELECT * from referenz_anmeldung where referenz = ($1)', [referenz]);
    }).then(results => {
        resultfirst = results.rows[0];
        if (results.rows.length == 0) {
            res.status(204).send();
            return false
        }
    }).then(() => {
        return pool.query('SELECT * from zeit_buchung_referenz where ref_id = ($1)', [resultfirst.id]);
    }).then(resultof => {
        if (resultof.rows[0]) {
            res.status(204).send();
            return false
        }
    }).then(() => {
        return pool.query('SELECT * from zeit_buchung_referenz');
    }).then(res_date => {
        pool.end()
        res.send({resdata: resultfirst, res_date: res_date.rows})
    }).catch((error) => {
        console.log(error)
    })
});


/* Reference time post*/
router.post('/referenz/zeitbuchung', function (req, res, next) {

    var fahrzeug = req.body.fahrzeug
    var ref_id = req.body.ref_id;
    var fahrer = req.body.fahrer
    var date_selected = req.body.date_selected;
    var telephone = req.body.telephone;
    var pool = new Client(dbdata);
    const sql = ' INSERT into zeit_buchung_referenz (fahrzeug, ref_id ,fahrer ,telephone,email_bestatigung,datum_ausgewahlt)' +
        ' VALUES($1, $2, $3, $4, $5, $6)';
    pool.connect().then(() => {
        return pool.query(sql, [fahrzeug, ref_id, fahrer, telephone, ref_id, date_selected], function (err, result) {
            if (err) {
                console.log(err);
                res.status(204).send();
            } else {
                res.status(200).send();
            }
        });
    })
});


/* Email confirmation view*/
router.get('/email_bestatigung/:id', function (req, res) {
    sess = req.session;
    var id = req.params.id;
    var pool = new Client(dbdata);
    pool.connect().then(() => {
        return pool.query('SELECT  * FROM zeit_buchung_referenz where ref_id = $1', [id]);
    }).then(result => {
        res.send(result.rows[0])
    })

});


/* Email confirmation post*/
router.post('/sendemail', function (req, res) {

    var email = req.body.email;
    var date_ausgewahlt = req.body.date_ausgewahlt;

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        secure: true,
        auth: {
            user: 'ecrmjs@gmail.com',
            pass: 'adminadmin123'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var mailOptions = {
        to: email,
        subject: 'Email Bestatigung',
        html: "Sie haben das " + date_ausgewahlt + " Datum ausgewählt"
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            pool.end()
        } else {
            res.status(200).send()
            pool.end()
        }
    });


});


module.exports = router;
