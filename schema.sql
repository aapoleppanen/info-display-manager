CREATE TABLE apartments (
    id INT PRIMARY KEY,
    description TEXT NOT NULL,
    description_line_2 TEXT,
    address VARCHAR(255) NOT NULL
);

ALTER TABLE residents
ADD COLUMN apartment_id INT,
ADD FOREIGN KEY (apartment_id) REFERENCES apartments(id);

CREATE TABLE residents (
    id VARCHAR(15) PRIMARY KEY,
    resident_name VARCHAR(255) NOT NULL,
    house_number VARCHAR(255) NOT NULL,
    floor_number INTEGER NOT NULL,
    apartment_id INT,
);

CREATE TABLE "user" (
    id VARCHAR(15) PRIMARY KEY,
    username VARCHAR(31) NOT NULL UNIQUE
);
CREATE TABLE user_key (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(15) NOT NULL,
    hashed_password VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES user(id)
);
CREATE TABLE user_session (
    id VARCHAR(127) PRIMARY KEY,
    user_id VARCHAR(15) NOT NULL,
    active_expires BIGINT NOT NULL,
    idle_expires BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
);
