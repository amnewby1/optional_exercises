from flask_sqlalchemy import SQLAlchemy
#this last line connects SQLAlchemy with our flask application

db = SQLAlchemy() 
# we initialize a variable (usually called db) and we run SQLAlchemy and execute it with the (); whatever tha treturns back will be stored in this DB variable
#Most of what we do in this particular video will be db.something which will involve a connection to our Postgres database as long as we configure correctly

def connect_db(app):
    db.app = app
    db.init_app(app)
    app.app_context().push()
    #these things associate our flask application with the database variable

#MODELS GO BELOW:
#Remember the point of the model is to create some Python class which is a pattern for a specific table and rows 

#Step by Step Example

class Pet (db.Model): #we inherit from db.Model which comes from sqlalchemy which comes with tons of methods, all models should subclass db.Model
    __tablename__ = "pets"
    #our tablename will be plural but the class/model name will be called Pet singular; specify the tablename with the dunder method __tablename__
    id = db.Column(db.Integer, 
                   primay_key=True,
                   autoincrement=True)
    #what we do for each column is first decide on some name (e.g. id), then we call db.Column (this also comes from sqlalchemy), then we specify a type for the column (can view the types in the flask-sqlalchemy docs) using db.Type (because we are using sqlalchemy), we can also use other arguments such as primary_key, autoincrement (in Postgresql this is serial)
    name = db.Column(db.String(50),
                     nullable = False,
                     unique = True) 
    #this says the column takes a string no more than 50 characters, says the value in it can't be null, and it must be unique
    species = db.Column(db.String(30), nullable=True)
    #this column takes a string no more than 30 characters and the value can be null
    hunger = db.Column(db.Integer,
                       nullable = False,
                       default = 20)
    #this is a column that takes integers, value can't be null, and the default is 20

#So, to run this, to actually create our table, we need to run a particular method on db, on sqlalchemy's instance called create_all
#when we call create or create_all, it's going to take this and turn it into a create table statement, execute that, and hopefully create the table pets in our database