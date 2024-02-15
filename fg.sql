-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: lms
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(90) DEFAULT NULL,
  `author` varchar(60) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `price` varchar(15) DEFAULT NULL,
  `image` varchar(80) DEFAULT NULL,
  `semester` varchar(10) DEFAULT NULL,
  `quantity` varchar(10) DEFAULT NULL,
  `reviews` int DEFAULT '0',
  `pdf` varchar(90) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (2,'Fundamentals of Computers and Computing','V. Rajaraman','available','100','image-1706551412058-.png','1','3',3,NULL),(3,'Discrete Mathematics ','Norman L. Biggs','available','120','image-1706551581539-.jpg','1','3',3,NULL),(4,'Electrical Circuits','Dr. Wasif Naeem','available','110','image-1706551657618-.jpg','1','6',3,NULL),(7,'Fundamentals of Programming','Kent D. Lee','available','100','image-1706632562125-.jpg','2','2',3,NULL),(8,'Digital Logic Design','Clive Woods','available','110','image-1706632626582-.jpg','2','2',2,NULL),(10,'Methods of Integration, Differential Equations, and Series','North-Holland','available','115','image-1706632778422-.png','2','1',3,NULL),(11,'Data Structures and Algorithms ','Alfred V. Aho','available','160','image-1706632878389-.jpg','3','3',2,NULL),(12,'Object Oriented Programming ','Suresh Kumar','available','170','image-1706633469367-.jpg','3','2',2,NULL),(13,'Electronic Devices and Circuits','Louis Nashelsky','available','110','image-1706633557262-.jpg','3','3',3,NULL),(14,'Bangladesh Studies','Syedur Rahman','available','125','image-1706633702102-.png','3','3',3,NULL),(16,'Database Management Systems ','R. Panneerselvam','available','130','image-1706633926014-.jpg','4','3',4,NULL),(17,'Design and Analysis of Algorithms','Bhupendra Singh Mandloi','available','100','image-1706634016518-.jpg','4','1',4,NULL),(18,'Data and Telecommunication ','Behrouz A Forouzan','available','90','image-1706634100301-.jpg','4','2',2,NULL),(19,'Computer Architecture and Organization','William Stallings','available','95','image-1706634219542-.jpg','4','1',4,NULL),(20,'Introduction to Mechatronics ','Lawrence J. Kamm','available','105','image-1706634304165-.jpg','4','3',3,NULL),(21,'Computer Networking ','Bruce S. Davie','available','200','image-1706634383366-.jpg','5','2',0,NULL),(22,'Software Engineering','Titus Winters','available','140','image-1706634450933-.png','5','4',2,NULL),(23,'Microprocessor and Microcontroller','Anita Gehlot','available','100','image-1706634545428-.jpg','5','2',0,NULL),(24,'Multivariable Calculus and Geometry','Kevin R. Coombes','available','160','image-1706634626829-.jpg','5','2',4,NULL),(25,'Operating Systems ','Unknown','available','112','image-1706634756534-.jpg','6','3',3,NULL),(26,'gh','ghfh','available','56','image-1706794342991-.jpg','5','5',0,'pdf-1706794342992-.pdf'),(27,'Society and Technology','Sal Restivo','available','110','image-1706799389583-.png','8','2',3,'pdf-1706799389584-.pdf'),(28,'Artificial Intelligence','Mariusz Flasinski','available','200','image-1706803640958-.jpg','7','3',0,'pdf-1706803640962-.pdf'),(29,'Mathematical and Statistical Analysis for Engineers','Paolo L Gatti','available','220','image-1706803949899-.png','7','3',0,'pdf-1706803949899-.pdf'),(30,'Economics','Donald RutheRford','available','140','image-1706804251036-.jpg','8','1',0,'pdf-1706804251038-.pdf'),(31,'Information Retrieval ','Hinrich Schutze','available','80','image-1706804539835-.png','7','3',0,'pdf-1706804541454-.pdf'),(32,'Algorithm Engineering','Lucia Rapanotti','available','126','image-1706806795663-.jpg','7','3',4,'pdf-1706806795666-.pdf'),(33,'Mathematics for Robotics','Zexiang Li','available','110','image-1706807079343-.jpg','8','2',2,'pdf-1706807080980-.pdf'),(34,'Introduction to Bioinformatics','David D. Womble','available','213','image-1706807274087-.jpg','8','4',0,'pdf-1706807274088-.pdf'),(35,'Wireless Networks','Joy Kuri','available','138','image-1706808179959-.jpg','8','2',0,'pdf-1706808179960-.pdf'),(36,'Computer Graphics','Peter Shirley','available','300','image-1706808399740-.jpg','7','1',0,'pdf-1706808399742-.pdf'),(37,'Differential and Integral Calculus','Unknown','available','129','image-1706808720325-.png','1','4',0,'pdf-1706808720329-.pdf'),(38,'Chemistry ','Russell Kuhtz','available','210','image-1706808851009-.jpg','1','2',1,'pdf-1706808851011-.pdf'),(39,'Introduction to VLSI Design','V. G. Kiran Kumar','available','213','image-1706809136418-.jpg','7','2',2,'pdf-1706809136421-.pdf'),(40,'Graph Theory ','Richard J. Trudeau','available','75','image-1706809284072-.jpg','8','3',3,'pdf-1706809285797-.pdf'),(42,'Numerical Methods','James F. Epperson','available','205','image-1706810271061-.jpg','6','3',2,'pdf-1706810271062-.pdf'),(43,'Formal Language, Automata and Computability','Alexander Meduna','available','317','image-1706810473904-.jpg','6','2',2,'pdf-1706810475548-.pdf'),(44,'Introduction to Probability and Statistics ','F.M. Dekking','available','302','image-1706810654507-.png','6','5',0,'pdf-1706810654512-.pdf'),(45,'Physics','Jay Newman','available','146','image-1706811051771-.jpg','2','2',0,'pdf-1706811051772-.pdf'),(46,'Linear Algebra','Marc Lipson','available','123','image-1706811268572-.jpg','3','6',0,'pdf-1706811268574-.pdf');
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_reviews`
--

DROP TABLE IF EXISTS `book_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bookid` int DEFAULT NULL,
  `userid` int DEFAULT NULL,
  `star` int DEFAULT NULL,
  `review_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `bookid` (`bookid`),
  KEY `userid` (`userid`),
  CONSTRAINT `book_reviews_ibfk_1` FOREIGN KEY (`bookid`) REFERENCES `book` (`id`),
  CONSTRAINT `book_reviews_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_reviews`
