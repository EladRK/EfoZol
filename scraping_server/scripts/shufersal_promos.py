import xml.etree.cElementTree as ET
import sys
import json


def item_text(item, field):
    ret = item.find(field)
    if ret is None:
        return 'MISSING'
    ret = ret.text
    if ret is None:
        return 'MISSING'
    return ret


def parse_stores_file(stores_fobj, out_fobj):
    try:
        encoded = stores_fobj.read().decode('utf-8').encode('utf-8')
    except UnicodeDecodeError as e:
        import code
        code.interact(local=locals())
        sys.exit(-1)
    root = ET.fromstring(encoded)
    outputdict = {'root': dict()}
    root_dict = outputdict['root']
    root_dict['formatOutput'] = '1'
    for key in ('ChainId', 'SubChainId', 'StoreId', 'BikoretNo', 'DllVerNo'):
        root_dict[key] = item_text(root, key)
    root_dict['Promotions'] = {'Promotion': []}
    promos_arr = root_dict['Promotions']['Promotion']
    for promotion in root.find('Promotions'):
        p_dict = {}
        fields = [
            "PromotionId",
            "PromotionType",
            "AllowMultipleDiscounts",
            "PromotionDescription",
            "PromotionUpdateDate",
            "PromotionStartDate",
            "PromotionEndDate",
            "MinQty",
            "MinConditionAmnt",
            "MaxWeight",
            "RewardType",
            "DiscountRate",
            "MinPurchaseAmnt",
            "DiscountedPrice",
            "MinNoOfItemOfered",
            "AdditionalConditions",  # should be here? TODO
            "Remarks",
        ]
        for field in fields:
            p_dict[field] = item_text(promotion, field)
        item_ids = []
        item_types = []
        item_gifts = []
        for promo_item in promotion.find('PromotionItems'):
            item_ids.append(item_text(promo_item, 'ItemCode'))
            item_types.append(item_text(promo_item, 'ItemType'))
            item_gifts.append(item_text(promo_item, 'IsGiftItem'))

        p_dict['ItemCode'] = item_ids
        p_dict['ItemType'] = item_types
        p_dict['IsGiftItem'] = item_gifts

        add_rest = {}
        add_rest_element = promotion.find('AdditionalRestrictions')
        for restriction in add_rest_element:
            add_rest[restriction.tag] = item_text(
                add_rest_element, restriction.tag)

        p_dict['AdditionalRestrictions'] = add_rest

        clubs = []
        for club in promotion.find('Clubs'):
            clubs.append(club.text)

        p_dict['Clubs'] = clubs

        promos_arr.append(p_dict)

    json.dump(outputdict, out_fobj,
              sort_keys=True, indent=4, separators=(',', ': '))


if __name__ == '__main__':
    stores_file = file(sys.argv[1], "rb")
    output_file = file(sys.argv[2], "wb")
    parse_stores_file(stores_file, output_file)
