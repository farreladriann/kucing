from numpy import *

def hasil1B(data):
    data = array(data)
    print('Mean: ', mean(data))
    print('Variance: ', var(data, ddof=1))
    print('Standard deviation: ', std(data, ddof=1))
    print('Ketidakpastian alat ukur: ', std(data, ddof=1) / mean(data))
    
def hasil1Bre(data):
    data = array(data)
    return array([mean(data), var(data, ddof=1), std(data, ddof=1), std(data, ddof=1) / mean(data)])

if  __name__ == "__main__":
    # data = [0.96, 0.99, 0.87, 0.95, 0.86]
    # data = [1.84, 1.91, 1.88, 1.90, 1.88]
    # data = [4.86, 4.66, 4.65, 4.61, 4.52]
    # data = [9.54, 9.37, 9.36, 9.11, 8.96]
    data = [18.70, 18.44, 18.40, 18.17, 17.97]
    hasil1B(data)