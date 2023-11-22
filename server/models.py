from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates, relationship
import re
from datetime import datetime

db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String)
    lastname = db.Column(db.String)
    user_type = db.Column(db.String)
    email = db.Column(db.String, unique=True, nullable=False)
    email_verified = db.Column(db.Boolean, default=False)
    password = db.Column(db.String, nullable=False)
    verification_token = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    dataform = relationship('DataForm', back_populates='user', uselist=False) #one to one table relationship to the dataform table

    @validates('password')
    def validate_password(self, key, password):
        if not re.search(r'^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z])', password):
            raise ValueError('Password must include at least one number, special character, and uppercase letter.')
        return password

    def to_dict(self):
        return {
            "id": self.id,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "user_type" : self.user_type,
            "email": self.email,
            'email_verified': self.email_verified,
            "password": self.password,
            "verification_token": self.verification_token,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
    
class DataForm(db.Model, SerializerMixin):
    __tablename__ = "dataforms"

    id = db.Column(db.Integer, primary_key=True)
    region = db.Column(db.String)
    hub_name = db.Column(db.String)
    hub_code = db.Column(db.String)
    address = db.Column(db.String)
    year_established = db.Column(db.Integer)
    ownership = db.Column(db.String) #to be owned or leased
    floor_size = db.Column(db.String)
    facilities = db.Column(db.String) #to have a checkbox of either charcoal cooler, hand-washing facility, washroom, others
    input_center = db.Column(db.String) #to have checkboxed of input  A B and C
    type_of_building = db.Column(db.String) #to be either permanent or semi permanent
    gprs_longitude = db.Column(db.String)
    gprs_latitude = db.Column(db.String)
    lastname = db.Column(db.String)
    firstname = db.Column(db.String)
    id_number = db.Column(db.Integer)
    gender = db.Column(db.String)
    date_of_birth = db.Column(db.String) #use calender
    email = db.Column(db.String)
    phone_number = db.Column(db.Integer)
    lastname2 = db.Column(db.String)
    firstname2 = db.Column(db.String)
    id_number2 = db.Column(db.Integer)
    gender2 = db.Column(db.String)
    date_of_birth2 = db.Column(db.String) 
    email2 = db.Column(db.String)
    phone_number2 = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = relationship('User', back_populates='dataform') #table relationship to the user table


    def to_dict(self):
        return {
            "id" : self.id,
            "region" : self.region,
            "hub_name" : self.hub_name,
            "hub_code" : self.hub_code,
            "address" : self.address,
            "year_established" : self.year_established,
            "ownership"  : self.ownership,
            "floor_size" : self.floor_size,
            "facilities" : self.facilities,
            "input_center" : self.input_center,
            "type_of_building" : self.type_of_building,
            "gprs_longitude" : self.gprs_longitude,
            "gprs_latitude" : self.gprs_latitude,
            "lastname" : self.lastname,
            "firstname" : self.firstname,
            "id_number" : self.id_number,
            "gender" : self.gender,
            "date_of_birth" : self.date_of_birth,
            "email" : self.email,
            "phone_number" : self.phone_number,
            "lastname2" : self.lastname2,
            "firstname2" : self.firstname2,
            "id_number2" : self.id_number2,
            "gender2" : self.gender2,
            "date_of_birth2" : self.date_of_birth2,
            "email2" : self.email2,
            "phone_number2" : self.phone_number2,
            "user_id": self.user_id
        }
        


        


