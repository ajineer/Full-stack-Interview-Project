from config import app, api
import random

if __name__ == "__main__":
    ints_array = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10]
    x_pos = [0, 1, 2, 3, 4]
    y_pos = [0, 1, 2, 3, 4, 5]
    positions = list([(x, y) for x in x_pos for y in y_pos])
    random.shuffle(positions)

    board = list()
    random.shuffle(ints_array)
    index = 0
    for int in ints_array:
        card = {}
        card["value"] = int
        card["matched"] = False
        card["player_point"] = None
        card["position"] = positions[index]
        print(card)
        # board.append(card)
        index += 1
    # app.run()
