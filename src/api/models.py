from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Campaign(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fecha_inicio = db.Column(db.String(80), unique=False, nullable=False)
    fecha_final = db.Column(db.String(80), unique=False, nullable=False)
    nombre = db.Column(db.String(80), unique=False, nullable=False)
    campaña_id = relationship(Ongs)
    

    def __repr__(self):
        return f'<Ongs {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "fecha_inicio": self.fecha_inicio,
            "fecha_final": self.fecha_final
            # do not serialize the password, its a security breach
        }

class Ongs(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(80), unique=False, nullable=False)
    ciudad = db.Column(db.String(80), unique=False, nullable=False)
    nif = db.Column(db.String(80), unique=False, nullable=False)
    actividad = db.Column(db.String(80), unique=False, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    aprobado = db.Column(db.Boolean(), unique=False, nullable=False)
    lat = db.Column(db.Integer, unique=True, nullable=False)
    lng = db.Column(db.Integer, unique=True, nullable=False)


    def __repr__(self):
        return f'<Ongs {self.email}>'


    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "ciudad": self.ciudad,
            "actividad": self.actividad,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

     

class Voluntario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    ciudad = db.Column(db.String(80), unique=False, nullable=False)
    lat = db.Column(db.Integer, unique=True, nullable=False)
    lng = db.Column(db.Integer, unique=True, nullable=False)
    nth_campaign = db.Column(db.Integer, unique=True, nullable=False)


    def __repr__(self):
        return f'<Voluntario {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "ciudad": self.ciudad,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

