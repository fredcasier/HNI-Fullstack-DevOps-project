USE `full-stack-users`;

INSERT INTO `type_user` (`type_name`)
VALUES
  ('admin'),
  ('manager'),
  ('user');

INSERT INTO `user` (`last_name`, `first_name`, `email`, `type_id`)
SELECT seed.`last_name`, seed.`first_name`, seed.`email`, type_user.`id`
FROM (
  SELECT 'Tiroir' AS `last_name`, 'Fred' AS `first_name`, 'ftiroir@mail.com' AS `email`, 'admin' AS `type_name`
  UNION ALL SELECT 'Martin', 'Alice', 'amartin@mail.com', 'manager'
  UNION ALL SELECT 'Dupont', 'Jean', 'jdupont@mail.com', 'user'
  UNION ALL SELECT 'Bernard', 'Sophie', 'sbernard@mail.com', 'manager'
  UNION ALL SELECT 'Petit', 'Paul', 'ppetit@mail.com', 'user'
) AS seed
JOIN `type_user` ON type_user.`type_name` = seed.`type_name`;