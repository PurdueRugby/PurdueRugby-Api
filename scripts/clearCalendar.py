import urllib.request as request
import json


def getCalendar():
    req = request.Request(url="https://purdue-rugby-android.herokuapp.com/calendar", headers = {'Content-Type': 'application/json'})
    res = request.urlopen(req)
    return json.loads(res.read().decode('utf-8'))

def clear(calendar):
    for event in calendar:
        req = request.Request(url='https://purdue-rugby-android.herokuapp.com/calendar/' + event['_id'], method='DELETE')
        res = request.urlopen(req)
        print(res.read())
    

def main():
    clear(getCalendar())
    #check roster empty
    print(getCalendar())
    

if __name__ == "__main__":
    main()
