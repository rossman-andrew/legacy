USE travelapp;
INSERT INTO GuideReplies (question, reply, createdAt, updatedAt) VALUES ('Where do you want to go?', 'Let me find you a trip!', CURDATE(), CURDATE());

INSERT INTO GuideReplies (question, reply, createdAt, updatedAt) VALUES ('Who\'s your favorite person?', 'Oh no way! Jack is coming with you on this trip!', CURDATE(), CURDATE());

CREATE TABLE `comments`
(
    `status_id` INT NOT NULL AUTO_INCREMENT,
    `s_text` TEXT,
    `t_status` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     PRIMARY KEY ( `status_id` )
);

INSERT INTO Users (name, email, password, salt, createdAt, updatedAt) VALUES ('Claire', 'deadnotsleeping@gmail.com', 'DeathP', '1234', CURDATE(), CURDATE());
INSERT INTO Users (name, email, password, salt, createdAt, updatedAt) VALUES ('Leo', 'admin@angularjs.com', 'PestilenceP', '5678', CURDATE(), CURDATE());
INSERT INTO Users (name, email, password, salt, createdAt, updatedAt) VALUES ('Christine', 'fitemeirl@hotmail.com', 'WarP', '91011', CURDATE(), CURDATE());
INSERT INTO Users (name, email, password, salt, createdAt, updatedAt) VALUES ('Masaki', '2hungry4u@yahoo.com', 'FamineP', '121314', CURDATE(), CURDATE());
INSERT INTO Users (name, email, password, salt, createdAt, updatedAt) VALUES ('Johnny', 'johnh@yahoo.com', 'FamineP', '1213314', CURDATE(), CURDATE());

INSERT INTO Trips (name, location, startDate, endDate, lodging, accessCode, isopen, createdAt, updatedAt) VALUES ('A Walk To Remember: Tenderloin', 'San Francisco, CA', '2017-11-15', '2017-11-21', 'The Lawdge', 'A5678', true, CURDATE(), CURDATE());
INSERT INTO Trips (name, location, startDate, endDate, lodging, accessCode, isopen, createdAt, updatedAt) VALUES ('Tokyo Express Journies', 'Tokyo, Japan', '2017-10-20', '2017-10-30', 'Mein Haus', 'A1234', true, CURDATE(), CURDATE());
INSERT INTO Trips (name, location, startDate, endDate, lodging, accessCode, isopen, createdAt, updatedAt) VALUES ('Blinky Dancers', 'Amsterdam', '2017-11-15', '2017-11-21', 'The Lawdge', 'B23414', true, CURDATE(), CURDATE());
INSERT INTO Trips (name, location, startDate, endDate, lodging, accessCode, isopen, createdAt, updatedAt) VALUES ('Poems in Sweden', 'Stockholm, Sweden', '2017-10-20', '2017-10-30', 'Mein Haus', 'C1234', true, CURDATE(), CURDATE());
INSERT INTO Trips (name, location, startDate, endDate, lodging, accessCode, isopen, createdAt, updatedAt) VALUES ('Slumber Party', 'Seattle, WA', '2017-11-15', '2017-11-21', 'The Lawdge', 'D5678', true, CURDATE(), CURDATE());
INSERT INTO Trips (name, location, startDate, endDate, lodging, accessCode, isopen, createdAt, updatedAt) VALUES ('Greece', 'Saritoni', '2017-10-20', '2017-10-30', 'Mein Haus', 'E1234', true, CURDATE(), CURDATE());
INSERT INTO Trips (name, location, startDate, endDate, lodging, accessCode, isopen, createdAt, updatedAt) VALUES ('Italy', 'Rome', '2017-11-15', '2017-11-21', 'The Lawdge', 'F5678', true, CURDATE(), CURDATE());
INSERT INTO Trips (name, location, startDate, endDate, lodging, accessCode, isopen, createdAt, updatedAt) VALUES ('France', 'Paris', '2017-10-20', '2017-10-30', 'Mein Haus', 'J1234', true, CURDATE(), CURDATE());

INSERT INTO UserTrips (flightItinerary, phone, TripId, UserId, createdAt, updatedAt) VALUES ('AA567', '867-5309', 1, 1, CURDATE(), CURDATE());
INSERT INTO UserTrips (flightItinerary, phone, TripId, UserId, createdAt, updatedAt) VALUES ('AA395', '555-5566', 2, 2, CURDATE(), CURDATE());
INSERT INTO UserTrips (flightItinerary, phone, TripId, UserId, createdAt, updatedAt) VALUES ('B23414', '867-1234', 3, 3, CURDATE(), CURDATE());
INSERT INTO UserTrips (flightItinerary, phone, TripId, UserId, createdAt, updatedAt) VALUES ('C1234', '444-5566', 4, 4, CURDATE(), CURDATE());
INSERT INTO UserTrips (flightItinerary, phone, TripId, UserId, createdAt, updatedAt) VALUES ('D5678', '867-5309', 5, 5, CURDATE(), CURDATE());
INSERT INTO UserTrips (flightItinerary, phone, TripId, UserId, createdAt, updatedAt) VALUES ('E1234', '555-5566', 6, 2, CURDATE(), CURDATE());
INSERT INTO UserTrips (flightItinerary, phone, TripId, UserId, createdAt, updatedAt) VALUES ('F5678', '867-1234', 7, 3, CURDATE(), CURDATE());
INSERT INTO UserTrips (flightItinerary, phone, TripId, UserId, createdAt, updatedAt) VALUES ('J1234', '444-5566', 8, 4, CURDATE(), CURDATE());
