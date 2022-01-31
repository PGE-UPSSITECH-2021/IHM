import os
import glob
from csv import reader

import os
import glob
from csv import reader
from csv import DictReader
import json


def get_content_folder():
    """ Fonction permettant de lister le contenu du dossier, sous forme de liste, dans lequel sont sauvegardés les résultats """
    path_to_folder = '..\\..\\..\\..\\..\\..\\SimulatedResults\\'
    path_to_file_list = glob.glob(path_to_folder + '*csv' )
    print(path_to_file_list)
    file_list = [i.split('\\')[-1] for i in path_to_file_list]
    print(file_list)
    list_hist = []
    line_count=True
    for file_name in path_to_file_list:
        with open(file_name, 'r') as csv_file:
            csv_reader = DictReader(csv_file)
            for row in csv_reader:
                if(line_count==True):
                    #print(row)
                    list_hist.append(row)
                    line_count = False
               
            line_count=True
    # the json file where the output must be stored
    out_file = open("./files_results_history.json", "w")

    json.dump(list_hist, out_file, indent = 6)
    out_file.close()


def get_content_csv_file(csv_file):
    """Fonction permettant de récupérer le contenu d'un fichier csv pour le renvoyer à la page de résultats spécifiques"""
    file_name= '..\\..\\..\\..\\..\\..\\SimulatedResults\\'+csv_file
    list_content=[]
    with open(file_name, 'r') as csv_file:
        csv_reader = DictReader(csv_file)
        for row in csv_reader:
             list_content.append(row)
             print(list_content)
    j=json.dump(list_content)
    print()