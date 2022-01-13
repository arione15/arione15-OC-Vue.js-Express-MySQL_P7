DROP DATABASE IF EXISTS `groupomania`;
CREATE DATABASE `groupomania` CHARACTER SET utf8;

USE `groupomania`;

CREATE TABLE `user`(
  `id`          INTEGER         UNSIGNED    PRIMARY KEY     AUTO_INCREMENT,
  `name`        VARCHAR(50)     NOT NULL,
  `firstname`   VARCHAR(50)     NOT NULL,
  `email`       VARCHAR(100)    NOT NULL UNIQUE,
  `password`    VARCHAR(255)    NOT NULL UNIQUE,
  `imageUrl`    VARCHAR(255)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE `media` (
  `id`              INTEGER         UNSIGNED    PRIMARY KEY AUTO_INCREMENT,
  `userId`              SMALLINT,
  `description`  text    NOT NULL,
  `createdAt`  SMALLINT(4)     ZEROFILL    NOT NULL,
  `imageUrl`        VARCHAR(255)     NOT NULL UNIQUE,
) ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE `commentary` (
  `id`              INTEGER         UNSIGNED    PRIMARY KEY AUTO_INCREMENT,
  `createdAt`  SMALLINT(4)     ZEROFILL    NOT NULL,
  `author_name`     VARCHAR(50)     NOT NULL,
) ENGINE=INNODB DEFAULT CHARSET=utf8;

INSERT INTO `user`
(`name`, `email`, `password`) VALUES
('toto', 'toto@gmail.fr', '123'),
('titi', 'titi@gmail.fr', '456');
