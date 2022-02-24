import os
import glob
from csv import reader
from csv import DictReader
import json
from collections import defaultdict
import sys

def getJSONContent():
    """ Fonction permettant de lister le contenu du dossier, sous forme de liste, dans lequel sont sauvegardés les résultats """
    path_to_folder = 'C:\\Users\\AnaisM\\Documents\\UPSSITECH\\3A\\PGE\\IHM\\IHM\\ReactIHM_PGE\\ReactIHM_PGE\\ClientApp\\src\\data\\'
    path_to_file_list = glob.glob(path_to_folder + '*csv' )
    print(path_to_file_list)
    file_list = [i.split('\\')[-1] for i in path_to_file_list]
    list_hist = []
    list_content=[]
    line_count=True
    d=defaultdict(lambda: defaultdict(dict))
    for file_name in path_to_file_list:
        with open(file_name, 'r') as csv_file:
            csv_reader = DictReader(csv_file)
            for row in csv_reader:
                if(line_count==True):
                    #print(row)
                    list_hist.append(row)
                    line_count = False
        with open(file_name, 'r') as csv_file:
            list_content=[]
            next(csv_file)
            next(csv_file)
            csv_reader = DictReader(csv_file)
            file_without_csv = file_name[:-4]
            clean_name_file="\\".join(file_without_csv.split("\\")[-1:])
            for row in csv_reader:
                list_content.append(row)
            d[clean_name_file]=list_content
            line_count=True
    # the json file where the output must be stored
    out_file = open("C:\\Users\\AnaisM\\Documents\\UPSSITECH\\3A\\PGE\\IHM\\IHM\\ReactIHM_PGE\\ReactIHM_PGE\\ClientApp\\src\\data\\files_results_history.json", "w")
    out_file_content = open("C:\\Users\\AnaisM\\Documents\\UPSSITECH\\3A\\PGE\\IHM\\IHM\\ReactIHM_PGE\\ReactIHM_PGE\\ClientApp\\src\\data\\files_results.json", "w")
    json.dump(dict(d), out_file_content, indent = 6)
    json.dump(list_hist, out_file, indent = 6)
    out_file.close()
    out_file_content.close()
    return True

print(getJSONContent())
sys.stdout.flush()