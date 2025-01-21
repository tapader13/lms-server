const router = require('express').Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const db = require('../db');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const Joi = require('joi');
//admin login start
router.post('/adminlogin', (req, res) => {
  let sql = 'select * from users where email = ? and password = ? and role=?';
  db.query(sql, [req.body.email, req.body.password, 'admin'], (err, data) => {
    if (err) {
      return res.json({ loginstatus: false, err: 'query err' });
    }
    if (data.length > 0) {
      const email = data[0].email;
      const token = jwt.sign(
        { role: 'admin', email: email },
        'jwt_secret_key',
        { expiresIn: '1d' }
      );
      let updateTokenQuery = `UPDATE users SET cookie = ? WHERE email = ?`;

      db.query(updateTokenQuery, [token, email], (err, result) => {
        if (err) {
          return res.json({ status: false, err: 'query err' });
        } else {
          res.cookie('token', token);
          return res.json({ loginstatus: true, role: 'admin' });
        }
      });
    } else {
      let sql =
        'select * from users where email = ? and password = ? and status=?';
      db.query(
        sql,
        [req.body.email, req.body.password, 'active'],
        (err, data) => {
          if (err) {
            return res.json({ loginstatus: false, err: 'query err' });
          }
          if (data.length > 0) {
            const email = data[0].email;
            const token = jwt.sign(
              { role: 'admin', email: email },
              'jwt_secret_key',
              { expiresIn: '1d' }
            );
            let updateTokenQuery = `UPDATE users SET cookie = ? WHERE email = ?`;

            db.query(updateTokenQuery, [token, email], (err, result) => {
              if (err) {
                return res.json({ status: false, err: 'query err' });
              } else {
                const role = data[0].role;
                res.cookie('token', token);
                return res.json({ loginstatus: true, role });
              }
            });
          } else {
            return res.json({ status: false, err: 'not found users' });
          }
        }
      );
    }
  });
});
//admin login end

//image uploads work starting
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let imgPath = path.join(__dirname + '/../public/images/');
    cb(null, imgPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });
//image uploads work finished

//pdf uploads work start
const storagePdf = multer.diskStorage({
  destination: function (req, file, cb) {
    let imgPath = path.join(__dirname + '/../public/pdfs/');
    cb(null, imgPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});
const uploadPdf = multer({ storage: storagePdf });

//pdf uploads work finished

//add book work start
router.post(
  '/addbook',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'pdf', maxCount: 1 },
  ]),
  (req, res) => {
    let sql = `insert into book (name,author,semester,price,status,quantity,image,pdf) values (?)`;
    const value = [
      req.body.name,
      req.body.author,
      req.body.semester,
      req.body.price,
      req.body.status,
      req.body.quantity,
      req.files['image'][0].filename,
      req.files['pdf'][0].filename,
    ];
    db.query(sql, [value], (err, data) => {
      if (err) {
        console.log(err.message);
        return res.json({ status: 'false', err: 'query err' });
      } else {
        console.log('done');
        res.json({ status: 'true' });
      }
    });
  }
);
//add book work end

//register event start
router.post('/eventRegi', (req, res) => {
  let sql2 = `insert into event_registrations (event_id , user_id) values (?,?)`;
  let sql1 = 'select * from users where cookie=?';
  const tok = req.cookies.token;
  db.query(sql1, [tok], (err, data) => {
    if (err) {
      console.log(231);

      return res.json({ status: 'false', err: 'query err' });
    } else {
      if (data.length > 0) {
        const eventid = req.body.eventid;
        const userid = data[0].id;
        console.log(eventid, userid);
        db.query(sql2, [eventid, userid], (err, data) => {
          if (err) {
            console.log(err);

            return res.json({ status: 'false', err: 'query err' });
          } else {
            console.log(233);

            res.json({ status: 'true' });
          }
        });
      } else {
        console.log(234);
        return res.json({ status: 'false', err: 'query err in found user' });
      }
    }
  });
});
//register event end

