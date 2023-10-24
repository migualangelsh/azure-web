SET NAMES 'UTF8MB4';
DROP DATABASE IF EXISTS hoteles;
CREATE DATABASE IF NOT EXISTS hoteles DEFAULT CHARACTER SET UTF8MB4;
USE hoteles;

CREATE TABLE usuarios(
id_usr						INTEGER NOT NULL AUTO_INCREMENT,
nombre						VARCHAR(40) NOT NULL,
correo						VARCHAR(30) NOT NULL UNIQUE,
password					VARCHAR(70) NOT NULL UNIQUE,
confirmar					BOOLEAN DEFAULT FALSE,
token						VARCHAR(50),
PRIMARY KEY(id_usr)
)DEFAULT CHARACTER SET UTF8MB4;


CREATE TABLE hoteles(
id_htl						INTEGER NOT NULL AUTO_INCREMENT,
nombre						VARCHAR(40) NOT NULL,
direccion					VARCHAR(100) NOT NULL,
telefono					VARCHAR(10) NOT NULL,
correo						VARCHAR(30) NOT NULL,
PRIMARY KEY(id_htl)
)DEFAULT CHARACTER SET UTF8MB4;


CREATE TABLE gerentes(
id_grt						INTEGER NOT NULL AUTO_INCREMENT,
nombre						VARCHAR(80) NOT NULL,
ap_paterno					VARCHAR(15) NOT NULL,
ap_materno					VARCHAR(15) NOT NULL,
telefono					VARCHAR(10) NOT NULL,
id_htl						INTEGER NOT NULL,
PRIMARY KEY(id_grt),
CONSTRAINT Ya_hay_hotel_con_ese_gerente UNIQUE(id_htl),
FOREIGN KEY(id_htl) REFERENCES hoteles(id_htl)
)DEFAULT CHARACTER SET UTF8MB4;


CREATE TABLE habitaciones(
id_hbt						INTEGER NOT NULL AUTO_INCREMENT,
piso						VARCHAR(10) NOT NULL,
nombre						VARCHAR(30) NOT NULL,
refrigerador				BOOLEAN	NOT NULL,
id_htl						INTEGER,
PRIMARY KEY(id_hbt),
FOREIGN KEY(id_htl) REFERENCES hoteles(id_htl)
)DEFAULT CHARACTER SET UTF8MB4;



DELETE FROM usuarios;
DELETE FROM hoteles;
DELETE FROM habitaciones;
DELETE FROM gerentes;

alter table usuarios auto_increment=1;
alter table gerentes auto_increment=1;
alter table hoteles auto_increment=1;
alter table habitaciones auto_increment=1;

INSERT INTO usuarios(nombre,correo,password,confirmar) VALUES('mike','demo@demo.com','1111',0);

INSERT INTO hoteles(nombre,direccion,telefono,correo) VALUES('H1','D1','1111111111','c1');
INSERT INTO hoteles(nombre,direccion,telefono,correo) VALUES('H2','D2','2222222222','c2');
INSERT INTO hoteles(nombre,direccion,telefono,correo) VALUES('H3','D3','3333333333','c3');
INSERT INTO hoteles(nombre,direccion,telefono,correo) VALUES('H4','D4','4444444444','c4');
INSERT INTO hoteles(nombre,direccion,telefono,correo) VALUES('H5','D5','5555555555','c5');
INSERT INTO hoteles(nombre,direccion,telefono,correo) VALUES('H6','D6','6666666666','c6');

INSERT INTO gerentes(nombre,ap_paterno,ap_materno,telefono,id_htl) VALUES('G1','AP1','Ap1','1111111111',1);
INSERT INTO gerentes(nombre,ap_paterno,ap_materno,telefono,id_htl) VALUES('G2','AP2','Ap2','2222222222',2);
INSERT INTO gerentes(nombre,ap_paterno,ap_materno,telefono,id_htl) VALUES('G3','AP3','Ap3','3333333333',3);



INSERT INTO habitaciones(piso,nombre,refrigerador,id_htl) VALUES('p1','p1',TRUE,1);
INSERT INTO habitaciones(piso,nombre,refrigerador,id_htl) VALUES('p2','p2',TRUE,1);
INSERT INTO habitaciones(piso,nombre,refrigerador,id_htl) VALUES('p3','p3',TRUE,2);
INSERT INTO habitaciones(piso,nombre,refrigerador,id_htl) VALUES('p4','p4',TRUE,2);
INSERT INTO habitaciones(piso,nombre,refrigerador,id_htl) VALUES('p5','p5',TRUE,3);
INSERT INTO habitaciones(piso,nombre,refrigerador,id_htl) VALUES('p6','p6',TRUE,3);