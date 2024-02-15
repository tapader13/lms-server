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
          console.log(result);
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
            const sql4 =
              'update book set quantity = quantity-1 where userid = ?';
            if (err) {
              return res.json({ status: false, err: 'query err' });
            } else {
              return res.json({ status: true });
            }
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

//calcel request book working start
router.put('/returnpendingrequestcancel/:id', (req, res) => {
  const id = req.params.id;
  const sql1 = `delete from  book_status where issued ="pending" and id = ?`;
  db.query(sql1, [id], (err, data) => {
    if (err) {
      return res.json({ status: false, err: 'Query err' });
    } else {
      return res.json({ status: true });
    }
  });
});
//cancel request book working end

//feedback student start
router.post('/feedback', (req, res) => {
  const tok = req.cookies.token;
  const sqluser = 'select * from users where cookie = ?';
  db.query(sqluser, [tok], (err, data) => {
    if (err) {
      console.log(err);
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
            console.log(err);
            return res.json({ status: false, err: 'Query Err' });
          } else {
            console.log(result);
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

//total users start
router.get('/totalusers', (req, res) => {
  const sql = 'select count(id) as total from users';
  db.query(sql, (err, data) => {
    if (err) {
      return res.json({ status: false, err: 'Query Err' });
    } else {
      return res.json({ status: true, data });
    }
  });
});
//total users end

//review start

router.post('/review/:id', (req, res) => {
  const id = req.params.id;
  const { review } = req.body;
  const tok = req.cookies.token;

  const sqluser = 'SELECT id FROM users WHERE cookie = ?';
  const findUsrRvw =
    'SELECT * FROM book_reviews WHERE userid = ? AND bookid = ?';

  db.query(sqluser, [tok], (err, userResult) => {
    if (err) {
      console.log(err.message);
      return res.json({
        status: false,
        err: 'Query error in user table for review',
      });
    }

    const userId = userResult[0].id;

    db.query(findUsrRvw, [userId, id], (err, reviewResult) => {
      if (err) {
        console.log(err.message);
        return res.json({ status: false, err: 'Query error in review table' });
      }

      if (reviewResult.length > 0) {
        return res.json({
          status: false,
          err: 'Review already done for this book',
        });
      }

      const insertReviewTable = `
    INSERT INTO book_reviews 
    (bookid, userid, star, review_date) 
    VALUES (?, ?, ?, NOW(3))
`;

      db.query(insertReviewTable, [id, userId, review], (err, result) => {
        if (err) {
          console.log(err.message);
          return res.json({
            status: false,
            err: 'Query error in inserting review data',
          });
        }

        const findTotRvw =
          'SELECT SUM(star) as tot, COUNT(userid) as uid FROM book_reviews WHERE bookid = ?';

        db.query(findTotRvw, [id], (err, finddata) => {
          if (err) {
            console.log(err.message);
            return res.json({
              status: false,
              err: 'Query Err to insert book table review',
            });
          }
          console.log(finddata, 'finddata');
          const updateReviewQuery = 'UPDATE book SET reviews = ? WHERE id = ?';
          const rvw = parseInt(finddata[0].tot, 10) / finddata[0].uid;
          console.log(rvw, 'rvw');
          db.query(updateReviewQuery, [rvw, id], (err, data) => {
            if (err) {
              console.log(err.message);
              return res.json({
                status: false,
                err: 'Query Err in update book review',
              });
            }

            console.log(rvw, 'data');
            return res.json({ status: true, rvw });
          });
        });
      });
    });
  });
});

//review end

//user details info for admin start

router.get('/userInfoAll/:id', (req, res) => {
  const id = req.params.id;
  const totalqury =
    'SELECT u.name uname,u.email uemail, b.name bname,b.semester bsem,b.reviews brev FROM users u left JOIN book_status bs ON u.id = bs.userid left JOIN book b ON bs.bookid = b.id WHERE u.id = ?';
  db.query(totalqury, [id], (err, reviewResult) => {
    if (err) {
      console.log(err.message);
      return res.json({ status: false, err: 'Query error in review table' });
    }
    const organizedResult = {
      uname: reviewResult[0].uname,
      uemail: reviewResult[0].uemail,
      books: reviewResult.map((row) => ({
        bname: row.bname,
        brev: row.brev,
        bsem: row.bsem,
      })),
    };
    return res.json({ status: true, organizedResult });
  });
});

//user details info for admin end

//latest review details start
router.get('/latestReview', (req, res) => {
  const sql =
    'SELECT b.name as btitle,b.image as bimage,u.profilepic as upic, b.author as bauthor,b.reviews as breview, u.name AS user_name,br.star as brstar,br.review_date as brdate FROM book_reviews br JOIN users u ON br.userid = u.id join book b on br.bookid = b.id ORDER BY br.review_date DESC limit 3';
  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ status: false, err: 'Query Err' });
    } else {
      return res.json({ status: true, data });
    }
  });
});
//latest review details end
module.exports = router;
