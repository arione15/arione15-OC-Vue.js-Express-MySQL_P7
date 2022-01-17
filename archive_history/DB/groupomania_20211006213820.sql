DROP DATABASE IF EXISTS `groupomania`;
CREATE DATABASE `groupomania` CHARACTER SET utf8;

USE `groupomania`;

CREATE TABLE `utilisateur` (
  `id`          SMALLINT        UNSIGNED    PRIMARY KEY     AUTO_INCREMENT,
  `name`        VARCHAR(20)     NOT NULL    UNIQUE,
  `description` TEXT
) ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE `commentaire` (
  `id`              TINYINT         UNSIGNED    PRIMARY KEY AUTO_INCREMENT,
  `published_year`  SMALLINT(4)     ZEROFILL    NOT NULL,
  `author_name`     VARCHAR(50)     NOT NULL,
) ENGINE=INNODB DEFAULT CHARSET=utf8;

INSERT INTO `Constellation`
(`name`, `description`) VALUES
('andromeda',           'Andromeda was the daughter of Cepheus, king of Ethiopia, & Cassiopeia. Her mother claimed that she was more beautiful than all the Nereids, sea deities & granddaughters of the ocean. Jealous, the Nereids asked Poseidon to avenge them. The latter sent the monster Ketus to ravage the kingdom of Cepheus. Warned by an oracle that the only way to appease the god of the sea was to sacrifice their daughter, the king & queen tied her to a rock by the water. Perseus, son of Zeus & Danae, fell in love with the girl & made her parents promise to give her his hand if he delivered them from the monster. Diving from the top of the clouds with his winged sandals, he killed the monster, freed Andromeda & married her.'),
('antlia',              'Antlia Pneumatica owes its name to the invention of Robert Boyle, Irish physicist & chemist (1627 - 1691). This name was given to him by Nicolas Louis de la Caille.'),
('apus',                'Bird encountered during long journeys during which new constellations were discovered. Apus, which means "without feet" in ancient Greek, comes from the Indian name of the bird of paradise, Apus Indica. We offered, indeed, this magnificent bird after having cut off its legs, because too unsightly.'),
