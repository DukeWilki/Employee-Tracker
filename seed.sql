-- // Dpartmet data
INSERT INTO departments (name)
VALUES  ('Tech Development'),
        ('Executive'),
        ('Sales'),
        ('Marketing'),
        ('Finance'),
        ('Human Resources'),
        ('IT Security');

-- // Role data
INSERT INTO roles (title, salary, department_id)
VALUES  ('Developer', 102000, 1),
        ('Quality Assurance', 106000, 1),
        ('Designer', 102000, 1),
        ('IT Manager', 226000, 1),
        ('Scrum Master', 129000, 1),
        ('Payroll Officer', 98000, 6),
        ('HR Manager', 226000, 6),
        ('Marketing Manager', 226000, 4),
        ('Marketing Assistant', 98000, 4),
        ('Financial Analyst', 129000, 5),
        ('Sales Manager', 226000, 3),
        ('Sales Executive', 92000, 3),
        ('Cheif Executive Officer', 462000, 2),
        ('Cheif Financial Officer', 398000, 2),
        ('Cheif Operating Officer', 398000, 2),
        ('Executive Assistant', 122000, 2),
        ('IT Security Manager', 226000, 7),
        ('IT Security Analyst', 92000, 7),
        ('Hacker', 92000, 7);

-- // Employee data
INSERT INTO employees (first_name, last_name, role_id, manager_id, ismanager)
VALUES  ('Nick', 'Fury', 13, null, TRUE),
        ('Betty', 'Ross', 14, 1, TRUE),
        ('Thunderbolt', 'Ross', 15, 1, TRUE),
        ('Tony', 'Stark', 4, 3, TRUE),
        ('Charles', 'Xavier', 7, 3, TRUE),
        ('Steve', 'Rogers', 8, 3, TRUE),
        ('Carol', 'Danvers', 11, 3, TRUE),
        ('Rocket', 'Racoon', 17, 3, TRUE),
        ('Natasha', 'Romanov', 5, 4, TRUE),
        ('Stephen', 'Strange', 5, 4, TRUE),
        ('Gwen', 'Stacey', 5, 4, TRUE),
        ('Maria', 'Hill', 16, 1, FALSE),
        ('Obidiah', 'Staine', 10, 2, FALSE),
        ('Jean', 'Grey', 10, 2, FALSE),
        ('Phil', 'Coulson', 10, 2, FALSE),
        ('Jennifer', 'Walters', 6, 5, FALSE),
        ('Victor', 'Von Doom', 6, 5, FALSE),
        ('Howard', 'Duck', 6, 5, FALSE),
        ('Sam', 'Wilson', 9, 6, FALSE),
        ('Buckey', 'Barnes', 9, 6, FALSE),
        ('Kamila', 'Kahn', 9, 6, FALSE),
        ('Ororo', 'Munroe', 12, 7, FALSE),
        ('Hank', 'McCoy', 12, 7, FALSE),
        ('Alex', 'Summers', 12, 7, FALSE),
        ('Laura', 'Kinney', 12, 7, FALSE),
        ('Kurt', 'Wagner', 12, 7, FALSE),
        ('Kitty', 'Pryde', 12, 7, FALSE),
        ('Peter', 'Quill', 18, 8, FALSE),
        ('Nebula', 'Peale', 18, 8, FALSE),
        ('Drax', 'Destryer', 19, 8, FALSE),
        ('Gamora', 'Zen Whoberi Ben Tita', 19, 8, FALSE),
        ('Scott', 'Lang', 1, 9, FALSE),
        ('Hope', 'van Dyne', 2, 9, FALSE),
        ('Yelena', 'Belova', 3, 9, FALSE),
        ('Bruce', 'Banner', 1, 9, FALSE),
        ('Hela', 'Odinsdottir', 1, 10, FALSE),
        ('Thor', 'Odinson', 2, 10, FALSE),
        ('Loki', 'Odinson', 3, 10, FALSE),
        ('Flash', 'Thompson', 1, 11, FALSE),
        ('Aaron', 'Davis', 1, 11, FALSE),
        ('Peter', 'Parker', 2, 11, FALSE),
        ('Miles', 'Morales', 3, 11, FALSE);
