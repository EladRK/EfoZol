#!/usr/bin/python
# Copyright 2010 Google Inc.
# Licensed under the Apache License, Version 2.0
# http://www.apache.org/licenses/LICENSE-2.0

# Google's Python Class
# http://code.google.com/edu/languages/google-python-class/

import sys
import xml.etree.ElementTree as ET
import json
import time
import requests

from geolocation import get_geolocation

NAME_CONVERSION = {}
STORES_TAG = 'STORES'
STORE_TAG = 'STORE'
IGNORE_LIST = ['STORES']


def read_xml_object(file):
    data = ''
    with open(file, 'rU') as f:
        data = f.read()
    return ET.fromstring(data)


def parse_store(store):
    ret = {}
    for child in store.getchildren():
        if child.tag in IGNORE_LIST:
            continue
        tag = child.tag
        if tag in NAME_CONVERSION:
            tag = NAME_CONVERSION[tag]
        ret[tag] = child.text
    try:
        time.sleep(0.2)
        print ret['STOREID']
        geolocation = get_geolocation(('%s, %s' % (ret['ADDRESS'], ret['CITY'])).encode('utf8'))
        ret['Longtitude'] = geolocation[0]
        ret['Latitude'] = geolocation[1]
    except:
        pass
    return ret


def parse_stores(stores):
    ret = []
    for store in stores.findall(STORE_TAG):
        parsed = parse_store(store)
        ret.append(parsed)
		url = "https://localhost:3000/branches/1"
        data = json.dumps(parsed) 
        r = requests.post(url, data)

		print r
    return ret


def convert_to_generic_json(rootElem):
    ret = {}
    for child in rootElem.getchildren():
        if child.tag in IGNORE_LIST:
            continue
        tag = child.tag
        if tag in NAME_CONVERSION:
            tag = NAME_CONVERSION[tag]
        ret[tag] = child.text
    ret['Stores'] = parse_stores(rootElem.find(STORES_TAG))

    #You should save it as JSON file instead of printing.
    #with open('test.json', 'w') as f:
    #    f.write(json.dumps(ret).encode('cp1255'))


def main():

        # This command-line parsing code is provided.
      # Make a list of command line arguments, omitting the [0] element
      # which is the script itself
    args = sys.argv[1:]

    if not args:
        print 'usage: %s file [file ...]' % sys.argv[0]
        sys.exit(1)

    # +++your code here+++
    # For each filename, get the names, then either print the text output
    # or write it to a summary file
    #print find_year_from_file(extract_file_raw_content(args[0]))
    for filename in args:
        convert_to_generic_json(read_xml_object(filename).find('asx:values', { 'asx': 'http://www.sap.com/abapxml' }))


if __name__ == '__main__':
    main()
