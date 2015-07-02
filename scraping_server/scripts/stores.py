import json
import request

def main():
    url = "https://localhost:3000/stores"
    data = json.dumps({ 'id': 1, 'name': 'שופרסל' }) 
    r = requests.post(url, data)
    
    print r

if __name__ == '__main__':
    main()

