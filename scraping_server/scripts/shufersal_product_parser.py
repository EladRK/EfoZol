#!/usr/bin/python
# Copyright 2010 Google Inc.
# Licensed under the Apache License, Version 2.0
# http://www.apache.org/licenses/LICENSE-2.0

# Google's Python Class
# http://code.google.com/edu/languages/google-python-class/

import sys
import xml.etree.ElementTree as ET
import json
import request


NAME_CONVERSION = {}
ITEMS_TAG = 'Items'
ITEM_TAG = 'Item'
IGNORE_LIST = ['Items']


def read_xml_object(file):
    data = ''
    with open(file, 'rU') as f:
        data = f.read()
    return ET.fromstring(data)


def parse_item(item):
    ret = {}
    for child in item.getchildren():
        if child.tag in IGNORE_LIST:
            continue
        tag = child.tag
        if tag in NAME_CONVERSION:
            tag = NAME_CONVERSION[tag]
        ret[tag] = child.text
    return ret


def parse_items(items):
    ret = []
    for item in items.findall(ITEM_TAG):
        parsed = parse_item(item)
        ret.append(parsed)
        data = json.dumps(parsed) 
        r = requests.post("https://localhost:3000/product/", data)
		print r
        r2 = request.post("https://localhost:3000/productPrice/", data)
        print r2
        ret.append(parsed)
    return ret


def convert_to_generic_json(rootElem, filename):
    ret = {}
    for child in rootElem.getchildren():
        if child.tag in IGNORE_LIST:
            continue
        tag = child.tag
        if tag in NAME_CONVERSION:
            tag = NAME_CONVERSION[tag]
        ret[tag] = child.text
    ret['Items'] = parse_items(rootElem.find(ITEMS_TAG))

    #You should save it as JSON file instead of printing.
    with open(filename + '.json', 'w') as f:
        f.write(json.dumps(ret).encode('cp1255'))


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
        convert_to_generic_json(read_xml_object(filename), filename)


if __name__ == '__main__':
    main()
