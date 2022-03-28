import requests

res = requests.post('http://localhost:5000/send', data="Hello")
#res = requests.post('http://localhost:5000/send', json={"val":"Good Morning"})
if res.ok:
    print(res.json())
