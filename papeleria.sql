--------------------------- TABLA USUARIOS ------------------------
CREATE TABLE usuarios
(
	id serial NOT NULL CHECK (id > 0),
	ci varchar(15) NOT NULL CHECK (ci <> ''),
	nombre varchar(50) NOT NULL CHECK (nombre <> ''),
	apellido varchar(50) NOT NULL CHECK (apellido <> ''),
	telefono varchar(15) NOT NULL CHECK (telefono <> ''),
	direccion varchar(100),
	correo varchar(100) NOT NULL UNIQUE CHECK (correo <> ''),
	password varchar(100) NOT NULL CHECK (password <> '')
);

--------------------------- TABLA ROL ------------------------
CREATE TABLE roles(
	id 			serial NOT NULL CHECK (id > 0),
	nombre		varchar(50) NOT NULL CHECK (nombre <> ''),
	descripcion varchar(100) NOT NULL CHECK (descripcion <> '')
);

--------------------------- TABLA PERSONA_ROL ------------------------
CREATE TABLE usuario_rol(
	usuario_id	bigint NOT NULL,
	rol_id		bigint NOT NULL
);

--------------------------- TABLA DIRECCIONES ------------------------
CREATE TABLE direcciones
(
	id serial NOT NULL CHECK (id > 0),
	usuario_id bigint NOT NULL,
	direccion varchar(100) NOT NULL CHECK (direccion <> ''),
	descripcion varchar(10) NOT NULL CHECK (descripcion <> '')
);

--------------------------- TABLA ARTICULOS ------------------------
CREATE TABLE articulos
(
	id serial NOT NULL CHECK (id > 0),
	nombre varchar(100) NOT NULL CHECK (nombre <> ''),
	descripcion varchar(10) NOT NULL CHECK (descripcion <> ''),
	cantidad integer NOT NULL,
	valor decimal(15,2) NOT NULL
);

--------------------------- TABLA PEDIDOS ------------------------
CREATE TABLE pedidos
(
	id serial NOT NULL CHECK (id > 0),
	usuario_id bigint NOT NULL,
	descripcion varchar(250) NOT NULL CHECK (descripcion <> ''),
	estado integer NOT NULL,
	fecha date NOT NULL,
	precio decimal(15,2)
);

--------------------------- TABLA PEDIDO-ARTICULO ------------------------
CREATE TABLE pedido_articulo
(
	pedido_id bigint NOT NULL,
	articulo_id bigint NOT NULL,
	cantidad integer NOT NULL
);


-------------------------- CLAVE USUARIOS -----------------
ALTER TABLE usuarios
	ADD PRIMARY KEY	(id);

-------------------------- CLAVE ROLES -----------------
ALTER TABLE roles
	ADD PRIMARY KEY	(id);

-------------------------- CLAVE USUARIOS-ROL -----------------
ALTER TABLE usuario_rol
	ADD CONSTRAINT fkUsuarioRol
	FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE usuario_rol
	ADD CONSTRAINT fkRolUsuario
	FOREIGN KEY (rol_id) REFERENCES roles (id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE usuario_rol
	ADD PRIMARY KEY (usuario_id, rol_id);

-------------------------- CLAVE DIRECCIONES -----------------
ALTER TABLE direcciones
	ADD CONSTRAINT FK_usuario_direcciones
	FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE direcciones
	ADD PRIMARY KEY	(id);


-------------------------- CLAVE ARTICULOS -----------------
ALTER TABLE articulos
	ADD PRIMARY KEY	(id);


-------------------------- CLAVE PEDIDOS -----------------
ALTER TABLE pedidos
	ADD CONSTRAINT FK_usuario_pedidos
	FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE pedidos
	ADD PRIMARY KEY (id);


-------------------------- TABLA PEDIDO-ARTICULO -----------------
ALTER TABLE pedido_articulo
	ADD CONSTRAINT FK_pedido_articulo
	FOREIGN KEY (pedido_id) REFERENCES pedidos (id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE pedido_articulo
	ADD CONSTRAINT FK_articulo_pedido
	FOREIGN KEY (articulo_id) REFERENCES articulos (id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE pedido_articulo
	ADD PRIMARY KEY (pedido_id, articulo_id);


-------------------------- INGRESO--------------------
INSERT INTO usuarios
VALUES
	(DEFAULT, '0605329606', 'JOSE LUIS', 'BUENAÑO TOAPANTA', '0992823863', '', 'josel.buenano@espoch.edu.ec', '12345678');

INSERT INTO roles
VALUES
	(DEFAULT, 'Administrador', 'Administra'),
	(DEFAULT, 'Cliente', 'Realiza compras');

INSERT INTO usuario_rol
VALUES
	('1', '1');
	

INSERT INTO articulos
VALUES
	(DEFAULT, 'Juego geometrico', 'Numero2', 15 , 1.5);
	
	INSERT INTO articulos
VALUES
	(DEFAULT, 'Juego geometrico grande', 'Numero3', 25 , 1.7);
	
select *from articulos

