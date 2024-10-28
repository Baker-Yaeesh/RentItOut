-- MySQL dump 10.13  Distrib 8.0.39, for Win64 (x86_64)
--
-- Host: localhost    Database: rentitout_db
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `category` enum('tools','electronics','vehicles','gear','home_improvement','transportation') NOT NULL,
  `daily_price` decimal(10,2) NOT NULL,
  `monthly_price` decimal(10,2) DEFAULT NULL,
  `yearly_price` decimal(10,2) DEFAULT NULL,
  `status` enum('available','rented') DEFAULT 'available',
  `security_deposit` decimal(10,2) DEFAULT NULL,
  `damage_protection` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`item_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `items_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (2,2,'Electric Guitar','Fender electric guitar with amplifier','electronics',25.00,500.00,NULL,'available',75.00,0,'2024-10-19 19:29:01'),(3,3,'SUV Car','Toyota SUV for long road trips','vehicles',100.00,2000.00,15000.00,'available',500.00,1,'2024-10-19 19:29:01'),(4,4,'Mountain Bike','All-terrain mountain bike for outdoor activities','gear',20.00,400.00,NULL,'available',100.00,0,'2024-10-19 19:29:01'),(5,5,'Drill Machine','Heavy duty drill machine for construction work','tools',15.00,350.00,1200.00,'available',50.00,1,'2024-10-19 20:29:33');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logistics`
--

DROP TABLE IF EXISTS `logistics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logistics` (
  `logistics_id` int NOT NULL AUTO_INCREMENT,
  `rental_id` int DEFAULT NULL,
  `pickup_location` text,
  `delivery_location` text,
  `delivery_option` varchar(512) DEFAULT NULL,
  `status` enum('pending','completed') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `delivery_status` enum('pending','completed') DEFAULT 'pending',
  `delivery_date` date DEFAULT NULL,
  PRIMARY KEY (`logistics_id`),
  KEY `logistics_ibfk_1` (`rental_id`),
  CONSTRAINT `logistics_ibfk_1` FOREIGN KEY (`rental_id`) REFERENCES `rentals` (`rental_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logistics`
--

LOCK TABLES `logistics` WRITE;
/*!40000 ALTER TABLE `logistics` DISABLE KEYS */;
INSERT INTO `logistics` VALUES (2,2,'New Location A','New Location B','Standard','pending','2024-10-19 19:29:01','pending','2024-10-22'),(4,4,'101 Pine St, City D','456 Elm St, City B','delivery_service','completed','2024-10-19 19:29:01','pending',NULL),(6,2,'Location A','Location B','Express','pending','2024-10-20 07:45:13','pending','2024-10-20');
/*!40000 ALTER TABLE `logistics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recommendations`
--

DROP TABLE IF EXISTS `recommendations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recommendations` (
  `recommendation_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `item_id` int DEFAULT NULL,
  `recommendation_type` enum('similar_items','based_on_rentals') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`recommendation_id`),
  KEY `user_id` (`user_id`),
  KEY `recommendations_ibfk_2` (`item_id`),
  CONSTRAINT `recommendations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `recommendations_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recommendations`
--

LOCK TABLES `recommendations` WRITE;
/*!40000 ALTER TABLE `recommendations` DISABLE KEYS */;
INSERT INTO `recommendations` VALUES (1,1,2,'similar_items','2024-10-19 19:29:01'),(3,3,3,'similar_items','2024-10-19 19:29:01'),(4,4,4,'based_on_rentals','2024-10-19 19:29:01'),(6,5,2,'based_on_rentals','2024-10-20 12:00:32');
/*!40000 ALTER TABLE `recommendations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rentals`
--

DROP TABLE IF EXISTS `rentals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rentals` (
  `rental_id` int NOT NULL AUTO_INCREMENT,
  `item_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `rental_duration` enum('daily','monthly','yearly') NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `status` enum('ongoing','completed','cancelled') DEFAULT 'ongoing',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`rental_id`),
  KEY `user_id` (`user_id`),
  KEY `rentals_ibfk_1` (`item_id`),
  CONSTRAINT `rentals_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`) ON DELETE CASCADE,
  CONSTRAINT `rentals_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rentals`
