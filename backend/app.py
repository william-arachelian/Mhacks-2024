from flask import Flask, render_template
from database.mongoCollections import get_ingredients
app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/ingredients_list")
def ingredients_list():
    res = get_ingredients()

    return render_template("ingredients_list.html", ingredients = res)