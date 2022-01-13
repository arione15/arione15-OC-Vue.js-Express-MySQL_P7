DROP DATABASE IF EXISTS `groupomania`;
CREATE DATABASE `groupomania` CHARACTER SET utf8;

USE `groupomania`;

CREATE TABLE `user` (
  `id`          TINYINT        UNSIGNED    PRIMARY KEY     AUTO_INCREMENT,
  `name`        VARCHAR(50)     NOT NULL,
  `firstname`        VARCHAR(50)     NOT NULL,
  `email`        VARCHAR(100)     NOT NULL UNIQUE,
  `password`        VARCHAR(255)     NOT NULL UNIQUE,
  `imageUrl`        VARCHAR(255)     NOT NULL UNIQUE,
) ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE `media` (
  `id`              TINYINT         UNSIGNED    PRIMARY KEY AUTO_INCREMENT,
  `userId`              TINYINT,
  `description`  text    NOT NULL,
  `createdAt`  SMALLINT(4)     ZEROFILL    NOT NULL,
  `imageUrl`        VARCHAR(255)     NOT NULL UNIQUE,
) ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE `commentary` (
  `id`              TINYINT         UNSIGNED    PRIMARY KEY AUTO_INCREMENT,
  `createdAt`  SMALLINT(4)     ZEROFILL    NOT NULL,
  `author_name`     VARCHAR(50)     NOT NULL,
) ENGINE=INNODB DEFAULT CHARSET=utf8;

INSERT INTO `utilisateur`
(`name`, `email`, `password`) VALUES
('toto', 'toto@gmail.freda & married her.'),
('antlia',              'Bird encountered during long journeys during which new constellations were discovered. Apus, which means "without feet" in ancient Greek, comes from the Indian name of the bird of paradise, Apus Indica. We offered, indeed, this magnificent bird after having cut off its legs, because too unsightly.'),
