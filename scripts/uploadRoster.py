import urllib.request as request
import json
import os

#@param fileName: fileName of roster csv file, type: string
def getRosterFromCsv(fileName):
    with open(fileName) as rosterFile:
        roster = []
        for line in rosterFile.readlines():
            player = {}
            linespl = line.split(',')
            #skip first line
            if(len(linespl)< 9):
                continue
            player['name'] = linespl[1] + " " + linespl[2]
            player['height'] = formatHeight(linespl[3])
            player['weight'] = linespl[4]
            player['position'] = linespl[5]
            player['hometown'] = linespl[6].strip('"')
            player['homestate'] = linespl[7].strip(" \n\"")
            player['year'] = linespl[8].strip("\n")
            roster.append(player)
    return roster

#@param height: string representation of height, type: string
def formatHeight(height):
    height = height.replace('"', "'")
    height = height.strip('"\'')
    height += '"'
    return height

def upload(roster):
    for player in roster:
        req = request.Request(url="https://purdue-rugby-android.herokuapp.com/roster/register/", method="POST")
        req.add_header('Content-Type', 'application/json')
        res = request.urlopen(req, json.dumps(player).encode('utf-8'))
        print(res.read())


def main():
    print(os.path.dirname(os.path.abspath(__file__)))
    roster = getRosterFromCsv(os.path.dirname(os.path.abspath(__file__))+ '/roster.csv')
    upload(roster)
if __name__ == '__main__':
    main()
