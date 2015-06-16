import urllib2
import json

def get_geolocation(address):
    url = 'http://maps.google.com/maps/api/geocode/json?address='
    data = json.loads(urllib2.urlopen(url + urllib2.quote(address)).read())
    geolocation = data['results'][0]['geometry']['location']
    return (geolocation['lng'], geolocation['lat'])