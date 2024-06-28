from config import db
from sqlalchemy_serializer import SerializerMixin


class Game(db.Model, SerializerMixin):
    __tablename__ = "games"

    id = db.Column(db.Integer, primary_key=True)
    current_player = db.Column(db.String)
    board = db.Column(db.String)
    player_1 = db.Column(db.String)
    player_2 = db.Column(db.String)
    state = db.Column(db.String)
