

```sql
CREATE TABLE Users (
    id INT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Posts (
    id INT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Comments (
    id INT PRIMARY KEY,
    content TEXT NOT NULL,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES Posts(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Likes (
    id INT PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES Posts(id),
    FOREIGN KEY (user_id) REFERENCES Users(id),
    UNIQUE (post_id, user_id)
);

CREATE TABLE Dislikes (
    id INT PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES Posts(id),
    FOREIGN KEY (user_id) REFERENCES Users(id),
    UNIQUE (post_id, user_id)
);

DELIMITER //
CREATE PROCEDURE registerUser(IN _username VARCHAR(255), IN _email VARCHAR(255), IN _password VARCHAR(255))
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
    INSERT INTO Users (username, email, password) VALUES (_username, _email, _password);
    COMMIT;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE createPost(IN _title VARCHAR(255), IN _content TEXT, IN _user_id INT)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
    INSERT INTO Posts (title, content, user_id) VALUES (_title, _content, _user_id);
    COMMIT;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE createComment(IN _content TEXT, IN _post_id INT, IN _user_id INT)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
    INSERT INTO Comments (content, post_id, user_id) VALUES (_content, _post_id, _user_id);
    COMMIT;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE likePost(IN _post_id INT, IN _user_id INT)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
    IF NOT EXISTS (SELECT 1 FROM Likes WHERE post_id = _post_id AND user_id = _user_id) THEN
        INSERT INTO Likes (post_id, user_id) VALUES (_post_id, _user_id);
    END IF;
    COMMIT;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE dislikePost(IN _post_id INT, IN _user_id INT)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
    IF NOT EXISTS (SELECT 1 FROM Dislikes WHERE post_id = _post_id AND user_id = _user_id) THEN
        INSERT INTO Dislikes (post_id, user_id) VALUES (_post_id, _user_id);
    END IF;
    COMMIT;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE getPosts()
BEGIN
    SELECT * FROM Posts;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE getComments(IN _post_id INT)
BEGIN
    SELECT * FROM Comments WHERE post_id = _post_id;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE getLikes(IN _post_id INT)
BEGIN
    SELECT COUNT(*) FROM Likes WHERE post_id = _post_id;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE getDislikes(IN _post_id INT)
BEGIN
    SELECT COUNT(*) FROM Dislikes WHERE post_id = _post_id;
END//
DELIMITER ;
```