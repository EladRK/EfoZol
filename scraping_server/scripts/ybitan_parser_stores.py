from cStringIO import StringIO
import xml.etree.cElementTree as ET
import sys
import json

def item_text(item,field):
    ret = item.find(field)
    if ret is None: return 'MISSING'
    ret = ret.text
    if ret is None: return 'MISSING'
    return ret

def parse_stores_file(stores_fobj, out_fobj):
    # Start by converting to UTF-8 + replacing ampersands
    bad_encoded = stores_fobj.read()
    bad_encoded = bad_encoded.replace("&", "&amp;")
    utf_encoded = bad_encoded.decode('windows-1255').encode('utf-8')
    
    dom = ET.parse(StringIO(utf_encoded))
    root = dom.getroot() # If only it would be this simple on an iPhone

    outputdict = {'root': dict()}
    root_dict = outputdict['root']
    root_dict['XmlDocVersion'] = ''
    root_dict['ChainId'] = item_text(root, 'ChainId')
    root_dict['Stores'] = {'store': []}
    stores_arr = root_dict['Stores']['store']
    for store in root.find('Stores'):
        s_dict = {}
        fields = [
            "SubChainId",  
            "StoreId",     
            "BikoretNo",   
            "StoreType",   
            "ChainName",   
            "SubChainName",
            "StoreName",   
            "Address",     
            "City",        
            "ZipCode"     
        ]
        for field in fields:
            s_dict[field] = item_text(store, field)
        stores_arr.append(s_dict)

    json.dump(outputdict, out_fobj, sort_keys=True, indent=4, separators=(',',': '))

if __name__ == '__main__':
    stores_file = file(sys.argv[1], "rb")
    output_file = file(sys.argv[2], "wb")
    parse_stores_file(stores_file, output_file)



