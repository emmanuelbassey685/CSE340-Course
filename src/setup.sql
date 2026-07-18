-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');


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

SELECT COUNT(*) FROM organization;

SELECT COUNT(*) FROM service_project;

SELECT * FROM organization;

SELECT * FROM service_project;

-- ========================================
-- Category Table
-- ========================================

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

INSERT INTO category (name, description)
VALUES
('Community Service', 'Projects that improve local communities.'),
('Education', 'Projects that promote education and learning.'),
('Environment', 'Projects focused on environmental improvement.'),
('Health', 'Projects related to health and wellness.');

-- ========================================
-- Service Project Categories
-- ========================================

CREATE TABLE service_project_category (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,

    PRIMARY KEY (project_id, category_id),

    CONSTRAINT fk_project
        FOREIGN KEY (project_id)
        REFERENCES service_project(project_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES category(category_id)
        ON DELETE CASCADE
);

INSERT INTO service_project_category (project_id, category_id) VALUES
(1,1),
(2,2),
(3,3),
(4,4),
(5,4),

(6,3),
(7,1),
(8,2),
(9,4),
(10,1),

(11,1),
(12,2),
(13,3),
(14,4),
(15,1),

-- Projects with multiple categories
(3,1),
(8,1),
(9,1),
(5,1),
(13,1); 

SELECT COUNT(*) FROM category;

SELECT COUNT(*) FROM service_project_category;

SELECT * FROM category;

SELECT * FROM service_project_category;