#from flask import Flask, request
#app = Flask(__name__)

#@app.route('/add', methods=["GET"])
#def add_handler():
#    return "Hello World!"

#if __name__ == '__main__':
#    app.run(host="localhost", port="5075")


#from flask import Flask

#app = Flask(__name__)

#@app.route("/")
#def hello():
#    path = os.getcwd()
#    dirs = os.listdir("/")
#    dir = os.listdir(path)
#    print(dir)
#    print(dirs)
#    for file in dirs:
#        print(file)
#    for files in dir:
#        print(files)
#    return "Hello World from Flask!"
#if __name__ == "__main__":
#    app.run(host='localhost', port=5075)

import sys
import os
def get_python():
    path = os.getcwd()
    dirs = os.listdir("/")
    dir = os.listdir(path)
    print(dir)
    print(dirs)
    for file in dirs:
        print(file)
    for files in dir:
        print(files)
    print('Hello from Python!')
    return True

print(get_python())
sys.stdout.flush()