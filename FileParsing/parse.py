#!/usr/local/bin/python
import csv
import operator
import numpy as np

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
	with open('csv/2017-04-07-TUD-hackathon-export-18K-accounts.csv', 'r') as totalfile:
		with open('csv/less_than_2000.csv', 'w') as lessthanfile:
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
	with open('csv/less_than_2000.csv', 'r') as lessthanfile:
		with open('csv/countIds.csv', 'w') as idsfile:
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
	with open('csv/less_than_2000.csv', 'r') as lessthanfile:
		with open('csv/sortedcountIds.csv', 'w') as idsfile:
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
				
def gaussianCalculator(userid):
	with open('csv/2017-04-07-TUD-hackathon-export-18K-accounts.csv', 'r') as totalfile:
		totalreader = csv.reader(totalfile, delimiter=',', quotechar='|')
		idlist = []
		for row in totalreader:
			if(row[0] == userid):
				idlist.append(row)
		numpyarr = np.array(idlist)
		std1 = np.std(numpyarr[:,2].astype(float))
		mean1 = np.mean(numpyarr[:,2].astype(float))
		
		lastrows = numpyarr[range(numpyarr.shape[0]-5,numpyarr.shape[0]),:]
		std2 = np.std(lastrows[:,2].astype(float))
		mean2 = np.mean(lastrows[:,2].astype(float))
		
		print "Total: " + str(std1) + " " + str(mean1)
		print "Last 5: " + str(std2) + " " + str(mean2)
		
		diffstd = std1 - std2
		diffmean = mean1 - mean2
		
		print "Diff: " + str(diffstd) + " " + str(diffmean)
		
				

def test():
	arr = np.zeros((10,5))
	#print arr.shape[0]
	print arr[range((arr.shape[0]-6),(arr.shape[0])),:]
	#print np.std(arr[:,2])
		
def main():
    gaussianCalculator('17F0126551')
    #test()

if __name__ == "__main__":
    main()
