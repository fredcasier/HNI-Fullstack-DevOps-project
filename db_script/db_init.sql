DROP SCHEMA IF EXISTS `full-stack-users`;

CREATE SCHEMA `full-stack-users`;
USE `full-stack-users`;


-- -----------------------------------------------------
-- Table `full-stack-users`.`user_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `full-stack-users`.`type_user` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `type_name` VARCHAR(255) NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
)
ENGINE = InnoDB
AUTO_INCREMENT = 1;

-- -----------------------------------------------------
-- Table `full-stack-users`.`user
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `full-stack-users`.`user` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `last_name` VARCHAR(50) NULL DEFAULT NULL,
  `first_name` VARCHAR(50) NULL DEFAULT NULL,
  `email` VARCHAR(50) NULL DEFAULT NULL,
  `type_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_type` (`type_id`),
  CONSTRAINT `fk_type` FOREIGN KEY (`type_id`) REFERENCES `type_user` (`id`)
)
ENGINE=InnoDB
AUTO_INCREMENT = 1;




