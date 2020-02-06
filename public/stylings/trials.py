def binarySearch(lstToFind, toFind):
    #lstToFind is the array that has to be searched
    #toFind is the argument that has to be searched for
    lstToFind.sort()
    print(lstToFind)
    last = len(lstToFind) - 1
    midNum = int((last + 1) / 2)
    print("index: ",midNum)
a = [2, 4, 1, 7, 3, 8, 13]
binarySearch(a, 3)