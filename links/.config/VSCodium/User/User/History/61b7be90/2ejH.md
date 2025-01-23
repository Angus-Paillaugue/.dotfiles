# Proxy

You need to run a proxy server to be able to fetch the rss content from it's source. You can use the [AllOrigins](https://github.com/gnuns/allorigins) one (it's open-source).

You can update the proxy's url in `$lib/constants.js` file under the `PROXY_URL` property.

# Database

You need a database to store user's and their data. Run the following script to create the database and it's tables.

```sql
-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 01, 2024 at 06:38 PM
-- Server version: 8.0.39-0ubuntu0.24.04.2
-- PHP Version: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rss-news`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookmarks`
--

CREATE TABLE `bookmarks` (
  `id` int NOT NULL,
  `userId` int NOT NULL,
  `url` varchar(500) NOT NULL,
  `title` varchar(150) NOT NULL,
  `description` varchar(500) NOT NULL,
  `img` varchar(1000) NOT NULL,
  `color` char(6) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `bookmarks`
--

INSERT INTO `bookmarks` (`id`, `userId`, `url`, `title`, `description`, `img`, `color`, `date`) VALUES
(24, 1, 'https://www.france24.com/fr/france/20241001-%F0%9F%94%B4-en-direct-suivez-le-discours-de-politique-g%C3%A9n%C3%A9rale-de-michel-barnier-devant-les-d%C3%A9put%C3%A9s', 'Michel Barnier exhorte les partis à \"dépasser\" leurs \"divisions\" et \"querelles\"', 'L\'heure du grand oral pour Michel Barnier à l\'Assemblée nationale. Le nouveau Premier ministre s\'est présenté devant les députés, mardi 1er octobre à 15 h, pour détailler sa feuille de route lors de sa déclaration de politique générale.\nImpôts, immigration, proportionnelle... De nombreux sujets ont été abordés par le chef de l\'exécutif français, qui n\'a jusqu\'ici rien livré tant le point d\'équilibre est difficile à trouver – sans majorité absolue – entre les exigences contradictoires de ses alli', 'https://s.france24.com/media/display/7f52bfb8-8003-11ef-a472-005056bfb2b6/w:980/p:16x9/000_36HT3Z4.jpg', 'fef1c4', '2024-10-01 12:04:42'),
(26, 1, 'https://www.france24.com/fr/%C3%A9missions/politique/20240926-gouvernement-de-michel-barnier-le-rn-met-le-gouvernement-sous-pression', 'Le RN met le gouvernement de Michel Barnier sous pression', 'Roselyne Febvre reçoit Bruno Jeudy, directeur de La Tribune Dimanche, Catherine Tricot, directrice de la revue Regards, et Nathalie Saint-Cricq, éditorialiste à France télévisions.\nUne émission en partenariat avec Slate.fr et son fondateur Jean-Marie Colombani.', 'https://s.france24.com/media/display/019a898e-7c25-11ef-9255-005056a97e36/w:980/p:16x9/capture-180621891666f58cc1082de9.06251001.jpg', 'ebe4fe', '2024-09-26 16:51:59'),
(28, 1, 'https://www.france24.com/fr/france/20241001-d%C3%A9ficit-immigration-s%C3%A9curit%C3%A9-ce-qu-il-faut-retenir-du-discours-de-michel-barnier', 'Déficit, immigration, sécurité : ce qu’il faut retenir du discours de Michel Barnier', '\"Niveau de vie\", \"services publics\", école et santé en tête, \"sécurité\", \"immigration\" et \"fraternité\" : le Premier ministre Michel Barnier a exposé devant l’Assemblée nationale, mardi 1er octobre, ses \"cinq chantiers prioritaires\", en reconnaissant que son gouvernement allait devoir \"faire beaucoup avec peu\".\nDans un discours de 1 h 23, le nouveau Premier ministre, issu du parti de droite Les Républicains (LR), a insisté sur la nécessité, d’une part, de redresser les finances publiques et de ré', 'https://s.france24.com/media/display/87373f72-7ff6-11ef-88f7-005056bf30b7/w:980/p:16x9/2024-10-01T130859Z_991897730_RC2PBAAJZTAB_RTRMADP_3_FRANCE-POLITICS.JPG', 'e0f1ff', '2024-10-01 15:45:51');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `passwordHash` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for table `bookmarks`
--
ALTER TABLE `bookmarks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for table `bookmarks`
--
ALTER TABLE `bookmarks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for table `bookmarks`
--
ALTER TABLE `bookmarks`
  ADD CONSTRAINT `fk_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);
COMMIT;
```

# Running

Just run `pnpm run dev` to serve the website.
-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 01, 2024 at 06:38 PM
-- Server version: 8.0.39-0ubuntu0.24.04.2
-- PHP Version: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rss-news`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookmarks`
--

CREATE TABLE `bookmarks` (
  `id` int NOT NULL,
  `userId` int NOT NULL,
  `url` varchar(500) NOT NULL,
  `title` varchar(150) NOT NULL,
  `description` varchar(500) NOT NULL,
  `img` varchar(1000) NOT NULL,
  `color` char(6) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


--
-- Table structure for table `users`
--
CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `passwordHash` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for table `bookmarks`
--
ALTER TABLE `bookmarks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for table `bookmarks`
--
ALTER TABLE `bookmarks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for table `bookmarks`
--
ALTER TABLE `bookmarks`
  ADD CONSTRAINT `fk_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);
COMMIT;
