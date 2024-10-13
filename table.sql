create table user(
    id int primary key AUTO_INCREMENT,
    name varchar(250),
    contactNumber varchar(20),
    email varchar(50),
    password varchar(250),
    status varchar(20),
    role varchar(20),
    UNIQUE (email)
);

insert into user(name,contactNumber,email,password,status,role)
values("Admin","0815675678","admin@gmail.com","admin","true","admin");

create table category(
    id int not null AUTO_INCREMENT,
    name varchar(255) not null,
    primary key(id)
);

insert into user(name,contactNumber,email,password,status,role)
values("Admin","0815675678","admin@gmail.com","admin","true","admin");

create table product(
    id int not null AUTO_INCREMENT,
    name varchar(255) not null,
    categoryId int not null,
    description varchar(255),
    price int,
    status varchar(20),
    primary key(id)
);

insert into product(name,contactNumber,email,password,status,role)
values("Admin","0815675678","admin@gmail.com","admin","true","admin");


