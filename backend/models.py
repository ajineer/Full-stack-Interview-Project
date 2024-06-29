from config import db
from sqlalchemy_serializer import SerializerMixin


class Game(db.Model, SerializerMixin):
    __tablename__ = "games"

    id = db.Column(db.Integer, primary_key=True)
    current_player = db.Column(db.Integer)

    cards = db.relationship(
        "Card", back_populates="game", cascade="all, delete, delete-orphan"
    )
    players = db.relationship(
        "Player", back_populates="game", cascade="all, delete, delete-orphan"
    )


class Player(db.Model, SerializerMixin):
    __tablename__ = "players"

    serialize_rules = ("-game",)

    id = db.Column(db.Integer, primary_key=True)
    score = db.Column(db.Integer)

    game_id = db.Column(db.Integer, db.ForeignKey("games.id", ondelete="CASCADE"))
    game = db.relationship("Game", back_populates="players")


class Card(db.Model, SerializerMixin):
    __tablename__ = "cards"

    serialize_rules = ("-game",)

    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.Integer)
    matched = db.Column(db.Integer)
    position = db.Column(db.String)

    game_id = db.Column(db.Integer, db.ForeignKey("games.id", ondelete="CASCADE"))

    game = db.relationship("Game", back_populates="cards")
