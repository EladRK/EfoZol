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

dom = parse("PricesFull7290803800003-004-201506060000.xml")
root = dom.childNodes[0]
json_items = []
for item in root.getElementsByTagName('Items')[0].getElementsByTagName('Item'):
        json_items.append({'PriceUpdateDate': item_text(item,'PriceUpdateDate')
                          ,'ItemCode': item_text(item,'ItemCode')
                          ,'ItemType': item_text(item,'ItemType')         
                          ,"ItemName": item_text(item,'ItemName')
                          ,"ManufacturerName": item_text(item,'ManufacturerName')
                          ,"ManufacturerCountry": item_text(item,'ManufactureCountry')
                          ,"ManufacturerItemDescription": item_text(item, 'ManufacturerItemDescription')
                          ,"Quantity": item_text(item, 'Quantity')
                          ,"UnitOfMeasure": item_text(item, 'UnitOfMeasure')
                          ,"QtyInPackage": item_text(item, 'QtyInPackage')
                          ,"UnitOfMeasurePrice": item_text(item, 'UnitOfMeasurePrice')
                          ,"AllowDiscount": item_text(item, 'AllowDiscount')
                          ,"bIsWeighted": item_text(item, 'bIsWeighted')
                          ,"ItemPrice": item_text(item, 'ItemPrice')
                          ,"ItemStatus": item_text(item, 'ItemStatus')})

json = {'XmlDocVersion': item_text(root,'XmlDocVersion')
       ,'DllVerNo': "missing"
       ,'ChainId': item_text(root,'ChainId')
       ,"SubChainId": item_text(root,'SubChainId')
       ,"StoreId": item_text(root,'StoreId')
       ,"BikoretNo": item_text(root,'BikoretNo')
       ,"Items": json_items}
open('output','w').write(dumps(json, sort_keys=True, indent=4, separators=(',',': ')))

