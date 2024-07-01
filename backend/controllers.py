from flask import request, session
from flask_restful import Resource
from config import db
from models import Game, Player, Card
from sqlalchemy.exc import IntegrityError
import random


class GameMethods(Resource):

    def create_game(self):
        try:
            new_game = Game(current_player=random.randint(1, 2))
            if new_game:
                db.session.add(new_game)
                db.session.commit()
                return new_game
        except IntegrityError:
            return "could not create new game"

    def create_cards(self, game_id):
        ints_array = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10]
        positions = [[x, y] for x in [1, 2, 3, 4, 5] for y in [1, 2, 3, 4, 5, 6]]
        random.shuffle(positions)
        cards = list()
        index = 0
        for integer in ints_array:
            card = Card(
                game_id=game_id,
                value=integer,
                matched=False,
                position=f"{positions[index]}",
            )
            cards.append(card)
            index += 1
        return cards

    def post(self):

        try:
            new_game = self.create_game()
            cards = self.create_cards(new_game.id)
            player_1 = Player(score=0, game_id=new_game.id)
            player_2 = Player(score=0, game_id=new_game.id)
            for card in cards:
                db.session.add(card)
            db.session.add(player_1)
            db.session.add(player_2)
            db.session.commit()
            return (
                new_game.to_dict(
                    rules=(
                        "players",
                        "cards",
                    )
                ),
                201,
            )
        except IntegrityError:
            return {"error": "could not create game"}, 422


class GamesById(Resource):

    def get(self, game_id):
        game = Game.query.filter(Game.id == game_id).first()
        if game:
            return game.to_dict(rules=("players", "cards")), 200
        return {"error": "game not found"}, 404

    def post(self, game_id):
        game = Game.query.filter(Game.id == game_id).first()
        if game:
            session["game_id"] = game.id
            return game.to_dict(rules=("cards", "players"))

    def delete(self, game_id):
        game = Game.query.filter(Game.id == game_id).first()
        if game:
            board = game.cards
            match_count = 0
            players = game.players
            for card in board:
                if card.matched == True:
                    match_count += 1
            if match_count == 20:
                db.session.delete(game)
                db.session.commit()
                session["game_id"] = None
                if game.players[0].score > game.players[1]:
                    return f"player {players[0].id} wins!"
                elif game.players[1].score > game.players[0]:
                    return f"player {players[1].id} wins!"
                else:
                    return f"player {players[0].id} and player {players[1].id} tied."
            elif request.get_json()["command"] == "reset":
                db.session.delete(game)
                db.session.commit()
                return {"message": "overide to reset database and game"}, 204
            else:
                return {"message": "no winner yet, keep playing."}, 200
        return {"error": "game not found"}, 404

    def patch(self, game_id):
        game = Game.query.filter(Game.id == game_id).first()
        if game:
            data = request.get_json()
            submitted_card_1 = data["card_1"]
            submitted_card_2 = data["card_2"]
            card_1 = Card.query.filter(Card.id == submitted_card_1["id"]).first()
            card_2 = Card.query.filter(Card.id == submitted_card_2["id"]).first()
            current_player = Player.query.filter(
                Player.id == game.current_player
            ).first()
            if card_1.value == card_2.value:
                current_player.score += 1
                setattr(card_1, "matched", True)
                setattr(card_2, "matched", True)
                db.session.add(card_1)
                db.session.add(card_2)
                db.session.add(current_player)
                db.session.commit()
                updated_board = Game.query.filter(
                    Game.id == session.get("game_id")
                ).first()
                return (
                    updated_board.to_dict(
                        rules=(
                            "players",
                            "cards",
                        )
                    ),
                    202,
                )
            elif not card_1.value == card_2.value:
                player_1 = game.players[0]
                player_2 = game.players[1]
                new_current_player = (
                    player_1.id if not current_player.id == player_1.id else player_2.id
                )
                setattr(game, "current_player", new_current_player)
                db.session.add(game)
                db.session.commit()
                return (
                    game.to_dict(
                        rules=(
                            "players",
                            "cards",
                        )
                    ),
                    202,
                )
        return {"error": "game not found"}, 404