--

LOCK TABLES `book_reviews` WRITE;
/*!40000 ALTER TABLE `book_reviews` DISABLE KEYS */;
INSERT INTO `book_reviews` VALUES (1,11,3,2,'2024-01-31 10:36:08'),(2,12,3,1,'2024-01-31 10:37:07'),(3,13,3,4,'2024-01-31 10:37:35'),(4,10,3,5,'2024-01-31 10:37:51'),(5,12,2,3,'2024-01-31 10:46:52'),(6,10,2,1,'2024-01-31 10:51:59'),(7,13,2,2,'2024-01-31 14:36:30'),(8,8,3,2,'2024-01-31 14:52:55'),(9,3,4,3,'2024-01-31 14:56:16'),(10,2,5,5,'2024-01-31 14:57:39'),(11,2,6,1,'2024-01-31 15:00:14'),(12,3,6,2,'2024-01-31 15:01:03'),(13,4,6,2,'2024-02-01 01:16:37'),(14,11,5,3,'2024-02-01 01:17:11'),(15,12,5,3,'2024-02-01 01:48:32'),(16,24,2,4,'2024-02-01 01:49:33'),(17,11,7,2,'2024-02-01 01:56:30'),(18,7,7,3,'2024-02-01 02:14:19'),(19,27,5,3,'2024-02-01 10:57:11'),(20,32,5,4,'2024-02-01 12:09:01'),(21,4,3,3,'2024-02-04 13:03:13'),(22,33,3,2,'2024-02-07 04:58:43'),(23,7,3,2,'2024-02-07 08:10:36'),(24,17,3,4,'2024-02-07 08:26:33'),(25,16,3,4,'2024-02-07 08:27:46'),(26,14,3,3,'2024-02-07 08:28:50'),(27,18,3,2,'2024-02-07 08:37:07'),(28,40,3,3,'2024-02-07 08:38:10'),(29,39,3,2,'2024-02-07 08:39:12'),(30,42,3,2,'2024-02-07 08:39:58'),(31,43,3,2,'2024-02-07 08:40:39'),(32,25,3,3,'2024-02-10 05:57:06'),(33,38,3,1,'2024-02-10 06:03:40');
/*!40000 ALTER TABLE `book_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_status`
--

DROP TABLE IF EXISTS `book_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userid` int DEFAULT NULL,
  `bookid` int DEFAULT NULL,
  `issued` varchar(30) DEFAULT NULL,
  `returned` varchar(30) DEFAULT NULL,
  `cookie` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  KEY `bookid` (`bookid`),
  CONSTRAINT `book_status_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`),
  CONSTRAINT `book_status_ibfk_2` FOREIGN KEY (`bookid`) REFERENCES `book` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_status`
--

LOCK TABLES `book_status` WRITE;
/*!40000 ALTER TABLE `book_status` DISABLE KEYS */;
INSERT INTO `book_status` VALUES (1,2,2,'accept','not','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6Im1pbmhhanRhcGFkZXIwQGdtYWlsLmNvbSIsImlhdCI6MTcwNjYzNDgwMSwiZXhwIjoxNzA2NzIxMjAxfQ.lDTzrT3NVNLdruKXTuaojcAq2w6k2-FHK4se_k1iDlk'),(2,6,4,'accept','accept','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6InRhbnZpckBnbWFpbC5jb20iLCJpYXQiOjE3MDY3MzExOTIsImV4cCI6MTcwNjgxNzU5Mn0.gHi7QOuu1e7pdHKKfmMm3L4qtwkZG3NdShhmlxQa_5s'),(3,2,4,'accept','rejected','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6Im1pbmhhanRhcGFkZXIwQGdtYWlsLmNvbSIsImlhdCI6MTcwNjc3MDE2MSwiZXhwIjoxNzA2ODU2NTYxfQ.Og9E0BwKUF1986vpJlxp0hdE6BX-fCX_TsJIsf6MckA'),(4,7,11,'rejected','not','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6InNhY2NvQGdtYWlsLmNvbSIsImlhdCI6MTcwNjc3MDc4OCwiZXhwIjoxNzA2ODU3MTg4fQ.zBzWSe3eOtyu4jBb4LMCdRLT2-noHzmlBXlCQ4v2tHI'),(5,5,43,'accept','accept','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6Im1hcnphbkBnbWFpbC5jb20iLCJpYXQiOjE3MDY4MDk3NDksImV4cCI6MTcwNjg5NjE0OX0.ozbIM4s1eMNSjmJlbq96E9ujqJAU7pvoKF5EBM86lHk'),(6,3,16,'accept','accept','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6Im1pZnRhaEBnbWFpbC5jb20iLCJpYXQiOjE3MDY4MTY3NTAsImV4cCI6MTcwNjkwMzE1MH0.EXAze0iVUYj5TJtUEja-T2LDQzy8Gdl2qe9RPqRykpQ'),(7,3,4,'accept','accept','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6Im1pZnRhaEBnbWFpbC5jb20iLCJpYXQiOjE3MDY4MTY4MjEsImV4cCI6MTcwNjkwMzIyMX0.Gzi_cBVMhhA9FgKTOeQnuGKWql5NSov2cDVEDCoJqyk'),(9,4,3,'accept','accept','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6Im1pemFuQGdtYWlsLmNvbSIsImlhdCI6MTcwNzMxNjQwNSwiZXhwIjoxNzA3NDAyODA1fQ.eXeTAvvykDNXZxQgnNtDM_qDTiv1UJxngmSJ8uSDhpQ'),(11,3,42,'accept','not','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6Im1pZnRhaEBnbWFpbC5jb20iLCJpYXQiOjE3MDc1NjI5NTYsImV4cCI6MTcwNzY0OTM1Nn0.NSqUanT0Ac1BnhhcjJcSiGwDj8dFjfCe2eKaPrDzpe4'),(14,3,11,'pending','not','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6Im1pZnRhaEBnbWFpbC5jb20iLCJpYXQiOjE3MDc3MjQ3NDYsImV4cCI6MTcwNzgxMTE0Nn0.PHCPtq-cqy-AHgpHC9DK1FDLzdlKEwVQviZsHeAkdMk'),(15,3,10,'pending','not','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6Im1pZnRhaEBnbWFpbC5jb20iLCJpYXQiOjE3MDc3MjQ3NDYsImV4cCI6MTcwNzgxMTE0Nn0.PHCPtq-cqy-AHgpHC9DK1FDLzdlKEwVQviZsHeAkdMk'),(17,3,4,'pending','not','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6Im1pZnRhaEBnbWFpbC5jb20iLCJpYXQiOjE3MDc4MTM1NzksImV4cCI6MTcwNzg5OTk3OX0.Pt9aVwR5vWVUbQPX-bFHtxxFaiyX11bNhvaFQg9Ldj8'),(18,3,19,'pending','not','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6Im1pZnRhaEBnbWFpbC5jb20iLCJpYXQiOjE3MDc5MzcwMDcsImV4cCI6MTcwODAyMzQwN30.QhBdZiEltFwtUkr-PhHXdOAxNxNJGwz6tNaFwbh82-U'),(20,3,17,'pending','not','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6Im1pZnRhaEBnbWFpbC5jb20iLCJpYXQiOjE3MDc5MzcwMDcsImV4cCI6MTcwODAyMzQwN30.QhBdZiEltFwtUkr-PhHXdOAxNxNJGwz6tNaFwbh82-U'),(21,13,14,'accept','not','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6Im11cnNhbGluc2h1dm82NTg0QGdtYWlsLmNvbSIsImlhdCI6MTcwNzk0MDE2MywiZXhwIjoxNzA4MDI2NTYzfQ.x8_4uQHCu-aAcurvL_njpTledYNJFfpD-XvSGJWf250');
/*!40000 ALTER TABLE `book_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_registrations`
--

DROP TABLE IF EXISTS `event_registrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_registrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `event_id` int NOT NULL,
  `user_id` int NOT NULL,
  `registration_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `event_registrations_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`),
  CONSTRAINT `event_registrations_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_registrations`
--

LOCK TABLES `event_registrations` WRITE;
/*!40000 ALTER TABLE `event_registrations` DISABLE KEYS */;
INSERT INTO `event_registrations` VALUES (1,2,3,'2024-02-14 17:11:21'),(2,1,3,'2024-02-14 17:41:02'),(3,3,4,'2024-02-14 17:49:33'),(4,2,4,'2024-02-14 18:31:24');
/*!40000 ALTER TABLE `event_registrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(120) NOT NULL,
  `description` text NOT NULL,
  `create_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `shedule_date` timestamp NULL DEFAULT NULL,
  `participant` text NOT NULL,
  `location` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'cricket','Cricket is a popular bat-and-ball game played between two teams of eleven players on a field. The game is divided into innings, with each team taking turns to bat and bowl. The objective for the batting team is to score as many runs as possible, while the bowling team aims to dismiss the batsmen and restrict the opposition\'s score. ','2024-02-12 18:37:38','2024-02-26 05:00:00','VC ','university premises'),(2,'Demo Event','Lorem ipsum dolor sit amet consectetur adipisicing elit. A incidunt quae fuga eveniet itaque eum odit tenetur earum facilis in? Voluptatem deleniti sunt at repudiandae soluta dolorum placeat excepturi in.','2024-02-12 19:22:21','2024-02-28 05:00:00','teachers','class room'),(3,'Ludu','Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui fugit nostrum blanditiis quisquam culpa. Qui ut quia aspernatur soluta voluptatum facere deleniti iusto, repellendus ipsam nemo rem consequatur rerum necessitatibus.','2024-02-14 17:48:55','2024-02-14 05:00:00','Minhaj','Home');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userid` int DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `feedback_date` date DEFAULT NULL,
  `feedback_type` varchar(1024) DEFAULT NULL,
  `feedback_details` text,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES (1,3,'pending','2024-01-28','Advice','ghg gbh'),(2,3,'pending','2024-02-22','Suggestion','hbnh');
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mail`
--

DROP TABLE IF EXISTS `mail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userid` int DEFAULT NULL,
  `bookid` int DEFAULT NULL,
  `duetime` datetime DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `reminder_sent` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mail`
--

LOCK TABLES `mail` WRITE;
/*!40000 ALTER TABLE `mail` DISABLE KEYS */;
INSERT INTO `mail` VALUES (1,6,4,'2024-01-31 15:06:51','returned',NULL),(2,2,4,'2024-02-01 01:52:28','returned',NULL),(3,2,2,'2024-02-01 03:19:06','1',NULL),(4,5,43,'2024-02-01 14:37:55','returned',NULL),(5,3,16,'2024-02-01 14:48:39','returned',NULL),(6,3,4,'2024-02-01 15:06:57','returned',NULL),(7,4,3,'2024-02-07 09:36:34','returned',NULL),(8,3,42,'2024-02-10 06:09:14','1',NULL),(9,13,14,'2024-02-14 14:54:08','1',NULL);
/*!40000 ALTER TABLE `mail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(60) DEFAULT NULL,
  `email` varchar(60) DEFAULT NULL,
  `password` varchar(40) DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL,
  `profilepic` varchar(90) DEFAULT NULL,
  `cookie` varchar(1024) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'mnhaj','minhajuddin0@gmail.com','12345678','student','image-1706552414744-.jpg','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6Im1pbmhhanVkZGluMEBnbWFpbC5jb20iLCJpYXQiOjE3MDczMjE3ODUsImV4cCI6MTcwNzQwODE4NX0.1ELzr6QyW-1OtqS8p8rD_OM4SenD8LiTzOMHSTYYFTU','active'),(3,'miftah','miftah@gmail.com','12345678','student','image-1706692575761-.jpg','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6Im1pZnRhaEBnbWFpbC5jb20iLCJpYXQiOjE3MDc5OTk0NjMsImV4cCI6MTcwODA4NTg2M30.MLls3hyjr52FDLVgluBSnNfdx_5VJT1sQZEYVAaAYJQ','active'),(4,'mizan','mizan@gmail.com','12345678','student','image-1706730948283-.avif','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6Im1pemFuQGdtYWlsLmNvbSIsImlhdCI6MTcwNzk4MTIxOSwiZXhwIjoxNzA4MDY3NjE5fQ.xS4sSpAVYJ3LXS3UmHbdVHvtBcIk6KcQbVsEIKFEgiU','active'),(5,'marzan','marzan@gmail.com','12345678','student','image-1706731040019-.avif','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6Im1hcnphbkBnbWFpbC5jb20iLCJpYXQiOjE3MDY4MTYyNDUsImV4cCI6MTcwNjkwMjY0NX0.ZtxpqAzhM4UGexD_fjct0b5u9y7m0n1FYRXUob4VW7s','active'),(6,'tanvir','tanvir@gmail.com','12345678','teacher','image-1706731182842-.jpg','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6InRhbnZpckBnbWFpbC5jb20iLCJpYXQiOjE3MDY3OTMwMDksImV4cCI6MTcwNjg3OTQwOX0.NwJSBZFGe0_3ajg2bsCgq9EGsPGVUh1xq0QbNJOoWxo','active'),(7,'sacco','sacco@gmail.com','12345678','teacher','image-1706770564160-.webp','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6InNhY2NvQGdtYWlsLmNvbSIsImlhdCI6MTcwNjc3MDc4OCwiZXhwIjoxNzA2ODU3MTg4fQ.zBzWSe3eOtyu4jBb4LMCdRLT2-noHzmlBXlCQ4v2tHI','active'),(8,'admin','admin1@gmail.com','12345677','admin',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluMUBnbWFpbC5jb20iLCJpYXQiOjE3MDc5ODU3NjksImV4cCI6MTcwODA3MjE2OX0.3H8yuWw_w5fMw969Ikph0Ysy_RbtDku0ZAfsbp5CsLI','active'),(9,'admin','admin2@gmail.com','12341233','admin',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluMkBnbWFpbC5jb20iLCJpYXQiOjE3MDc5NDAxOTQsImV4cCI6MTcwODAyNjU5NH0.zzBsU-_r80-UFY6UTk3SDuWZK9kslRKcSytPwF9Vkgk','active'),(10,'mursalin','mursalin@gmail.com','12344321','teacher','image-1707315696076-.png','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6Im11cnNhbGluQGdtYWlsLmNvbSIsImlhdCI6MTcwNzMxNjE1OCwiZXhwIjoxNzA3NDAyNTU4fQ.4-yMHNU3CY7BTTTtkMmsYOCtoNF5lgurqpgDM0zADMM','active'),(11,'admin','admin34@gmail.com','12341233','admin',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluMzRAZ21haWwuY29tIiwiaWF0IjoxNzA3OTM2OTUyLCJleHAiOjE3MDgwMjMzNTJ9.LJ9ezKDFlI6nJ-SV10tIhIraJhWvVG4Hp9Ts5HO0WYY','active'),(12,'admin','','','admin',NULL,NULL,'active'),(13,'mursalin','mursalinshuvo6584@gmail.com','12345678','teacher','image-1707940154320-.jpg','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6Im11cnNhbGluc2h1dm82NTg0QGdtYWlsLmNvbSIsImlhdCI6MTcwNzk0MDIyNywiZXhwIjoxNzA4MDI2NjI3fQ.50klTdnjLF_KzQ31aQ4oMLXLXHS1eDNNblaqZphfb-A','active');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-15  8:04:50
