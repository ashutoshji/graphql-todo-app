CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(30)
);

INSERT INTO users (name, email)
  VALUES ('Jerry', 'jerry@example.com'), ('George', 'george@example.com');

CREATE TABLE todo (
  id SERIAL PRIMARY KEY,
  user_id BIGINT,
  title VARCHAR(30),
  description VARCHAR(100),
  createdOn VARCHAR(30),
  createdBy VARCHAR(30),
  CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	  REFERENCES users(user_id)
);