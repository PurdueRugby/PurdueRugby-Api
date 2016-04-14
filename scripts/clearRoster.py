import urllib.request as request
import json


def getRoster():
    req = request.Request(url="https://purdue-rugby-android.herokuapp.com/roster", headers = {'Content-Type': 'application/json'})
    res = request.urlopen(req)
    return json.loads(res.read().decode('utf-8'))

def clear(roster):
    for player in roster:
        req = request.Request(url='https://purdue-rugby-android.herokuapp.com/roster/' + player['_id'], method='DELETE')
        res = request.urlopen(req)
        print(res.read())
    

def main():
    clear(getRoster())
    #check roster empty
    print(getRoster())
    

if __name__ == "__main__":
    main()
