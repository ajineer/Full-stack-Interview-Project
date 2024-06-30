from config import db, app
from models import Game, Player, Card

if __name__ == "__main__":

    with app.app_context():
        # Game.query.delete()
        # Player.query.delete()
        # Card.query.delete()
        db.session.commit()
        # db.create_all()
