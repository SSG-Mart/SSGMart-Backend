-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 23, 2022 at 07:55 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ssg_mart`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(3) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `name`, `email`, `password`) VALUES
(1, 'NO', '', ''),
(3, 'B.V.G.S.S.Gunawardhana', 's92078175', '12345678');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `C_ID` int(5) NOT NULL,
  `name` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`C_ID`, `name`) VALUES
(1, 'SOLID'),
(2, 'FOOD');

-- --------------------------------------------------------

--
-- Table structure for table `district`
--

CREATE TABLE `district` (
  `district_id` int(2) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `district`
--

INSERT INTO `district` (`district_id`, `name`) VALUES
(1, 'Colombo'),
(2, 'Kalutara'),
(3, 'Kandy'),
(4, 'Matale'),
(5, 'Nuwara Eliya'),
(6, 'Galle'),
(7, 'Matara'),
(8, 'Hambantota'),
(9, 'Jaffna'),
(10, 'Kilinochchi'),
(11, 'Mannar'),
(12, 'Vavuniya'),
(13, 'Mullaitivu'),
(14, 'Batticaloa'),
(15, 'Ampara'),
(16, 'Trincomalee'),
(17, 'Kurunegala'),
(18, 'Puttalam'),
(19, 'Anuradhapura'),
(20, 'Polonnaruwa'),
(21, 'Badulla'),
(22, 'Moneragala'),
(23, 'Ratnapura'),
(24, 'Kegalle');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `item_id` int(10) NOT NULL,
  `seller_id` int(10) NOT NULL,
  `C_ID` int(5) NOT NULL,
  `SC_ID` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `unit` varchar(5) NOT NULL,
  `unit_price` int(7) NOT NULL,
  `description` varchar(200) NOT NULL,
  `add_date` varchar(150) NOT NULL,
  `expire_date` varchar(150) NOT NULL,
  `quantity` int(5) NOT NULL,
  `image` varchar(200) NOT NULL DEFAULT 'default.png',
  `R_admin_id` int(3) NOT NULL DEFAULT 1,
  `R_reasan` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`item_id`, `seller_id`, `C_ID`, `SC_ID`, `name`, `unit`, `unit_price`, `description`, `add_date`, `expire_date`, `quantity`, `image`, `R_admin_id`, `R_reasan`) VALUES
(10, 7, 2, 2, 'drink 001', 'kg', 1500, 'this is sample discription diujgheiuhgbiuhv iurhb viu hbiurb hiueo hrpiuhguie hgiurh87h iuwhgbv uyhgboi uwrhu ihni uehgbvu iehb vnoeiuhui hjuihg beujhbpb', '2022-12-21', '0000-00-00', 10, 'default.jpg', 1, ''),
(15, 7, 2, 2, 'sample Drink', 'kg', 150, 'This is description', 'Thu Dec 22 2022 18:21:32 GMT+0530 (India Standard Time)', 'Tue Dec 27 2022 18:21:32 GMT+0530 (India Standard Time)', 10, 'ushan.png', 1, ''),
(16, 7, 2, 2, 'sample Drink two', 'ml', 150, 'This is description 02', 'Thu Dec 22 2022 18:37:05 GMT+0530 (India Standard Time)', 'Thu Dec 29 2022 18:37:05 GMT+0530 (India Standard Time)', 50, 'ushan.png', 1, '');

-- --------------------------------------------------------

--
-- Table structure for table `seller_data`
--

CREATE TABLE `seller_data` (
  `seller_id` int(10) NOT NULL,
  `M_ID` int(10) NOT NULL,
  `A_admin_id` int(3) NOT NULL DEFAULT 0,
  `C_ID` int(5) NOT NULL,
  `store_name` varchar(100) NOT NULL,
  `ratings` int(1) NOT NULL DEFAULT 0,
  `nic` varchar(12) DEFAULT NULL,
  `date_of_register` date DEFAULT current_timestamp(),
  `nic_image` varchar(100) NOT NULL,
  `A_Status` int(2) NOT NULL DEFAULT 0,
  `R_admin_id` int(3) NOT NULL DEFAULT 1,
  `R_reasan` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `seller_data`
--

INSERT INTO `seller_data` (`seller_id`, `M_ID`, `A_admin_id`, `C_ID`, `store_name`, `ratings`, `nic`, `date_of_register`, `nic_image`, `A_Status`, `R_admin_id`, `R_reasan`) VALUES
(7, 112, 3, 2, 'ushan', 0, '991581464v', '0000-00-00', 'test.png', 0, 1, ''),
(9, 113, 3, 1, 'tharindu_store', 0, '995581464v', '2022-12-22', 'image.jpg', 0, 1, '');

-- --------------------------------------------------------

--
-- Table structure for table `sub_category`
--

CREATE TABLE `sub_category` (
  `SC_ID` int(11) NOT NULL,
  `C_ID` int(5) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sub_category`
