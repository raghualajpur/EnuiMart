#-----------------------AUTHOR:ALAJPUR RAGHU-----------------------#
import os
import sys
from io import BytesIO, IOBase
from collections import defaultdict,Counter,OrderedDict
from functools import reduce
BUFSIZE = 8192
class FastIO(IOBase):
    newlines = 0
    def __init__(self, file):
        self._file = file
        self._fd = file.fileno()
        self.buffer = BytesIO()
        self.writable = "x" in file.mode or "r" not in file.mode
        self.write = self.buffer.write if self.writable else None
    def read(self):
        while True:
            b = os.read(self._fd, max(os.fstat(self._fd).st_size, BUFSIZE))
            if not b:
                break
            ptr = self.buffer.tell()
            self.buffer.seek(0, 2), self.buffer.write(b), self.buffer.seek(ptr)
        self.newlines = 0
        return self.buffer.read()
    def readline(self):
        while self.newlines == 0:
            b = os.read(self._fd, max(os.fstat(self._fd).st_size, BUFSIZE))
            self.newlines = b.count(b"\n") + (not b)
            ptr = self.buffer.tell()
            self.buffer.seek(0, 2), self.buffer.write(b), self.buffer.seek(ptr)
        self.newlines -= 1
        return self.buffer.readline()
    def flush(self):
        if self.writable:
            os.write(self._fd, self.buffer.getvalue())
            self.buffer.truncate(0), self.buffer.seek(0)
class IOWrapper(IOBase):
    def __init__(self, file):
        self.buffer = FastIO(file)
        self.flush = self.buffer.flush
        self.writable = self.buffer.writable
        self.write = lambda s: self.buffer.write(s.encode("ascii"))
        self.read = lambda: self.buffer.read().decode("ascii")
        self.readline = lambda: self.buffer.readline().decode("ascii")
sys.stdin, sys.stdout = IOWrapper(sys.stdin), IOWrapper(sys.stdout)
input = lambda: sys.stdin.readline().rstrip("\r\n")
#---------------------------I/O-------------------------------#
def gl_ints():return list(map(int,input().split()))
def gl_strs():return list(map(str,input().split()))
def g_ints():return map(int,input().split())
def g_strs():return map(str,input().split())
def get_Alphas():return list("abcdefghijklmnopqrstuvwxyz")
def gint_matrix(n):
    matrix=[]
    for i in range(n):
        matrix.append(list(map(int,input().split())))
    return matrix
def gstr_matrix(n):
    matrix=[]
    for i in range(n):
        matrix.append(list(map(str,input().split())))
    return matrix
#-------------------------SOLUTION----------------------------#
from collections import Counter
def missingWords(s,t):
    arr1=s.split()
    arr2=t.split()
    for i in arr2:
        if i in arr1:
            arr1.remove(i)
    return arr1

    

ans=missingWords("I like cheese","like")
print(ans)