//add event work start
router.post('/addevent', (req, res) => {
  let sql = `insert into events (title,description,shedule_date,location,participant) values (?)`;
  const value = [
    req.body.title,
    req.body.desc,
    req.body.shedule,
    req.body.location,
    req.body.participant,
  ];
  console.log(req);
  db.query(sql, [value], (err, data) => {
    if (err) {
      console.log(err.message);
      return res.json({ status: 'false', err: 'query err' });
    } else {
      console.log('done');
      res.json({ status: 'true', data });
    }
  });
});
//add event work end

//show event start
router.get('/showevent', (req, res) => {
  let sql = 'select * from events';
  db.query(sql, (err, data) => {
    if (err) {
      return res.json({ status: 'false', err: 'query err' });
    } else {
      console.log(data);
      return res.json({ status: 'true', data });
    }
  });
});
//show event end

//show event regi start
router.get('/showeventregister', (req, res) => {
  let sql1 = 'select * from users where cookie=?';
  const tok = req.cookies.token;
  db.query(sql1, [tok], (err, data) => {
    if (err) {
      console.log(err, 1);
      return res.json({ status: 'false', err: 'query err' });
    } else {
      if (data.length > 0) {
        const userid = data[0].id;
        let sql2 = 'select * from event_registrations where user_id=?';
        db.query(sql2, [userid], (err, data) => {
          if (err) {
            console.log(err, 2);

            return res.json({ status: 'false', err: 'query err' });
          } else {
            console.log(data);
            res.json({ status: 'true', data });
          }
        });
      } else {
        console.log(err, 3);

        return res.json({ status: 'false', err: 'query err in found user' });
      }
    }
  });
});
//show event regi end

//show book start
router.get('/showbook', (req, res) => {
  let sql = 'select * from book';
  db.query(sql, (err, data) => {
    if (err) {
      return res.json({ status: 'false', err: 'query err' });
    } else {
      return res.json({ status: 'true', data });
    }
  });
});
//show book end

// pdf file start
router.get('/pdfViewer/:id', (req, res) => {
  const id = req.params.id;
  let sql = 'select * from book where id=?';
  db.query(sql, [id], (err, data) => {
    if (err) {
      return res.json({ status: 'false', err: 'query err' });
    } else {
      return res.json({ status: 'true', data });
    }
  });
});
//pdf file end

//edit book start
router.get('/editbook/:id', (req, res) => {
  const id = req.params.id;
  let sql = 'select * from book where id=?';
  db.query(sql, [id], (err, data) => {
    if (err) {
      return res.json({ status: 'false', err: 'query err' });
    } else {
      return res.json({ status: 'true', data });
    }
  });
});
router.put('/editbook/:id', (req, res) => {
  const id = req.params.id;
  let sql =
    'update book set name=?,author=?,price =?,semester=?,quantity=? where id=?';
  const { name, author, price, semester, quantity } = req.body;
  db.query(sql, [name, author, price, semester, quantity, id], (err, data) => {
    if (err) {
      return res.json({ status: 'false', err: 'query err' });
    } else {
      return res.json({ status: 'true' });
    }
  });
});
//edit book end

//delete book start
router.delete('/deletebook/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'delete from book where id=?';
  db.query(sql, [id], (err, data) => {
    if (err) {
      // console.log(err);
      return res.json({ status: 'false', err: 'query err' });
    } else {
      // console.log(2);
      return res.json({ status: 'true' });
    }
  });
});
//delete book end

//dashbord working start
router.get('/totalbook', (req, res) => {
  const sql = 'select sum(quantity) as total from book';
  db.query(sql, (err, data) => {
    if (err) {
      return res.json({ status: 'false', err: 'query err' });
    } else {
      return res.json({ status: 'true', total: data[0].total });
    }
  });
});
router.get('/totaltypebook', (req, res) => {
  const sql = 'select count(id) as total from book';
  db.query(sql, (err, data) => {
    if (err) {
      return res.json({ status: 'false', err: 'query err' });
    } else {
      return res.json({ status: 'true', total: data[0].total });
    }
  });
});

