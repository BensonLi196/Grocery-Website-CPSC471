-- items, user, supplier, store, manager, orders, manages
DROP DATABASE IF EXISTS GROCERY_STORE;
CREATE DATABASE GROCERY_STORE; 
USE GROCERY_STORE;

DROP TABLE IF EXISTS ITEMS;
CREATE TABLE ITEMS (
	itemID		int not null,
    itemName	varchar(255),
    price		double not null,
    aisle		varchar(10) not null,
    amount		int,
    CONSTRAINT item_pk PRIMARY KEY (itemID)
);

DROP TABLE IF EXISTS THE_USER;
CREATE TABLE THE_USER (
	userID		int not null,
    FName		varchar(45) not null,
    lName		varchar(45) not null,
    email		varchar(255) not null,
    Upassword	varchar(255) not null,
    CONSTRAINT the_user_pk PRIMARY KEY (userID)
);

DROP TABLE IF EXISTS SUPPLIER;
CREATE TABLE SUPPLIER (
	supID		int not null,
    supName		varchar(45) not null,
    address		varchar(255) not null,
    CONSTRAINT store_pk PRIMARY KEY (supID)
);

DROP TABLE IF EXISTS STORE;
CREATE TABLE STORE (
	storeID		int not null,
    strName		varchar(45) not null,
    address		varchar(255) not null,
    openHours	varchar(255) not null,
    stocks		int,
    FOREIGN KEY (stocks) REFERENCES ITEMS(itemID), 
    CONSTRAINT store_pk PRIMARY KEY (storeID)
);

DROP TABLE IF EXISTS MANAGER;
CREATE TABLE MANAGER (
	mgrID		int not null,
    storeID		int not null,
    FOREIGN KEY (mgrID) REFERENCES THE_USER(userID),
    FOREIGN KEY (storeID) REFERENCES STORE(storeID)
--     CONSTRAINT fk_mgrID FOREIGN KEY (mgrID)
-- 	REFERENCES THE_USER(userID),
--     CONSTRAINT fk_storeID FOREIGN KEY (storeID)
-- 	REFERENCES STORE(storeID)
);

DROP TABLE IF EXISTS ORDERS;
CREATE TABLE ORDERS (
	orderID		int not null,
	mgrID		int not null,
    supID		int not null,
--     CONSTRAINT fk_the_mgrID FOREIGN KEY (mgrID)
-- 	REFERENCES THE_USER(userID),
--     CONSTRAINT fk_supID FOREIGN KEY (supID)
-- 	REFERENCES SUPPLIER(supID),
	FOREIGN KEY (mgrID) REFERENCES THE_USER(userID),
    FOREIGN KEY (supID) REFERENCES SUPPLIER(supID),
    CONSTRAINT orderID_pk PRIMARY KEY (orderID)
);

DROP TABLE IF EXISTS MANAGES;
CREATE TABLE MANAGES (
	mgrID		int,
    itemID		int,
    FOREIGN KEY (mgrID) REFERENCES THE_USER(userID),
    FOREIGN KEY (itemID) REFERENCES ITEMS(itemID)
);

DROP TABLE IF EXISTS BROWSES;
CREATE TABLE BROWSES (
	userID		int,
    itemID		int,
    discounted	int,
    menu		varchar(45), -- ????
    FOREIGN KEY (userID) REFERENCES THE_USER(userID),
    FOREIGN KEY (itemID) REFERENCES ITEMS(itemID)
    
);

-- DROP TABLE IF EXISTS SHOPPING_LIST;
-- CREATE TABLE SHOPPING_LIST (
-- 	
-- );

INSERT INTO ITEMS (itemID, itemName, price, aisle, amount) 
VALUES 
	(0, "tomato", 3, "3", 10),
    (1, "potato", 1, "3", 11),
    (2, "apple", 2.5, "3", 8),
    (3, "carrot", 2, "3", 5);
    
-- SHOW FULL TABLES;
-- SELECT * FROM ITEMS; 