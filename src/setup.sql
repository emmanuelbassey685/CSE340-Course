----------------------------------------------------
-- SERVICE PROJECTS TABLE
----------------------------------------------------
CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(100) NOT NULL,
    project_date DATE NOT NULL,
    CONSTRAINT fk_service_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
        ON DELETE CASCADE
);

----------------------------------------------------
-- ORGANIZATION 1
----------------------------------------------------
INSERT INTO service_project
(organization_id,title,description,location,project_date)
VALUES
(1,'Community Food Drive', 'Collect food donations for families.', 'Uyo', '2026-08-05'),
(1,'School Supply Giveaway', 'Donate school supplies.', 'Calabar', '2026-08-15'), 
(1,'Tree Planting', 'Environmental cleanup.', 'Ikot Ekpene', '2026-09-10'), 
(1,'Blood Donation', 'Community blood drive.', 'Eket', '2026-10-02'),
(1,'Medical Outreach', 'Free medical checks.', 'Oron', '2026-11-14');

----------------------------------------------------
-- ORGANIZATION 2
----------------------------------------------------
INSERT INTO service_project (organization_id,title,description,location,project_date) VALUES
(2,'Beach Cleanup', 'Clean coastal beaches.', 'Lagos', '2026-07-20'),
(2,'Senior Care Visit', 'Visit elderly homes.', 'Abuja', '2026-08-11'),
(2,'Youth Coding Camp', 'Teach web development.', 'Port Harcourt', '2026-09-05'),
(2,'Health Awareness Walk', 'Promote healthy living.', 'Enugu', '2026-10-12'),
(2,'Clothing Drive', 'Donate clothing.', 'Benin City', '2026-11-22');

----------------------------------------------------
-- ORGANIZATION 3
----------------------------------------------------
INSERT INTO service_project (organization_id,title,description,location,project_date) VALUES
(3,'Community Cleanup', 'Neighborhood sanitation.', 'Jos', '2026-07-30'),
(3,'Literacy Program', 'Teach reading skills.', 'Kaduna', '2026-08-15'),
(3,'Water Well Repair', 'Repair damaged wells.', 'Kano', '2026-09-28'),
(3,'Hospital Volunteer Day', 'Assist hospital staff.', 'Ibadan', '2026-10-25'), 
(3,'Christmas Food Distribution', 'Provide food packages.', 'Makurdi', '2026-12-18');

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE project_categories (
    project_id INT NOT NULL,
    category_id INT NOT NULL,

    PRIMARY KEY (project_id, category_id),

    FOREIGN KEY (project_id)
        REFERENCES projects(project_id)
        ON DELETE CASCADE,

    FOREIGN KEY (category_id)
        REFERENCES categories(category_id)
        ON DELETE CASCADE
);

INSERT INTO categories (category_name)
VALUES
('Environmental'), ('Education'), ('Health & Wellness');

INSERT INTO project_categories (project_id, category_id)
VALUES
(1,1), (1,2), (2,3), (3,1);