router.get('/totalcountadmin', (req, res) => {
  const sql = 'select count(id) as total from users where role=?';
  db.query(sql, ['admin'], (err, data) => {
    if (err) {
      return res.json({ status: 'false', err: 'query err' });
    } else {
      return res.json({ status: 'true', total: data[0].total });
    }
  });
});
router.get('/totalfeedback', (req, res) => {
  const sql = `select count(id) as total from feedback  where status ='pending' `;

  db.query(sql, (err, data) => {
    if (err) {
      return res.json({ status: 'false', err: 'query err' });
    } else {
      return res.json({ status: 'true', total: data[0].total });
    }
  });
});
router.get('/issuedcount', (req, res) => {
  const sql = `select count(id) as total from book_status where issued ='pending' `;

  db.query(sql, (err, data) => {
    if (err) {
      return res.json({ status: 'false', err: 'query err' });
    } else {
      return res.json({ status: 'true', total: data[0].total });
    }
  });
});
router.get('/retpending', (req, res) => {
  const sql = `select count(id) as total from book_status where returned ='pending' `;

  db.query(sql, (err, data) => {
    if (err) {
      return res.json({ status: 'false', err: 'query err' });
    } else {
      return res.json({ status: 'true', total: data[0].total });
    }
  });
});
//dashbord working end

//profile work start
router.get('/adminprofile', (req, res) => {
  const cook = req.cookies.token;
  const sql = 'select * from users where cookie = ? and role=?';
  db.query(sql, [cook, 'admin'], (err, data) => {
    if (err) {
      return res.json({ status: 'false', err: 'query err' });
    } else {
      return res.json({ status: 'true', data });
    }
  });
});
//profile work end

//update admin profile start
router.put('/updateadminprofile/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'update users set email = ? , password = ? where id = ?';
  db.query(sql, [req.body.email, req.body.password, id], (err, data) => {
    if (err) {
      return res.json({ status: 'false', err: 'query err' });
    } else {
      return res.json({ status: 'true', data });
    }
  });
});
//update admin profile end

//add admin start
router.post('/addadminnew', (req, res) => {
  const { email, password } = req.body;
  const sql = `select * from users where email= ?`;
  db.query(sql, [email], (err, data) => {
    if (err) {
      return res.json({ status: false, err: 'Query error' });
    }

    if (data.length > 0) {
      return res.json({ status: false, err: 'admin exist already' });
    } else {
      const sqlinsert = `insert into users (name,email,password,role) values(?,?,?,?)`;
      db.query(sqlinsert, ['admin', email, password, 'admin'], (err, data) => {
        if (err) {
          console.log(err);
          return res.json({ status: false, err: 'query err' });
        } else {
          return res.json({ status: true });
        }
      });
    }
  });
});
//add admin end

//admin logout start
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ status: true });
});
//admin logout end

//create account start
router.post('/createaccount', upload.single('image'), (req, res) => {
  const value = [
    req.body.name,
    req.body.email,
    req.body.password,
    req.body.selected,
  ];
  const { selected, name, email, password } = req.body;
  const profile = req.file.filename;
  const scema = Joi.object({
    name: Joi.string().min(5).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });
  const { error } = scema.validate({ name, email, password });
  if (error) {
    return res.json({ status: false, err: error.details[0].message });
  }
  const sqladmin = 'select * from users where email = ?';
  const sqlusers = 'select * from users where email = ?';
  db.query(sqladmin, [email], (err, dataad) => {
    if (err) {
      console.log(err);
      return res.json({ status: false, err: 'Query error admin' });
    }
    db.query(sqlusers, [email], (err, dataus) => {
      if (err) {
        return res.json({ status: false, err: 'Query error users' });
      }
      if (dataad.length > 0 || dataus.length > 0) {
        return res.json({ status: false, err: ' exist already' });
      } else {
        if (selected === 'admin') {
          const sqlinsertAdmin =
            'insert into admin (name,email,password) values(?,?,?)';
          db.query(sqlinsertAdmin, [name, email, password], (err, result) => {
            if (err) {
              return res.json({ status: false, err: 'query err' });
            } else {
              return res.json({ status: true, role: 'admin' });
            }
          });
        } else if (selected === 'student') {
          const sqlinsertstudent =
            'insert into users (name,email,password,role,profilepic) values(?,?,?,?,?)';
          db.query(
            sqlinsertstudent,
            [name, email, password, selected, profile],
            (err, result) => {
              if (err) {
                return res.json({ status: false, err: 'query err' });
              } else {
                return res.json({ status: true, role: 'student' });
              }
            }
          );
        } else {
          const sqlinsertteacher =
            'insert into users (name,email,password,role,profilepic) values(?,?,?,?,?)';
          db.query(
            sqlinsertteacher,
            [name, email, password, selected, profile],
            (err, result) => {
              if (err) {
                return res.json({ status: false, err: 'query err' });
              } else {
                return res.json({ status: true, role: 'teacher' });
              }
            }
          );
        }
      }
    });
  });
});
//create account end

