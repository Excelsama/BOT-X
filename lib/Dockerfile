FROM quay.io/sampandey001/secktor
RUN git clone https://github.com/Excelsama/BOT-X /root/BOT-X 
WORKDIR /root/BOT-X/
RUN npm install npm@latest
RUN npm install
EXPOSE 8000
CMD ["npm", "start"]
 
