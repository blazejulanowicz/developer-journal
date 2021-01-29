DROP DATABASE dev_journals;
CREATE DATABASE dev_journals;
USE dev_journals;

CREATE TABLE `Author`
(
    `id`       int NOT NULL ,
    `login`    varchar(30) NOT NULL ,
    `passHash` varchar(50) NOT NULL ,

    PRIMARY KEY (`id`)
);

CREATE TABLE `Commit`
(
    `id` int NOT NULL ,

    PRIMARY KEY (`id`)
);

CREATE TABLE `Project`
(
    `id`   int NOT NULL ,
    `name` text NOT NULL ,

    PRIMARY KEY (`id`)
);

CREATE TABLE `Entries`
(
    `id`        int NOT NULL AUTO_INCREMENT ,
    `content`   text NOT NULL ,
    `timestamp` datetime NOT NULL ,
    `authorID`  int NOT NULL ,
    `projectID` int NULL ,

    PRIMARY KEY (`id`),
    KEY `fkIdx_25` (`authorID`),
    CONSTRAINT `FK_24` FOREIGN KEY `fkIdx_25` (`authorID`) REFERENCES `Author` (`id`),
    KEY `fkIdx_28` (`projectID`),
    CONSTRAINT `FK_27` FOREIGN KEY `fkIdx_28` (`projectID`) REFERENCES `Project` (`id`)
);

CREATE TABLE `CommitToEntry`
(
    `entryID`  int NOT NULL ,
    `commitID` int NOT NULL ,

    PRIMARY KEY (`entryID`, `commitID`),
    KEY `fkIdx_31` (`commitID`),
    CONSTRAINT `FK_30` FOREIGN KEY `fkIdx_31` (`commitID`) REFERENCES `Commit` (`id`),
    KEY `fkIdx_34` (`entryID`),
    CONSTRAINT `FK_33` FOREIGN KEY `fkIdx_34` (`entryID`) REFERENCES `Entries` (`id`)
);

