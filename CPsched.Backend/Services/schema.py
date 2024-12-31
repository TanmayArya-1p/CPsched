import uuid
from datetime import datetime

CODEFORCES,CODECHEF,LEETCODE = 'CF','LC','CC'
class Contest:
    def __init__(self,title : str,start_time : datetime,duration : int,platform : str,id=None):
        if id:
            self.id = id
        else:
            self.id = str(uuid.uuid4())
        self.title = title
        self.start_time = start_time
        self.duration = duration
        self.platform = platform

    def __str__(self):
        return f"{self.title} {self.start_time} {self.duration} {self.questions}"
    def __repr__(self):
        return f"Contest({self.title} {self.start_time} {self.duration} {self.questions})"
    
    def json(self):
        return {
            "id":self.id,
            "title":self.title,
            "start_time":self.start_time.timestamp(),
            "duration":self.duration,
            "platform" : self.platform
        }
    

    @staticmethod
    def contest_list_json(list : list):
        data = [i.json() for i in list]
        return sorted(data, key=lambda x: x["start_time"])
