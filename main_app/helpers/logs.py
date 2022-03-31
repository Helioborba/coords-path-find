import sys
class logs():
    @staticmethod
    def printData(data):
        try:
            print("this is the data: ", data, file=sys.stderr)
        except:
            print("error: ", file=sys.stderr)

    @staticmethod
    def printLocal(localStorage):
        print("this is the storage: ", localStorage, file=sys.stderr)

