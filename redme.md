select \* from book;
use lms;
INSERT INTO admin (email, password)
VALUES ('admin@example.com', 'hashed_password');
DELETE FROM book WHERE id = 1;
DELETE FROM users WHERE id = 1;
create database lms;
use lms;
create table users
( id int auto_increment primary key, name varchar(60), email varchar(60),
password varchar(40), role varchar(20), profilepic varchar(90), cookie varchar(1024) );
drop table users;
ALTER TABLE users ADD COLUMN status VARCHAR(20) DEFAULT 'active';

create table book
( id int auto_increment primary key, name varchar(90), author varchar(60),
status varchar(20), price varchar(15), image varchar(80), semester varchar(10), quantity varchar(10) );
drop table book;

create table book_status
( id int auto_increment primary key, userid int, bookid int,
issued varchar(30), returned varchar(30), cookie varchar(1024),
foreign key(userid) references users(id), foreign key(bookid) references book(id) );
drop table book_status;

create table feedback
( id int auto_increment primary key, userid int,
status varchar(20), feedback_date date, feedback_type varchar(1024),
foreign key(userid) references users(id) );
drop table feedback;

create table mail
( id int auto_increment primary key, userid int, bookid int,
duetime datetime, status varchar(50), reminder_sent boolean );
drop table mail;

ALTER TABLE book
ADD COLUMN reviews INT DEFAULT 0;
select \* from book;

CREATE TABLE book_reviews (
id INT AUTO_INCREMENT PRIMARY KEY,
bookid INT,
userid INT,
star int,
review_date datetime,
FOREIGN KEY(bookid) REFERENCES book(id),
FOREIGN KEY(userid) REFERENCES users(id)
);

drop table book*reviews;
select * from book;
delete from book where id =41;
select \_ from users;
select \* from book_reviews;

ALTER TABLE book
ADD COLUMN pdf varchar(90);
select _ from book_status;
select _ from book_status_log;

select \* from users;

select \* from book_status_log;
use lms;
select \* from feedback;
ALTER TABLE feedback
ADD COLUMN feedback_details TEXT;
CREATE TABLE events (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(120) NOT NULL,
description TEXT NOT NULL,
create_date timestamp DEFAULT CURRENT_TIMESTAMP,
shedule_date timestamp,
participant text not null,
location VARCHAR(200) NOT NULL
);
use lms;
show databases;
select \* from events;
drop table events;
CREATE TABLE events (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(120) NOT NULL,
description TEXT NOT NULL,
create_date timestamp DEFAULT CURRENT_TIMESTAMP,
shedule_date timestamp,
participant text not null,
location VARCHAR(200) NOT NULL
);

CREATE TABLE event_registrations (
id INT AUTO_INCREMENT PRIMARY KEY,
event_id INT NOT NULL,
user_id INT NOT NULL,
registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (event_id) REFERENCES events(id),
FOREIGN KEY (user_id) REFERENCES users(id)
);
