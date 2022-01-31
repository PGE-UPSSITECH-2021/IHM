from csv import reader
from csv import DictReader
import json
import sys

def getContentCsvFile():
    """ Fonction permettant de lister le contenu d'un fichier csv, sous forme de liste """
    path_to_file = '..\\data\\'+sys.argv[1]+'.csv'
    list_content=[]
    with open(path_to_file, 'r') as csv_file:
        next(csv_file)
        next(csv_file)
        csv_reader = DictReader(csv_file)
        for row in csv_reader:
            list_content.append(row)
            
    print(list_content)
    return list_content
