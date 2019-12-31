BEGIN TRANSACTION;

INSERT into users (name, email, entries, joined) values ('Tom', 'tom@gmail.com', 21, '2019-01-01');
-- Hash is 'a'
INSERT into login (hash, email) values ('$2a$10$WAK21U0LWl7C//jJ.DOB2uPP1DJQh7KUDgasdyQeGzkop2Pzl8W7u', 'tom@gmail.com');

COMMIT;