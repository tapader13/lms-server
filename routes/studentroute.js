const router = require('express').Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const db = require('../db');
//student profile start
router.get('/profile', (req, res) => {
  const cook = req.cookies.token;
  const sql = 'select * from users where cookie = ?';
  db.query(sql, [cook], (err, data) => {
    if (err) {
      return res.json({ status: false, err: 'query err' });
    } else {
      return res.json({ status: true, data });
    }
  });
});
//student profile end

//student profile update start

router.put('/updatestudenprofile/:id', (req, res) => {
  const id = req.params.id;
  const { email, password, name } = req.body;
  const sql = 'update users set name =?, password = ?,email = ? where id = ?  ';
  db.query(sql, [name, password, email, id], (err, data) => {
    if (err) {
      return res.json({ status: false, err: 'query err' });
    } else {
      return res.json({ status: true });
    }
  });
});
//student profile update end

//student logout start
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ status: true });
});
//student logout end

//student showbook start
router.get('/showbook', (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 4;
  const searchItem = req.query.bookname;
  const filterSemester = req.query.semester;
  let userToken = req.cookies.token;

  const excludePendingQuery = `
    SELECT bs.bookid FROM book_status bs 
    WHERE bs.userid = (SELECT id FROM users WHERE cookie = '${userToken}') AND bs.issued = 'pending' AND bs.returned != 'accept'
`;

  const baseQuery = `
    SELECT * FROM book
  `;

  const conditions = [];
  const params = [];

  if (searchItem) {
    conditions.push(`name LIKE ?`);
    params.push(`%${searchItem}%`);
  }

  if (filterSemester) {
    conditions.push(`semester = ?`);
    params.push(filterSemester);
  }

  let sql = baseQuery;
  if (conditions.length > 0) {
    sql += ` WHERE ${conditions.join(' AND ')}`;
  }

  db.query(sql, params, (err, data) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    } else {
      const bookIds = data.map((book) => book.id);

      let paginatedQuery = `
        SELECT * FROM book
        WHERE id NOT IN (
          ${excludePendingQuery}
        )
        and quantity>=1
      `;

      if (bookIds.length > 0) {
        paginatedQuery += ` AND id IN (${bookIds.join(',')})`;
      }

      if (conditions.length > 0) {
        paginatedQuery += ` AND ${conditions.join(' AND ')}`;
      }
      const off = (page - 1) * limit;
      paginatedQuery += ` LIMIT 12 OFFSET ${off}`;
      params.push(...params);

      db.query(paginatedQuery, params, (err, result) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        } else {
          return res.status(200).json({
            message: 'All books found',
            data: result,
            totalPage: Math.ceil(data.length / limit),
          });
        }
      });
    }
  });
});

//student showbook end

//requested books start
router.post('/requestbook', (req, res) => {
  const bookid = req.body.id;
  const userTok = req.cookies.token;
  let userid;

  const sqltokuser = 'select id from users where cookie = ?';
  db.query(sqltokuser, [userTok], (err, data) => {
    userid = data[0].id;

    if (err) {
      return res.json({ status: false, err: 'query err' });
    } else {
      const sqlinsert =
        'insert into book_status (userid,bookid,issued,returned,cookie) values(?,?,?,?,?)';
      db.query(
        sqlinsert,
        [userid, bookid, 'pending', 'not', userTok],
        (err, result) => {
          if (err) {
            return res.json({ status: false, err: 'query err' });
          } else {
            return res.json({ status: true });
          }
        }
      );
      // return res.json({ status: true });
    }
  });
  // console.log(userTok);
});
//request books end

//issue request pending start
router.get('/issuependingrequest', (req, res) => {
  const tok = req.cookies.token;
  const sql = `select id from users where cookie = ? `;
  db.query(sql, [tok], (err, data) => {
    if (err) {
      return res.json({ status: false, err: 'query error' });
    } else {
      const id = data[0].id;
      const pendingSql = `select * from book_status where userid = ? and returned !="accept" and issued !="rejected"`;
      db.query(pendingSql, [id], (err, result) => {
        if (err) {
          return res.json({ status: false, err: 'query error' });
        } else {
          return res.json({ status: true, result });
        }
      });
    }
  });
});
//issue request pending end

//issue pending book details start
router.get('/issuependbookdtls/:bookid', (req, res) => {
  const bookid = req.params.bookid;
  const sql = 'select * from book where id = ?';
  db.query(sql, [bookid], (err, data) => {
    if (err) {
      return res.json({ status: false, err: 'query error' });
    } else {
      return res.json({ status: true, data });
    }
  });
});
//issue pending book details end

//return book working start
router.put('/returnpendingrequest/:id', (req, res) => {
  const id = req.params.id;
  const sql1 = `update book_status set returned ="pending" where id = ?`;
  db.query(sql1, [id], (err, data) => {
    if (err) {
      return res.json({ status: false, err: 'Query err' });
    } else {
      return res.json({ status: true });
    }
  });
});
//return book working end

//feedback student start
router.post('/feedback', (req, res) => {
  const tok = req.cookies.token;
  const sqluser = 'select * from users where cookie = ?';
  db.query(sqluser, [tok], (err, data) => {
    if (err) {
      // console.log(err);
      return res.json({ status: false, err: 'Query Err' });
    } else {
      const userid = data[0].id;
      const { feeddate, feeddlts, feedtype } = req.body;
      const sqlfeedback = `insert into feedback (userid,feedback_date,feedback_type,feedback_details,status) values(? ,? ,?, ?, ?)`;
      db.query(
        sqlfeedback,
        [userid, feeddate, feedtype, feeddlts, 'pending'],
        (err, result) => {
          if (err) {
            return res.json({ status: false, err: 'Query Err' });
          } else {
            return res.json({ status: true });
          }
        }
      );
      // console.log();
    }
  });
});
//feedback student end

//history route working start
router.get('/history', (req, res) => {
  const tok = req.cookies.token;
  const sql1 = 'select * from users where cookie = ?';
  db.query(sql1, [tok], (err, data) => {
    if (err) {
      return res.json({ status: false, err: 'Query Err' });
    } else {
      const id = data[0].id;
      const sql2 = `select bs.id, bs.issued,bs.returned, b.id as bid, b.name, b.author,b.semester from book_status bs join book b on bs.bookid=b.id  where bs.userid = ? and bs.issued= "rejected" or bs.returned ="accept" or bs.returned ="rejected" `;
      db.query(sql2, [id], (err, result) => {
        if (err) {
          return res.json({ status: false, err: 'Query Err' });
        } else {
          return res.json({ status: true, result });
        }
      });
    }
  });
});
//history route working end

module.exports = router;
