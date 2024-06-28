from config import db, app
from game import Game

if __name__ == "__main__":

    with app.app_context():
        Game.query.delete()
        db.session.commit()
        # db.create_all()
