#General_Utilities

#install.packages("timeDate")

#Commonly used utilities programs and functions - collection

library("klaR")
library("caret")
library("e1071")

#traindata=read.table('/home/shan/projects/NeuralNets/featureExtraction/paragraph2vec/dataset/trainset1_2Classes.dat')
traindata=read.table('/home/shan/projects/NeuralNets/Preprocessing/imbalanced-learn/examples/over-sampling/SmoteResampled/trainsetRelabelled2.dat')

# xData=traindata[,-1]
# yData=traindata$V1
# model = train(xData,yData,'nb',trControl=trainControl(method='cv',number=10))


# model