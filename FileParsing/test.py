#!/usr/local/bin/python
import csv
import operator

def totalreader(totalfile):
	total = 0
	totalreader = csv.reader(totalfile, delimiter=',', quotechar='|')
	firstrow = True;
	for row in totalreader:
		if firstrow:
			firstrow = False
			continue
		if(float(row[2]) < -2000):
			total = total + 1
			#print row
	print 'total = ' + str(total)
	
def lessthanreader():
	with open('2017-04-07-TUD-hackathon-export-18K-accounts.csv', 'r') as totalfile:
		with open('less_than_2000.csv', 'w') as lessthanfile:
			lessthanwriter = csv.writer(lessthanfile, delimiter=',',quotechar='|', quoting=csv.QUOTE_MINIMAL)
			totalreader = csv.reader(totalfile, delimiter=',', quotechar='|')
			firstrow = True;
			for row in totalreader:
				if firstrow:
					firstrow = False
					continue
				if(float(row[2]) < -2000):
					lessthanwriter.writerow(row)
					
def countIds():
	with open('less_than_2000.csv', 'r') as lessthanfile:
		with open('countIds.csv', 'w') as idsfile:
			ids = {}
			lessthanreader = csv.reader(lessthanfile, delimiter=',', quotechar='|')
			for row in lessthanreader:
				if ids.has_key(str(row[0])):
					ids[str(row[0])] = int(ids[str(row[0])]) + 1
				else:
					ids[str(row[0])] = 1
			idswriter = csv.writer(idsfile, delimiter=',',quotechar='|', quoting=csv.QUOTE_MINIMAL)
			for key in ids:
				idswriter.writerow([key, ids[key]])

def sortIds():
	with open('less_than_2000.csv', 'r') as lessthanfile:
		with open('sortedcountIds.csv', 'w') as idsfile:
			ids = {}
			lessthanreader = csv.reader(lessthanfile, delimiter=',', quotechar='|')
			for row in lessthanreader:
				if ids.has_key(str(row[0])):
					ids[str(row[0])] = int(ids[str(row[0])]) + 1
				else:
					ids[str(row[0])] = 1
			idswriter = csv.writer(idsfile, delimiter=',',quotechar='|', quoting=csv.QUOTE_MINIMAL)
			
			sorted_ids = sorted(ids.items(), key=operator.itemgetter(1))
			for i in sorted_ids:
				idswriter.writerow([i[0], i[1]])
				

				
def test():
	ids = {}
	ids['1'] = 1
	print ids[0]
		
def main():
    sortIds()

if __name__ == "__main__":
    main()
