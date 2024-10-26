FROM quay.io/maherzubair/sigma-md:beta
RUN git clone https://github.com/Xcelsama/STAR-MD /root/STAR-MD
WORKDIR /root/STAR-MD/
RUN npm install npm@latest
RUN npm install
EXPOSE 8000
CMD ["npm", "start"]
 
