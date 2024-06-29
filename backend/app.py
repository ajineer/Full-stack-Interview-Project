from config import app, api
from controllers import GameMethods, GamesById


api.add_resource(GameMethods, "/game")
api.add_resource(GamesById, "/game/<int:game_id>")


@app.route("/")
def index():
    return "<h1>Server Home</h1>"


if __name__ == "__main__":
    app.run(port=5555, debug=True)
