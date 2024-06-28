from flask import request, session
from flask_restful import Resource
from config import db
from game import Game
import random


class GameMethods(Resource):
    def create_board(self):
        ints_array = list(range(1, 11)) * 2
        positions = random.shuffle([(i, j) for i in range(4) for j in range(5)])

        cards = {}
        random.shuffle(ints_array)
        index = 0
        for int in ints_array:
            cards["value"] = int
            cards["matched"] = False
            cards["player_point"] = None
            cards["position"] = positions(index)
            index += 1
        return cards

    def post(self):
        board = self.create_board()
