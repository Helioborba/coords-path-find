from main_app import db
from dataclasses import dataclass

@dataclass # Utilizado para corrigir problemas com JSON quando o sql-alchemy vai interpretar os dados retornados.
class City(db.Model):

    __tablename__ = 'city'
    
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.Text)
    coordinate_x = db.Column(db.Integer)
    coordinate_y = db.Column(db.Integer)

    def __init__(self, name:str, coordinates:dict) -> None:
        self.name = name
        self.coordinate_x = coordinates['x']
        self.coordinate_y = coordinates['y']

class CityProperties(City):
    
    def __init__(self, name:str, buildings:int, stations:int, rivers:bool) -> None:
        self.name = name
        self.buildings_t = buildings
        self.stations_t = stations
        self.rivers = rivers