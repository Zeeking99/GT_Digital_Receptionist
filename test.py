from app import app
from flask import json

def test_response():        
    response = app.test_client().post(
        '/send',
        data=json.dumps({'val': 'Hi'}),
        content_type='application/json',
    )

    data = json.loads(response.get_data(as_text=True))

    assert response.status_code == 200
#    assert data['sum'] == 3
    print(data['val'])