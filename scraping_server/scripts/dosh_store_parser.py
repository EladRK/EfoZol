#!/usr/bin/python

from xml.dom.minidom import parse
from json import dumps
import codecs

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

BLOCKSIZE = 1024 * 1024
with codecs.open('Stores7290873900009-201505120928.xml', 'r', 'iso-8859-8') as src:
        with codecs.open('Stores7290873900009-201505120928.unicode.xml', 'w', 'utf-8') as dest:
                while True:
                        contents = src.read(BLOCKSIZE)
                        if not contents: break
                        dest.write(contents)

dom = parse("Stores7290873900009-201505120928.unicode.xml")
root = dom.childNodes[0]
json_items = []
chain_name = item_text(root, 'ChainName')
chain_id = item_text(root, 'ChainId')
last_update_date_time = item_text(root, 'LastUpdateDate') + ' ' + item_text(root, 'LastUpdateTime')
for subchain in root.getElementsByTagName('SubChains')[0].getElementsByTagName('SubChain'):
        subchain_id = item_text(subchain, 'SubChainId')
        subchain_name = item_text(subchain, 'SubChainName')
        for store in subchain.getElementsByTagName('Stores')[0].getElementsByTagName('Store'):
                json_items.append({'StoreId': item_text(store, 'StoreId')
                                  ,'SubChainId': subchain_id
                                  ,'ChainName': chain_name
                                  ,'SubChainName': subchain_name
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