--

INSERT INTO `sub_category` (`SC_ID`, `C_ID`, `name`) VALUES
(1, 1, 'Wood Craft'),
(2, 2, 'Drink'),
(5, 2, 'drink 2');

-- --------------------------------------------------------

--
-- Table structure for table `user_data`
--

CREATE TABLE `user_data` (
  `M_ID` int(10) NOT NULL,
  `f_name` varchar(200) NOT NULL,
  `l_name` varchar(50) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `mobile` varchar(12) NOT NULL,
  `status` int(1) DEFAULT 0,
  `date_of_reg` date NOT NULL,
  `email` varchar(100) NOT NULL,
  `address_one` varchar(200) NOT NULL,
  `district_id` int(2) NOT NULL,
  `password` varchar(50) NOT NULL,
  `image` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_data`
--

INSERT INTO `user_data` (`M_ID`, `f_name`, `l_name`, `user_name`, `mobile`, `status`, `date_of_reg`, `email`, `address_one`, `district_id`, `password`, `image`) VALUES
(112, 'ushan', 'chamod', 'ushan5', '272242122', 0, '2022-12-20', 'ushan5@gmail.com', 'Weerapura, Thambala', 6, '111', '1671557116830-4.jpg'),
(113, 'H.M.', 'Bandara', 'tharindu', '+94716654153', 0, '2022-12-21', 'ushanchamodbandara@gmail.com', 'You See Hotel, Weerapura, Thambala', 20, '111', '1671600020204-2.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`C_ID`);

--
-- Indexes for table `district`
--
ALTER TABLE `district`
  ADD PRIMARY KEY (`district_id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `have` (`seller_id`),
  ADD KEY `has` (`C_ID`),
  ADD KEY `was` (`SC_ID`),
  ADD KEY `restrict` (`R_admin_id`);

--
-- Indexes for table `seller_data`
--
ALTER TABLE `seller_data`
  ADD PRIMARY KEY (`seller_id`),
  ADD UNIQUE KEY `store_name` (`store_name`),
  ADD UNIQUE KEY `M_ID` (`M_ID`),
  ADD UNIQUE KEY `M_ID_2` (`M_ID`),
  ADD UNIQUE KEY `M_ID_3` (`M_ID`),
  ADD UNIQUE KEY `store_name_2` (`store_name`),
  ADD UNIQUE KEY `nic` (`nic`),
  ADD KEY `be` (`M_ID`),
  ADD KEY `activate` (`A_admin_id`),
  ADD KEY `catagorise` (`C_ID`),
  ADD KEY `restric` (`R_admin_id`);

--
-- Indexes for table `sub_category`
--
ALTER TABLE `sub_category`
  ADD PRIMARY KEY (`SC_ID`),
  ADD KEY `had` (`C_ID`);

--
-- Indexes for table `user_data`
--
ALTER TABLE `user_data`
  ADD PRIMARY KEY (`M_ID`),
  ADD KEY `live` (`district_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `C_ID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `district`
--
ALTER TABLE `district`
  MODIFY `district_id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `item_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `seller_data`
--
ALTER TABLE `seller_data`
  MODIFY `seller_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `sub_category`
--
ALTER TABLE `sub_category`
  MODIFY `SC_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user_data`
--
ALTER TABLE `user_data`
  MODIFY `M_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `has` FOREIGN KEY (`C_ID`) REFERENCES `category` (`C_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `have` FOREIGN KEY (`seller_id`) REFERENCES `seller_data` (`seller_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `restrict` FOREIGN KEY (`R_admin_id`) REFERENCES `admin` (`admin_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `was` FOREIGN KEY (`SC_ID`) REFERENCES `sub_category` (`SC_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `seller_data`
--
ALTER TABLE `seller_data`
  ADD CONSTRAINT `activate` FOREIGN KEY (`A_admin_id`) REFERENCES `admin` (`admin_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `be` FOREIGN KEY (`M_ID`) REFERENCES `user_data` (`M_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `catagorise` FOREIGN KEY (`C_ID`) REFERENCES `category` (`C_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `restric` FOREIGN KEY (`R_admin_id`) REFERENCES `admin` (`admin_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sub_category`
--
ALTER TABLE `sub_category`
  ADD CONSTRAINT `had` FOREIGN KEY (`C_ID`) REFERENCES `category` (`C_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_data`
--
ALTER TABLE `user_data`
  ADD CONSTRAINT `live` FOREIGN KEY (`district_id`) REFERENCES `district` (`district_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
