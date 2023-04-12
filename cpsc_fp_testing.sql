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

-- here is where we can initially populate the databases, when you rerun the database (ie hit the lighting bolt again,
-- all information that was changed in the program resets.
INSERT INTO SUPPLIER(supID, supName, address)
VALUES
	(1, "ElectricsConnect", "Edmonton, AB, CANADA"),
    (2, "MeatsDelivered", "Calgary, AB, CANADA"),
    (3, "Clothing4All", "Toronto, ON, CANADA"),
    (4, "BestVeggies", "Scaramento, CAL, USA"),
    (5, "BestOfTheRest", "Calgary, AB, CANADA"),
    (6, "CanadaDrugs", "Calgary, AB, CANADA");
    
INSERT INTO STORE(storeID, strName, address, openHours)
VALUES 
	("store1", "WalKart", "Calgary AB", "08:00-22:00"),
    ("store2", "SuperMore", "Calgary AB", "08:00-22:00");

-- store 1
INSERT INTO ITEMS (itemName, price, discount, aisle, amount, supplier, store) 
VALUES 
    ("cheese", 3.5, 0, "3", 50, 2, "store1"), -- done
    ("milk", 5.45, 0, "3", 60, 4, "store1"), -- done
    ("tomato", 3.5, 0, "3", 50, 4, "store1"), -- done
    ("potato", 1.5, 0, "3", 60, 4, "store1"), -- done
    ("apple", 2, 0, "3", 50, 4, "store1"), -- done
    ("carrot", 3, 0, "3", 30, 4, "store1"), -- done
    ("lemons", 5.20, 0, "9", 55, 5, "store1"),
    ("bread", 5.45, 0, "3", 60, 5, "store1"), -- done
    ("hotdog buns", 5.45, 0, "3", 60, 4, "store1"), -- done
    ("ground beef", 12, 0, "5", 15, 2, "store1"), -- done
    ("hotdogs", 12, 0, "5", 15, 2, "store1"), -- done
    ("chicken breast", 12, 5, "5", 15, 2, "store1"),
    ("rice bag", 3.20, 0, "1", 55, 5, "store1"), -- done
    ("pasta", 5.25, 0, "3", 30, 5, "store1"), -- done
    ("cereal", 6.20, 0, "1", 55, 5, "store1"), -- done
    ("eggs", 5.25, 0, "3", 30, 5, "store1"), -- done
    ("fish", 10, 0, "1", 55, 5, "store1"), -- done
    ("lobster", 10, 0, "1", 55, 5, "store1"), -- dont
    ("ginger ale", 5.20, 0, "9", 55, 5, "store1"), -- done
    ("coca cola", 5.20, 0, "9", 55, 5, "store1"),
    ("orange juice", 20, 0, "1", 55, 5, "store1"), -- done
    ("ham", 5.20, 0, "9", 55, 5, "store1"), -- done
    ("salami", 20, 0, "1", 55, 5, "store1"), -- done
    ("ice cream", 5.20, 0, "9", 55, 5, "store1"), -- done
    ("beyond meat", 20, 0, "1", 55, 5, "store1"), -- done

    ("shampoo", 11.99, 0, "8", 60, 3, "store1"), -- done
    ("conditioner", 11.99, 0, "8", 60, 3, "store1"), -- done
    ("pans", 15.99, 12, "1", 20, 1, "store1"), -- done
    ("pots", 15.99, 12, "1", 20, 1, "store1"), -- done
    ("diapers", 15.99, 12, "1", 20, 1, "store1"), -- done

    ("advil", 23, 0, "3", 20, 6, "store1"), -- done
    ("morphine", 45.45, 0, "3", 20, 6, "store1"), -- done
    ("metformin", 45.45, 0, "3", 20, 6, "store1"); -- done
INSERT INTO GROCERY(itemID, expiryDate, allergies, category, special)
VALUES
    ((SELECT itemID FROM ITEMS WHERE itemName = "cheese" AND store = "store1"),"2023-04-30","lactose","dairy",""),
    ((SELECT itemID FROM ITEMS WHERE itemName = "milk" AND store = "store1"),"2023-04-30","lactose","dairy",""),
    ((SELECT itemID FROM ITEMS WHERE itemName = "tomato" AND store = "store1"),"2023-04-30","","fruit",""),
    ((SELECT itemID FROM ITEMS WHERE itemName = "potato" AND store = "store1"),"2023-04-30","","vegetable",""),
    ((SELECT itemID FROM ITEMS WHERE itemName = "apple" AND store = "store1"),"2023-04-30","","fruit",""),
    ((SELECT itemID FROM ITEMS WHERE itemName = "carrot" AND store = "store1"),"2023-04-30","","vegetable",""),
    ((SELECT itemID FROM ITEMS WHERE itemName = "bread" AND store = "store1"),"2023-04-30","celiac","bakery",""),
    ((SELECT itemID FROM ITEMS WHERE itemName = "hotdog buns" AND store = "store1"),"2023-04-30","","bakery",""),
    ((SELECT itemID FROM ITEMS WHERE itemName = "ground beef" AND store = "store1"),"2023-04-30","","meat",""),
    ((SELECT itemID FROM ITEMS WHERE itemName = "hotdogs" AND store = "store1"),"2023-04-30","","meat",""),
    ((SELECT itemID FROM ITEMS WHERE itemName = "rice bag" AND store = "store1"),"2023-04-30","","grocery",""),
    ((SELECT itemID FROM ITEMS WHERE itemName = "pasta" AND store = "store1"),"2023-04-30","celiac","grocery",""),
    ((SELECT itemID FROM ITEMS WHERE itemName = "cereal" AND store = "store1"),"2023-04-30","celiac","breakfast",""),
    ((SELECT itemID FROM ITEMS WHERE itemName = "eggs" AND store = "store1"),"2023-04-30","","breakfast",""),
    ((SELECT itemID FROM ITEMS WHERE itemName = "fish" AND store = "store1"),"2023-04-30","","seafood",""),
    ((SELECT itemID FROM ITEMS WHERE itemName = "lobster" AND store = "store1"),"2023-04-30","","seafood",""),
    ((SELECT itemID FROM ITEMS WHERE itemName = "ginger ale" AND store = "store1"),"2023-04-30","","drinks",""),
    ((SELECT itemID FROM ITEMS WHERE itemName = "orange juice" AND store = "store1"),"2023-04-30","","drinks",""),
    ((SELECT itemID FROM ITEMS WHERE itemName = "ham" AND store = "store1"),"2023-04-30","","deli",""),
    ((SELECT itemID FROM ITEMS WHERE itemName = "fish" AND store = "store1"),"2023-04-30","","deli",""),
    ((SELECT itemID FROM ITEMS WHERE itemName = "ice cream" AND store = "store1"),"2023-04-30","lactose","frozen","dairy"),
    ((SELECT itemID FROM ITEMS WHERE itemName = "beyond meat" AND store = "store1"),"2023-04-30","","frozen","vegan");
INSERT INTO HOUSEHOLD(itemID, category)
VALUES
    ((SELECT itemID FROM ITEMS WHERE itemName = "shampoo" AND store = "store1"), "personal hygiene"),
    ((SELECT itemID FROM ITEMS WHERE itemName = "conditioner" AND store = "store1"), "personal hygiene"),
    ((SELECT itemID FROM ITEMS WHERE itemName = "pans" AND store = "store1"), "home"),
    ((SELECT itemID FROM ITEMS WHERE itemName = "pots" AND store = "store1"), "home"),
    ((SELECT itemID FROM ITEMS WHERE itemName = "diapers" AND store = "store1"), "baby");
INSERT INTO PHARMACY(itemID, genName, brandName)
VALUES
    ((SELECT itemID FROM ITEMS WHERE itemName = "advil" AND store = "store1"), "Ibuprofen", "advil"),
    ((SELECT itemID FROM ITEMS WHERE itemName = "morphine" AND store = "store1"), "opioid", "CanadaDrugs"),
    ((SELECT itemID FROM ITEMS WHERE itemName = "metformin" AND store = "store1"), "dimethyl-biguanide hydrochloride", "CanadaDrugs");


-- store 2
INSERT INTO ITEMS (itemName, price, discount, aisle, amount, supplier, store) 
VALUES 
    ("cheese", 3.5, 0, "3", 50, 2, "store2"), -- done
    ("milk", 5.45, 0, "3", 60, 4, "store2"), -- done
    ("potato", 2, 0, "3", 60, 4, "store2"), -- done
    ("bread", 5.45, 0, "3", 60, 5, "store2"), -- done
    ("eggs", 5.45, 0, "3", 60, 4, "store2"), -- done
    ("apple", 2, 0, "3", 50, 4, "store2"), -- done
    ("cereal", 6.99, 10, "3", 30, 5, "store2"), --  done
    ("beans", 2.75, 0, "3", 30, 5, "store2"), -- done
    ("trash can", 9, 0, "3", 45, 3, "store2"), -- done
    ("ground beef", 12, 0, "5", 15, 2, "store2"), -- done
    ("chicken breast", 12, 0, "5", 15, 2, "store2"), -- done
    ("rice bag", 3.20, 0, "1", 55, 5, "store2"), -- done
    ("utensils", 3.99, 0, "8", 60, 5, "store2"), -- done
    ("pots", 19.99, 10, "1", 20, 5, "store2"), -- done
    ("advil", 23, 0, "3", 20, 6, "store2"), -- done
    ("xenex", 45.45, 0, "3", 20, 6, "store2"); -- done
INSERT INTO GROCERY(itemID, expiryDate, allergies, category, special)
VALUES 
    ((SELECT itemID FROM ITEMS WHERE itemName = "cheese" AND store = "store2"),"2023-04-30","lactose","dairy",""),
    ((SELECT itemID FROM ITEMS WHERE itemName = "milk" AND store = "store2"),"2023-04-30","lactose","dairy",""),
    ((SELECT itemID FROM ITEMS WHERE itemName = "potato" AND store = "store2"),"2023-04-30","","vegetable",""),
    ((SELECT itemID FROM ITEMS WHERE itemName = "bread" AND store = "store2"),"2023-04-30","celiac","grains",""),
    ((SELECT itemID FROM ITEMS WHERE itemName = "eggs" AND store = "store2"),"2023-04-30","","protein",""),
    ((SELECT itemID FROM ITEMS WHERE itemName = "apple" AND store = "store2"),"2023-04-30","","fruit",""),
    ((SELECT itemID FROM ITEMS WHERE itemName = "cereal" AND store = "store2"),"2023-04-30","","grains",""),
    ((SELECT itemID FROM ITEMS WHERE itemName = "beans" AND store = "store2"),"2023-04-30","canned","grains","canned"),
    ((SELECT itemID FROM ITEMS WHERE itemName = "ground beef" AND store = "store2"),"2023-04-30","","protein",""),
    ((SELECT itemID FROM ITEMS WHERE itemName = "chicken breast" AND store = "store2"),"2023-04-30","","protein",""),
    ((SELECT itemID FROM ITEMS WHERE itemName = "rice bag" AND store = "store2"),"2023-04-30","","grains","");
INSERT INTO HOUSEHOLD(itemID, category)
VALUES
    ((SELECT itemID FROM ITEMS WHERE itemName = "trash can" AND store = "store2"), "generic"),
    ((SELECT itemID FROM ITEMS WHERE itemName = "utensils" AND store = "store2"), "kitchen"),
    ((SELECT itemID FROM ITEMS WHERE itemName = "pots" AND store = "store2"), "kitchen");
INSERT INTO PHARMACY(itemID, genName, brandName)
VALUES
    ((SELECT itemID FROM ITEMS WHERE itemName = "advil" AND store = "store2"), "Ibuprofen", "advil"),
    ((SELECT itemID FROM ITEMS WHERE itemName = "xenex" AND store = "store2"), "alprazolam", "Xenex");

INSERT INTO THE_USER(UserID, FName, lName, email, Upassword)
VALUES
	-- test accounts
	("bPX1xJtKFzD5P5o5LzZt", "John", "Doe", "johnD@email.com", "$2a$08$DxcSeUk.Eq.Kez6o.ILEEOxjT82siPjLNAJpL5hRQeqAIljsXvKsK"), -- manager password: jhndoe
    ("f57878c01a47bbfd0021", "Phil", "Smith", "phils@email.com", "$2a$08$ImSYafmH3j3SPnWM.MlfE.BBkXVQos1X2cDOL1e.60CRpoDyhLzjC"), -- manager password: psmiths
    ("4d02c3f3d066ec34b23a", "Lexy", "Brown", "lexyB@email.com", "$2a$08$POcfz3XVCTWsq1tDiEyLIuA5fN4viCEdJN7BA0ORiGUVlc0we.DNq"), -- manager password: lxybrwon
    ("f1215b6bc5b6c7941e33", "Barry", "Davis", "barryD@email.com", "$2a$08$ol5LLTsAowzgxoRvtnZZce3ijSLwyCsMMRGmlSAmgoU139Uynvki2"), -- manager password: brydavis
    ("yotK3qgm0Q2aJl7bEjKZ", "Jessica", "Lee", "jessicaL@email.com", "$2a$08$GlHQvvL4qWAcl0kvRvZN4e1UNBWAm.3PO0n5PO3ndKjxvDX5QsOCu"), -- manager password: jeslee
    ("8b29a02b771f8916942d", "Julia", "Anderson", "juliaA@email.com", "$2a$08$O9LHMJ15cxLWi3s9AF1c5er33SoZgZBxdH9aTu1l6mKa5AFuT9t6a"), -- password: jlanderson
    ("a42a21f1c1b955a2b61d", "Marry", "Wilson", "marryW@email.com", "$2a$08$5FEt4RaKvNKGqaG6NzgxY.J7oZqUueYemO5ZrjzlMVNPmh6yKAsTO"), -- password: mrywilson
    ("30fc1f8127f301ad9e9f", "Kate", "Harris", "kateH@email.com", "$2a$08$EVFHfFrBJp.GvgzIwK7QfezXABrUoXxtzs27I/n1LL6/CysAzXr8i"), -- password: ktharris
    ("4c4cb7d6f584b441d1c8", "Cooper", "Jackson", "cooperJ@email.com", "$2a$08$z.mHYsuvHb8t2WAUrc8RueL9njPmPq1v8qDnXMlGVKeMo9R5BFHim"), -- password: cprjackson
    ("53b3a3b9ccf58e67f0b3", "Liam", "White", "liamW@email.com", "$2a$08$PilnsYkFOq8zP4BWWo720udlEihL6lzT/1KRRbkJ2UyecpzuSzlqO"), -- password: lmwhite
    ("a23bf6f2d2c077cfb33a", "Maddy", "Smith", "maddyS@email.com", "$2a$08$hTtRlnLaWiKgjjYZdr.29uamQIgZCJup2WJBAnXcmetRjyUBthTfe"), -- password: madsmith
    ("fcfaa41371c1d0a12e06", "Tyler", "White", "tylerW@email.com", "$2a$08$QNOkqomXgxqXMsDa5ORTzOjzy5N49Iflh.KAi8mx/NpjL0GosKAEa"); -- password: tywhite
    
INSERT INTO MANAGER(mgrID, storeID)
VALUES 
	("bPX1xJtKFzD5P5o5LzZt", "store1"),
    ("f57878c01a47bbfd0021", "store1"),
    ("4d02c3f3d066ec34b23a", "store1"),
    ("f1215b6bc5b6c7941e33", "store2"),
    ("yotK3qgm0Q2aJl7bEjKZ", "store2");

INSERT INTO CUSTOMER(ctmrID)
VALUES
    ("8b29a02b771f8916942d"),
    ("a42a21f1c1b955a2b61d"),
    ("30fc1f8127f301ad9e9f"),
    ("4c4cb7d6f584b441d1c8"),
    ("53b3a3b9ccf58e67f0b3"),
    ("a23bf6f2d2c077cfb33a"),
    ("fcfaa41371c1d0a12e06");

-- SHOW FULL TABLES;
-- SELECT * FROM THE_USER; 
