import urllib.request as request
import json
import os

#@param fileName: fileName of roster csv file, type: string
def getCalendarFromCsv(fileName):
    with open(fileName) as calendarFile:
        calendar = []
        for line in calendarFile.readlines():
            event = {}
            linespl = line.split(',')
            event['date'] = linespl[0].strip('\n')
            event['description'] = linespl[1].strip('\n');
            event['result'] = linespl[2].strip('\n');
            calendar.append(event)
    return calendar
#@param calendar: calendar made from file, type: list of dictionaries
def upload(calendar):
    for event in calendar:
        req = request.Request(url="https://purdue-rugby-android.herokuapp.com/calendar/add/", method="POST")
        req.add_header('Content-Type', 'application/json')
        res = request.urlopen(req, json.dumps(event).encode('utf-8'))
        print(res.read())


def main():
    print(os.path.dirname(os.path.abspath(__file__)))
    calendar = getCalendarFromCsv(os.path.dirname(os.path.abspath(__file__))+ '/calendar.csv')
    upload(calendar)

if __name__ == '__main__':
    main()