//issue pending book show start
router.get('/issuependingbook', (req, res) => {
  const sql = `select * from book_status where issued="pending"`;
  db.query(sql, (err, data) => {
    if (err) {
      return res.json({ status: false, err: 'Query err' });
    } else {
      return res.json({ status: true, data });
    }
  });
});
//issue pending book show end

//details info user and book start
router.get('/detailsinfobookuser/:id', (req, res) => {
  const book_status_id = req.params.id;
  const sqlbooksts = 'select * from book_status where id= ?';
  db.query(sqlbooksts, [book_status_id], (err, data) => {
    if (err) {
      return res.json({ status: false, err: 'Query err' });
    } else {
      const bookid = data[0].bookid;
      const userid = data[0].userid;
      const sqlbook = 'select * from book where id = ?';
      db.query(sqlbook, [bookid], (err, bookresult) => {
        if (err) {
          return res.json({ status: false, err: 'Query err' });
        } else {
          const sqlusrs = 'select * from users where id = ?';
          db.query(sqlusrs, [userid], (err, userresult) => {
            if (err) {
              return res.json({ status: false, err: 'Query err' });
            } else {
              return res.json({
                status: true,
                user: userresult,
                book: bookresult,
              });
            }
          });
        }
      });
    }
  });
});
//details info user and book end

//rejected button working start
router.put('/rejectbookadmin/:bookid', (req, res) => {
  const bookid = req.params.bookid;
  const sql1 = `update book_status set issued ="rejected" where id = ?`;
  db.query(sql1, [bookid], (err, data) => {
    if (err) {
      return res.json({ status: false, err: 'Query err' });
    } else {
      return res.json({ status: true });
    }
  });
});
//rejected button working end

//accepted book  working start
router.put('/acceptbookadmin/:book_status_id', (req, res) => {
  const id = req.params.book_status_id;
  const sql1 =
    'SELECT bs.userid ,bs.bookid, u.role FROM book_status bs join users u on u.id=bs.userid WHERE bs.id = ?';
  db.query(sql1, [id], (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ status: false, err: 'Query error' });
    } else {
      const usrid = data[0].userid;
      const bokid = data[0].bookid;
      const role = data[0].role;
      let sql2;
      if (role === 'student') {
        sql2 =
          'INSERT INTO mail (duetime, bookid, userid, status) VALUES (DATE_ADD(NOW(), INTERVAL 2 MINUTE), ?, ?, ?)';
      } else {
        sql2 =
          'INSERT INTO mail (duetime, bookid, userid, status) VALUES (DATE_ADD(NOW(), INTERVAL 4 MINUTE), ?, ?, ?)';
      }

      db.query(sql2, [bokid, usrid, 'pending'], (err, result) => {
        if (err) {
          return res.json({ status: false, err: 'Query error' });
        } else {
          const sql3 = 'UPDATE book_status SET issued = "accept" WHERE id = ?';
          db.query(sql3, [id], (err, updateResult) => {
            if (err) {
              return res.json({ status: false, err: 'Query error' });
            } else {
              return res.json({ status: true });
            }
          });
        }
      });
    }
  });
});

