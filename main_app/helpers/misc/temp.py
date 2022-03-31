class Messages:

    def __init__(self) -> None:
        self.len = None
        self.encode = None
        self.content = "Type/text" 

    def getEncode(self):
        return self.encode

    def getContent(self):
        return self.content

class Messenger(Messages):

    def __init__(self,words) -> None:
        self.words = words
        super().__init__()

    def speak(self):
        words = f"{self.content}, {self.words}"
        return words
