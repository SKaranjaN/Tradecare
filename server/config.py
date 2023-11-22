# config file to postgresql

class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:postgres@localhost:5432/test1'
    SQLALCHEMY_TRACK_MODIFICATIONS = False