//accepted book  working end

const sendMailToUser = async (userId, id, bookid) => {
  const sql1 = `SELECT m.status, m.id,u.email FROM mail m join users u on m.userid=u.id WHERE m.id = ?`;
  db.query(sql1, [id], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      if (data[0].reminder_sent === 1) {
        // console.log('Reminder already sent for this user');
        return;
      }
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'minhajtapader0@gmail.com',
          pass: 'rdzy fvtq xolm lspx',
        },
      });

      const options = {
        from: 'minhajtapader0@gmail.com',
        to: data[0].email,
        subject: 'Book Return Reminder',
        text: `Please return the book(book id is ${bookid} ) as soon as possible.Your time limit is now over.`,
      };

      transporter.sendMail(options, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          const sql2 = `UPDATE mail SET status = 1 WHERE id = ?`;
          db.query(sql2, [id], (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log('Reminder status updated for user:', id);
            }
          });
        }
      });
    }
  });
};

//send mail to user start
cron.schedule('* * * * *', () => {
  checkOverDueBook();
});
const checkOverDueBook = () => {
  const sql1 = `select * from mail WHERE status = 'pending' AND duetime < NOW()`;
  db.query(sql1, (err, data) => {
    if (err) {
      console.log(err);
      console.log('mail table not data');
    } else {
      if (data && data.length > 0) {
        data.forEach((result) => {
          sendMailToUser(result.userid, result.id, result.bookid);
          // console.log(result.userid, result.bookid);
        });
      } else {
        console.log('No overdue books found');
      }
    }
  });
};

//send mail to user end

//returned pending book show start
router.get('/returnpendingbooks', (req, res) => {
  const sql = `select * from book_status where returned="pending" and issued = "accept"`;
  db.query(sql, (err, data) => {
    if (err) {
      return res.json({ status: false, err: 'Query err' });
    } else {
      return res.json({ status: true, data });
    }
  });
});
//returned pending book show end

//details info user and book for return start
router.get('/detailsreturnbookuser/:id', (req, res) => {
  const book_status_id = req.params.id;
  const sqlbooksts = 'select * from book_status where id= ?';
  db.query(sqlbooksts, [book_status_id], (err, data) => {
    if (err) {
      return res.json({ status: false, err: 'Query err' });
    } else {
      const bookid = data[0].bookid;
      const userid = data[0].userid;
      const sqlbook = 'select * from book where id = ?';
      db.query(sqlbook, [bookid], (err, bookresult) => {
        if (err) {
          return res.json({ status: false, err: 'Query err' });
        } else {
          const sqlusrs = 'select * from users where id = ?';
          db.query(sqlusrs, [userid], (err, userresult) => {
            if (err) {
              return res.json({ status: false, err: 'Query err' });
            } else {
              return res.json({
                status: true,
                user: userresult,
                book: bookresult,
              });
            }
          });
        }
      });
    }
  });
});
//details info user and book for return end

//rejected returned button working start
router.put('/rejectreturnbookadmin/:bookid', (req, res) => {
  const bookid = req.params.bookid;
  const sql1 = `update book_status set returned ="rejected" where id = ?`;
  db.query(sql1, [bookid], (err, data) => {
    if (err) {
      return res.json({ status: false, err: 'Query err' });
    } else {
      return res.json({ status: true });
    }
  });
});
//rejected returned button working end

//accepted book  working end

//accepted returned book  working start
router.put('/acceptreturnbookadmin/:book_status_id', (req, res) => {
  const id = req.params.book_status_id;
  const sql1 = 'SELECT * FROM book_status WHERE id = ?';
  db.query(sql1, [id], (err, data) => {
    if (err) {
      return res.json({ status: false, err: 'Query error' });
    } else {
      const bokid = data[0].bookid;

      const sql2 = `update mail set status = "returned" where bookid = ?`;
      db.query(sql2, [bokid], (err, result) => {
        if (err) {
          return res.json({ status: false, err: 'Query error' });
        } else {
          const sql3 =
            'UPDATE book_status SET returned = "accept" WHERE id = ?';
          db.query(sql3, [id], (err, updateResult) => {
            if (err) {
              return res.json({ status: false, err: 'Query error' });
            } else {
              const sql4 = 'update book set quantity = quantity+1 where id = ?';
              db.query(sql4, [bokid], (err, result4) => {
                if (err) {
                  return res.json({ status: false, err: 'Query error' });
                } else {
                  console.log(result4);
                  return res.json({ status: true });
                }
              });
            }
          });
        }
      });
    }
  });
});

