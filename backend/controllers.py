from flask import request, session
from flask_restful import Resource
from config import db
from models import Game, Player, Card
from sqlalchemy.exc import IntegrityError
import random
import json


class GameMethods(Resource):
    def create_cards(self, game_id):
        ints_array = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9]
        positions = [(x, y) for x in [0, 1, 2, 3, 4] for y in [0, 1, 2, 3, 4, 5]]
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

    def get(self):

        game = Game.query.filter(Game.id == session.get("game_id")).first()
        if game and not game.state == "complete":
            return (
                game.to_dict(
                    rules=(
                        "cards",
                        "players",
                    )
                ),
                201,
            )
        return {"error": "could not retrieve game"}, 404

    def post(self):

        try:
            new_game = Game(
                current_player=random.randint(1, 2),
                state="active",
            )
            db.session.add(new_game)
            db.session.commit()
            cards = self.create_cards(new_game.id)
            player_1 = Player(score=0, game_id=new_game.id)
            player_2 = Player(score=0, game_id=new_game.id)
            for card in cards:
                db.session.add(card)
            db.session.add(player_1)
            db.session.add(player_2)
            db.session.commit()
            session["game_id"] = new_game.id
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

    def post(self, game_id):
        game = Game.query.filter(Game.id == game_id).first()
        if game:
            session["game_id"] = game.id
            return game.to_dict(rules=("cards", "players"))

    def delete(self, game_id):
        if session.get("game_id"):
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
                    return (
                        f"player {players[0].id} wins!"
                        if game.players[0].score > game.players[1].score
                        else f"player {players[1].id} wins!"
                    )
                elif request.get_json()["command"] == "reset":
                    db.session.delete(game)
                    db.session.commit()
                    return {"message": "overide to reset database and game"}, 204
                else:
                    return {"message": "no winner yet, keep playing."}, 200
            return {"error": "game not found"}, 404
        return {"error": "no active gaming session"}, 401

    def patch(self, game_id):
        if session.get("game_id"):
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
                    player_1 = game.players[0].id
                    player_2 = game.players[1].id
                    new_current_player = (
                        player_1.id
                        if not current_player.id == player_1.id
                        else player_2.id
                    )
                    setattr(game, "current_player", new_current_player)
                    db.session.add(game)
                    db.session.commit(game)
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
        return {"error": "no active gaming session"}, 401
