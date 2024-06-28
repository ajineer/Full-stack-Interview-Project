from config import db


class Game(db.Model):
    __tablename__ = "games"

    id = db.Column(db.Integer, primary_key=True)
    start_player = db.Column(db.String)
    current_player = db.Column(db.String)
    board = db.Column(db.String)
    scores = db.Column(db.String)
    state = db.Column(db.String)
    turns_count = db.Column(db.Integer)
