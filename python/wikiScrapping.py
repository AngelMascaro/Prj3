# import required modules
from bs4 import BeautifulSoup
from bs4.element import SoupStrainer
import requests
import re
import json
import sys


# declaration of variables
try:
    LANG = str(sys.argv[1])
except:
    LANG = "en"
try:
    CHKPOINT = int(sys.argv[2])
except:
    CHKPOINT = 2

OUT_FILE = open("js/planetData.json", "w") 
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
            "Semieix major a",
            "Període orbital P",
            "Velocitat orbital mitjana",
            "Distància de la Terra",
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
            "Orbital period",
            "Semi-major axis",
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
notes_regex = "(\[.*?\])|(\(.*?\))"
# get URL
url = f"https://{LANG}.wikipedia.org/wiki/{DATA[LANG]['url'][CHKPOINT]}"
page = requests.get(url)

# scrape webpage
soup = BeautifulSoup(page.content, 'html.parser', parse_only=infobox)

# dissect title and images
try:
    result["title"] = soup.find("caption").get_text(" ", strip=True)
except:
    result["title"] = soup.find("th").get_text(" ", strip=True)
try:    
    result["symbol"] = soup.find("img",{'alt': re.compile(r'symbol')})["src"]
    result["image"] = soup.find("img",{'src': re.compile(r'\.jpg')})["src"]
except:
    result["symbolSrc"] = ""
    result["imageSrc"] = ""
# dissect tbody data
headers = soup.find_all("th")
for th in headers:
    aux = re.sub(notes_regex, "", th.get_text(" ", strip=True))
    if aux in DATA[LANG]["labels"]:
        label = aux
        data = re.sub(notes_regex, "", th.find_next_sibling("td").get_text(" ", strip=True))
        result[label] = data
# output
result = json.dumps(result)
OUT_FILE.write(result)
print(result)
