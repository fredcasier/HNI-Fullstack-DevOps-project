CREATE USER IF NOT EXISTS 'hniproject'@'%' IDENTIFIED BY 'hniproject';

GRANT ALL PRIVILEGES ON `full-stack-users`.* TO 'hniproject'@'%';