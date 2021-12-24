# import required modules
from bs4 import BeautifulSoup
from bs4.element import SoupStrainer
import requests
import re
import json
import sys
# declaration of variables
# LANG = str(sys.argv[1])
# PLANET = int(sys.argv[2])
out_file = open("js/planetData.json", "w") 
LANG = "ca"
PLANET = 2
DATA = {
    "ca": {
        "url":[
            "Mercuri_(planeta)",
            "Venus_(planeta)",
            "Terra",
            "Mart_(planeta)",
            "Júpiter_(planeta)",
            "Saturn_(planeta)",
            "Urà_(planeta)",
            "Neptú_(planeta)"
        ],
        "labels":[
            "Tipus",
            "Descobert per",
            "Data descobriment",
            "Cos pare",
            "Apoàpside",
            "Periàpside",
            "Període orbital P",
            "Velocitat orbital mitjana",
            "Distància de la Terra,",
            "Radi",
            "Massa",
            "Volum",
            "Gravetat superficial",
            "Temperatura de superfície",
            "Composició atmosfèrica"
        ]
    },
    "en": {
        "url":[
            "Mercury_(planet)",
            "Venus",
            "Earth",
            "Mars",
            "Jupiter",
            "Saturn",
            "Uranus",
            "Neptune"
        ],
        "labels":[
            "Discovered by",
            "Discovery date",
            "Aphelion",
            "Perihelion",
            "Orbital period",
            "Volume",
            "Known satellites",
            "Mass",
            "Surface gravity",
            "Surface temp",
            "Composition by volume"
        ]
    }
}
result = {}
infobox = SoupStrainer(class_="infobox")
notes_regex = "(\[[\w]* *\d+\])+"
# get URL
url = f"https://{LANG}.wikipedia.org/wiki/{DATA[LANG]['url'][PLANET]}"
page = requests.get(url)

# scrape webpage
soup = BeautifulSoup(page.content, 'html.parser', parse_only=infobox)

# dissect title
try:
    result["title"] = soup.find("caption").get_text(" ", strip=True)
except:
    result["title"] = soup.find("th").get_text(" ", strip=True)
result["symbol"] = soup.find("img",{'src': re.compile(r'\.svg')})["src"]
result["image"] = soup.find("img",{'src': re.compile(r'\.jpg')})["src"]

# dissect tbody data
tbody = soup.find_all("th", string=DATA[LANG]["labels"])
for th in tbody:
    label = re.sub(notes_regex, "", th.get_text(" ", strip=True))
    data = re.sub(notes_regex, "", th.find_next_sibling("td").get_text(" ", strip=True))
    result[label] = data
# output
result = json.dumps(result)
out_file.write(result)
print(result)