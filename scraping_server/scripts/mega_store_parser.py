#!/usr/bin/python

from xml.dom.minidom import parse
from json import dumps

def item_text(item,field):
    ret = item.getElementsByTagName(field)
    if ret is None: return "missing"
    if len(ret) < 1: return "missing"
    ret = ret[0]
    if ret is None: return "missing"
    ret = ret.childNodes
    if ret is None: return "missing"
    if len(ret) < 1: return "missing"
    ret = ret[0]
    ret = ret.wholeText
    if ret is None: return "missing"
    return ret

dom = parse("StoresFull7290055700007-0000-201506060106.xml")
root = dom.childNodes[0]
json_items = []
chain_name = item_text(root, 'ChainName')
chain_id = item_text(root, 'ChainId')
last_update_date_time = item_text(root, 'LastUpdateDate') + ' ' + item_text(root, 'LastUpdateTime')
for store in root.getElementsByTagName('Store'):
        json_items.append({'StoreId': item_text(store, 'StoreId')
                          ,'SubChainId': item_text(store, 'SubChainId')
                          ,'ChainName': item_text(store, 'ChainName')
                          ,'SubChainName': item_text(store, 'SubChainName')
                          ,'BikoretNo': item_text(store, 'BikoretNo')
                          ,'StoreType': item_text(store, 'StoreType')
                          ,'StoreName': item_text(store, 'StoreName')
                          ,'Address': item_text(store, 'Address')
                          ,'City': item_text(store, 'City')
                          ,'ZipCode': item_text(store, 'ZipCode')
                          ,'LastUpdateDateTime': last_update_date_time
                          ,'Latitude': item_text(store, 'Latitude')
                          ,'Longitude': item_text(store, 'Longitude')})

json = {'XmlDocVersion': item_text(root,'XmlDocVersion')
       ,'ChainId': chain_id
       ,'Stores': json_items}
open('output','w').write(dumps(json, sort_keys=True, indent=4, separators=(',',': ')))