--

LOCK TABLES `rentals` WRITE;
/*!40000 ALTER TABLE `rentals` DISABLE KEYS */;
INSERT INTO `rentals` VALUES (2,2,1,'monthly','2024-09-15','2024-10-15',500.00,'ongoing','2024-10-19 19:29:01'),(3,3,3,'yearly','2024-01-01','2024-12-31',15000.00,'ongoing','2024-10-19 19:29:01'),(4,4,4,'daily','2024-10-10','2024-10-11',20.00,'completed','2024-10-19 19:29:01');
/*!40000 ALTER TABLE `rentals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `revenue`
--

DROP TABLE IF EXISTS `revenue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `revenue` (
  `revenue_id` int NOT NULL AUTO_INCREMENT,
  `rental_id` int DEFAULT NULL,
  `platform_fee` decimal(10,2) NOT NULL,
  `insurance_fee` decimal(10,2) DEFAULT NULL,
  `total_income` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`revenue_id`),
  KEY `revenue_ibfk_1` (`rental_id`),
  CONSTRAINT `revenue_ibfk_1` FOREIGN KEY (`rental_id`) REFERENCES `rentals` (`rental_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `revenue`
--

LOCK TABLES `revenue` WRITE;
/*!40000 ALTER TABLE `revenue` DISABLE KEYS */;
INSERT INTO `revenue` VALUES (2,2,5.00,10.00,515.00,'2024-10-19 19:29:01'),(21,2,10.00,5.00,50.00,'2024-10-20 11:38:36'),(22,2,10.00,5.00,50.00,'2024-10-20 11:39:19'),(23,2,10.00,5.00,50.00,'2024-10-20 11:39:49'),(24,2,15.00,10.00,75.00,'2024-10-20 11:42:30'),(25,2,10.00,5.00,50.00,'2024-10-20 11:43:57'),(27,3,10.00,5.00,50.00,'2024-10-20 11:46:02'),(28,3,10.00,5.00,50.00,'2024-10-20 11:46:38'),(29,3,10.00,5.00,50.00,'2024-10-20 11:47:05'),(30,3,10.00,5.00,50.00,'2024-10-20 11:51:05');
/*!40000 ALTER TABLE `revenue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `item_id` int DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `review` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_id`),
  KEY `user_id` (`user_id`),
  KEY `reviews_ibfk_2` (`item_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (2,1,2,4,'Amazing sound quality, but a bit expensive.','2024-10-19 19:29:01'),(3,3,3,5,'This SUV is perfect for long trips! Very comfortable.','2024-10-19 19:29:01'),(4,4,4,4,'Updated comment.','2024-10-19 19:29:01'),(8,2,3,5,NULL,'2024-10-19 21:23:03'),(9,2,3,5,'Great item!','2024-10-19 21:33:40'),(10,2,3,5,'Great item!','2024-10-19 21:34:31');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `address` text,
  `verification_status` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'John Doe','john@example.com','hashed_password_1','1234567890','123 Main St, City A',1,'2024-10-19 19:29:01'),(2,'Jane Smith','jane@example.com','hashed_password_2','0987654321','456 Elm St, City B',1,'2024-10-19 19:29:01'),(3,'Alice Brown','alice@example.com','hashed_password_3','1122334455','789 Oak St, City C',0,'2024-10-19 19:29:01'),(4,'Bob White','bob@example.com','hashed_password_4','6677889900','101 Pine St, City D',0,'2024-10-19 19:29:01'),(5,'John Doe1','joh1n@example.com','$2b$10$gc2vQhLg5uI5Mkodra97DuEWbAH8wfHxl2giJD8ybsJjI6mBW1Emy','1234567890','123 Main St',0,'2024-10-19 19:44:57');
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

-- Dump completed on 2024-10-20 15:15:16
