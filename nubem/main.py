from flask import Flask
from db import Connection

from uuid import uuid1
from flask import request

import logging
import threading
import time

from users import app1
from products import app2
from cart import app3

def run_app1():
    app1.run(host='0.0.0.0', port=5001, debug=False)

def run_app2():
    app2.run(host='0.0.0.0', port=5002, debug=False)

def run_app3():
    app3.run(host='0.0.0.0', port=5003, debug=False)

if __name__ == '__main__':
    t1 = threading.Thread(target=run_app1)
    t2 = threading.Thread(target=run_app2)
    t3 = threading.Thread(target=run_app3)

    t1.start()
    t2.start()
    t3.start()

    t1.join()
    t2.join()
    t3.join()