//accepted returned book  working end

//feed back details start
router.get('/feedbackdlts', (req, res) => {
  const sql = `select * from feedback where status = "pending"`;
  db.query(sql, (err, data) => {
    if (err) {
      return res.json({ status: false, err: 'Query error' });
    } else {
      return res.json({ status: true, data });
    }
  });
});
//feed back details end

//send mail to particular feedback user start
const sendEmailtoUser = (email, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'minhajtapader0@gmail.com',
      pass: 'rdzy fvtq xolm lspx',
    },
  });

  const options = {
    from: 'minhajtapader0@gmail.com',
    to: email,
    subject: 'Feedback Update',
    text: text,
  };
  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};
router.post('/sendmailtouser/:id', (req, res) => {
  const id = req.params.id;
  const text = req.body.text;
  const sql =
    'select email from feedback join users on feedback.userid=users.id where feedback.id = ?';
  db.query(sql, [id], (err, data) => {
    if (err) {
      return res.json({ status: false, err: 'Query error' });
    } else {
      const email = data[0].email;

      const sql2 = `update feedback set status = 'solved' where id = ?`;
      db.query(sql2, [id], (err, result) => {
        if (err) {
          return res.json({ status: false, err: 'Query error' });
        } else {
          sendEmailtoUser(email, text);
          return res.json({ status: true });
        }
      });
    }
  });
});
//send mail to particular feedback user end

//acceptrequest route working start
router.get('/acceptrequest', (req, res) => {
  const tok = req.cookies.token;

  const sql1 =
    'SELECT users.name AS username, book.name AS bookname ,users.email as email,users.role as role, book.author as author,book.semester as semester,bs.bookid as bookid,bs.userid as userid,bs.issued as issued FROM book_status bs JOIN book ON bs.bookid = book.id JOIN users ON bs.userid = users.id WHERE bs.issued = "accept"';
  db.query(sql1, [tok], (err, data) => {
    if (err) {
      return res.json({ status: false, err: 'Query Err' });
    } else {
      return res.json({ status: true, data });
    }
  });
});
//acceptrequest route working end

//show all user route working start
router.get('/allusers', (req, res) => {
  const tok = req.cookies.token;

  const sql1 = 'SELECT * FROM users WHERE role != ?';
  db.query(sql1, ['admin'], (err, data) => {
    if (err) {
      return res.json({ status: false, err: 'Query Err' });
    } else {
      return res.json({ status: true, data });
    }
  });
});

//show all user  route working end

//update user state start
router.put('/updateUsrStatus/:id', (req, res) => {
  const id = req.params.id;
  let sql = 'update users set status=? where id=?';
  const { status } = req.body.upstate;
  db.query(sql, [status, id], (err, data) => {
    if (err) {
      return res.json({ status: 'false', err: 'query err' });
    } else {
      console.log(data);
      return res.json({ status: 'true' });
    }
  });
});
//update user state end

//user event info for admin start

router.get('/eventUser/:id', (req, res) => {
  const id = req.params.id;
  const totalqury =
    ' SELECT event_registrations.event_id, users.name, users.email FROM event_registrations INNER JOIN users ON event_registrations.user_id = users.id WHERE event_registrations.event_id = ?';
  console.log(id, 'id');
  db.query(totalqury, [id], (err, reviewResult) => {
    if (err) {
      console.log(err.message);
      return res.json({ status: false, err: 'Query error in review table' });
    }
    console.log(reviewResult);
    return res.json({ status: true, reviewResult });
  });
});

//user event info for admin end
module.exports = router;
