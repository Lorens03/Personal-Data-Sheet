USE `pds`;

CREATE TABLE pds_records (
    id INT(11) NOT NULL AUTO_INCREMENT,
    display_name VARCHAR(255) NOT NULL DEFAULT 'Untitled PDS',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE personal_information
    ADD COLUMN pds_id INT(11) NULL,
    ADD UNIQUE KEY uq_personal_information_pds_id (pds_id),
    ADD CONSTRAINT fk_personal_information_pds
        FOREIGN KEY (pds_id) REFERENCES pds_records (id) ON DELETE CASCADE;

ALTER TABLE family
    ADD COLUMN pds_id INT(11) NULL,
    ADD UNIQUE KEY uq_family_pds_id (pds_id),
    ADD CONSTRAINT fk_family_pds
        FOREIGN KEY (pds_id) REFERENCES pds_records (id) ON DELETE CASCADE;

ALTER TABLE education
    ADD COLUMN pds_id INT(11) NULL,
    ADD UNIQUE KEY uq_education_pds_id (pds_id),
    ADD CONSTRAINT fk_education_pds
        FOREIGN KEY (pds_id) REFERENCES pds_records (id) ON DELETE CASCADE;

CREATE TABLE pds_children (
    id INT(11) NOT NULL AUTO_INCREMENT,
    pds_id INT(11) NOT NULL,
    full_name VARCHAR(255) DEFAULT NULL,
    date_of_birth DATE DEFAULT NULL,
    PRIMARY KEY (id),
    KEY idx_pds_children_pds_id (pds_id),
    CONSTRAINT fk_pds_children_record
        FOREIGN KEY (pds_id) REFERENCES pds_records (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
