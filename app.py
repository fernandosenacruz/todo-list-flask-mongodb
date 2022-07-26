from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from bson import ObjectId
import os
import message

db = os.environ['HOST_NAME']

app = Flask(__name__)

app.config["MONGO_URI"] = f"mongodb://{db}:27017/todo_list_flask"
mongo = PyMongo(app)
CORS(app, resources={r"*": {"origins": "*"}})
db = mongo.db.todo_list_flask


@app.route("/", methods=["GET", "POST"])
def getTodo():
    if request.method == "GET":
        todos = []

        for obj in db.find():
            todos.append(
                {
                    "_id": str(ObjectId(obj["_id"])),
                    "title": obj["title"],
                    "description": obj["description"],
                    "status": obj["status"],
                }
            )

        return jsonify(todos)

    elif request.method == "POST":
        id = db.insert_one(
            {
                "title": request.json["title"],
                "description": request.json["description"],
                "status": request.json["status"],
            }
        )

        return jsonify(str(ObjectId(id.inserted_id)))


@app.route("/todo/<id>", methods=["GET", "DELETE", "PUT"])
def deleteTodo(id):
    if request.method == "DELETE":
        db.delete_one({"_id": ObjectId(id)})

        return jsonify(message.DELETED)

    elif request.method == "PUT":
        db.update_one(
            {"_id": ObjectId(id)},
            {
                "$set": {
                    "title": request.json["title"],
                    "description": request.json["description"],
                    "status": request.json["status"],
                }
            },
        )

        return jsonify(message.UPDATED)

    elif request.method == "GET":
        todo = db.find_one({"_id": ObjectId(id)})

        return jsonify(
            {
                "_id": str(ObjectId(todo["_id"])),
                "title": todo["title"],
                "description": todo["description"],
                "status": todo["status"],
            }
        )
