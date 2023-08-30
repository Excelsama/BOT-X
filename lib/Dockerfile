FROM quay.io/sampandey001/secktor
RUN git clone https://github.com/Bladeh4x/BLADE-MD /root/Bladeh4x
WORKDIR /root/Bladeh4x/
RUN npm install npm@latest
EXPOSE 8000
CMD ["npm", "start"]
