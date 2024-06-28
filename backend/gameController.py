from flask import request, session
from flask_restful import Resource
from config import db
from game import Game
from sqlalchemy.exc import IntegrityError
import random
import json


class GameMethods(Resource):
    def create_board(self):
        ints_array = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10]
        x_pos = [0, 1, 2, 3, 4]
        y_pos = [0, 1, 2, 3, 4, 5]
        positions = list([[x, y] for x in x_pos for y in y_pos])
        random.shuffle(positions)

        board = list()
        random.shuffle(ints_array)
        index = 0
        for int in ints_array:
            card = {}
            card["id"] = index + 1
            card["value"] = int
            card["matched"] = False
            card["position"] = positions[index]
            board.append(card)
            index += 1
        return board

    def get(self):

        game = Game.query.filter(Game.id == session.get("game_id")).first()
        if game and not game.state == "complete":
            return game.to_dict(), 201
        return {"error": "could not retrieve game"}, 404

    def post(self):

        try:
            board = json.dumps(self.create_board())
            player_1 = json.dumps({"id": 0, "score": 0})
            player_2 = json.dumps({"id": 1, "score": 0})
            current_player = random.choice([player_1, player_2])
            state = "active"
            new_game = Game(
                current_player=current_player,
                board=board,
                player_1=player_1,
                player_2=player_2,
                state=state,
            )
            db.session.add(new_game)
            db.session.commit()
            session["game_id"] = new_game.id
            return new_game.to_dict(), 201
        except IntegrityError:
            return {"error": "could not create game"}, 422


class GamesById(Resource):

    def delete(self, game_id):
        if session.get("game_id"):
            game = Game.query.filter(Game.id == game_id).first()
            if game:
                current_board = json.loads(game.board)
                match_count = 0
                for card in current_board:
                    if card.matched == True:
                        match_count += 1
                if match_count == 20:
                    session["game_id"] = None
                    return (
                        "player 1 wins!"
                        if game.player_1.score > game.player_2.score
                        else "player 2 wins!"
                    )
            return {"error": "game not found"}, 404
        return {"error": "no active gaming session"}, 401

    def patch(self, game_id):
        if session.get("game_id"):
            game = Game.query.filter(Game.id == game_id).first()
            if game:
                current_board = json.loads(game.board)
                submitted_turn = json.loads(request.get_json()["cards"])
                current_player = json.loads(game.current_player)
                player_1 = json.loads(game.player_1)
                player_2 = json.loads(game.player_2)
                if submitted_turn[0].value == submitted_turn[1].value:
                    for card in current_board:
                        if card.value == submitted_turn[0].value:
                            new_score = current_player.score + 1
                            setattr(card, "matched", True)
                            setattr(current_player, "score", new_score)
                    return
                elif not submitted_turn[0].value == submitted_turn[1].value:
                    setattr(
                        game,
                        "current_player",
                        (
                            json.loads(player_1)
                            if current_player == player_2
                            else json.loads(player_1)
                        ),
                    )
            return {"error": "game not found"}, 404
        return {"error": "no active gaming session"}, 401
