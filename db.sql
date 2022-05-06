-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: vacxin
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `bill`
--

DROP TABLE IF EXISTS `bill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bill` (
  `BillID` int NOT NULL AUTO_INCREMENT,
  `Status` int DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `PhoneNumber` varchar(50) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Date` datetime DEFAULT NULL,
  `User` int DEFAULT NULL,
  PRIMARY KEY (`BillID`),
  UNIQUE KEY `bill_BillID_uindex` (`BillID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill`
--

LOCK TABLES `bill` WRITE;
/*!40000 ALTER TABLE `bill` DISABLE KEYS */;
INSERT INTO `bill` VALUES (1,2,'346 Bến Vân Đồn, phường 1, quận 4, thành phố Hồ Chí Minh','0909884164','phamtienquan2001@gmail.com','2022-05-01 11:10:04',3),(3,1,'346 Bến Vân Đồn, phường 1, quận 4, thành phố Hồ Chí Minh','0909884164','phamtienquan2001@gmail.com','2022-05-01 11:22:58',-1),(4,1,'346 Bến Vân Đồn, phường 1, quận 4, thành phố Hồ Chí Minh','0909884164','phamtienquan2001@gmail.com','2022-05-01 11:28:18',-1),(12,-1,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `bill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `CatID` int unsigned DEFAULT NULL,
  `CatName` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Vaccine');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `commentid` int DEFAULT NULL,
  `productid` int DEFAULT NULL,
  `userid` int DEFAULT NULL,
  `date` text,
  `content` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `OrderID` int unsigned NOT NULL AUTO_INCREMENT,
  `OrderDate` datetime DEFAULT NULL,
  `UserID` int DEFAULT NULL,
  `ProID` int DEFAULT NULL,
  `SizeID` varchar(8) DEFAULT NULL,
  `Amount` int DEFAULT NULL,
  `Total` bigint DEFAULT NULL,
  `BillID` int DEFAULT NULL,
  `status` int DEFAULT NULL,
  PRIMARY KEY (`OrderID`),
  UNIQUE KEY `orders_OrderID_uindex` (`OrderID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'2022-05-01 11:10:04',3,14,'',1,4000000,1,2),(2,'2022-05-01 11:10:04',3,14,'',1,4000000,1,2),(3,'2022-05-01 11:10:04',3,14,'',1,4000000,1,2),(4,'2022-05-01 11:10:04',3,14,'',1,4000000,1,2),(5,'2022-05-01 11:22:58',-1,14,'',1,4000000,3,1),(6,'2022-05-01 11:22:58',-1,14,'',1,4000000,3,1),(7,'2022-05-01 11:22:58',-1,14,'',1,4000000,3,1),(8,'2022-05-01 11:28:18',-1,14,'',4,16000000,4,1);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `ProID` int unsigned NOT NULL AUTO_INCREMENT,
  `ProName` longtext,
  `Price` int DEFAULT NULL,
  `Single` int DEFAULT NULL,
  `FullDes` text,
  `CatID` int DEFAULT NULL,
  `Multiple` int DEFAULT NULL,
  `Arrival` datetime DEFAULT NULL,
  `Image` longtext,
  `status` int DEFAULT '1',
  PRIMARY KEY (`ProID`),
  UNIQUE KEY `products_ProID_uindex` (`ProID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'ActHIB®',4000000,100,'Haemophilus b Conjugate Vaccine (Tetanus Toxoid Conjugate)\nHib',1,30,'2022-04-17 00:00:00','/public/assets/vaccine/1/1/1.jpg',1),(2,'Adacel®',4000000,100,'Tetanus Toxoid, Reduced Diphtheria Toxoid and Acellular Pertussis Vaccine Adsorbed\nTdap',1,30,'2022-04-17 00:00:00','/public/assets/vaccine/1/2/1.jpg',1),(3,'Alcohol Prep Pad Webcol™',4000000,100,'70% isopropyl alcohol. Sterile. Premium pad material provides maximum absorbencyfor scrubbing and cleansing.',1,30,'2022-04-17 00:00:00','/public/assets/vaccine/1/3/1.jpg',1),(4,'Alcohol Prep Pads',4000000,100,'2-ply isopropyl alcohol saturated pad. Individually packaged to ensure that the pad remains fully saturated. Sterile and non-sterile versions available. ',1,30,'2022-04-17 00:00:00','/public/assets/vaccine/1/4/1.jpg',1),(5,'Allergy Tray - PrecisionGlide™, Attached Needle NonSafety',4000000,100,'Sterile, single use. Allergy tray containing syringes with permanently attached needle.\n\n',1,30,'2022-04-17 00:00:00','/public/assets/vaccine/1/5/1.jpg',1),(6,'Bag Mask Resuscitator',4000000,100,'Manual resuscitator featuring durable silicone construction. These effective resuscitation bags give exceptional sensitivity to patient lung \"feedback.\" Easily disassembles for cleaning and sterilization.',1,30,'2022-04-17 00:00:00','/public/assets/vaccine/1/6/1.jpg',1),(7,'Bicillin® C-R',4000000,100,'Penicillin G Bezathine and Penicillin G Procaine injectable suspension. Prefilled syringe containing 1.2 MMU / 2 mL injection. Adult.\n\n',1,30,'2022-04-17 00:00:00','/public/assets/vaccine/1/7/1.jpg',1),(8,'Adacel®',4000000,100,'White, 2-Ply.',1,30,'2022-04-17 00:00:00','/public/assets/vaccine/1/8/1.jpg',1),(9,'Bicillin® C-R Pediatric',4000000,100,'Penicillin G Benzathine and Penicillin G Procaine injectable suspension. Pediatric.\n\n',1,30,'2022-04-17 00:00:00','/public/assets/vaccine/1/9/1.jpg',1),(10,'Biohazard Spill Clean-Up Kit and Disposal System',4000000,100,'System comes complete with everything necessary for clean-up of potentially biohazardous materials. The Sharps System provides a means to safely, easily and legally remove these materials from your location and transport them to a government-approved destruction facility via the U.S. Postal Service.\n\n',1,30,'2022-04-17 00:00:00','/public/assets/vaccine/1/10/1.jpg',1),(11,'Body Fluid Spill Clean-Up Kit',4000000,100,'This convenient system comes complete with all of the personal protective equipment (PPE) necessary to protect and clean-up bodily fluid spills such as urine, feces and vomit. Once used, all clean-up materials and personal protective equipment should be placed into the enclosed disposal bag and thrown into the regular trash.',1,30,'2022-04-17 00:00:00','/public/assets/vaccine/1/11/1.jpg',1),(12,'Blood Collection Set - Vacutainer® Safety-Lok™',4000000,100,'BD™ Vacutainer® Safety-Lok™ blood collection sets are safety-engineered winged sets for both infusion and blood collection. They feature a translucent, integrated protective shield that allows for one-handed activation immediately after use to help minimize the risk of needlestick injuries as well as clear visibility of blood flashback.\n\n',1,30,'2022-04-17 00:00:00','/public/assets/vaccine/1/12/1.jpg',1),(13,'Biohazard Spill Clean-Up Kit and Disposal System',4000000,100,'System comes complete with everything necessary for clean-up of potentially biohazardous materials. The Sharps System provides a means to safely, easily and legally remove these materials from your location and transport them to a government-approved destruction facility via the U.S. Postal Service.\n\n',1,30,'2022-04-17 00:00:00','/public/assets/vaccine/1/13/1.jpg',1),(14,'Body Fluid Spill Clean-Up Kit',4000000,96,'This convenient system comes complete with all of the personal protective equipment (PPE) necessary to protect and clean-up bodily fluid spills such as urine, feces and vomit. Once used, all clean-up materials and personal protective equipment should be placed into the enclosed disposal bag and thrown into the regular trash.',1,30,'2022-04-17 00:00:00','/public/assets/vaccine/1/14/1.jpg',1),(15,'Blood Collection Set - Vacutainer® Safety-Lok™',4000000,100,'BD™ Vacutainer® Safety-Lok™ blood collection sets are safety-engineered winged sets for both infusion and blood collection. They feature a translucent, integrated protective shield that allows for one-handed activation immediately after use to help minimize the risk of needlestick injuries as well as clear visibility of blood flashback.\n\n',1,30,'2022-04-17 00:00:00','/public/assets/vaccine/1/15/1.jpg',1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statusbill`
--

DROP TABLE IF EXISTS `statusbill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `statusbill` (
  `idstatus` int DEFAULT NULL,
  `Name` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statusbill`
--

LOCK TABLES `statusbill` WRITE;
/*!40000 ALTER TABLE `statusbill` DISABLE KEYS */;
INSERT INTO `statusbill` VALUES (0,'canceled'),(1,'in contact'),(2,'confirmed'),(3,'shipping'),(4,'delivered');
/*!40000 ALTER TABLE `statusbill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statusproduct`
--

DROP TABLE IF EXISTS `statusproduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `statusproduct` (
  `IdStatus` int DEFAULT NULL,
  `NameStatus` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statusproduct`
--

LOCK TABLES `statusproduct` WRITE;
/*!40000 ALTER TABLE `statusproduct` DISABLE KEYS */;
INSERT INTO `statusproduct` VALUES (-1,'Suspend'),(0,'Out of stock'),(1,'On stock');
/*!40000 ALTER TABLE `statusproduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statususer`
--

DROP TABLE IF EXISTS `statususer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `statususer` (
  `IdStatus` int DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statususer`
--

LOCK TABLES `statususer` WRITE;
/*!40000 ALTER TABLE `statususer` DISABLE KEYS */;
INSERT INTO `statususer` VALUES (-1,'Block'),(0,'Unblock'),(1,'Admin');
/*!40000 ALTER TABLE `statususer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `password` varchar(255) DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phonenumber` varchar(10) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `type` int DEFAULT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `users_UserID_uindex` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'$2b$10$jDZQlB54VJOVU0HG9RB.0uUcg91lBHoqx25WJoKaYKjkk5MfodezS','Administrator',' ','admin@admin.com','aaaaaaaaaa','0219329219','2022-04-21',1),(2,'$2b$10$WlUxYdcb/h5yq0z3FdW.JuO18uyi6WUZaAIiYFr7Ya/Xz.eDvDjiq','Admin','Admin','admin1@admin.com','aaaaaaaaaaaaa','0128281212',NULL,0),(3,'$2b$10$Mxov/tIM1BaoTXllxRGevOkYUKNNxx0hd9WKrm/hkBz4rFHNkm5Ae','Quân','Phạm','phamtienquan2001@gmail.com','346 Bến Vân Đồn, phường 1, quận 4, thành phố Hồ Chí Minh','0909884164',NULL,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'vacxin'
--

--
-- Dumping routines for database 'vacxin'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-01 22:47:37
