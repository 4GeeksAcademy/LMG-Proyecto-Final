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

class Voluntario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    ciudad = db.Column(db.String(80), unique=False, nullable=False)
    lat = db.Column(db.Float, unique=True, nullable=False)
    lng = db.Column(db.Float, unique=True, nullable=False)
    #campaign_id = db.Column(db.Integer, db.ForeignKey('campaign.id'), nullable=False)
    #campaigns = db.relationship('Campaign', backref='voluntario', lazy=True)



    def __repr__(self):
        return f'<Voluntario {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "ciudad": self.ciudad,
            "email": self.email,
            #"campaigns": [campaign.nombre for campaign in self.campaigns],
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
    lat = db.Column(db.Float, unique=True, nullable=False)
    lng = db.Column(db.Float, unique=True, nullable=False)


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
class Campaign(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fecha_inicio = db.Column(db.Date, nullable=False)
    fecha_finalizacion = db.Column(db.Date, nullable=False)
    nombre = db.Column(db.String(80), nullable=False)
    ong_id = db.Column(db.Integer, db.ForeignKey('ongs.id'), nullable=False)
    
    ong = db.relationship('Ongs', backref=db.backref('campaigns', lazy=True))

    def __repr__(self):
        return f'<Campaign {self.nombre}>'

    def serialize(self):
        return {
            "id": self.id,
            "fecha_inicio": str(self.fecha_inicio),
            "fecha_finalizacion": str(self.fecha_finalizacion),
            "nombre": self.nombre,
            "ong_id": self.ong_id,
        }