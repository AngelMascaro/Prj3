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

CITATIONS_REGEX = "(\[.*?\])|(\(.*?\))"

# OUT_FILE = open("js/planetData.json", "w")
OUTPUT = {
    "data": {}
}
DATA = {
    "ca": {
        "url": [
            "Mercuri_(planeta)",
            "Venus_(planeta)",
            "Terra",
            "Mart_(planeta)",
            "Júpiter_(planeta)",
            "Saturn_(planeta)",
            "Urà_(planeta)",
            "Neptú_(planeta)"
        ],
        "axis_au_pattern": re.compile(r"[, \d]+ ?(ua)", re.IGNORECASE),
        "axis_km_pattern": re.compile(r"[, \d]+ ?(km)", re.IGNORECASE),
        "labels": [
            "Semieix major a",
            "Tipus",
            "Descobert per",
            "Data descobriment",
            "Cos pare",
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
        "url": [
            "Mercury_(planet)",
            "Venus",
            "Earth",
            "Mars",
            "Jupiter",
            "Saturn",
            "Uranus",
            "Neptune"
        ],
        "axis_au_pattern": re.compile(r"[. \d]+ ?(au)", re.IGNORECASE),
        "axis_km_pattern": re.compile(r"[. \d]+ ?(km)", re.IGNORECASE),
        "labels": [
            "Semi-major axis",
            "Discovered by",
            "Discovery date",
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
INFOBOX = SoupStrainer(class_="infobox")
# get URL
url = f"https://{LANG}.wikipedia.org/wiki/{DATA[LANG]['url'][CHKPOINT]}"
page = requests.get(url)

# scrape webpage
SOUP = BeautifulSoup(page.content, 'html.parser', parse_only=INFOBOX)

# dissect title and images
try:
    OUTPUT["title"] = SOUP.find("caption").get_text(" ", strip=True)
except:
    OUTPUT["title"] = SOUP.find("th").get_text(" ", strip=True)
try:
    OUTPUT["symbol"] = SOUP.find("img", {'alt': re.compile(r'symbol')})["src"]
    OUTPUT["image"] = SOUP.find("img", {'src': re.compile(r'\.jpg')})["src"]
except:
    OUTPUT["symbolSrc"] = ""
    OUTPUT["imageSrc"] = ""
# Get distance from parent


def calc_axis(raw_axis):
    """Takes stripped html data where the axis should be,
    determines the apropiate unit,
    process it and appends it to the OUTPUT dict

    Args:
        raw_axis (string): td from axis th label
    """
    # Has Astronomical Units
    try:
        raw_axis = DATA[LANG]["axis_au_pattern"].search(raw_axis).group()
        OUTPUT["axisAU"] = re.sub(r'[^,.\d]', "", raw_axis)
    # Has KM
    except:
        raw_axis = DATA[LANG]["axis_km_pattern"].search(raw_axis).group()
        OUTPUT["axisKM"] = re.sub(r'[^,.\d]', "", raw_axis)


# dissect tbody data
headers = SOUP.find_all("th")
for th in headers:
    # Get string from th
    label = re.sub(CITATIONS_REGEX, "", th.get_text(" ", strip=True))
    # Compare from custom list
    if label in DATA[LANG]["labels"]:
        data = th.find_next_sibling("td").get_text(" ", strip=True)
        data = data.replace(u'\xa0', u' ')

        if label == DATA[LANG]["labels"][0]:
            calc_axis(data)
        data = re.sub(CITATIONS_REGEX, "", data)
        OUTPUT["data"][label] = data
# output
outputJSON = json.dumps(OUTPUT)
# OUT_FILE.write(outputJSON)
print(outputJSON)
