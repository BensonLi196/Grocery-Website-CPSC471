-- items,user,supplier,store,manager,orders,manages,customer,browses,makes,has,manages,stocks,receives
-- whats left are household, grocery, the shopping list things, and fixing some stuff for this code
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Sunny3489$';
SET FOREIGN_KEY_CHECKS = 1;
DROP DATABASE IF EXISTS GROCERY_STORE;
CREATE DATABASE GROCERY_STORE; 
USE GROCERY_STORE;

-- a list of the stores suppliers
DROP TABLE IF EXISTS SUPPLIER;
CREATE TABLE SUPPLIER (
	supID		int not null,
    supName		varchar(45) not null,
    address		varchar(255) not null,
    CONSTRAINT store_pk PRIMARY KEY (supID)
);

-- information of the store
DROP TABLE IF EXISTS STORE;
CREATE TABLE STORE (
	storeID		varchar(45) not null,
    strName		varchar(45) not null,
    address		varchar(255) not null,
    openHours	varchar(255) not null,
    CONSTRAINT store_pk PRIMARY KEY (storeID)
);

-- creating a list of items to pick from, a table that contains all items as a single list
DROP TABLE IF EXISTS ITEMS;
CREATE TABLE ITEMS (
	itemID		int not null auto_increment,
    itemName	varchar(255),
    price		double not null,
    discount 	double default 0,
    aisle		varchar(10) not null,
    amount		int,
    supplier	int,
    store		varchar(45) default 'store1', 
    CONSTRAINT item_pk PRIMARY KEY (itemID),
    FOREIGN KEY (supplier) REFERENCES SUPPLIER(supID),
    FOREIGN KEY (store) REFERENCES STORE(storeID)
);

-- creating a list of grocery items to pick from, a table that contains all grocery items as a single list
DROP TABLE IF EXISTS GROCERY;
CREATE TABLE GROCERY (
	itemID		int not null,
    expiryDate	DATE,
    allergies	varchar(255),
    category	varchar(255) not null,
    special		varchar(255),
    FOREIGN KEY (itemID) REFERENCES ITEMS(itemID) ON DELETE CASCADE
);

-- creating a list of household items to pick from, a table that contains all household items as a single list
DROP TABLE IF EXISTS HOUSEHOLD;
CREATE TABLE HOUSEHOLD (
	itemID		int not null,
    category	varchar(255) not null,
    FOREIGN KEY (itemID) REFERENCES ITEMS(itemID) ON DELETE CASCADE
);

-- creating a list of pharmacy items to pick from, a table that contains all pharmacy items as a single list
DROP TABLE IF EXISTS PHARMACY;
CREATE TABLE PHARMACY (
	itemID		int not null,
    genName		varchar(255) not null,
    brandName	varchar(255),
    FOREIGN KEY (itemID) REFERENCES ITEMS(itemID) ON DELETE CASCADE
);

-- a database of all users who are signed up
DROP TABLE IF EXISTS THE_USER;
CREATE TABLE THE_USER (
	userID		varchar(20) not null,
    FName		varchar(45) not null,
    lName		varchar(45) not null,
    email		varchar(255) not null,
    Upassword	varchar(255) not null,
    CONSTRAINT the_user_pk PRIMARY KEY (userID)
);

-- manager and customer probably need to change
DROP TABLE IF EXISTS MANAGER;
CREATE TABLE MANAGER (
	mgrID		varchar(20) not null,
    storeID		varchar(45) not null,
    PRIMARY KEY (mgrID, StoreID),
    FOREIGN KEY (mgrID) REFERENCES THE_USER(userID),
    FOREIGN KEY (storeID) REFERENCES STORE(storeID)
);

-- probably needs to change
DROP TABLE IF EXISTS CUSTOMER;
CREATE TABLE CUSTOMER (
	ctmrID		varchar(20) not null,
    FOREIGN KEY (ctmrID) REFERENCES THE_USER(userID)
);

-- needs to become a weak entity
-- not sure if the structure is correct in terms of containing multiple items per 1 order
DROP TABLE IF EXISTS ORDERS;
CREATE TABLE ORDERS (
	orderID		int not null auto_increment,
	mgrID		varchar(20) not null,
    supID		int not null,
	FOREIGN KEY (mgrID) REFERENCES MANAGER(mgrID),
    FOREIGN KEY (supID) REFERENCES SUPPLIER(supID),
    CONSTRAINT orderID_pk PRIMARY KEY (orderID)
);

DROP TABLE IF EXISTS ORDER_ITEMS;
CREATE TABLE ORDER_ITEMS (
	orderID		int not null,
    itemID		int,
    FOREIGN KEY (orderID) REFERENCES ORDERS(orderID),
    FOREIGN KEY (itemID) REFERENCES ITEMS(itemID) ON DELETE CASCADE
);

DROP TABLE IF EXISTS SHOP_LIST;
CREATE TABLE SHOP_LIST (
	listID		int not null auto_increment,
    listName	varchar(255) not null,
    ctmrID		varchar(20) not null,
    FOREIGN KEY (ctmrID) REFERENCES CUSTOMER(ctmrID),
    CONSTRAINT list_pk PRIMARY KEY (listID)
);

DROP TABLE IF EXISTS ADDS;
CREATE TABLE ADDS (
	listID		int not null,
    itemID		int,
    amount		int, 
    FOREIGN KEY (listID) REFERENCES SHOP_LIST(listID) ON DELETE CASCADE,
	FOREIGN KEY (itemID) REFERENCES ITEMS(itemID) ON DELETE CASCADE
);

-- unsure how to implement this so i left the structure here for later, feel free to work on it
-- DROP TABLE IF EXISTS SHOPPING_LIST;
-- CREATE TABLE SHOPPING_LIST (
-- 	
-- );
/*
-- here is where we can initially populate the databases, when you rerun the database (ie hit the lighting bolt again, all information
-- that was changed in the program resets.
INSERT INTO ITEMS (itemName, price, aisle, amount, supplier) 
VALUES 
	("tomato", 3, "3", 10, 1),
    ("potato", 1, "3", 11, 1),
    ("apple", 2.5, "3", 8, 1),
    ("carrot", 2, "3", 5, 1);
    */
INSERT INTO THE_USER(UserID, Fname, Lname, email, Upassword)
VALUES
	("bPX1xJtKFzD5P5o5LzZt", "test1", "test1", "aaa@bbb.ccc", "aaabbbccc"),
    ("yotK3qgm0Q2aJl7bEjKZ", "test2", "test2", "test2@test.tst", "test2yes");
    
INSERT INTO STORE(storeID, strName, address, openHours)
VALUES 
	("store1", "store1", "addr", "8:00-18:00");
    
INSERT INTO MANAGER(mgrID, storeID)
VALUES 
	("bPX1xJtKFzD5P5o5LzZt", "store1");
    
INSERT INTO SUPPLIER(supID, supName, address)
VALUES
	(1, "lol", "lol");
-- SHOW FULL TABLES;
SELECT * FROM THE_USER; 