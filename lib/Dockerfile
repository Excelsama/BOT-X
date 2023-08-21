FROM quay.io/sampandey001/secktor
RUN git clone  https://github.com/Bladeh4x/BLADE-MD /root/Xlicon
WORKDIR /root/xlicon/
RUN npm install npm@latest
RUN yarn install --network-concurrency 1
EXPOSE 8000
CMD ["npm", "start"]
