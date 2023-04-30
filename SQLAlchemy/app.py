from flask import Flask, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db
#imported these from the newly created models.py
from sqlalchemy import text



app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///pet_shop_db'
#this is where we specify not only that we're using Postgres but also the particular name of the database we want this app to use
#it's important that we configure this before we run the lines below, if you don't, you'll get an error
app.config ['SQLALCHEMY_ECHO'] = True
app.config ['SECRET_KEY'] = "amanda1"
app.config ['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)
#imported this function from models.py

@app.route('/')
def home_page():
    """Shows home page"""
    return render_template ('home.html')