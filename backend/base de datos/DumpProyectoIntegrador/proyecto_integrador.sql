-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema proyecto_integrador
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema proyecto_integrador
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `proyecto_integrador` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `proyecto_integrador` ;

-- -----------------------------------------------------
-- Table `proyecto_integrador`.`booking_sequence`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyecto_integrador`.`booking_sequence` (
  `next_val` BIGINT NULL DEFAULT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `proyecto_integrador`.`caracteristicas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyecto_integrador`.`caracteristicas` (
  `caracteristicas_id` BIGINT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `icono` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`caracteristicas_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `proyecto_integrador`.`categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyecto_integrador`.`categorias` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(255) NULL DEFAULT NULL,
  `titulo` VARCHAR(255) NULL DEFAULT NULL,
  `url_imagen` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `proyecto_integrador`.`ciudades`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyecto_integrador`.`ciudades` (
  `ciudades_id` BIGINT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `pais` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`ciudades_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `proyecto_integrador`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyecto_integrador`.`productos` (
  `productos_id` BIGINT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `descripcion` VARCHAR(255) NOT NULL,
  `direccion` VARCHAR(255) NOT NULL,
  `politicas_servicios` VARCHAR(255) NULL DEFAULT NULL,
  `ciudades_id` BIGINT NOT NULL,
  `categorias_id` BIGINT NOT NULL,
  PRIMARY KEY (`productos_id`),
  INDEX `fk_productos_ciudades1_idx` (`ciudades_id` ASC) VISIBLE,
  INDEX `fk_productos_categorias1_idx` (`categorias_id` ASC) VISIBLE,
  CONSTRAINT `fk_productos_categorias1`
    FOREIGN KEY (`categorias_id`)
    REFERENCES `proyecto_integrador`.`categorias` (`id`),
  CONSTRAINT `fk_productos_ciudades1`
    FOREIGN KEY (`ciudades_id`)
    REFERENCES `proyecto_integrador`.`ciudades` (`ciudades_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `proyecto_integrador`.`imagenes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyecto_integrador`.`imagenes` (
  `imagenes_id` BIGINT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(255) NOT NULL,
  `url` VARCHAR(2048) NOT NULL,
  `productos_id` BIGINT NOT NULL,
  PRIMARY KEY (`imagenes_id`),
  INDEX `fk_imagenes_productos1_idx` (`productos_id` ASC) VISIBLE,
  CONSTRAINT `fk_imagenes_productos1`
    FOREIGN KEY (`productos_id`)
    REFERENCES `proyecto_integrador`.`productos` (`productos_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `proyecto_integrador`.`paciente_sequence`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyecto_integrador`.`paciente_sequence` (
  `next_val` BIGINT NULL DEFAULT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `proyecto_integrador`.`productos_caracteristicas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyecto_integrador`.`productos_caracteristicas` (
  `caracteristicas_id` BIGINT NOT NULL,
  `productos_id` BIGINT NOT NULL,
  INDEX `fk_productos_caracteristicas_caracteristicas1_idx` (`caracteristicas_id` ASC) VISIBLE,
  INDEX `fk_productos_caracteristicas_productos1_idx` (`productos_id` ASC) VISIBLE,
  CONSTRAINT `fk_productos_caracteristicas_caracteristicas1`
    FOREIGN KEY (`caracteristicas_id`)
    REFERENCES `proyecto_integrador`.`caracteristicas` (`caracteristicas_id`),
  CONSTRAINT `fk_productos_caracteristicas_productos1`
    FOREIGN KEY (`productos_id`)
    REFERENCES `proyecto_integrador`.`productos` (`productos_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
