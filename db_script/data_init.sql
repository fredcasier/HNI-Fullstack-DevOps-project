USE `full-stack-users`;

INSERT INTO `type_user` (`type_name`)
VALUES
  ('Admin'),
  ('Manager'),
  ('User'),
  ('Support'),
  ('Editor'),
  ('Viewer'),
  ('Analyst'),
  ('Developer'),
  ('Designer'),
  ('Coordinator'),
  ('Accountant'),
  ('Human Resources'),
  ('Sales'),
  ('Marketing'),
  ('Customer Service'),
  ('Project Lead'),
  ('Auditor'),
  ('Consultant'),
  ('Operator'),
  ('Supervisor'),
  ('Guest');

INSERT INTO `user` (`last_name`, `first_name`, `email`, `type_id`)
SELECT seed.`last_name`, seed.`first_name`, seed.`email`, type_user.`id`
FROM (
  SELECT 'Tiroir' AS `last_name`, 'Fred' AS `first_name`, 'ftiroir@mail.com' AS `email`, 'admin' AS `type_name`
  UNION ALL SELECT 'Martin', 'Alice', 'amartin@mail.com', 'manager'
  UNION ALL SELECT 'Dupont', 'Jean', 'jdupont@mail.com', 'user'
  UNION ALL SELECT 'Bernard', 'Sophie', 'sbernard@mail.com', 'manager'
  UNION ALL SELECT 'Petit', 'Paul', 'ppetit@mail.com', 'user'
  UNION ALL SELECT 'Robert', 'Emma', 'erobert@mail.com', 'support'
  UNION ALL SELECT 'Richard', 'Lucas', 'lrichard@mail.com', 'editor'
  UNION ALL SELECT 'Durand', 'Chloe', 'cdurand@mail.com', 'viewer'
  UNION ALL SELECT 'Moreau', 'Hugo', 'hmoreau@mail.com', 'analyst'
  UNION ALL SELECT 'Simon', 'Lea', 'lsimon@mail.com', 'developer'
  UNION ALL SELECT 'Laurent', 'Nathan', 'nlaurent@mail.com', 'designer'
  UNION ALL SELECT 'Lefebvre', 'Manon', 'mlefebvre@mail.com', 'coordinator'
  UNION ALL SELECT 'Michel', 'Louis', 'lmichel@mail.com', 'accountant'
  UNION ALL SELECT 'Garcia', 'Jade', 'jgarcia@mail.com', 'human resources'
  UNION ALL SELECT 'David', 'Gabriel', 'gdavid@mail.com', 'sales'
  UNION ALL SELECT 'Bertrand', 'Ines', 'ibertrand@mail.com', 'marketing'
  UNION ALL SELECT 'Roux', 'Ethan', 'eroux@mail.com', 'customer service'
  UNION ALL SELECT 'Vincent', 'Lina', 'lvincent@mail.com', 'project lead'
  UNION ALL SELECT 'Fournier', 'Noah', 'nfournier@mail.com', 'auditor'
  UNION ALL SELECT 'Morel', 'Louise', 'lmorel@mail.com', 'consultant'
  UNION ALL SELECT 'Girard', 'Adam', 'agirard@mail.com', 'operator'
  UNION ALL SELECT 'Andre', 'Mila', 'mandre@mail.com', 'supervisor'
  UNION ALL SELECT 'Lefevre', 'Theo', 'tlefevre@mail.com', 'guest'
) AS seed
JOIN `type_user` ON type_user.`type_name` = seed.`type_name`;