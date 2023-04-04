-- items,user,supplier,store,manager,orders,manages,customer,browses,makes,has,manages,stocks,receives
-- whats left are household, grocery, the shopping list things, and fixing some stuff for this code
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Sunny3489$';
DROP DATABASE IF EXISTS GROCERY_STORE;
CREATE DATABASE GROCERY_STORE; 
USE GROCERY_STORE;

-- creating a list of items to pick from, a table that contains all items as a single list
DROP TABLE IF EXISTS ITEMS;
CREATE TABLE ITEMS (
	itemID		int not null,
    itemName	varchar(255),
    price		double not null,
    aisle		varchar(10) not null,
    amount		int,
    CONSTRAINT item_pk PRIMARY KEY (itemID)
);

-- a database of all users who are signed up
DROP TABLE IF EXISTS THE_USER;
CREATE TABLE THE_USER (
	userID		int not null,
    FName		varchar(45) not null,
    lName		varchar(45) not null,
    email		varchar(255) not null,
    Upassword	varchar(255) not null,
    CONSTRAINT the_user_pk PRIMARY KEY (userID)
);

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
	storeID		int not null,
    strName		varchar(45) not null,
    address		varchar(255) not null,
    openHours	varchar(255) not null,
    stocks		int,
    FOREIGN KEY (stocks) REFERENCES ITEMS(itemID), 
    CONSTRAINT store_pk PRIMARY KEY (storeID)
);

-- manager and customer probably need to change
DROP TABLE IF EXISTS MANAGER;
CREATE TABLE MANAGER (
	mgrID		int not null,
    storeID		int not null,
    FOREIGN KEY (mgrID) REFERENCES THE_USER(userID),
    FOREIGN KEY (storeID) REFERENCES STORE(storeID)
);

-- probably needs to change
DROP TABLE IF EXISTS CUSTOMER;
CREATE TABLE CUSTOMER (
	ctmrID		int not null,
    FOREIGN KEY (ctmrID) REFERENCES THE_USER(userID)
);

-- allows user to browse through the items list
DROP TABLE IF EXISTS BROWSES;
CREATE TABLE BROWSES (
	ctmrID		int not null,
    itemID		int not null,
    discount	varchar(45),
    FOREIGN KEY (ctmrID) REFERENCES CUSTOMER(ctmrID),
    FOREIGN KEY (itemID) REFERENCES ITEMS(itemID)
);

-- a list of deliverables, items that come from the supplier
DROP TABLE IF EXISTS HAS;
CREATE TABLE HAS (
	itemID		int not null,
    supID		int not null,
    deliverAddr	varchar(45) not null,
    FOREIGN KEY (itemID) REFERENCES ITEMS(itemID),
    FOREIGN KEY (supID) REFERENCES SUPPLIER(supID)
);

-- needs to become a weak entity
-- not sure if the structure is correct in terms of containing multiple items per 1 order
DROP TABLE IF EXISTS ORDERS;
CREATE TABLE ORDERS (
	orderID		int not null,
	mgrID		int not null,
    supID		int not null,
    items		int,
--     CONSTRAINT fk_the_mgrID FOREIGN KEY (mgrID)
-- 	REFERENCES THE_USER(userID),
--     CONSTRAINT fk_supID FOREIGN KEY (supID)
-- 	REFERENCES SUPPLIER(supID),
	FOREIGN KEY (mgrID) REFERENCES THE_USER(userID),
    FOREIGN KEY (supID) REFERENCES SUPPLIER(supID),
    FOREIGN KEY (items) REFERENCES ITEMS(itemID),
    CONSTRAINT orderID_pk PRIMARY KEY (orderID)
);

-- the items the manager can view/manage
DROP TABLE IF EXISTS MANAGES;
CREATE TABLE MANAGES (
	mgrID		int,
    itemID		int,
    FOREIGN KEY (mgrID) REFERENCES THE_USER(userID),
    FOREIGN KEY (itemID) REFERENCES ITEMS(itemID)
);

-- also not sure if this is correct in terms of creating a single order with multiple items
DROP TABLE IF EXISTS MAKES;
CREATE TABLE MAKES (
	mgrID		int not null,
    items		int not null,
    FOREIGN KEY (mgrID) REFERENCES MANAGER(mgrID),
    FOREIGN KEY (items) REFERENCES ITEMS(itemID)
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

DROP TABLE IF EXISTS RECEIVES;
CREATE TABLE RECEIVES (
	orderID		int,
    supID		int,
    FOREIGN KEY (orderID) REFERENCES ORDERS(orderID),
    FOREIGN KEY (supID) REFERENCES SUPPLIER(supID)
);

-- unsure how to implement this so i left the structure here for later, feel free to work on it
-- DROP TABLE IF EXISTS SHOPPING_LIST;
-- CREATE TABLE SHOPPING_LIST (
-- 	
-- );

-- here is where we can initially populate the databases, when you rerun the database (ie hit the lighting bolt again, all information
-- that was changed in the program resets.
INSERT INTO ITEMS (itemID, itemName, price, aisle, amount) 
VALUES 
	(0, "tomato", 3, "3", 10),
    (1, "potato", 1, "3", 11),
    (2, "apple", 2.5, "3", 8),
    (3, "carrot", 2, "3", 5);
    
-- SHOW FULL TABLES;
-- SELECT * FROM ITEMS; 