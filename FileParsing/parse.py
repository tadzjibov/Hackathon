#!/usr/local/bin/python
import csv
import operator
import numpy as np
from datetime import datetime
from sys import maxint

#Method to read the whole input file
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
	print 'total = ' + str(total)

#Method to create a new file containing every id with transactions resulting in balances lower than -2000	
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

# Amount of IDs with their amount of transactions lower than -2000 balance
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

#Same as previous method, but then sorted by amount of transactions
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

#Calculates the gaussian variables of a specific ID
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

#Testing method to convert date
def testDate(userid):
	with open('csv/2017-04-07-TUD-hackathon-export-18K-accounts.csv', 'r') as totalfile:
		totalreader = csv.reader(totalfile, delimiter=',', quotechar='|')
		idlist = []
		i = 0
		firstrow = True
		for row in totalreader:
			if firstrow:
				firstrow = False
				continue
			if i < 5:
				print row[1]
				i = i +1
				datetime_obj = datetime.strptime(row[1], '%Y-%m-%d')
				print datetime_obj
				
		print len(idlist)

#Create array of last 15 balances, and calculate the gaussian variables of these balances
def getArray(userid):
	with open('csv/2017-04-07-TUD-hackathon-export-18K-accounts.csv', 'r') as totalfile:
		totalreader = csv.reader(totalfile, delimiter=',', quotechar='|')
		idlist = []
		firstrow = True;
		for row in totalreader:
			if firstrow:
				firstrow = False
				continue
			if(row[0] == userid):
				idlist.append(row)
				
		sorted_ids = sorted(idlist, key=operator.itemgetter(1))
		
		last_15 = sorted_ids[len(sorted_ids)-15:]
		balances = []
		max_value = -maxint
		min_value = maxint
		for row in last_15:
			if(float(row[2]) > max_value):
				max_value = float(row[2])
			if(float(row[2]) < min_value):
				min_value = float(row[2])
			balances.append(float(row[2]))
		print last_15
		
		print "Max_Value: " + str(max_value)
		print "Min_Value: " + str(min_value)
		print "Balances: " + str(balances)
		norm_balances = []
		for row in balances:
			new_val = max_value - row
			new_val = 360 - (360 - ((new_val / (max_value - min_value)) * 360))
			norm_balances.append(new_val)
		
		mean = np.mean(balances)
		print "Mean: " + str(mean)
			
		
		print norm_balances

#Method to call multiple methods (So the main only has one method)
def use(userid):
	gaussianCalculator(userid)
	print "----------------------"
	getArray(userid)
	
def main():
    use('5BED1EB358')

if __name__ == "__main__":
    main()
