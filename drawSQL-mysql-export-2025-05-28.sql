CREATE TABLE `user`(
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `full_name` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP());
ALTER TABLE
    `user` ADD UNIQUE `user_phone_unique`(`phone`);
ALTER TABLE
    `user` ADD UNIQUE `user_email_unique`(`email`);
CREATE TABLE `category`(
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL
);
CREATE TABLE `machine`(
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `price_per_hour` DECIMAL(10, 2) NOT NULL,
    `description` TEXT NOT NULL,
    `is_available` BOOLEAN NOT NULL DEFAULT 'DEFAULT TRUE',
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(), `category_id` INT NOT NULL, `owner_id` INT NOT NULL, `region_id` BIGINT NOT NULL, `district_id` BIGINT NOT NULL, `min_hour` VARCHAR(255) NOT NULL, `min_price` DECIMAL(8, 2) NOT NULL);
CREATE TABLE `contract`(
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `total_price` DECIMAL(10, 2) NOT NULL,
    `date` DATE NOT NULL,
    `machine_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `status_id` BIGINT NOT NULL,
    `commission_id` BIGINT NOT NULL,
    `start_time` TIMESTAMP NOT NULL,
    `end_time` TIMESTAMP NOT NULL,
    `total_time` TIMESTAMP NOT NULL
);
CREATE TABLE `payment`(
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `contract_id` INT NOT NULL,
    `payment_date` DATE NOT NULL,
    `payment_status` ENUM('') NOT NULL,
    `amount` DECIMAL(8, 2) NOT NULL,
    `status` ENUM('') NOT NULL
);
CREATE TABLE `user_location`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `user_id` BIGINT NOT NULL
);
CREATE TABLE `status`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL
);
CREATE TABLE `commission`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `percent` DECIMAL(8, 2) NOT NULL DEFAULT '15'
);
CREATE TABLE `review`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `rating` INT NOT NULL,
    `comment` TEXT NOT NULL,
    `created_at` DATETIME NOT NULL,
    `machine_id` BIGINT NOT NULL,
    `user_id` BIGINT NOT NULL
);
CREATE TABLE `image`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `image_url` VARCHAR(255) NOT NULL,
    `uploaded_at` DATETIME NOT NULL,
    `machine_id` BIGINT NOT NULL
);
CREATE TABLE `region`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL
);
CREATE TABLE `district`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `region_id` BIGINT NOT NULL
);
CREATE TABLE `role`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL
);
CREATE TABLE `user_role`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL,
    `role_id` BIGINT NOT NULL
);
ALTER TABLE
    `machine` ADD CONSTRAINT `machine_category_id_foreign` FOREIGN KEY(`category_id`) REFERENCES `category`(`id`);
ALTER TABLE
    `machine` ADD CONSTRAINT `machine_owner_id_foreign` FOREIGN KEY(`owner_id`) REFERENCES `user`(`id`);
ALTER TABLE
    `user_role` ADD CONSTRAINT `user_role_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `user`(`id`);
ALTER TABLE
    `district` ADD CONSTRAINT `district_region_id_foreign` FOREIGN KEY(`region_id`) REFERENCES `region`(`id`);
ALTER TABLE
    `contract` ADD CONSTRAINT `contract_machine_id_foreign` FOREIGN KEY(`machine_id`) REFERENCES `machine`(`id`);
ALTER TABLE
    `review` ADD CONSTRAINT `review_machine_id_foreign` FOREIGN KEY(`machine_id`) REFERENCES `machine`(`id`);
ALTER TABLE
    `contract` ADD CONSTRAINT `contract_commission_id_foreign` FOREIGN KEY(`commission_id`) REFERENCES `commission`(`id`);
ALTER TABLE
    `machine` ADD CONSTRAINT `machine_region_id_foreign` FOREIGN KEY(`region_id`) REFERENCES `region`(`id`);
ALTER TABLE
    `payment` ADD CONSTRAINT `payment_contract_id_foreign` FOREIGN KEY(`contract_id`) REFERENCES `contract`(`id`);
ALTER TABLE
    `review` ADD CONSTRAINT `review_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `user`(`id`);
ALTER TABLE
    `user_role` ADD CONSTRAINT `user_role_role_id_foreign` FOREIGN KEY(`role_id`) REFERENCES `role`(`id`);
ALTER TABLE
    `image` ADD CONSTRAINT `image_machine_id_foreign` FOREIGN KEY(`machine_id`) REFERENCES `machine`(`id`);
ALTER TABLE
    `contract` ADD CONSTRAINT `contract_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `user`(`id`);
ALTER TABLE
    `contract` ADD CONSTRAINT `contract_status_id_foreign` FOREIGN KEY(`status_id`) REFERENCES `status`(`id`);
ALTER TABLE
    `machine` ADD CONSTRAINT `machine_district_id_foreign` FOREIGN KEY(`district_id`) REFERENCES `district`(`id`);
ALTER TABLE
    `user_location` ADD CONSTRAINT `user_location_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `user`(`id`);